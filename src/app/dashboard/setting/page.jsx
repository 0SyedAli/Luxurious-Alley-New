"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/component/new/vendor-profile-header";
import api from "@/lib/api";
import Button from "@/component/MyButton";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import axios from "axios";

const UserEditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(false);
  const [coverUrl, setCoverUrl] = useState(false);

  // DAYS LIST
  const daysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  const salonId = sessionStorage.getItem("adminId");

  const [workingDays, setWorkingDays] = useState({
    Monday: { isActive: false, openingTime: "", closeingTime: "" },
    Tuesday: { isActive: false, openingTime: "", closeingTime: "" },
    Wednesday: { isActive: false, openingTime: "", closeingTime: "" },
    Thursday: { isActive: false, openingTime: "", closeingTime: "" },
    Friday: { isActive: false, openingTime: "", closeingTime: "" },
    Saturday: { isActive: false, openingTime: "", closeingTime: "" },
    Sunday: { isActive: false, openingTime: "", closeingTime: "" },
  });

  // Form State
  const [formData, setFormData] = useState({
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
    bDetails: "",
  });

  // Store initial fetch values to detect changes
  const [initialData, setInitialData] = useState({});

  // Avatar / Cover File
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch Profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!salonId) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getAdminById?salonId=${salonId}`
        );

        const result = await res.json();
        if (!result.success) return;

        const data = result.data.salon;
        setAvatarUrl(data.bImage ? data.bImage : "/images/profile_demo.jpg");
        setCoverUrl(data.bCover ? data.bCover : "/images/profile_cover.png");
        const loadedData = {
          fullName: data.fullName || "",
          country: data.country || "",
          city: data.city || "",
          address: data.bAddress || "",
          pinCode: data.pinCode || "",
          state: data.state || "",
          phoneNumber: data.phoneNumber || "",
          bName: data.bName || "",
          ownerName: data.ownerName || "",
          bCountry: data.bCountry || "",
          bPinCode: data.bPinCode || "",
          bDetails: data.bDetails || "",
        };

        setFormData(loadedData);
        setInitialData(loadedData);

        // Working Days Load
        const formattedDays = {};
        data.workingDays.forEach((d) => {
          formattedDays[d.day] = {
            isActive: d.isActive,
            openingTime: d.startTime || "",
            closeingTime: d.endTime || "",
          };
        });

        setWorkingDays((prev) => ({ ...prev, ...formattedDays }));
      } catch (err) {
        console.error("Fetch Error:", err);
        showErrorToast("Failed to load profile data.");
      }
    };

    fetchData();
  }, []);

  // Update Profile
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      // Prepare Changed Fields
      const changedData = {};

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== initialData[key]) {
          changedData[key] = formData[key];
        }
      });

      // Working days structure
      const workingDaysData = daysList.map((d) => ({
        day: d.full,
        isActive: workingDays[d.full].isActive,
        startTime: workingDays[d.full].openingTime,
        endTime: workingDays[d.full].closeingTime,
      }));

      changedData.workingDays = JSON.stringify(workingDaysData);

      // Prepare MULTIPART FormData
      const formBody = new FormData();

      Object.keys(changedData).forEach((key) => {
        formBody.append(key, changedData[key]);
      });

      // Add avatar + cover
      formBody.append("id", salonId);
      if (avatarFile) formBody.append("bImage", avatarFile);
      if (coverFile) formBody.append("bCover", coverFile);

      // API CALL
      // const res = await api.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/updateAdminProfile`,
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateAdminProfile`,
        formBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        showSuccessToast("Profile updated successfully!");
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
        {/* <ProfileHeader
          defaultCoverSrc="/images/profile_cover.png"
          defaultAvatarSrc="/images/profile_demo.jpg"
          name="Sarah J."
          location="47 Hennepard Street, San Diego (92139)"
          statusLabel="Active"
          profileChange={true}
          onAvatarChange={(file) => setAvatarFile(file)}
          onCoverChange={(file) => setCoverFile(file)}
        /> */}
        <ProfileHeader
          defaultCoverSrc={coverUrl && coverUrl}
          defaultAvatarSrc={avatarUrl && avatarUrl}
          name="Sarah J."
          location="47 Hennepard Street, San Diego (92139)"
          statusLabel="Active"
          profileChange={true}
          onAvatarChange={(file) => setAvatarFile(file)}
          onCoverChange={(file) => setCoverFile(file)}
        />
      </div>

      <div className="auth_container pt-4">
        <div className="row justify-content-between gy-4 gx-0 gx-lg-4 w-100">
          <div className="col-sm-12 col-lg-8 col-xl-7">
            <h4 className="txt_color mb-4 text-start">Edit Profile</h4>

            <form autoComplete="off" className="settings_form">
              <div className="row g-3">
                {/* Inputs */}
                {[
                  "fullName",
                  "country",
                  "city",
                  "state",
                  "address",
                  "pinCode",
                  "phoneNumber",
                  "bName",
                  "ownerName",
                  "bCountry",
                  "bPinCode",
                ].map((field) => (
                  <div className="col-md-6" key={field}>
                    <label>{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* Working Days */}
                <div className="calender_container text-start col-12 col-xxl-8 mt-4">
                  <label className="pb-2">Select Working Days</label>

                  {daysList.map(({ short, full }) => (
                    <div
                      key={full}
                      className="d-flex align-items-center mb-3 gap-3 flex-wrap"
                    >
                      {/* Toggle Checkbox */}
                      <div className="calender_item">
                        <input
                          type="checkbox"
                          checked={workingDays[full]?.isActive}
                          onChange={() =>
                            setWorkingDays((prev) => ({
                              ...prev,
                              [full]: {
                                ...prev[full],
                                isActive: !prev[full].isActive,
                              },
                            }))
                          }
                        />
                        <label>{short}</label>
                        <div className="calender_spot"></div>
                      </div>

                      {/* Time Inputs */}
                      <div className="d-flex gap-2 align-items-center">
                        <input
                          type="time"
                          disabled={!workingDays[full]?.isActive}
                          value={workingDays[full]?.openingTime}
                          onChange={(e) =>
                            setWorkingDays((prev) => ({
                              ...prev,
                              [full]: {
                                ...prev[full],
                                openingTime: e.target.value,
                              },
                            }))
                          }
                        />

                        <span className="text-white">to</span>

                        <input
                          type="time"
                          disabled={!workingDays[full]?.isActive}
                          value={workingDays[full]?.closeingTime}
                          onChange={(e) =>
                            setWorkingDays((prev) => ({
                              ...prev,
                              [full]: {
                                ...prev[full],
                                closeingTime: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Details */}
                <div className="col-12">
                  <label>Business Details</label>
                  <textarea
                    name="bDetails"
                    value={formData.bDetails}
                    onChange={handleChange}
                    rows={5}
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="col-12 text-start">
                  <Button isLoading={loading} onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-12 col-lg-4 text-start">
            <h4 className="txt_color mb-4">Set up your location</h4>
            <input type="text" placeholder="Add Location" className="mb-3" />
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18..."
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
