"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "@/redux/features/appointments/appointmentsSlice";
import { OrderCard } from "@/component/dashboard";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { data: appointments, status, error } = useSelector(
    (state) => state.appointments
  );

  const [activeTab, setActiveTab] = useState("Accepted");

  const tabs = [
    { id: 1, value: "Accepted", label: "Ongoing" },
    { id: 2, value: "Completed", label: "Completed" },
  ];

  // ✅ Fetch appointments when component mounts
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // ✅ Filter appointments by the selected tab (status)
  const filteredAppointments =
    appointments?.filter((item) => item.status === activeTab) || [];

  return (
    <section className="w-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 mb-0 allproducts_title">My Appointments</h1>
      </div>

      {/* ✅ Tabs Section */}
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

      {/* ✅ Content Section */}
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
  );
};

export default MyOrders;