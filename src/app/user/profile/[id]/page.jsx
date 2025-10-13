"use client";

import { useRouter } from "next/navigation";
import ProfileHeader from "@/component/new/profile-header";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const UserEditProfile = () => {
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
  return (
    <div className="w-100">
      <div className="mb-5">
        <ProfileHeader
          defaultCoverSrc="/images/profile_cover.png"
          defaultAvatarSrc="/images/profile_demo.jpg"
          name="Sarah J."
          location="47 Hennepard Street, San Diego (92139)"
          statusLabel="Active"
        />
      </div>
      <div className="auth_container">
        <div className="row justify-content-between">
          <div className="col-sm-12 col-md-7">
            <h4 className="txt_color mb-4 text-start">Edit Profile</h4>
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

                <div className="col-md-12 text-start">
                  <button
                    type="submit"
                    className="user-dashboard-box-btn px-5"
                    onClick={() => router.push("/user/new-card")}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-12 col-md-4 text-start">
            <h4 className="txt_color mb-4">Set up your location</h4>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New York Location Map"
                className="new-york-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
