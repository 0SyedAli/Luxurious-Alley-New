"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import RHFTextarea from "@/components/forms/RHFTextarea";
import Button from "@/components/MyButton";
import { createBusinessProfile } from "@/redux/features/auth/authSlice";
import { createBussiness2Schema } from "@/validation/loginSchema";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import MultiSelect from "react-multi-select-component";
import { fetchCategories } from "@/redux/features/category/categorySlice";
import Image from "next/image";

const CreateBusinessProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ Category state
  const { categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );

  // ✅ Auth state
  const { status: authStatus, adminId: reduxAdminId } = useSelector(
    (state) => state.auth
  );

  const storedAdminId =
    typeof window !== "undefined" ? sessionStorage.getItem("s_u_adminId") : null;

  const adminId = reduxAdminId || storedAdminId;

  // ✅ Fetch categories only once
  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryStatus]);

  // ✅ Protect route
  useEffect(() => {
    if (
      (authStatus === "authenticated" ||
        authStatus === "succeeded" ||
        authStatus === "failed") &&
      !adminId
    ) {
      router.replace("/auth/signin");
    }
  }, [adminId, authStatus, router]);

  // ✅ Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBussiness2Schema),
    defaultValues: {
      businessDetails: "",
    },
  });

  // ✅ MultiSelect state
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ✅ Convert categories to MultiSelect format
  const formattedCategories = categories.map((cat) => ({
    label: cat.categoryName,
    value: cat._id,
  }));

  // ✅ Form submission
  const onSubmit = async (data) => {
    if (!adminId) {
      showErrorToast("Session expired or missing ID. Please log in again.");
      router.replace("/auth/signin");
      return;
    }

    if (selectedCategories.length === 0) {
      showErrorToast("Please select at least one service.");
      return;
    }

    const categoryIds = selectedCategories.map((item) => item.value);

    const formData = new FormData();
    formData.append("id", adminId);
    formData.append("bDetails", data.businessDetails);
    formData.append("categoryId", JSON.stringify(categoryIds));
    formData.append("path", "/auth/createbussinessprofile3");

    const resultAction = await dispatch(createBusinessProfile(formData));

    if (createBusinessProfile.fulfilled.match(resultAction)) {
      showSuccessToast("Business profile created successfully!");
      router.push("/auth/createbussinessprofile3");
    } else {
      showErrorToast(resultAction.payload || "Failed to create profile.");
    }
  };

  return (
    <div className="content  mw-500 align-self-center">
      <div className="auth_container">
        <div className="logo d-block d-lg-none">
          <Image src={"/images/logo.png"} className="object-fit-contain" alt="Profile" width={200} height={100} />
        </div>
        <div className="auth_head">
          <h2>Create a business profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-group mt-3 avail_serv position-relative">
            <MultiSelect
              options={formattedCategories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              labelledBy="Select Services"
              className="multi-select-custom"
            />
          </div>

          <RHFTextarea
            name="businessDetails"
            label="Business Details"
            placeholder="Enter business description"
            rows={6}
            register={register}
            errors={errors}
          />

          <div className="text-start mt-3">
            <Button isLoading={isSubmitting}>Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusinessProfile;
