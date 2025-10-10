// pages/signin/page.js
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema"; // Import the login schema
import { useDispatch, useSelector } from "react-redux";
import { signInAdmin } from "@/redux/features/auth/authSlice"; // Import the thunk
import { showErrorToast, showSuccessToast } from '@/lib/toast';

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // Dispatch the login thunk
    // const resultAction = await dispatch(signInAdmin(data));

        // Check if the login was successful (fulfilled)
        if (signInAdmin.fulfilled.match(resultAction)) {
            // Success: Redirect to the dashboard
            showSuccessToast("Login Successfull")

            router.push("/dashboard");
        } else {
            showErrorToast(resultAction.payload)
        }
        // Error handling is managed by the error state
    };

  const isSubmitting = status === "loading";

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container">
        <div className="auth_head">
          <h2>Getting Started</h2>
          <p>Elevate your salon with a seamless setup, styled for success.</p>
        </div>

        {/* Use handleSubmit on form submission */}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Email Input (Mapped to your "fake_user" placeholder) */}
          <input
            type="email"
            placeholder="Enter email address"
            {...register("email")} // Register as 'email'
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
          )}

          {/* Password Input (Mapped to your "fake_pass" placeholder) */}
          <input
            type="password"
            placeholder="Password"
            {...register("password")} // Register as 'password'
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <p className="text-danger mt-1">{errors.password.message}</p>
          )}

          {/* Global API Error Display */}
          {status === "failed" && error && (
            <div className="text-center text-danger mt-3">
              <p>{error}</p>
            </div>
          )}

          <div className="">
            {/* Note: Checkbox logic should be handled separately if needed, 
                           but not required for basic API call/validation. */}
                        <div className="remember form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        {/* Use a button of type submit */}
                        <button type="submit" className="theme-btn2" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign in'}
                        </button>
                        
                        <div className="register_link">
                            <h5>
                                Don't have an account?
                                <Link href="signup"> Sign Up</Link>
                            </h5>
                        </div>
                    </div>
                </form>

            <div className="register_link">
              <h5>
                Don't have an account?
                <Link href="/signup"> Sign Up</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
