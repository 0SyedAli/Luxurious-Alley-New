"use client";
import { useEffect, useState } from "react";
import AnalyticsTable from "@/component/new/tables/analytics-table";
import TextBox from "@/component/new/text-box";
import api from "@/lib/api";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const res = await api.get("/getMonthlyPerformance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Map vendors from API to table format
      const formatted = res.data.vendors.map((v) => ({
        name: v.salonName || "Unknown Vendor",
        totalSale: `$${v.totalRevenue ?? 0}`,
        ordersReceived: v.totalBookings ?? 0,
        averageOrderValue:
          v.totalBookings > 0
            ? (v.totalRevenue / v.totalBookings).toFixed(2)
            : "0.00",
        performance:
          v.totalBookings === 0
            ? "No Data"
            : v.totalRevenue / v.totalBookings > 150
            ? "Excellent"
            : v.totalRevenue / v.totalBookings > 100
            ? "Good"
            : "Average",
      }));

      setAnalytics(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TextBox
        title={"Vendor Performance"}
        description={"Monthly performance of all vendors"}
      />

      {loading ? (
        <div className="text-center text-light py-4">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Loading analytics...</p>
        </div>
      ) : (
        <AnalyticsTable data={analytics} rowsPerPage={10} />
      )}
    </div>
  );
};

export default AdminAnalytics;
