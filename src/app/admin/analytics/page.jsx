"use client";
import AnalyticsTable from "@/component/new/tables/analytics-table";
import VendorsTable from "@/component/new/tables/vendors-table";
import TextBox from "@/component/new/text-box";

const analytics = [
  {
    name: "Westside Spa",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Excellent",
  },
  {
    name: "Central Plaza",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Excellent",
  },
  {
    name: "Downtown Salon",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Good",
  },
  {
    name: "Northside Salon",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Good",
  },
  {
    name: "Uptown Beauty",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Average",
  },
  {
    name: "East End Studio",
    totalSale: "32,100",
    ordersReceived: "187",
    averageOrderValue: "171.66",
    Performance: "Average",
  },
];

const AdminAnalytics = () => {
  return (
    <div className="w-100">
      <TextBox
        title={"All Vendors"}
        description={"Complete list of vendor partners"}
      />
      <AnalyticsTable data={analytics} rowsPerPage={10} />
    </div>
  );
};
export default AdminAnalytics;
