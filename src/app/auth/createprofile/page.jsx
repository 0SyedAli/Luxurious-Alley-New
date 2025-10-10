"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "@/redux/features/auth/authSlice";
import Button from "@/components/MyButton";
import RHFInput from "@/components/forms/RHFInput";
import RHFSelect from "@/components/forms/RHFSelect";
import { createProfileSchema } from "@/validation/loginSchema";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { FaPlus } from "react-icons/fa6";

const defaultProfileImage = "/images/cp_upload_img.png";

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

const CreateProfile = () => {
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
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            fullName: "",
            gender: "",
            country: "",
            city: "",
            state: "",
            pinCode: "",
            streetAddress: "",
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
        formData.append("fullName", data.fullName);
        formData.append("gender", data.gender);
        formData.append("country", data.country);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("pinCode", data.pinCode);
        formData.append("path", "/auth/createbussinessprofile");
        // formData.append("streetAddress", data.streetAddress);
        formData.append("phoneNumber", data.phone);
        formData.append("image", file); // <-- attach file directly

        const resultAction = await dispatch(createProfile(formData));

        if (createProfile.fulfilled.match(resultAction)) {
            showSuccessToast("Profile has been created successfully!");
            router.push("createbussinessprofile");
        } else {
            showErrorToast(resultAction.payload);
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
            <div className="auth_container">
                <div className="auth_head">
                    <h2>Create a business profile</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="row gy-4">
                        {/* Profile Picture Upload */}
                        <div className="col-12 text-center">
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
                                name="fullName"
                                placeholder="Full Name *"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div className="col-6">
                            <RHFSelect
                                name="gender"
                                label="Select Gender *"
                                options={genderOptions}
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6">
                            <RHFInput name="city" placeholder="City *" register={register} errors={errors} />
                        </div>

                        <div className="col-6">
                            <RHFInput
                                name="country"
                                placeholder="Country / Region *"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div className="col-12">
                            <RHFInput
                                name="streetAddress"
                                placeholder="Street address *"
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

                        {status === "failed" && error && (
                            <div className="col-12 text-center text-danger mt-3">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="col-12">
                            <div className="remember form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="agreementCheck"
                                />
                                <label className="form-check-label" htmlFor="agreementCheck">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>

                        <div className="col-12 text-center">
                            <Button isLoading={isSubmitting}>Save and Continue</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
