"use client";
import TextBox from "@/component/new/text-box";

const AdminSettings = () => {
  return (
    <div className="w-100">
      <TextBox
        title={"Settings"}
        description={"Manage your account security and authentication"}
      />
      <form className="admin-setting-form p-3 mt-4">
        <h5 className="text-light">Change Password</h5>
        <div className="admin-setting-form-input mb-3">
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" />
        </div>
        <div className="admin-setting-form-input mb-3">
          <label htmlFor="currentPassword">New Password</label>
          <input type="password" id="currentPassword" />
        </div>
        <div className="admin-setting-form-input mb-3">
          <label htmlFor="currentPassword">Confirm New Password</label>
          <input type="password" id="currentPassword" />
        </div>
        <button className="admin-setting-form-btn">Update Password</button>
      </form>
    </div>
  );
};

export default AdminSettings;
