"use client";

import ImageRadio from "@/components/user/image-radio";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UserCheckout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(loginSchema), // Use Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // Dispatch the login thunk
    // const resultAction = await dispatch(signInAdmin(data));

    // Check if the login was successful (fulfilled)
    // if (signInAdmin.fulfilled.match(resultAction)) {
    // Success: Redirect to the dashboard
    //   router.push("/dashboard");
    // }
    // Error handling is managed by the error state
  };

  //   const isSubmitting = status === "loading";

  return (
    <div className="auth_container">
      <div className="row justify-content-between">
        <div className="col-sm-12 col-md-7">
          <h4 className="txt_color mb-4 display-6 text-start">
            Billing details
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3">
              <div className="col-md-6">
                {/* Full name */}
                <input
                  type="text"
                  placeholder="First name *"
                  {...register("firstName")} // Register as 'firstName'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* Last name */}
                <input
                  type="text"
                  placeholder="Last name *"
                  {...register("lastName")} // Register as 'lastName'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* Last name */}
                <input
                  type="text"
                  placeholder="Country / Region *"
                  {...register("country")} // Register as 'country'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* Last name */}
                <input
                  type="text"
                  placeholder="Town / City *"
                  {...register("email")} // Register as 'email'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-12">
                {/* Last name */}
                <input
                  type="text"
                  placeholder="Street address *"
                  {...register("address")} // Register as 'address'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* Pin Code */}
                <input
                  type="text"
                  placeholder="PIN Code *"
                  {...register("pinCode")} // Register as 'pinCode'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* State */}
                <input
                  type="text"
                  placeholder="State *"
                  {...register("state")} // Register as 'state'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* Pin Code */}
                <input
                  type="number"
                  placeholder="Phone"
                  {...register("phone")} // Register as 'phone'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-6">
                {/* State */}
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")} // Register as 'email'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
            )} */}
              </div>
              <div className="col-md-8 d-flex align-items-center">
                <ImageRadio
                  aria-label="Payment methods"
                  options={[
                    {
                      value: "visa",
                      label: "Visa",
                      imageSrc: "/images/visa.png",
                    },
                    {
                      value: "discover",
                      label: "Discover",
                      imageSrc: "/images/discover.png",
                    },
                    {
                      value: "mastercard",
                      label: "Mastercard",
                      imageSrc: "/images/mastercard.png",
                    },
                  ]}
                  defaultValue="visa"
                />
              </div>
              <div className="col-md-4 text-end">
                <button
                  type="submit"
                  className="user-dashboard-box-btn"
                  onClick={() => router.push("/user/new-card")}
                >
                  Add New Card
                </button>
              </div>
              <h4 className="txt_color mt-4 mb-4 display-6 text-start">
                Additional information
              </h4>
              <div className="col-12">
                <textarea
                  placeholder="Order notes (optional)"
                  rows={6}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-12 col-md-4 text-start">
          <h4 className="txt_color mb-4 display-6">Your order</h4>
          <div style={{ borderBottom: "1px solid #573D1A" }} className="mb-3">
            <h5 className="text-light">Product</h5>

            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#D99C15" }}>Jajot J2 - Feature Phon</p>
              <p style={{ color: "#D99C15" }}>$25</p>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid #573D1A" }} className=" mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#D99C15" }}>Subtotal</p>
              <p style={{ color: "#D99C15" }}>$25</p>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid #573D1A" }} className=" mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#D99C15" }}>Total</p>
              <p style={{ color: "#D99C15" }}>$100</p>
            </div>
          </div>
          <button
            className="user-dashboard-box-btn"
            onClick={() => router.push("/user/checkout")}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
