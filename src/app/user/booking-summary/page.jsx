"use client";

import api from "@/lib/api";
import { useSelector } from "react-redux";

const UserBookingSummaryDetails = () => {
  const state = useSelector((state) => state.booking);
   

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
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    }
  };
  
  return (
    <div>
      <button className="user-dashboard-box-btn" onClick={handleBooking}>
        Proceed
      </button>
    </div>
  );
};

export default UserBookingSummaryDetails;
