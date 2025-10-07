"use client"
import { useMemo, useState } from "react"
import StatCard from "@/components/dashboard/stat-card"
import LineChart from "@/components/dashboard/line-chart"
import DonutChart from "@/components/dashboard/donut-chart"
import OrderCard from "@/components/dashboard/order-card"

export default function Dashboard() {
  const [tab, setTab] = useState("new")

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
        <div className="col-12 col-lg-8">
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
        <div className="col-12 col-lg-4">
          <div className="card glass border-0 h-100 d-flex align-items-center justify-content-center">
            <div className="card-body w-100">
              <h5 className="card-title">Conversion</h5>
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
        <ul className="nav nav-pills gap-2 mb-3">
          {[
            { id: "new", label: "New Orders" },
            { id: "ongoing", label: "Ongoing" },
            { id: "completed", label: "Completed" },
            { id: "delivered", label: "Delivered" },
            { id: "history", label: "History" },
          ].map((t) => (
            <li className="nav-item" key={t.id}>
              <button
                className={`nav-link glass-pill ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="row g-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <OrderCard
                title="Hair extensions"
                time="9:00 to 10:00 - Oct/25/23"
                image="/images/order-prof.png"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}