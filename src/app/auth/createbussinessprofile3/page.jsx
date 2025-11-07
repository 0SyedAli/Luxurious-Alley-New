"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createBusinessProfile } from "@/redux/features/auth/authSlice";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Button from "@/components/MyButton";

const daysList = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

const CreateBusinessProfileStep3 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { adminId: reduxAdminId, status } = useSelector((state) => state.auth);
  const storedAdminId =
    typeof window !== "undefined" ? sessionStorage.getItem("s_u_adminId") : null;
  const adminId = reduxAdminId || storedAdminId;

  const [selectedDays, setSelectedDays] = useState(["Monday"]);
  const [documentFile, setDocumentFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // ✅ Redirect if not authenticated
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

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  // ✅ Validate file type for document (only PDF)
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      showErrorToast("Only PDF documents are allowed.");
      e.target.value = "";
      return;
    }
    setDocumentFile(file);
  };

  // ✅ Validate cover image (only image formats)
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
    ) {
      showErrorToast("Only image formats (jpg, png, webp) are allowed for cover.");
      e.target.value = "";
      return;
    }
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file)); // preview image
  };

  const onSubmit = async (data) => {
    if (!adminId) {
      showErrorToast("Session expired. Please log in again.");
      router.replace("/auth/signin");
      return;
    }

    if (!documentFile || !coverFile) {
      showErrorToast("Please upload both document and cover files.");
      return;
    }

    // ✅ Construct properly formatted workingDays array
    const formattedDays = daysList.map((dayObj) => ({
      day: dayObj.full,
      isActive: selectedDays.includes(dayObj.full),
      startTime: data.startTime,
      endTime: data.endTime,
    }));

    const formData = new FormData();
    formData.append("id", adminId);
    formData.append("workingDays", JSON.stringify(formattedDays));
    formData.append("bDocuments", documentFile); // ✅ must match backend multer field
    formData.append("bCover", coverFile); // ✅ must match backend multer field
    formData.append("path", "/dashboard");

    // Optional: Debug
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const resultAction = await dispatch(createBusinessProfile(formData));

    if (createBusinessProfile.fulfilled.match(resultAction)) {
      showSuccessToast("Business profile updated successfully!");
      router.push("/auth/signin");
    } else {
      showErrorToast(resultAction.payload || "Failed to update profile.");
    }
  };

  return (
    <div className="content align-self-start mw-500">
      <div className="auth_container">
        <div className="auth_head">
          <h2>Create a business profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* ✅ Working Days */}
          <div className="calender_container text-start">
            <label className="pb-1">Including These Days</label>
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

            {/* ✅ Time Range */}
            <label className="mt-2">Time Range</label>
            <div className="cs-form time_picker d-flex gap-3 align-items-center py-2">
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
            </div>

            {/* ✅ Upload Document */}
            <label className="mt-2">Upload Document (PDF)</label>
            <div className="cp_upload_img mt-2">
              <Image
                src="/images/cp_upload_cover.svg"
                style={{ width: "100%", height: "auto" }}
                width={400}
                height={150}
                alt="Upload Document"
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handleDocumentUpload}
              />
              {documentFile && (
                <p className="mt-1 text-success small">
                  📄 {documentFile.name}
                </p>
              )}
            </div>

            {/* ✅ Upload Business Cover */}
            <label className="mt-3">Upload the Business Cover (Image)</label>
            <div className="cp_upload_img mt-2 position-relative">
              <Image
                src={"/images/cp_upload_cover.svg"}
                style={{ width: "100%", height: "auto" }}
                width={400}
                height={150}
                alt="Upload Cover"
              />
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleCoverUpload}
              />
              {coverFile && (
                <p className="mt-1 text-success small">
                  🖼️ {coverFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="text-start mt-4">
            <Button isLoading={isSubmitting}>Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusinessProfileStep3;