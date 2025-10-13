"use client";
import { FaStar } from "react-icons/fa";
import { RiShoppingBag3Line, RiShoppingBag4Fill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";

export function UserProductCard({
  title,
  price,
  image,
  sellerName,
  sellerAvatar = "/images/order-prof.png",
  onAction,
  showCalender = false,
  showSellerName = false,
  showOrderBtn = false,
  showProgress = false,
  onCardClick, // New prop for entire card click
  onChairClick, // New prop for chair icon click
  onBagClick, // New prop for bag icon click
  onClick, // Keep for backward compatibility
}) {
  // Handle card click (excluding icon button clicks)
  const handleCardClick = (e) => {
    // Prevent card click when clicking on interactive elements
    if (e.target.closest("button") || e.target.closest("a")) {
      return;
    }

    // Use onCardClick if provided, otherwise fall back to onClick for backward compatibility
    if (onCardClick) {
      onCardClick();
    } else if (onClick) {
      onClick();
    }
  };

  // Handle chair icon click
  const handleChairClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    if (onChairClick) {
      onChairClick();
    }
  };

  // Handle bag icon click
  const handleBagClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    if (onBagClick) {
      onBagClick();
    }
  };

  // Handle existing action button click
  const handleActionClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    if (onAction) {
      onAction();
    }
  };

  return (
    <div
      className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden"
      onClick={handleCardClick}
      style={{ cursor: onCardClick || onClick ? "pointer" : "default" }}
    >
      {/* image + seller chip */}
      <div className="position-relative p-1">
        <img
          src={image || "/images/product2.png"}
          alt={title}
          className="card-img-top object-fit-cover product_img22"
          style={{ height: 200 }}
        />
        {showOrderBtn && (
          <div
            className="position-absolute  d-flex align-items-center gap-2"
            style={{ top: 15, left: 15 }}
          >
            <button
              className="d-flex text-light align-items-center gap-2 bg-dark bg-opacity-50 rounded-circle p-2"
              style={{ border: "1px solid #573D1A" }}
              onClick={handleChairClick}
              aria-label="Chair action"
            >
              <PiOfficeChairFill className="card-img-icon" />
            </button>
            <button
              className="d-flex text-light align-items-center gap-2 bg-dark bg-opacity-50 rounded-circle p-2"
              style={{ border: "1px solid #573D1A" }}
              onClick={handleBagClick}
              aria-label="Shopping bag action"
            >
              <RiShoppingBag4Fill className="card-img-icon" />
            </button>
          </div>
        )}

        {showSellerName && (
          <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm">
            <img
              src={sellerAvatar || "/images/dashboard-prof.png"}
              alt=""
              width={25}
              height={25}
              className="rounded-circle object-fit-cover"
            />
            <small className="fw-bold text-white ">{sellerName}</small>
          </div>
        )}
        {showProgress && (
          <div className="circle-container d-flex justify-content-center align-items-center position-absolute ">
            <div className="progress-ring position-absolute"></div>
            <img
              src="/images/star.png"
              alt="star"
              className="object-fit-contain"
              height={20}
              width={20}
            />
          </div>
        )}
      </div>

      {/* footer */}
      <div className="card-footer border-warning2 text-dark border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title text-white mb-1 text-nowrap">{title}</h6>
            <span className="small fw-semibold text-white">
              ${price.toFixed(2)}
            </span>
          </div>
          {showCalender && (
            <button
              type="button"
              className="btn btn-dark btn-sm rounded-circle d-inline-flex align-items-center justify-content-center "
              aria-label="Add to cart"
              onClick={handleActionClick}
              style={{ width: 32, height: 32 }}
            >
              <RiShoppingBag3Line color="#D49621" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
