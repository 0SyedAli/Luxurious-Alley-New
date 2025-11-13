// pages/signin/page.js
"use client"
import Link from 'next/link'
import { useRouter } from "next/navigation"; // For redirection
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema"; // Import the login schema
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import Button from '@/component/MyButton';
import { signInUser, signUpUser } from '@/redux/features/userAuth/userAuthSlice';

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
        const resultAction = await dispatch(signInUser(data));

        // Check if the login was successful (fulfilled)
        if (signInUser.fulfilled.match(resultAction)) {
            // Success: Redirect to the dashboard
            showSuccessToast("Login successful")

            router.push("/user");
        } else {
            showErrorToast(resultAction.payload)
        }
        // Error handling is managed by the error state
    };

    const isSubmitting = status === 'loading';

    return (
        <div className="content align-self-center mw-600">
            <div className='auth_container'>
                <div className='auth_head'>
                    <h2>Getting Started</h2>
                    <p>Elevate your salon with a seamless setup, styled for success.</p>
                </div>

                {/* Use handleSubmit on form submission */}
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    {/* hidden dummy inputs — fool Chrome autofill */}
                    <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
                    <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

                    {/* Email Input */}
                    <input
                        type="text" // 👈 use "text" instead of "email"
                        placeholder="Enter email address"
                        {...register("email")}
                        name="email"
                        autoComplete="new-email" // 👈 uncommon value so Chrome won’t match it
                        inputMode="email" // 👈 still shows email keyboard on mobile
                        className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        name="password"
                        autoComplete="new-password" // 👈 use "new-password"
                        className={errors.password ? "input-error" : ""}
                    />
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}

                    {/* Global API Error Display */}
                    {/* {status === 'failed' && error && (
                        <div className="text-center text-danger mt-3">
                            <p>{error}</p>
                        </div>
                    )} */}

                    <div className="">
                        {/* Note: Checkbox logic should be handled separately if needed, 
                           but not required for basic API call/validation. */}
                        <div className="remember form-check">
                            <input
                                type="checkbox"
                                className="form-check-input  mt-0"
                                id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div className="text-start">
                        {/* Use a button of type submit */}
                        {/* <button type="submit" className="theme-btn2" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign in'}
                        </button> */}
                        <Button isLoading={isSubmitting}>Sign in</Button>

                        <div className="register_link">
                            <h5>
                                Don't have an account?
                                <Link href="/user-auth/signup"> Sign Up</Link>
                            </h5>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signin;