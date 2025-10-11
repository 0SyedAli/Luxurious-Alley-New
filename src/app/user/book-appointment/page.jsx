"use client";
import { useState } from "react";
import Slider from "react-slick";
import "./style.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";

const BookAppointment = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  // Generate next 7 days dynamically
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const sliderSettings = {
    infinite: false,
    slidesToShow: 5,
    swipeToSlide: true,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="appointment-wrapper d-flex align-items-center justify-content-center w-100">
      <div className="appointment-card text-center shadow-lg  rounded-4">
        <div className="appointment-card-header d-flex align-items-center justify-content-between p-4">
          <Link
            href={"/user"}
            className="bg-transparent border-0 text-light h4"
          >
            <FaArrowAltCircleLeft />
          </Link>
          <h2 className="fw-bold m-0 text-white">Book Appointment</h2>
          <div></div>
        </div>
        <div className="p-5">
          <h4 className="text-white mb-3">
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h4>

          {/* --- Date Slider --- */}
          <Slider {...sliderSettings} className="mb-4">
            {days.map((day, idx) => {
              const dayNumber = day.getDate();
              const weekday = day.toLocaleString("default", {
                weekday: "short",
              });
              const isSelected =
                day.toDateString() === selectedDate.toDateString();
              return (
                <div key={idx} className="px-2">
                  <button
                    onClick={() => setSelectedDate(day)}
                    className={`date-btn ${isSelected ? "selected" : ""}`}
                  >
                    <div>{weekday}</div>
                    <div className="fw-bold fs-5">{dayNumber}</div>
                  </button>
                </div>
              );
            })}
          </Slider>

          {/* --- Time Slider --- */}
          <Slider {...sliderSettings} className="mb-5 px-3 py-4">
            {times.map((time, idx) => (
              <div key={idx} className="px-2">
                <button
                  onClick={() => setSelectedTime(time)}
                  className={`time-btn ${
                    selectedTime === time ? "selected" : ""
                  }`}
                >
                  {time}
                </button>
              </div>
            ))}
          </Slider>
          <div className="appointment-card-service mb-4 d-flex justify-content-between align-items-center py-4 px-3">
            <div className="d-flex flex-column align-items-start ">
              <h4 className="text-light">Service</h4>
              <p className="text-light mb-0">Loreim ispoum dummy </p>
            </div>
            <div className="d-flex flex-column align-items-end ">
              <h4 className="text-light">$75.00</h4>
              <p className="text-light mb-0">12 : 45 PM - 2 : 10 PM</p>
            </div>
          </div>

          <div className="w-100 d-flex flex-column gap-2 mb-4 text-start">
            <label htmlFor="des">Description</label>
            <textarea
              id="des"
              rows={6}
              style={{ backgroundColor: "#AF7F24", borderRadius: "14px" }}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="d-flex flex-column align-items-start">
              <span className="text-light ">Total</span>
              <span className="text-light fw-bold h3">$78.75</span>
            </div>
            <button
              type="submit"
              className="user-dashboard-box-btn"
              onClick={() => router.push("/user/new-card")}
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
