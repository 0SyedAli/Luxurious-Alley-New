// app/auth/createbussinessprofile2/page.js
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

const categories = [
  { value: "6850659a42574e73b13e4090", label: "Blow drys" },
  { value: "685afb96a44654ec3a8f3d74", label: "Hair Color" },
  { value: "6850659a42574e73b13e9999", label: "Beard Trim" },
];

const CreateBusinessProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const storedAdminId =
    typeof window !== "undefined" ? sessionStorage.getItem("adminId") : null;

  const { status, adminId: reduxAdminId } = useSelector((state) => state.auth);
  const adminId = reduxAdminId || storedAdminId;

  const [selectedCategories, setSelectedCategories] = useState([]); // ✅ state for multi-select

  useEffect(() => {
    if (
      (status === "authenticated" ||
        status === "succeeded" ||
        status === "failed") &&
      !adminId
    ) {
      router.replace("/auth/signin");
    }
  }, [adminId, status, router]);

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
    <div className="content align-self-center mw-800">
      <div className="auth_container">
        <div className="auth_head">
          <h2>Create a business profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-group mt-3 avail_serv position-relative">
            <MultiSelect
              options={categories}
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

          {/* Multi-Select for Services */}


          <div className="text-start mt-3">
            <Button isLoading={isSubmitting}>Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusinessProfile;
