"use client";

import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function OrderCard({
  title,
  time,
  image,
  bookingId,
  status,
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("authToken");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const response = await api.post(
        "/updateBookingStatus",
        {
          bookingId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(`Booking ${newStatus.toLowerCase()} successfully!`);
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating booking status."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderButtons = () => {
    if (status === "Accepted") {
      return (
        <>
          <button
            className="btn btn-sm btn-reject flex-grow-1"
            disabled={loading}
            onClick={() => handleUpdateStatus("Rejected")}
          >
            {loading ? "..." : "Reject"}
          </button>
          <button
            className="btn btn-sm btn-accept flex-grow-1"
            disabled={loading}
            onClick={() => handleUpdateStatus("Completed")}
          >
            {loading ? "..." : "Complete"}
          </button>
        </>
      );
    } else if (status === "Rejected" || status === "Completed") {
      return (
        <>
          <button
            className="btn btn-sm btn-accept flex-grow-1"
            disabled={true}
            onClick={() => handleUpdateStatus("Completed")}
          >
            {loading ? "..." : "Completed"}
          </button>
        </>
      );
    } else {
      // Default (new booking)
      return (
        <>
          <button
            className="btn btn-sm btn-accept flex-grow-1"
            disabled={loading}
            onClick={() => handleUpdateStatus("Accepted")}
          >
            {loading ? "..." : "Accept"}
          </button>
          <button
            className="btn btn-sm btn-reject flex-grow-1"
            disabled={loading}
            onClick={() => handleUpdateStatus("Rejected")}
          >
            {loading ? "..." : "Reject"}
          </button>
        </>
      );
    }
  };

  return (
    <div className="card glass2 border-0 h-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <div className="d-flex align-items-center gap-3 flex-column text-center">
            <div
              className="rounded-3 overflow-hidden"
              style={{ width: 100, height: 100 }}
            >
              <img
                src={image || "/images/order-prof.png"}
                alt={`${title} thumbnail`}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <div>
              <div className="fw-semibold" style={{ fontSize: 20 }}>
                {title}
              </div>
              <div className="text-white small" style={{ fontSize: 14 }}>
                {time}
              </div>
              <div className="text-secondary small mt-1">
                Status: <strong>{status}</strong>
              </div>
            </div>
          </div>
          <span className="oc_message">
            <FiMessageSquare />
          </span>
        </div>

        {/* Buttons section */}
        <div className="d-flex gap-2">{renderButtons()}</div>
      </div>
    </div>
  );
}
