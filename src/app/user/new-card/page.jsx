"use client";

import ImageRadio from "@/component/new/image-radio";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddNewCard = () => {
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
    const resultAction = await dispatch(signInAdmin(data));

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
      <div className="row ">
        <div className="col-sm-12 col-md-8">
          <h4 className="txt_color mb-4 display-6 text-start">Add New Card</h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3">
              <div className="col-12 d-flex align-items-center">
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
              <div className="col-12">
                {/* Full name */}
                <input
                  type="text"
                  placeholder="Card Number"
                  {...register("cardNumber")} // Register as 'cardNumber'
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
                  placeholder="Cardholder Name"
                  {...register("cardholderName")} // Register as 'cardholderName'
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
                  placeholder="Valid Thuv"
                  {...register("validThuv")} // Register as 'validThuv'
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
                  placeholder="CVV"
                  {...register("cvv")} // Register as 'CVV'
                  // className={errors.email ? "input-error" : ""}
                />
                {/* {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
              )} */}
              </div>
              <div className="col-md-12 text-start">
                <button type="submit" className="user-dashboard-box-btn">
                  Save Card
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCard;
