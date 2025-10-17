"use client";
import { useState } from "react";
import "../style.css";
import { FaStar } from "react-icons/fa";
import StarRating from "../../star-rating";

const ReviewCard = ({ userName, date, rating = 0, text, avatar }) => {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${avatar}` || "/images/noimage.jpg"
  );

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/images/noimage.jpg");
    }
  };

  return (
    <div className="review-card mb-4">
      {/* Left Side - Avatar */}
      <div className="avatar-wrapper">
        <img
          src={imgSrc}
          onError={handleError}
          alt="review-avatar"
          className="avatar-image"
        />
      </div>

      {/* Right Side - Full Width Content */}
      <div className="review-content">
        {/* Username + Date */}
        <div className="review-header">
          <h6 className="review-username">{userName || "N/A"}</h6>
          <span className="review-date">{date || "N/A"}</span>
        </div>

        {/* Rating */}
        <div className="review-rating">
          <StarRating rating={rating} size={16} />
        </div>

        {/* Review Text - Full Width */}
        <p className="review-text fw-light">
          {text || "Discription not available at the moment."}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
