"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/component/new/vendor-profile-header";
import api from "@/lib/api";
import Button from "@/component/MyButton";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
const UserEditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const daysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const salonId = sessionStorage.getItem("adminId")
  const [formData, setFormData] = useState({
    id: salonId,
    fullName: "",
    country: "",
    city: "",
    address: "",
    pinCode: "",
    state: "",
    phoneNumber: "",
    bName: "",
    ownerName: "",
    bCountry: "",
    bPinCode: "",
    workingDays: [],
    bDetails: "",
  });

  // ✅ Toggle days
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // ✅ Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Update profile
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const workingDaysData = daysList.map((d) => ({
        day: d.full,
        isActive: selectedDays.includes(d.full),
        startTime,
        endTime,
      }));

      // Remove empty fields
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      // ✅ Stringify workingDays if API expects JSON string
      const finalData = {
        ...cleanedData,
        workingDays: JSON.stringify(workingDaysData),
      };

      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateAdminProfile`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        showSuccessToast("Profile updated successfully!");
        // router.push("/user/new-card");
      } else {
        showErrorToast(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      showErrorToast("Something went wrong while updating the profile.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-100">
      <div className="mb-5">
        <ProfileHeader
          defaultCoverSrc="/images/profile_cover.png"
          defaultAvatarSrc="/images/profile_demo.jpg"
          name="Sarah J."
          location="47 Hennepard Street, San Diego (92139)"
          statusLabel="Active"
          profileChange={true}
        />
      </div>

      <div className="auth_container pt-4">
        <div className="row justify-content-between">
          <div className="col-sm-12 col-md-7">
            <h4 className="txt_color mb-4 text-start">Edit Profile</h4>
            <form autoComplete="off">
              <div className="row g-3">
                {/* Personal Info */}
                <div className="col-md-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="PIN Code"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Business Info */}
                <h4 className="txt_color mt-4 mb-2 text-start">Business Profile</h4>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="bName"
                    placeholder="Business Name"
                    value={formData.bName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    value={formData.ownerName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="bCountry"
                    placeholder="Business Country"
                    value={formData.bCountry}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="bPinCode"
                    placeholder="Business PIN Code"
                    value={formData.bPinCode}
                    onChange={handleChange}
                  />
                </div>

                {/* ✅ Working Days Section */}
                <div className="calender_container text-start col-12 col-xxl-8">
                  <label className="pb-1">Select Working Days</label>
                  <div className="d-flex my-2 justify-content-between flex-wrap" style={{ gap: 10 }}>
                    {daysList.map(({ short, full }) => (
                      <div className="calender_item" key={full}>
                        <input
                          type="checkbox"
                          id={`checkbox-${short}`}
                          checked={selectedDays.includes(full)}
                          onChange={() => toggleDay(full)}
                        />
                        <label htmlFor={`checkbox-${short}`}>{short}</label>

                        <div className="calender_spot"></div>
                      </div>
                    ))}
                  </div>

                  <label className="mt-2">Time Range</label>
                  <div className="d-flex gap-3 align-items-center py-2">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <span className="text-white">to</span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <textarea
                    name="bDetails"
                    placeholder="Business Details"
                    value={formData.bDetails}
                    onChange={handleChange}
                    rows={5}
                  ></textarea>
                </div>

                <div className="col-md-12 text-start">
                  {/* <button
                    type="button"
                    className="user-dashboard-box-btn px-5"
                    disabled={loading}
                    onClick={handleUpdate}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button> */}
                  <Button isLoading={loading} onClick={handleUpdate}>Sign in</Button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-12 col-md-4 text-start">
            <h4 className="txt_color mb-4">Set up your location</h4>
            <input
              type="text"
              name="location"
              placeholder="Add Location"
              // value={formData.location}
              // onChange={handleChange}
              className="mb-3"
            />
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18..."
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
                className="new-york-iframe"
              ></iframe>
              {/* <Map setLocationData={setLocationData} /> */}
              {/* <div className="mt-3">
                {error && <div className="text-danger mb-2">{error}</div>}
                <AuthBtn
                  title={isLoading ? "Saving..." : "Confirm"}
                  type="button"
                  disabled={isLoading}
                  onClick={handleNext}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
