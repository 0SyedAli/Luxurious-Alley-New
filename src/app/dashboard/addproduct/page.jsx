"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import { addProduct } from "@/validation/loginSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify"; // Optional: for notifications
import { fetchCategories } from "@/redux/features/category/categorySlice";
import Button from "@/component/MyButton";
const EditProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState([]); // store uploaded image(s)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.category);

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
  } = useForm({
    resolver: zodResolver(addProduct),
    defaultValues: {
      productName: "",
      category: "",
      modelName: "",
      brandName: "",
      enterAmount: "",
      stockQuantity: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");
      const salonId = sessionStorage.getItem("adminId");

      // Create FormData
      const formData = new FormData();
      formData.append("salonId", salonId);
      formData.append("productName", data.productName);
      formData.append("price", data.enterAmount);
      formData.append("description", data.description);
      formData.append("categoryId", data.category);
      formData.append("modelName", data.modelName);
      formData.append("brandName", data.brandName);
      formData.append("stock", data.stockQuantity);

      // Append each file
      images.forEach((imgObj) => {
        formData.append("images", imgObj.file); // the key name 'images' must match backend
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/createProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product created successfully!");
        reset();
        router.push("/dashboard/allproducts");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h4 className="h4 mb-4 allproducts_title">Add Product</h4>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 onChange={setImages} />
              </div>

              <div className="col-12">
                <RHFInput
                  name="productName"
                  placeholder="Product Name *"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <select
                  {...register("category")}
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

              <div className="col-12">
                <RHFInput
                  name="modelName"
                  placeholder="Model Name *"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <RHFInput
                  name="brandName"
                  placeholder="Brand Name *"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <RHFInput
                  name="enterAmount"
                  placeholder="Enter Amount *"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-12">
                <RHFInput
                  name="stockQuantity"
                  placeholder="Stock Quantity *"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>

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

              <div className="col-md-4 text-start">
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

export default EditProduct;
