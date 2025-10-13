"use client"
import { useMemo, useState } from "react"
import StatCard from "@/component/dashboard/stat-card"
import LineChart from "@/component/dashboard/line-chart"
import DonutChart from "@/component/dashboard/donut-chart"
import OrderCard from "@/component/dashboard/order-card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("New Orders");

  const tabs = [
    { id: 1, value: "New Orders", label: "New Orders" },
    { id: 2, value: "Ongoing", label: "Ongoing" },
    { id: 3, value: "Completed", label: "Completed" },
    { id: 4, value: "Delivered", label: "Delivered" },
    { id: 5, value: "History", label: "History" },
  ];
  const orderData = {
    "New Orders": [
      { title: "Hair extensions", time: "9:00 to 10:00 - Oct/25/23" },
      { title: "Beard Trim", time: "11:00 to 12:00 - Oct/26/23" },
      { title: "hair side Trim", time: "11:00 to 12:00 - Oct/26/23" },
      { title: "Hair Conditioner", time: "11:00 to 12:00 - Oct/26/23" },
    ],
    Ongoing: [
      { title: "Hair Coloring", time: "2:00 to 3:00 - Oct/27/23" },
    ],
    Completed: [
      { title: "Facial", time: "1:00 to 2:00 - Oct/20/23" },
    ],
    Delivered: [
      { title: "Massage Therapy", time: "3:00 to 4:00 - Oct/22/23" },
    ],
    History: [
      { title: "Nail Polish", time: "10:00 to 11:00 - Oct/15/23" },
    ],
  };
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], [])
  const service = useMemo(() => [15, 22, 31, 29, 18, 25, 26, 28, 34, 36], [])
  const products = useMemo(() => [8, 12, 25, 22, 14, 18, 19, 20, 21, 30], [])

  return (
    <main className="container-fluid py-4">
      {/* Header */}

      {/* KPI Cards */}
      <section className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="sales"
            title="Product Sales"
            value="$30,214.02"
            delta="+0.03%"
            deltaPositive
            subtitle="last week"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="service"
            title="Service Purchase"
            value="$30,214.02"
            delta="+0.03%"
            deltaPositive
            subtitle="last week"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="booking"
            title="Total Booking"
            value="$30,214.02"
            delta="+5.30%"
            deltaPositive
            subtitle="last week"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard
            icon="clients"
            title="Total Clients"
            value="45,561.2"
            delta="+1.30%"
            deltaPositive
            subtitle="last week"
          />
        </div>
      </section>

      {/* Charts */}
      <section className="row g-3 mb-4">
        <div className="col-12 col-lg-9">
          <div className="card glass border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Total Bookings</h5>
                <div className="btn-group btn-group-sm">
                  <span className="badge rounded-pill service ">
                    <em>•</em> Service
                  </span>
                  <span className="badge rounded-pill product me-2">
                    <em>•</em> Products
                  </span>
                  <div className="ms-2 dash-2">
                    <select name="" id="">
                      <option value="">Month</option>
                      <option value="">June</option>
                      <option value="">July</option>
                    </select>
                  </div>
                </div>

              </div>
              <LineChart
                labels={months}
                series={[
                  { name: "Service", data: service, color: "var(--brand-accent)" },
                  { name: "Products", data: products, color: "var(--brand-secondary)" },
                ]}
                height={360}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="card glass border-0 h-100 d-flex align-items-center justify-content-center">
            <div className="card-body w-100">
              <h5 className="card-title">Total Clients</h5>
              <DonutChart
                percent={64}
                strokeColor="var(--brand-primary)"
                trackColor="rgba(255,255,255,0.1)"
                size={220}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section>
        <h5 className="mb-3 text-white">My Orders</h5>

        {/* Bootstrap Nav Pills */}
        <ul className="nav nav-pills nav-pills-tabs gap-2 mb-3" role="tablist">
          {tabs.map((t) => (
            <li className="nav-item nav-item-tabs" key={t.id}>
              <button
                className={`nav-link ${activeTab === t.value ? "active" : ""
                  }`}
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

        {/* Tab Content */}
        <div className="tab-content">
          {tabs.map((t) => (
            <div
              key={t.id}
              className={`tab-pane fade ${activeTab === t.value ? "show active" : ""
                }`}
              role="tabpanel"
            >
              <div className="row g-3">
                {(orderData[t.value] || []).map((order, i) => (
                  <div key={i} className="col-12 col-sm-6 col-lg-3">
                    <OrderCard
                      title={order.title}
                      time={order.time}
                      image="/images/order-prof.png"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}