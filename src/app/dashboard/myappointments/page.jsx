"use client";
import { OrderCard } from "@/component/dashboard";
import { useState } from "react";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("New Appointments");
  const tabs = [
    { id: 1, value: "New Appointments", label: "New Appointments" },
    { id: 2, value: "Ongoing", label: "Ongoing" },
    { id: 3, value: "Completed", label: "Completed" },
    // { id: 4, value: "Delivered", label: "Delivered" },
    // { id: 5, value: "History", label: "History" },
  ];
  const orderData = {
    "New Appointments": [
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
    // Delivered: [
    //   { title: "Massage Therapy", time: "3:00 to 4:00 - Oct/22/23" },
    // ],
    // History: [
    //   { title: "Nail Polish", time: "10:00 to 11:00 - Oct/15/23" },
    // ],
  };
  return (
    <>
      <section className=" w-100">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h4 mb-0 allproducts_title">My Appointments</h1>
        </div>
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

        <div className="tab-content ">
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
    </>
  );
};

export default MyOrders;
