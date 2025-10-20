"use client";

import api from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import "../book-appointment/style.css";
import { UserProductCard } from "@/component/new/cards/product-card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { removeBooking } from "@/redux/features/booking/bookingSlice";
import { formatDate } from "@/lib";

function ContentWithRadio({
  label = "Date",
  content = "Wed, Sep 10 at 9:30 AM",
  showRadio = false,
  isSelected = false,
  onRadioChange = () => {},
  radioColor = "#cd8a1a",
  contentColor = "#939393",
  className = "",
}) {
  return (
    <div className={`flex justify-between items-start ${className}`}>
      {/* Left Content */}
      <div className={`flex-1`}>
        <p className="text-light mb-1 fw-light">{label}</p>
        <p style={{ color: contentColor }}>{content}</p>
      </div>

      {/* Optional Radio Button */}
      {showRadio && (
        <div className="ml-4 flex items-center">
          <input
            type="radio"
            checked={isSelected}
            onChange={onRadioChange}
            className="cursor-pointer"
            style={{
              accentColor: radioColor,
              width: "18px",
              height: "18px",
            }}
          />
        </div>
      )}
    </div>
  );
}

const UserBookingSummaryDetails = () => {
  const [getService, setGetService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("online");
  const state = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const getOneService = async () => {
    try {
      const { data } = await api.get(`/getServiceById?id=${state.serviceId}`);
      if (data.success) {
        setGetService(data.data);
      }
    } catch (error) {
      console.log("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneService();
  }, []);

  const handleBooking = async () => {
    try {
      const { data } = await api.post("/createBooking", {
        userId: "68f11c79f180d3689c7ca111",
        salonId: state.salonId,
        serviceId: state.serviceId,
        technicianId: state.technicianId,
        date: state.date,
        time: state.time,
        totalAmount: 235,
      });
      if (data.success) {
        console.log(data.data);
        dispatch(removeBooking());
      }
    } catch (error) {
      console.log("Error creating booking:", error);
    }
  };

  // Get the first image or use a fallback
  const serviceImage = getService?.images?.[0] || "/images/noimage.jpg";

  if (loading) {
    return (
      <div className="appointment-wrapper d-flex align-items-center justify-content-center w-100">
        <div className="appointment-card shadow-lg rounded-4">
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-wrapper d-flex align-items-center justify-content-center w-100">
      <div className="appointment-card  shadow-lg rounded-4 ">
        <div className="appointment-card-header d-flex align-items-center justify-content-between p-4">
          <Link
            href={"/user"}
            className="bg-transparent border-0 text-light h4"
          >
            <FaArrowAltCircleLeft />
          </Link>
          <h2 className="fw-bold m-0 text-white">Booking Summary</h2>
          <div></div>
        </div>
        <div className="pb-0 p-4">
          <UserProductCard
            image={serviceImage} // Use the safe image variable
            title={getService?.serviceName || "Service Name"}
            subTitle={getService?.description || "No description available"}
            className={"d-flex flex-row w-fit align-items-center w-50"}
            imgHeight={100}
          />
        </div>
        <div className="p-4">
          <div className="mb-4" style={{ borderBottom: "1px solid #F5F5F5" }}>
            <h4 className="text-light">Booking details</h4>
            <ContentWithRadio
              label="Date"
              content={`${formatDate(state.date)} at ${state.time}`}
            />
            <ContentWithRadio label="Stylist" content="Any stylist - 40 Mins" />
          </div>
          <div className="mb-4" style={{ borderBottom: "1px solid #F5F5F5" }}>
            <h4 className="text-light">Payment</h4>
            <ContentWithRadio
              label="Pay Online Now"
              content="Secure your booking instantly"
              showRadio={true}
              isSelected={selectedOption === "online"}
              onRadioChange={() => setSelectedOption("online")}
              className="d-flex flex-row justify-content-between align-items-center gap-2"
            />
            <ContentWithRadio
              label="Pay at Salon"
              content="Settle payment after your appointment"
              showRadio={true}
              isSelected={selectedOption === "offline"}
              onRadioChange={() => setSelectedOption("offline")}
              className="d-flex flex-row justify-content-between align-items-center gap-2"
            />
          </div>
          <div className="mb-4">
            <h4 className="text-light">Pricing Details</h4>
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
              <p style={{ color: "#939393" }} className="mb-0">
                {getService?.serviceName || "Service"}
              </p>
              <p style={{ color: "#939393" }} className="mb-0">
                ${Number(getService?.price)?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
              <p style={{ color: "#939393" }} className="mb-0">
                Discount
              </p>
              <p style={{ color: "#939393" }} className="mb-0">
                $0.00
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
              <p className="text-light mb-0 fs-5">Total</p>
              <p className="text-light mb-0 fs-5">
                ${Number(getService?.price)?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
          <div className="w-100 text-center">
            <button
              className="user-dashboard-box-btn px-5"
              onClick={handleBooking}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingSummaryDetails;