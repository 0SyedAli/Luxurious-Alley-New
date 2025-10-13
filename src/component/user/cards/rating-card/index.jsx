"use client";
import { FaStar } from "react-icons/fa";
import { RiShoppingBag3Line, RiShoppingBag4Fill } from "react-icons/ri";
import "../style.css";

const RatingCard = ({
  productName,
  subTitle,
  label,
  date,
  rating,
  image = "/images/product2.png",
  onShopClick,
  onCardClick,
  className = "",
}) => {
  const handleShopClick = (e) => {
    e.stopPropagation();
    if (onShopClick) {
      onShopClick();
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) {
      return;
    }
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      className={`rating-card ${className}`}
      onClick={handleCardClick}
      style={{ cursor: onCardClick ? "pointer" : "default" }}
    >
      {/* Main Content */}
      <div className="rating-card-content">
        {/* Image Section with Shopping Bag */}
        <div className="image-section">
          <img src={image} alt={productName} className="product-image" />

          {/* Shopping Bag Icon - Positioned on image */}
          <button
            className="shop-icon-btn"
            onClick={handleShopClick}
            aria-label="Add to cart"
          >
            <RiShoppingBag4Fill className="shop-icon" color="#CC8819" />
          </button>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h3 className="product-name">{productName}</h3>
          <p className="product-subtitle">{subTitle}</p>

          <div className="label-date-container flex-column">
            <span className="product-label">{label}</span>
            <span className="product-date text-center">
              Date <br /> {date}
            </span>
          </div>
        </div>

        {/* Rating Box - Outside card bottom right */}
        <div className="rating-box">
          <img
            src="/images/progress_img.png"
            alt="progress-img"
            height={25}
            width={25}
            className="object-fit-contain"
          />
          <span className="rating-number">{rating} Rating</span>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
