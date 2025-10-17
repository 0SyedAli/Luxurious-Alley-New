"use client";
import React from "react";
import { FaStar } from "react-icons/fa6";

const StarRating = ({ rating, onRatingChange, size = 24 }) => {
  const isInteractive = typeof onRatingChange === 'function';

  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`p-1 ${isInteractive ? 'btn btn-link border-0' : 'border-0'}`}
          onClick={isInteractive ? () => onRatingChange(star) : undefined}
          style={{
            color: star <= rating ? "#D49621" : "#e4e5e9",
            fontSize: `${size}px`,
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: isInteractive ? "pointer" : "default",
          }}
          onMouseOver={isInteractive ? (e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          } : undefined}
          onMouseOut={isInteractive ? (e) => {
            e.currentTarget.style.transform = "scale(1)";
          } : undefined}
          disabled={!isInteractive}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
};

export default StarRating;