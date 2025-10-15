"use client";
import { FiUsers } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { TfiStatsUp } from "react-icons/tfi";
import StatsCard from "@/component/new/cards/stats-card";
import OrdersTable from "@/component/new/tables/orders-table";

const orders = [
  {
    id: 1,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Accept",
  },
  {
    id: 2,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Reject",
  },
  {
    id: 3,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Accept",
  },
  {
    id: 4,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Reject",
  },
  {
    id: 5,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Accept",
  },
  {
    id: 6,
    image: "/images/chat_avatar.png",
    name: "Hair extensions",
    dateTime: "9:00 to 10:00 - Oct/25/23",
    price: "120",
    status: "Accept",
  },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard w-100">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title={"Total Users"}
            count={"2,847"}
            rating={"+12% from last month"}
            icon={<FiUsers />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title={"Active Vendors"}
            count={"156"}
            rating={"+5% from last month"}
            icon={<LuShoppingBag />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title={"Total Orders"}
            count={"18,293"}
            rating={"+18% from last month"}
            icon={<FiCalendar />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title={"Revenue"}
            count={"$142,580"}
            rating={"+23% from last month"}
            icon={<TfiStatsUp />}
          />
        </div>
      </div>
      <OrdersTable data={orders} rowsPerPage={10}/>
    </div>
  );
};

export default AdminDashboard;
