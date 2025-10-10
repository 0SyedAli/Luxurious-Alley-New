"use client"
import RHFInput from '@/components/forms/RHFInput'
import Button from '@/components/MyButton'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { createBusinessProfile } from '@/redux/features/auth/authSlice'
import { createBussinessSchema } from '@/validation/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
const defaultProfileImage = "/images/cp_upload_img.png";
const createBussinessProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const storedAdminId =
    typeof window !== "undefined" ? sessionStorage.getItem("adminId") : null;
  const { status, error, adminId: reduxAdminId } = useSelector(
    (state) => state.auth
  );
  const adminId = reduxAdminId || storedAdminId;

  useEffect(() => {
    if (
      (status === "authenticated" || status === "succeeded" || status === "failed") &&
      !adminId
    ) {
      router.replace("/auth/signin");
    }
  }, [adminId, status, router]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setFileError("Only image files are allowed.");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB.");
      return;
    }

    setFileError("");
    setFile(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBussinessSchema),
    defaultValues: {
      bname: "",
      ownerName: "",
      country: "",
      bAddress: "",
      state: "",
      pinCode: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    if (!adminId) {
      showErrorToast("Session expired or missing ID. Please log in again.");
      router.replace("/auth/signin");
      return;
    }

    if (!file) {
      setFileError("Please upload a profile image before submitting.");
      return;
    }

    // ✅ Create FormData object
    const formData = new FormData();
    formData.append("id", adminId);
    formData.append("bName", data.bname);
    formData.append("ownerName", data.ownerName);
    formData.append("bCountry", data.country);
    formData.append("bState", data.state);
    formData.append("bPinCode", data.pinCode);
    formData.append("path", "/auth/createbussinessprofile2");
    formData.append("bAddress", data.bAddress);
    formData.append("bPhoneNumber", data.phone);
    formData.append("bImage", file); // <-- attach file directly

    const resultAction = await dispatch(createBusinessProfile(formData));

    if (createBusinessProfile.fulfilled.match(resultAction)) {
      showSuccessToast("Business profile has been created successfully!");
      router.push("createbussinessprofile2");
    } else {
      showErrorToast(resultAction.payload  || "Failed to create profile.");
    }
  };

  if (!adminId && (status === "awaitingOTP" || status === "loading")) {
    return (
      <div className="content align-self-center mw-800 text-center p-5">
        <h2>Loading Profile Setup...</h2>
      </div>
    );
  }
  return (
    <div className="content align-self-center mw-800">
      <div className='auth_container'>
        <div className='auth_head'>
          <h2>Create a business profile</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row gy-4">
            <div className="col-12">
              <div className="upload_user_image text-start">
                <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                  <Image
                    src={previewImage}
                    width={118}
                    height={118}
                    alt="Profile Preview"
                  />
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {fileError && <p className="text-danger mt-2">{fileError}</p>}
                <div className="img_plus">
                  <FaPlus />
                </div>
              </div>
            </div>
            <div className="col-6">
              <RHFInput
                name="bname"
                placeholder="Business Name *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <RHFInput
                name="ownerName"
                placeholder="Owner Name *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <RHFInput
                name="country"
                placeholder="Country / Region *"
                register={register}
                errors={errors}
              />

            </div>
            <div className="col-6">
              <RHFInput
                name="pinCode"
                type="number"
                placeholder="PIN Code *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-12">
              <RHFInput
                name="bAddress"
                placeholder="Street address *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <RHFInput
                name="state"
                placeholder="State *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <RHFInput
                name="phone"
                type="tel"
                placeholder="Phone *"
                register={register}
                errors={errors}
              />
            </div>
            <div className="text-start">
              <Button isLoading={isSubmitting}>Next</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default createBussinessProfile