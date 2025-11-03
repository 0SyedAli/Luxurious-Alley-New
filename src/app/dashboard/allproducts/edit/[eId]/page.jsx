"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCategories } from "@/redux/features/category/categorySlice";
import api from "@/lib/api";

const EditProduct = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.category);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Fetch categories once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // ✅ Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getProductById?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          const product = res.data.data;

          const prefill = {
            productName: product.productName || "",
            categoryId: product.categoryId._id || "",
            modelName: product.modelName || "",
            brandName: product.brandName || "",
            enterAmount: product.price || "",
            stockQuantity: product.stock || "",
            description: product.description || "",
          };

          setOriginalData(prefill);
          reset({
            productName: prefill.productName,
            category: prefill.categoryId,
            modelName: prefill.modelName,
            brandName: prefill.brandName,
            enterAmount: prefill.enterAmount,
            stockQuantity: prefill.stockQuantity,
            description: prefill.description,
          });

          if (product.images?.length > 0) {
            const formattedImages = product.images.map((img) => ({
              url: `${process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "")}/${img}`,
              file: null,
            }));
            setImages(formattedImages);
          }
        } else {
          toast.error("Failed to load product details.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching product details.");
      }
    };

    if (id) fetchProduct();
  }, [id, reset]);

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      // Compare fields with originalData
      const changedFields = {};
      for (const key in data) {
        const originalKey =
          key === "category" ? "categoryId" : key === "enterAmount" ? "enterAmount" : key;
        if (data[key] !== originalData[originalKey] && data[key] !== undefined) {
          changedFields[key] = data[key];
        }
      }

      // Create FormData
      const formData = new FormData();
      formData.append("id", id);

      Object.entries(changedFields).forEach(([key, value]) => {
        if (key === "enterAmount") formData.append("price", value);
        else if (key === "category") formData.append("categoryId", value);
        else if (key === "stockQuantity") formData.append("stock", value);
        else formData.append(key, value);
      });

      // Append only new images
      const newImages = images.filter((img) => img.file);
      newImages.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      // Skip update if no changes
      if (
        Object.keys(changedFields).length === 0 &&
        newImages.length === 0
      ) {
        toast.info("No changes detected.");
        setLoading(false);
        return;
      }

      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/allproducts");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_container edit_auth_container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h4 className="h4 mb-4 allproducts_title">Edit Product</h4>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 initialImages={images} onChange={setImages} />
              </div>

              <div className="col-12">
                <label htmlFor="">Product Name</label>
                <RHFInput
                  name="productName"
                  placeholder="Product Name"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <label htmlFor="">Select Category</label>
                <select {...register("category")} className="form-select">
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

              <div className="col-12">
                <label htmlFor="">Model Name</label>
                <RHFInput
                  name="modelName"
                  placeholder="Model Name"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <label htmlFor="">Brand Name</label>
                <RHFInput
                  name="brandName"
                  placeholder="Brand Name"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <label htmlFor="">Enter Amount</label>
                <RHFInput
                  name="enterAmount"
                  placeholder="Enter Amount"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <label htmlFor="">Stock Quantity</label>
                <RHFInput
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <label htmlFor="">Enter Description</label>
                <RHFTextarea
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  rows={6}
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-md-4 text-start">
                <button
                  type="submit"
                  className="user-dashboard-box-btn"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
