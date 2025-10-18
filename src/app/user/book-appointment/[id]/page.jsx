"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "../style.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { setBooking } from "@/redux/features/booking/bookingSlice";

const UserBookAppointmentDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [getService, setGetService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const dispatch = useDispatch();

  const getOneService = async () => {
    try {
      const { data } = await api.get(`/getStylistsById?id=${id}`);
      if (data.success) {
        setGetService(data.data);

        // Check if workingDays exists and has length
        if (data.data.technician?.workingDays?.length > 0) {
          generateAvailableDays(data.data.technician.workingDays);
        } else {
          setAvailableDays([]);
          setAvailableTimes([]);
        }
      }
    } catch (error) {
      console.log("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate available days based on technician's working days
  const generateAvailableDays = (workingDays) => {
    const activeWorkingDays = workingDays.filter((day) => day.isActive);

    if (activeWorkingDays.length === 0) {
      setAvailableDays([]);
      setAvailableTimes([]);
      return;
    }

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const availableDayNames = activeWorkingDays.map((day) => day.day);

    const nextAvailableDays = [];
    let currentDate = new Date();

    // Sirf current week ke working days show karenge
    // Find the next occurrence of each working day
    availableDayNames.forEach((dayName) => {
      const dayIndex = daysOfWeek.indexOf(dayName);
      if (dayIndex === -1) return;

      const currentDayIndex = currentDate.getDay();
      let daysToAdd = dayIndex - currentDayIndex;

      // Agar same day hai ya future day hai
      if (daysToAdd < 0) {
        daysToAdd += 7; // Next week mein same day
      }

      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + daysToAdd);

      nextAvailableDays.push({
        date: nextDate,
        dayName: dayName.substring(0, 3), // Only first 3 letters
        fullDayName: dayName,
      });
    });

    // Sort by date
    nextAvailableDays.sort((a, b) => a.date - b.date);

    setAvailableDays(nextAvailableDays);

    // Set first available day as selected by default
    if (nextAvailableDays.length > 0) {
      const firstAvailableDay = nextAvailableDays[0].date;
      setSelectedDate(firstAvailableDay);
      generateAvailableTimes(firstAvailableDay, activeWorkingDays);
    } else {
      setSelectedTime("");
      setAvailableTimes([]);
    }
  };

  // Generate available time slots based on selected day and technician's schedule
  const generateAvailableTimes = (date, workingDays) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[date.getDay()];

    const daySchedule = workingDays.find((day) => day.day === dayName);

    if (!daySchedule) {
      setAvailableTimes([]);
      setSelectedTime("");
      return;
    }

    const times = [];
    const startTime = convertTimeToMinutes(daySchedule.startTime.trim());
    const endTime = convertTimeToMinutes(daySchedule.endTime.trim());
    const breakStart = convertTimeToMinutes(daySchedule.breakStart.trim());
    const breakEnd = convertTimeToMinutes(daySchedule.breakEnd.trim());

    // console.log("Start Time (minutes):", startTime);
    // console.log("End Time (minutes):", endTime);
    // console.log("Break Start (minutes):", breakStart);
    // console.log("Break End (minutes):", breakEnd);

    let currentTime = startTime;

    // Generate time slots in 30-minute intervals
    while (currentTime < endTime) {
      // Skip break time
      if (currentTime >= breakStart && currentTime < breakEnd) {
        currentTime += 30;
        continue;
      }

      const timeString = convertMinutesToTimeString(currentTime);
      times.push(timeString);
      currentTime += 30; // 30-minute intervals
    }

    // console.log("Generated Times:", times);
    setAvailableTimes(times);
    setSelectedTime(times.length > 0 ? times[0] : "");
  };

  // Helper function to convert time string to minutes
  const convertTimeToMinutes = (timeStr) => {
    const cleanTimeStr = timeStr.trim();
    const [time, modifier] = cleanTimeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + (minutes || 0);
  };

  // Helper function to convert minutes to time string
  const convertMinutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = mins.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (getService?.technician?.workingDays) {
      const activeWorkingDays = getService.technician.workingDays.filter(
        (day) => day.isActive
      );
      generateAvailableTimes(date, activeWorkingDays);
    }
  };

  const handleContinue = () => {
    const appointmentData = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
    };
    dispatch(setBooking(appointmentData));
    router.push("/user/booking-summary");
  };

  useEffect(() => {
    getOneService();
  }, [id]);

  useEffect(() => {
    if (getService?.technician?.workingDays && selectedDate) {
      const activeWorkingDays = getService.technician.workingDays.filter(
        (day) => day.isActive
      );
      generateAvailableTimes(selectedDate, activeWorkingDays);
    }
  }, [selectedDate, getService]);

  const sliderSettings = {
    infinite: false,
    slidesToShow: Math.min(availableDays.length, 5), // Dynamic slides based on available days
    swipeToSlide: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(availableDays.length, 3) },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: Math.min(availableDays.length, 2) },
      },
    ],
  };

  if (loading) {
    return (
      <div className="appointment-wrapper d-flex align-items-center justify-content-center w-100">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="appointment-wrapper d-flex align-items-center justify-content-center w-100">
      <div className="appointment-card text-center shadow-lg rounded-4">
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
          {availableDays.length > 0 ? (
            <>
              <Slider {...sliderSettings} className="mb-4">
                {availableDays.map((dayObj, idx) => {
                  const day = dayObj.date;
                  const dayName = dayObj.dayName;
                  const dayNumber = day.getDate();
                  const isSelected =
                    day.toDateString() === selectedDate.toDateString();

                  return (
                    <div key={idx} className="px-2">
                      <button
                        onClick={() => handleDateSelect(day)}
                        className={`date-btn ${isSelected ? "selected" : ""}`}
                      >
                        <div>{dayName}</div>
                        <div className="fw-bold fs-5">{dayNumber}</div>
                      </button>
                    </div>
                  );
                })}
              </Slider>

              {/* --- Time Slider --- */}
              {availableTimes.length > 0 ? (
                <>
                  <h5 className="text-white mb-3">Available Time Slots</h5>
                  <div className="mb-3 text-white small">
                    Working Hours:{" "}
                    {
                      getService?.technician?.workingDays?.find(
                        (day) =>
                          day.day ===
                          selectedDate.toLocaleString("default", {
                            weekday: "long",
                          })
                      )?.startTime
                    }{" "}
                    -{" "}
                    {
                      getService?.technician?.workingDays?.find(
                        (day) =>
                          day.day ===
                          selectedDate.toLocaleString("default", {
                            weekday: "long",
                          })
                      )?.endTime
                    }
                  </div>
                  <Slider {...sliderSettings} className="mb-5 px-3 py-4">
                    {availableTimes.map((time, idx) => (
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
                </>
              ) : (
                <div className="text-white mb-5">
                  No available times for selected day
                </div>
              )}
            </>
          ) : (
            <div className="text-white mb-4">
              {getService?.technician?.workingDays?.length > 0
                ? "No available working days this week"
                : "Technician has no working days scheduled"}
            </div>
          )}

          <button
            type="submit"
            className="user-dashboard-box-btn px-5"
            onClick={handleContinue}
            disabled={!selectedTime || availableDays.length === 0}
          >
            Confirm Appointment
          </button>

          {/* Debug info */}
          <div className="text-white mt-3 small">
            Available Days: {availableDays.length} | Selected:{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookAppointmentDetails;
