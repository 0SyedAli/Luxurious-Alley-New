"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/lib/api";
import Button from "@/component/MyButton";

const AddStylist = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const token = sessionStorage.getItem("authToken");
  const salonId = sessionStorage.getItem("adminId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      designation: "",
      description: "",
    },
  });

  // ✅ Toggle working days
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  // ✅ Format time to AM/PM (12-hour)
  const formatTo12Hour = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${String(adjustedHour).padStart(2, "0")}:${minute} ${suffix}`;
  };

  // ✅ Handle Submit
  const onSubmit = async (data) => {
    if (!salonId || !token) {
      toast.error("Session expired. Please log in again.");
      router.push("/auth/signin");
      return;
    }

    try {
      setLoading(true);

      const cleanedPhone = data.phoneNumber.replace(/\D/g, "");

      // ✅ Include all 7 days, mark only selected ones active
      const daysList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const workingDays = daysList.map((day) => ({
        day,
        isActive: selectedDays.includes(day),
        startTime: startTime || "",
        endTime: endTime || "",
      }));

      const formData = new FormData();
      formData.append("salonId", salonId);
      formData.append("email", data.email);
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", cleanedPhone);
      formData.append("description", data.description);
      formData.append("designation", data.designation);
      formData.append("workingDays", JSON.stringify(workingDays));

      if (images.length > 0) {
        formData.append("image", images[0].file);
      }

      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/createStylists`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Stylist added successfully!");
        reset();
        setImages([]);
        setEndTime("");
        setStartTime("");
      } else {
        toast.error(res.data.message || "Failed to add stylist.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding stylist.");
    } finally {
      setLoading(false);
    }
  };


  const daysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  return (
    <div className="auth_container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h4 className="h4 mb-4 allproducts_title">Add Stylist</h4>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              {/* ✅ Image Upload */}
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 onChange={setImages} />
              </div>

              {/* ✅ Full Name */}
              <div className="col-12">
                <RHFInput
                  name="fullName"
                  placeholder="Full Name *"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* ✅ Email */}
              <div className="col-12">
                <RHFInput
                  name="email"
                  placeholder="Email *"
                  type="email"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* ✅ Phone Number */}
              <div className="col-12">
                <RHFInput
                  name="phoneNumber"
                  placeholder="Phone Number *"
                  type="tel"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* ✅ Designation */}
              <div className="col-12">
                <RHFInput
                  name="designation"
                  placeholder="Designation *"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* ✅ Working Days */}
              <div className="col-10">
                <label className="mt-2">Working Days</label>
                <div
                  className="d-flex my-2 justify-content-between flex-wrap"
                  style={{ gap: 10 }}
                >
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
              </div>

              {/* ✅ Time Range */}
              <div className="col-12 d-flex align-items-center gap-3">
                <div>
                  <label className="fw-semibold mb-2">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div>
                  <label className="fw-semibold mb-2">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {/* ✅ Description */}
              <div className="col-12">
                <RHFTextarea
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  rows={6}
                  register={register}
                  errors={errors}
                />
              </div>

              {/* ✅ Submit Button */}
              <div className="col-md-12 text-start">
                <Button isLoading={loading}>Add Now</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStylist;
