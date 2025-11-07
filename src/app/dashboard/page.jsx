"use client";
import { useEffect, useMemo, useState } from "react";
import StatCard from "@/component/dashboard/stat-card";
import LineChart from "@/component/dashboard/line-chart";
import DonutChart from "@/component/dashboard/donut-chart";
import OrderCard from "@/component/dashboard/order-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "@/redux/features/appointments/appointmentsSlice";
import { setRevenueData } from "@/redux/features/revenue/revenueSlice";
import api from "@/lib/api";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Accepted");
  const [revenueData, setRevenueDataLocal] = useState(null); // local state for chart
  const dispatch = useDispatch();
  const { data: appointments, status, error } = useSelector(
    (state) => state.appointments
  );

  const tabs = [
    { id: 1, value: "Accepted", label: "Ongoing" },
    { id: 2, value: "Completed", label: "Completed" },
  ];

  // ✅ Fetch appointments
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // ✅ Fetch revenue stats
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const salonId = sessionStorage.getItem("adminId");

        const res = await api.get(`/getSalonMonthlyRevenue?salonId=${salonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data; // ✅ use res.data instead of res.json()

        if (data.success) {
          setRevenueDataLocal(data);
          dispatch(setRevenueData(data)); // optional redux storage
        } else {
          console.error("Failed to fetch revenue:", data.message);
        }
      } catch (err) {
        console.error("Error fetching revenue:", err);
      }
    };
    fetchRevenue();
  }, [dispatch]);


  // ✅ Prepare chart data
  const months = useMemo(() => {
    if (!revenueData?.data) return [];
    return revenueData.data.map((item) => {
      const [month] = item.monthYear.split("-");
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May",
        "Jun", "Jul", "Aug", "Sep", "Oct",
        "Nov", "Dec",
      ];
      return monthNames[parseInt(month, 10) - 1];
    });
  }, [revenueData]);

  const revenues = useMemo(() => {
    if (!revenueData?.data) return [];
    return revenueData.data.map((item) => item.revenue);
  }, [revenueData]);

  const customers = useMemo(() => {
    if (!revenueData?.data) return [];
    return revenueData.data.map((item) => item.customers);
  }, [revenueData]);

  // ✅ Filter appointments by active tab
  const filteredAppointments =
    appointments?.filter((item) => item.status === activeTab) || [];

  // ✅ Calculate DonutChart percentage
  const customerPercentage = useMemo(() => {
    if (!revenueData?.data || revenueData.data.length === 0) return 0;

    const totalCustomers = revenueData.totalCustomers || 0;
    const latestMonthCustomers = revenueData.data[revenueData.data.length - 1]?.customers || 0;

    if (totalCustomers === 0) return 0;

    return Math.round((latestMonthCustomers / totalCustomers) * 100);
  }, [revenueData]);

  // ✅ Get current month revenue from the last index of data
  const currentMonthRevenue = useMemo(() => {
    if (!revenueData?.data || revenueData.data.length === 0) return 0;
    return revenueData.data[revenueData.data.length - 1]?.revenue || 0;
  }, [revenueData]);

  // ✅ Get current month name for subtitle
  const currentMonthLabel = useMemo(() => {
    if (!revenueData?.data || revenueData.data.length === 0) return "";
    const lastMonthYear = revenueData.data[revenueData.data.length - 1]?.monthYear; // e.g. "10-2025"
    if (!lastMonthYear) return "";

    const [month, year] = lastMonthYear.split("-");
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  }, [revenueData]);

  return (
    <main className="container-fluid py-4">
      {/* KPI Cards */}
      <section className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="sales"
            title="Total Revenue"
            value={`$${revenueData?.total10MonthRevenue || 0}`}
            delta="+0.03%"
            deltaPositive
            subtitle="last 10 months"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="service"
            title="Current Month Revenue"
            value={`$${currentMonthRevenue || 0}`}
            delta="+0.03%"
            deltaPositive
            subtitle={currentMonthLabel}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="booking"
            title="Total Booking"
            value={revenueData?.totalBookings || 0}
            delta="+5.30%"
            deltaPositive
            subtitle="last 10 months"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="clients"
            title="Total Clients"
            value={revenueData?.totalCustomers || 0}
            delta="+1.30%"
            deltaPositive
            subtitle="last 10 months"
          />
        </div>
      </section>

      {/* Charts */}
      <section className="row g-3 mb-4">
        <div className="col-12 col-lg-9">
          <div className="card glass border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Salon Revenue & Customers</h5>
                <div className="btn-group btn-group-sm">
                  {/* <span className="badge rounded-pill service ">
                    <em>•</em> Revenue
                  </span> */}
                  <span className="badge rounded-pill product me-2">
                    <em>•</em> Revenue
                  </span>
                </div>
              </div>

              {revenueData ? (
                <LineChart
                  labels={months}
                  series={[
                    { name: "Revenue", data: revenues, color: "#4e79a7" },
                  ]}
                  height={360}
                // yLabel="Price ($)"
                />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="card glass border-0 h-100 d-flex align-items-center justify-content-center">
            <div className="card-body w-100">
              <h5 className="card-title">Total Clients</h5>
              <DonutChart
                percent={customerPercentage}
                strokeColor="var(--brand-primary)"
                trackColor="rgba(255,255,255,0.1)"
                size={220}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section>
        <h5 className="mb-3 text-white">My Appointments</h5>
        <ul className="nav nav-pills nav-pills-tabs gap-2 mb-3" role="tablist">
          {tabs.map((t) => (
            <li className="nav-item nav-item-tabs" key={t.id}>
              <button
                className={`nav-link ${activeTab === t.value ? "active" : ""}`}
                onClick={() => setActiveTab(t.value)}
                data-bs-toggle="pill"
                type="button"
                role="tab"
                aria-selected={activeTab === t.value}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {status === "loading" ? (
            <p>Loading appointments...</p>
          ) : status === "failed" ? (
            error === "No bookings found for this salon" ? (
              <p>No appointments found.</p>
            ) : (
              <p className="text-danger">{error}</p>
            )
          ) : filteredAppointments.length === 0 ? (
            <p>No appointments found in this tab.</p>
          ) : (
            <div className="row g-3">
              {filteredAppointments.map((item) => (
                <div key={item._id} className="col-12 col-sm-6 col-lg-3">
                  <OrderCard
                    bookingId={item?._id}
                    title={item?.serviceId?.serviceName || "Unknown Service"}
                    time={`${item?.time || "N/A"} | ${item?.date || "N/A"}`}
                    image={
                      item?.serviceId?.images?.length > 0
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.serviceId.images[0]}`
                        : "/images/order-prof.png"
                    }
                    price={`$${item?.totalAmount || 0}`}
                    technician={item?.technicianId?.fullName || "N/A"}
                    status={item?.status}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
