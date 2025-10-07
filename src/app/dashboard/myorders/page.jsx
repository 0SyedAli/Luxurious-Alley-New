"use client"
import { OrderCard } from "@/components/dashboard"
import { useState } from "react"

const MyOrders = () => {
    const [tab, setTab] = useState("new")
    return (
        <>
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
                                className={`nav-link  glass-pill-gradient ${tab === t.id ? "active" : ""}`}
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
        </>
    )
}

export default MyOrders