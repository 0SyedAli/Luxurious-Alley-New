"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCategories } from "@/redux/features/category/categorySlice";
import api from "@/lib/api";
import Button from "@/component/MyButton";
const AddService = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["Monday"]);
  const [stylists, setStylists] = useState([]);

  const { categories, status } = useSelector((state) => state.category);
  const token = sessionStorage.getItem("authToken");
  const salonId = sessionStorage.getItem("adminId");
  const fetchCalled = useRef(false); // 👈 new ref to track first call

  // Fetch categories
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (salonId && !fetchCalled.current) {
      fetchCalled.current = true; // prevent second call
      fetchStylist(salonId);
    }
  }, [salonId]);

  const fetchStylist = async (salonId) => {
    try {
      setLoading(true);
      const res = await api.get(`/getAllStylistsBySalonId?salonId=${salonId}`);
      if (res.data.success && Array.isArray(res.data.data)) {
        setStylists(res.data.data);
      } else {
        toast.error("No technicians found for this salon.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching technicians.");
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      serviceName: "",
      category: "",
      price: "",
      description: "",
      technicianId: "",
    },
  });

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const onSubmit = async (data) => {
    if (!salonId || !token) {
      toast.error("Session expired. Please log in again.");
      router.push("/auth/signin");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("salonId", salonId);
      formData.append("serviceName", data.serviceName);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("technicianId", JSON.stringify([data.technicianId]));
      formData.append("categoryId", data.category);

      images.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/createService`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Service created successfully!");
        reset();
        setImages([]);
        router.push("/dashboard/allservices");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create service.");
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
          <h4 className="h4 mb-4 allproducts_title">Add Service</h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              {/* ✅ Image Upload */}
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 onChange={setImages} />
              </div>

              {/* ✅ Service Name */}
              <div className="col-12">
                <RHFInput
                  name="serviceName"
                  placeholder="Service Name *"
                  register={register}
                  errors={errors}
                />
              </div>

              {/* ✅ Category Dropdown */}
              <div className="col-12">
                <select
                  {...register("category", { required: "Select a category" })}
                  className="form-select"
                  defaultValue=""
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-danger small">{errors.category.message}</p>
                )}
              </div>

              {/* ✅ Price */}
              <div className="col-12">
                <RHFInput
                  name="price"
                  placeholder="Enter Price *"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>

              {/* ✅ Technician Dropdown */}
              <div className="col-12">
                <select
                  {...register("technicianId", { required: "Select a stylist" })} // ✅ correct name
                  className="form-select"
                  defaultValue=""
                >
                  <option value="">Select stylist</option>
                  {stylists.map((stylist) => (
                    <option key={stylist._id} value={stylist._id}>
                      {stylist.fullName || stylist.name || "Unnamed stylist"}
                    </option>
                  ))}
                </select>
                {errors.technicianId && (
                  <p className="text-danger small">{errors.technicianId.message}</p>
                )}
              </div>

              {/* ✅ Day Selector */}
              {/* <div className="col-10">
                <label className="mt-2">Including These Days</label>
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
              </div> */}

              {/* ✅ Time Range */}
              {/* <label className="mt-2">Time Range</label>
              <div className="cs-form time_picker d-flex gap-3 align-items-center ">
                <input
                  type="time"
                  {...register("startTime", { required: true })}
                  className="classInput"
                />
                <span>To</span>
                <input
                  type="time"
                  {...register("endTime", { required: true })}
                  className="classInput"
                />
              </div> */}

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
                {/* <button
                  type="submit"
                  className="user-dashboard-box-btn"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Now"}
                </button> */}
                 <Button isLoading={loading}>Add Now</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
