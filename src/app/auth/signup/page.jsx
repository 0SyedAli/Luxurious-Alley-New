"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { signUpAdmin } from "@/redux/features/auth/authSlice";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Button from "@/component/MyButton";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const resultAction = await dispatch(signUpAdmin({ email, password }));

    if (signUpAdmin.fulfilled.match(resultAction)) {
      showSuccessToast("Otp sent to email");
      router.push("/auth/otp");
    } else {
      showErrorToast("Signup Failed");
    }
  };

  const isSubmitting = status === "loading";

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container mw-600">
        <div className="logo d-block d-lg-none">
          <Image src={"/images/logo.png"} className="object-fit-contain" alt="Profile" width={200} height={100} />
        </div>
        <div className="auth_head">
          <h2>Enter Your Details Below</h2>
          <p>Let's make your hair attractive</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* hidden dummy fields to fully prevent autofill */}
          <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
          <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

          <div className="row gy-4">
            <div className="col-12">
              <input
                type="email"
                placeholder="Type email address"
                {...register("email")}
                className={errors.email ? "input-error" : ""}
                autoComplete="off"
                name="email"
              />
              {errors.email && (
                <p className="text-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="col-12">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={errors.password ? "input-error" : ""}
                autoComplete="new-password"
                name="password"
              />
              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="col-12">
              <input
                type="password"
                placeholder="Re-Enter Password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "input-error" : ""}
                autoComplete="new-password"
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="text-danger mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-start mt-4">
            {/* <button type="submit" className="theme-btn2" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign up"}
            </button> */}
            <Button isLoading={isSubmitting}>Sign up</Button>
            <div className="register_link">
              <h5>
                Already have an account? <Link href="signin">Sign In</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
