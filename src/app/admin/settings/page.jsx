"use client";
import { useState } from "react";
import TextBox from "@/component/new/text-box";
import api from "@/lib/api";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const adminId = admin?._id; // directly get id

    if (!adminId) return showErrorToast("ID not found. Please login again.");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return showErrorToast("Please fill all fields before submit");
    }

    if (newPassword !== confirmNewPassword) {
      return showErrorToast("New passwords do not match");
    }

    setLoading(true);

    try {
      const response = await api.post("/resetPasswordSuperAdmin", {
        id: adminId,
        password: currentPassword,
        newPassword,
        type: "Change",
      });

      if (response?.data?.success) {
        showSuccessToast("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        showErrorToast(response?.data?.message || "Something went wrong");
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.message || "Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="w-100">
      <TextBox
        title={"Settings"}
        description={"Manage your account security and authentication"}
      />

      <form className="admin-setting-form p-3 mt-4" onSubmit={handleChangePassword}>
        <h5 className="text-light">Change Password</h5>

        <div className="admin-setting-form-input mb-3">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="admin-setting-form-input mb-3">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="admin-setting-form-input mb-3">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button className="admin-setting-form-btn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
