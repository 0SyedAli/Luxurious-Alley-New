// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import Button from "@/component/MyButton";
// import api from "@/lib/api";
// import { showErrorToast, showSuccessToast } from "@/lib/toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signupAdminSchema } from "@/validation/loginSchema";
// import { useRouter } from "next/navigation";

// const Signup = () => {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm({
//     resolver: zodResolver(signupAdminSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);

//     try {
//       const response = await api.post("/SignupWithEmailOrPhoneandPassword", {
//         username: data.username,
//         email: data.email,
//         password: data.password
//       });

//       if (response?.data?.success) {
//         showSuccessToast(response?.data?.message || "Account created successfully");

//         // SAVE EMAIL + TOKEN for OTP page
//         if (response?.data?.token) {
//           sessionStorage.setItem("token", response.data.token);

//           router.push("/user-auth/otp"); // redirect to OTP page
//         }

//         reset();
//       } else {
//         showErrorToast(response?.data?.message || "Something went wrong");
//       }
//     } catch (err) {
//       showErrorToast(err.response?.data?.message || "Server Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="content align-self-center mw-600">
//       <div className="auth_container mw-600">
//         <div className="auth_head">
//           <h2>Enter Your Details Below</h2>
//           <p>Let's make your hair attractive</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//           {/* hidden dummy fields to prevent autofill */}
//           <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
//           <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

//           <div className="row gy-4">
//             <div className="col-12">
//               <input
//                 type="email"
//                 placeholder="Type email address"
//                 autoComplete="off"
//                 {...register("email")}
//                 className={errors.email ? "input-error" : ""}
//               />
//               {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
//             </div>

//             <div className="col-12">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 autoComplete="new-password"
//                 {...register("password")}
//                 className={errors.password ? "input-error" : ""}
//               />
//               {errors.password && (
//                 <p className="text-danger mt-1">{errors.password.message}</p>
//               )}
//             </div>

//             <div className="col-12">
//               <input
//                 type="password"
//                 placeholder="Re-Enter Password"
//                 autoComplete="new-password"
//                 {...register("confirmPassword")}
//                 className={errors.confirmPassword ? "input-error" : ""}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-danger mt-1">{errors.confirmPassword.message}</p>
//               )}
//             </div>
//           </div>

//           <div className="text-start mt-4">
//             <Button isLoading={loading}>Sign up</Button>
//             <div className="register_link">
//               <h5>
//                 Already have an account? <Link href="/admin-auth/signin">Sign In</Link>
//               </h5>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "@/component/MyButton";
import api from "@/lib/api";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUserSchema } from "@/validation/loginSchema";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupUserSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("/SignupWithEmailOrPhoneandPassword", {
        username: data.username,  // ✅ send username to API
        email: data.email,
        password: data.password,
      });

      if (response?.data?.success) {
        showSuccessToast(response?.data?.message || "Account created successfully");

        if (response?.data?.token) {
          sessionStorage.setItem("token", response.data.token);
          router.push("/user-auth/otp");
        }

        reset();
      } else {
        showErrorToast(response?.data?.message || "Something went wrong");
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Server Error");
    }

    setLoading(false);
  };

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
          <input type="text" style={{ display: "none" }} />
          <input type="password" style={{ display: "none" }} />

          <div className="row gy-4">

            {/* ✅ USERNAME FIELD ADDED */}
            <div className="col-12">
              <input
                type="text"
                placeholder="Type username"
                autoComplete="off"
                {...register("username")}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <p className="text-danger mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="col-12">
              <input
                type="email"
                placeholder="Type email address"
                autoComplete="off"
                {...register("email")}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
            </div>

            <div className="col-12">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register("password")}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="col-12">
              <input
                type="password"
                placeholder="Re-enter password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-danger mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="text-start mt-4">
            <Button isLoading={loading}>Sign up</Button>
            <div className="register_link">
              <h5>
                Already have an account? <Link href="/user-auth/signin">Sign In</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
