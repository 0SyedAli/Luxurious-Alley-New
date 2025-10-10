// pages/signup/page.js
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/loginSchema"; // Import the schema
import { useDispatch, useSelector } from "react-redux";
import { signUpAdmin } from "@/redux/features/auth/authSlice"; // Import the thunk
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema), // Use Zod resolver
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // Destructure to ensure we only send required fields to API
    const { email, password } = data;

    // Dispatch the thunk
    const resultAction = await dispatch(signUpAdmin({ email, password }));

    // Check if the signup was successful (fulfilled)
    if (signUpAdmin.fulfilled.match(resultAction)) {
      // Success: Redirect to the next step (OTP)
      showSuccessToast("Otp send to email")
      router.push("/auth/otp");
    }
    else {
      showErrorToast("Signup Failed")
    }
    // Error handling is managed by the error state in useSelector
  };

  const isSubmitting = status === 'loading';

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container mw-600">
        <div className="auth_head">
          <h2>Enter Your Details Below</h2>
          <p>Let's make your hair attractive</p>
        </div>

        {/* Pass handleSubmit to the form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row gy-4">
            {/* Email Field */}
            <div className="col-12">
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")} // Register the field
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="col-12">
              <input
                type="password"
                placeholder="Password"
                {...register("password")} // Register the field
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
            </div>

            {/* Re-Enter Password Field */}
            <div className="col-12">
              <input
                type="password"
                placeholder="Re-Enter Password"
                {...register("confirmPassword")} // Register the field
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <p className="text-danger mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Global API Error Display */}
          {status === 'failed' && error && (
            <div className="text-center text-danger mt-3">
              <p>{error}</p>
            </div>
          )}

          <div className='text-center mt-4'>
            {/* Use a button of type submit to trigger form submission */}
            <button
              type="submit"
              className="theme-btn2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign up'}
            </button>

            <div className='register_link'>
              <h5>Already have an account? <Link href="signin">Sign In</Link></h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;