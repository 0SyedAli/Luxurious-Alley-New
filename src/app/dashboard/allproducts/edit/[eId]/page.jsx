"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFSelect from "@/component/forms/RHFSelect";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import ImageRadio from "@/component/user/image-radio";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState(["Monday"]);
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(loginSchema), // Use Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // Dispatch the login thunk
    const resultAction = await dispatch(signInAdmin(data));

    // Check if the login was successful (fulfilled)
    // if (signInAdmin.fulfilled.match(resultAction)) {
    // Success: Redirect to the dashboard
    //   router.push("/dashboard");
    // }
    // Error handling is managed by the error state
  };

  //   const isSubmitting = status === "loading";

  const daysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];
  const catOptions = [
    { value: "hair", label: "Hair" },
    { value: "skin", label: "Skin" },
  ];
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };
  return (
    <div className="auth_container">
      <div className="row ">
        <div className="col-sm-12 col-md-6">
          <h4 className="txt_color mb-4 display-6 text-start">Edit Product</h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              <div className="col-12 d-flex align-items-center">
                <ImageUploader2 />
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
                <RHFSelect
                  name="category"
                  label="Select Category *"
                  options={catOptions}
                  register={register}
                  errors={errors}
                />
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
                {/* Last name */}
                <RHFTextarea
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  rows={6}
                  register={register}
                  errors={errors}
                />
                {/* {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
              )} */}
              </div>
              <div className="col-md-4 text-start">
                <button type="button" className="user-dashboard-box-btn">
                  Add Now
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
