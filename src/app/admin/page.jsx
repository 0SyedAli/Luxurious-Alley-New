"use client";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { TfiStatsUp } from "react-icons/tfi";
import StatsCard from "@/component/new/cards/stats-card";
import OrdersTable from "@/component/new/tables/orders-table";
import api from "@/lib/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeVendors: 0,
    currentMonthRevenue: 0,
    lastMonthRevenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.get("/getStats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get("/getAllOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // Map API data to table format
        const formattedOrders = res.data.data.map((order, idx) => ({
          id: `#${order?._id.slice(0, 4)}`,
          image:
            order.userId?.image ||
            "/images/chat_avatar.png", // fallback if no image
          name: order.product?.[0]?.productId?.productName || "Product",
          dateTime: `${order.date} - ${order.product?.[0]?.quantity || 1
            } item(s)`,
          price: order.subTotal || 0,
          status: order.status,
        }));

        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <div className="admin-dashboard w-100">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title="Total Users"
            count={loadingStats ? "..." : stats.totalUsers}
            rating="+12% from last month"
            icon={<FiUsers />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title="Active Vendors"
            count={loadingStats ? "..." : stats.activeVendors}
            rating="+5% from last month"
            icon={<LuShoppingBag />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title="Current Month Revenue"
            count={loadingStats ? "..." : `$${stats.currentMonthRevenue}`}
            rating="+18% from current month"
            icon={<FiCalendar />}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-4">
          <StatsCard
            title="Last Month Revenue"
            count={loadingStats ? "..." : `$${stats.lastMonthRevenue}`}
            rating="+23% from last month"
            icon={<TfiStatsUp />}
          />
        </div>
      </div>

      {loadingOrders ? (
        <div className="text-center text-light py-4">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : (
        <OrdersTable data={orders} rowsPerPage={10} />
      )}
    </div>
  );
};

export default AdminDashboard;
