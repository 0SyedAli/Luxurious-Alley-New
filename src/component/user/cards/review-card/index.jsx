"use client";
import "../style.css";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ id, userName, date, rating, text, avatar }) => {
  return (
    <div className="review-card mb-4">
      {/* Left Side - Avatar */}
      <div className="avatar-wrapper">
        <img
          src={avatar}
          alt="review-avatar"
          className="avatar-image"
        />
      </div>

      {/* Right Side - Full Width Content */}
      <div className="review-content">
        {/* Username + Date */}
        <div className="review-header">
          <h6 className="review-username">{userName}</h6>
          <span className="review-date">{date}</span>
        </div>

        {/* Rating */}
        <div className="review-rating">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="star-icon" />
          ))}
        </div>

        {/* Review Text - Full Width */}
        <p className="review-text fw-light">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
