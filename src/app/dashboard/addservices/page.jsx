"use client";

import RHFInput from "@/component/forms/RHFInput";
import RHFSelect from "@/component/forms/RHFSelect";
import RHFTextarea from "@/component/forms/RHFTextarea";
import ImageUploader2 from "@/component/ImageUploader2";
import ImageRadio from "@/component/user/image-radio";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddService = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState(["Monday"]);
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

  const daysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];
   const catOptions = [
    { value: "hair", label: "Hair" },
    { value: "skin", label: "Skin" },
  ];
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };
  return (
    <div className="auth_container">
      <div className="row ">
        <div className="col-sm-12 col-md-6">
          <h4 className="txt_color mb-4 display-6 text-start">Add Service</h4>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row g-3 calender_container text-start">
              <div className="col-12 d-flex align-items-center">
                {/* <ImageRadio
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
                /> */}

                <ImageUploader2 />
              </div>
              <div className="col-12">
                <RHFInput
                  name="serviceName"
                  placeholder="Service Name *"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-12">
                <RHFSelect
                  name="category"
                  label="Select Category *"
                  options={catOptions}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-12">
                {/* Last name */}
                <RHFInput
                  name="serviceName"
                  placeholder="Service Name *"
                  register={register}
                  errors={errors}
                />
                {/* {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
              )} */}
              </div>
              <div className="col-10">
                <label className="mt-2">Including These Days</label>
                <div className="d-flex my-2 justify-content-between flex-wrap" style={{ gap: 10 }}>
                  {daysList.map(({ short, full }) => (
                    <div className="calender_item" key={full}>
                      <input
                        type="checkbox"
                        id={`checkbox-${short}`}
                        checked={selectedDays.includes(full)}
                        onChange={() => toggleDay(full)}
                      />
                      <label htmlFor={`checkbox-${short}`}>{short}</label>
                      <div className="calender_spot"></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* ✅ Time Range */}
              <label className="mt-2">Time Range</label>
              <div className="cs-form time_picker d-flex gap-3 align-items-center ">
                <input
                  type="time"
                  {...register("startTime", { required: true })}
                  className="classInput"
                />
                <span>To</span>
                <input
                  type="time"
                  {...register("endTime", { required: true })}
                  className="classInput"
                />
              </div>
              <div className="col-12">
                {/* Last name */}
                <RHFTextarea
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  rows={6}
                  register={register}
                  errors={errors}
                />
                {/* {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
              )} */}
              </div>
              <div className="col-md-4 text-start">
                <button type="button" className="user-dashboard-box-btn">
                  Add Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
