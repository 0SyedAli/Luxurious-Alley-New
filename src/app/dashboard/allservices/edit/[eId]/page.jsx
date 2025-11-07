"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCategories } from "@/redux/features/category/categorySlice";
import api from "@/lib/api";

const EditService = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // ✅ get service ID from URL
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [stylists, setStylists] = useState([]);
  const { categories, status } = useSelector((state) => state.category);
  const salonId = sessionStorage.getItem("adminId");
  const fetchCalled = useRef(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Fetch stylists for dropdown
  useEffect(() => {
    const fetchStylist = async () => {
      try {
        const res = await api.get(`/getAllStylistsBySalonId?salonId=${salonId}`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setStylists(res.data.data);
        } else {
          toast.error("No technicians found for this salon.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching technicians.");
      }
    };

    if (salonId && !fetchCalled.current) {
      fetchCalled.current = true;
      fetchStylist();
    }
  }, [salonId]);

  // ✅ Fetch Service Data by ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getServiceById?id=${id}`
        );

        if (res.data.success) {
          const data = res.data.data;
          setServiceData(data);

          reset({
            serviceName: data.serviceName || "",
            category: data.categoryId?._id || "",
            description: data.description || "",
            price: data.price || "",
            technicianId:
              data.technicianId?.[0]?._id ||
              data.technicianId?.[0] ||
              "", // handle array or single ID
          });

          // ✅ Handle images
          if (data.images?.length > 0) {
            const formattedImages = data.images.map((img) => ({
              url: `${process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "")}/${img}`,
              file: null,
            }));
            setImages(formattedImages);
          }
        } else {
          toast.error("Failed to load service details.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching service details.");
      }
    };

    if (id) fetchService();
  }, [id, reset]);

  // ✅ Submit (Update Service)
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("serviceName", data.serviceName);
      formData.append("categoryId", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("technicianId", JSON.stringify([data.technicianId]));

      // ✅ Add only new images
      const newImages = images.filter((img) => img.file);
      newImages.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateService`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Service updated successfully!");
        router.push("/dashboard/allservices");
        setImages([]);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  if (!serviceData) {
    return (
      <p className="text-center text-light mt-5">Loading service details...</p>
    );
  }

  return (
    <div className="auth_container edit_auth_container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h4 className="h4 mb-4 allproducts_title">Edit Service</h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              {/* ✅ Image uploader */}
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 initialImages={images} onChange={setImages} />
              </div>

              {/* ✅ Service name */}
              <div className="col-12">
                <label htmlFor="">Service Name *</label>
                <RHFInput
                  name="serviceName"
                  placeholder="Service Name *"
                  register={register}
                  errors={errors}
                />
              </div>

              {/* ✅ Category Select */}
              <div className="col-12">
                <label htmlFor="">Select Category</label>
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
                <label htmlFor="">Price *</label>
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
                <label htmlFor="">Select Technician *</label>
                <select
                  {...register("technicianId", {
                    required: "Select a technician",
                  })}
                  className="form-select"
                  defaultValue=""
                >
                  <option value="">Select Technician</option>
                  {stylists.map((stylist) => (
                    <option key={stylist._id} value={stylist._id}>
                      {stylist.fullName || stylist.name || "Unnamed"}
                    </option>
                  ))}
                </select>
                {errors.technicianId && (
                  <p className="text-danger small">
                    {errors.technicianId.message}
                  </p>
                )}
              </div>

              {/* ✅ Description */}
              <div className="col-12">
                <label>Enter Description</label>
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
              <div className="col-md-4 text-start">
                <button
                  type="submit"
                  className="user-dashboard-box-btn"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Service"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;
