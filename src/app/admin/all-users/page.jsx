"use client";
import { useEffect, useState } from "react";
import UsersTable from "@/component/new/tables/users-table";
import TextBox from "@/component/new/text-box";
import api from "@/lib/api";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/getAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // api response = res.data.data

      const formatted = res.data.data.map((u) => ({
        name: u.username || "N/A",
        email: u.email || "N/A",
        joinDate: u.createdAt?.split("T")[0] || "N/A",
        status: u.isDeleted ? "Inactive" : "Active",
        totalSpent: u.totalSpent ?? 0,
      }));

      setUsers(formatted);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TextBox
        title={"All Users"}
        description={"Complete list of registered users"}
      />
      {loading ? (
        <div className="text-center text-light py-4">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Loading Users...</p>
        </div>
      ) : (
        <UsersTable data={users} rowsPerPage={10} />
      )}
    </div>
  );
};

export default AdminAllUsers;
