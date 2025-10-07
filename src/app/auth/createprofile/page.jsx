// pages/createProfile/page.js
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfileSchema } from "@/validation/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "@/redux/features/auth/authSlice";

const CreateProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "Select Gender", // Set initial value for validation error display
            country: "",
            state: "",
            pinCode: "",
            streetAddress: "",
            phone: "",
            profilePicture: null,
        },
    });

    const onSubmit = async (data) => {
        // Prepare data for the API (excluding the file input itself for JSON submission)
        const { profilePicture, ...profileData } = data;
        
        // Dispatch the createProfile thunk
        const resultAction = await dispatch(createProfile(profileData));

        if (createProfile.fulfilled.match(resultAction)) {
            // Success: Redirect to the dashboard home
            router.push("/dashboard");
            
            // NOTE ON FILE UPLOAD: 
            // If the user selected a file, you would dispatch a separate
            // thunk here to upload the image using FormData.
            /*
            if (profilePicture && profilePicture[0]) {
                dispatch(uploadProfilePicture(profilePicture[0]));
            }
            */
        }
    };

    const isSubmitting = status === 'loading';

    return (
        <div className="content align-self-center mw-800">
            <div className='auth_container'>
                <div className='auth_head'>
                    <h2>Create a business profile</h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="row gy-4">
                        <div className="col-12">
                            <div className="cp_upload_img">
                                <Image src="/images/cp_upload_img.png" width={110} height={110} alt='Profile' />
                                {/* Register file input - use an empty array if no file is selected */}
                                <input 
                                    type="file" 
                                    {...register("profilePicture")} 
                                />
                                <label>Add profile picture</label>
                            </div>
                        </div>

                        {/* First Name (Mapped from your "Username") */}
                        <div className="col-6">
                            <input
                                type="text"
                                placeholder="First Name *"
                                {...register("firstName")}
                            />
                            {errors.firstName && <p className="text-danger mt-1">{errors.firstName.message}</p>}
                        </div>

                        {/* Last Name (Mapped from your "Password" placeholder) */}
                        <div className="col-6">
                            <input
                                type="text"
                                placeholder="Last Name *"
                                {...register("lastName")}
                            />
                            {errors.lastName && <p className="text-danger mt-1">{errors.lastName.message}</p>}
                        </div>

                        {/* Gender Select */}
                        <div className="col-6">
                            <select {...register("gender")} className={errors.gender ? 'select-error' : ''}>
                                <option value="Select Gender">Select Gender *</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className="text-danger mt-1">{errors.gender.message}</p>}
                        </div>

                        {/* Country / Region */}
                        <div className="col-6">
                            <input
                                type="text"
                                placeholder="Country / Region *"
                                {...register("country")}
                            />
                            {errors.country && <p className="text-danger mt-1">{errors.country.message}</p>}
                        </div>

                        {/* Street address */}
                        <div className="col-12">
                            <input
                                type="text"
                                placeholder="Street address *"
                                {...register("streetAddress")}
                            />
                            {errors.streetAddress && <p className="text-danger mt-1">{errors.streetAddress.message}</p>}
                        </div>

                        {/* PIN Code */}
                        <div className="col-6">
                            <input
                                type="text"
                                placeholder="PIN Code *"
                                {...register("pinCode")}
                            />
                            {errors.pinCode && <p className="text-danger mt-1">{errors.pinCode.message}</p>}
                        </div>

                        {/* State */}
                        <div className="col-6">
                            <input
                                type="text"
                                placeholder="State *"
                                {...register("state")}
                            />
                            {errors.state && <p className="text-danger mt-1">{errors.state.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="col-6">
                            <input
                                type="tel"
                                placeholder="Phone *"
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-danger mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Global API Error Display */}
                        {status === 'failed' && error && (
                            <div className="col-12 text-center text-danger mt-3">
                                <p>{error}</p>
                            </div>
                        )}
                        
                        <div className="col-12">
                            <div className="remember form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>
                        
                        <div className="col-12 text-center">
                            <button type="submit" className="theme-btn2" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating Profile...' : 'Save and Continue'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile;