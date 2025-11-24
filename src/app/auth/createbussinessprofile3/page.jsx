"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createBusinessProfile } from "@/redux/features/auth/authSlice";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Button from "@/components/MyButton";

const CreateBusinessProfileStep3 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { adminId: reduxAdminId, status } = useSelector((state) => state.auth);

  const storedAdminId =
    typeof window !== "undefined" ? sessionStorage.getItem("s_u_adminId") : null;

  const adminId = reduxAdminId || storedAdminId;

  const [documentFile, setDocumentFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [error, setError] = useState("");

  // 👉 Per-day working times
  const [workingDays, setWorkingDays] = useState({
    Monday: { isActive: false, openingTime: "", closeingTime: "" },
    Tuesday: { isActive: false, openingTime: "", closeingTime: "" },
    Wednesday: { isActive: false, openingTime: "", closeingTime: "" },
    Thursday: { isActive: false, openingTime: "", closeingTime: "" },
    Friday: { isActive: false, openingTime: "", closeingTime: "" },
    Saturday: { isActive: false, openingTime: "", closeingTime: "" },
    Sunday: { isActive: false, openingTime: "", closeingTime: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Redirect if not logged in
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

  // Toggle active day
  const handleActiveToggle = (day) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isActive: !prev[day].isActive,
      },
    }));
  };

  // Change per-day time
  const handleTimeChange = (day, field, value) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // Validate Document
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      showErrorToast("Only PDF documents are allowed.");
      e.target.value = "";
      return;
    }
    setDocumentFile(file);
  };

  // Validate Cover Image
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
    ) {
      showErrorToast("Only image formats (jpg, png, webp) are allowed.");
      e.target.value = "";
      return;
    }
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const onSubmit = async () => {
    if (!adminId) {
      showErrorToast("Session expired. Please log in again.");
      router.replace("/auth/signin");
      return;
    }

    if (!documentFile || !coverFile) {
      showErrorToast("Please upload both document and cover.");
      return;
    }

    // Validate working days
    const activeDays = Object.keys(workingDays).filter(
      (d) => workingDays[d].isActive
    );

    if (activeDays.length === 0) {
      setError("Please select at least one working day.");
      return;
    }

    for (const day of activeDays) {
      const { openingTime, closeingTime } = workingDays[day];
      if (!openingTime || !closeingTime) {
        setError(`Please add start & end time for ${day}.`);
        return;
      }
    }

    setError("");

    // Convert working days for API
    const formattedWorkingDays = Object.keys(workingDays).map((day) => ({
      day,
      isActive: workingDays[day].isActive,
      startTime: workingDays[day].openingTime,
      endTime: workingDays[day].closeingTime,
    }));

    const formData = new FormData();
    formData.append("id", adminId);
    formData.append("workingDays", JSON.stringify(formattedWorkingDays));
    formData.append("bDocuments", documentFile);
    formData.append("bCover", coverFile);
    formData.append("path", "/dashboard");

    const result = await dispatch(createBusinessProfile(formData));

    if (createBusinessProfile.fulfilled.match(result)) {
      showSuccessToast("Business profile updated!");
      router.push("/auth/signin");
    } else {
      showErrorToast(result.payload || "Failed to update profile.");
    }
  };

  return (
    <div className="content align-self-start maxw-500">
      <div className="auth_container">
        <div className="logo d-block d-lg-none">
          <Image src={"/images/logo.png"} width={200} height={100} alt="Logo" />
        </div>

        <div className="auth_head">
          <h2>Create a business profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="calender_container text-start">
            {/* Working Days Table */}
            <div className="wd_table wd_table_cp3 table-responsive">
              <label className="mb-2">Working days & timing</label>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    {/* <th>Day</th> */}
                    <th>Active</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(workingDays).map((day) => (
                    <tr key={day}>
                      {/* <td>{day}</td> */}

                      <td>
                        {/* <input
                          type="checkbox"
                          checked={workingDays[day].isActive}
                          onChange={() => handleActiveToggle(day)}
                        /> */}
                        <div className="calender_item">
                          <input
                            type="checkbox"
                            id={`checkbox-${day}`}
                            checked={workingDays[day].isActive || false}
                            onChange={() => handleActiveToggle(day)}
                          />
                          <label htmlFor={`checkbox-${day}`}>{day.slice(0, 3)}</label>
                          <div className="calender_spot"></div>
                        </div>
                      </td>

                      <td>
                        <input
                          type="time"
                          className="form-control"
                          disabled={!workingDays[day].isActive}
                          value={workingDays[day].openingTime}
                          onChange={(e) =>
                            handleTimeChange(day, "openingTime", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="time"
                          className="form-control"
                          disabled={!workingDays[day].isActive}
                          value={workingDays[day].closeingTime}
                          onChange={(e) =>
                            handleTimeChange(day, "closeingTime", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            {/* Upload Document */}
            <label className="mt-2">Upload Document (PDF)</label>
            <div className="cp_upload_img mt-2">
              <Image src="/images/cp_upload_cover.svg" width={400} height={150} alt="" />
              <input type="file" accept="application/pdf" onChange={handleDocumentUpload} />
              {documentFile && <p className="mt-1 text-success small">📄 {documentFile.name}</p>}
            </div>

            {/* Upload Cover */}
            <label className="mt-3">Upload Business Cover (Image)</label>
            <div className="cp_upload_img mt-2">
              <Image src="/images/cp_upload_cover.svg" width={400} height={150} alt="" />
              <input type="file" accept="image/*" onChange={handleCoverUpload} />
              {coverFile && <p className="mt-1 text-success small">🖼️ {coverFile.name}</p>}
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
