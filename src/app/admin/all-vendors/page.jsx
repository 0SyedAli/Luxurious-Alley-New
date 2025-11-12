"use client";
import { useEffect, useState } from "react";
import VendorsTable from "@/component/new/tables/vendors-table";
import TextBox from "@/component/new/text-box";
import api from "@/lib/api";

const AdminAllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);

      const res = await api.get("/getAllVendors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // res.data.data is array of vendors
      const formatted = res.data.data.map((v) => ({
        name: v.ownerName || "Unknown User",
        email: v.email || "N/A",
        categories:
          v.categoryId && v.categoryId.length > 0
            ? v.categoryId.map((c) => c.name || "N/A").join(", ")
            : "N/A",
        joinDate: v.createdAt?.split("T")[0] || "N/A",
        status: v.isDeleted ? "Inactive" : "Active",
        // totalSpent: v.totalSpent ?? 0,
      }));

      setVendors(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TextBox
        title={"All Vendors"}
        description={"Complete list of vendor partners"}
      />

      {loading ? (
        <div className="text-center text-light py-4">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Loading Vendors...</p>
        </div>
      ) : (
        <VendorsTable data={vendors} rowsPerPage={10} />
      )}
    </div>
  );
};

export default AdminAllVendors;
