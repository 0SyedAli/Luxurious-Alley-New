"use client";
import { FaStar } from "react-icons/fa";
import { RiShoppingBag3Line, RiShoppingBag4Fill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
import { useState, useEffect, useRef } from "react";

export function UserProductCard({
  onAction,
  showCalender = false,
  showSellerName = false,
  showOrderBtn = false,
  showProgress = false,
  onCardClick,
  onChairClick,
  onBagClick,
  onClick,
  title,
  image,
  sellerName,
  sellerImage,
  subTitle,
  className,
  imgHeight = 200,
}) {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}` || "/images/noimage.jpg"
  );
  const [hasError, setHasError] = useState(false);
console.log({imgSrc})
  const businessNameRef = useRef(null);
  const businessAddressRef = useRef(null);
  const sellerNameRef = useRef(null);

  useEffect(() => {
    // Initialize Bootstrap tooltips after component mounts
    if (typeof window !== "undefined") {
      const initTooltips = () => {
        const { Tooltip } = require("bootstrap");

        // Initialize tooltips for each element if they exist
        [
          businessNameRef.current,
          businessAddressRef.current,
          sellerNameRef.current,
        ].forEach((element) => {
          if (element) {
            new Tooltip(element, {
              placement: "top",
              trigger: "hover",
              customClass: "custom-tooltip",
            });
          }
        });
      };

      // Wait for Bootstrap to load
      if (typeof window.bootstrap !== "undefined") {
        initTooltips();
      } else {
        // If Bootstrap is not available, load it dynamically
        const bootstrapScript = document.createElement("script");
        bootstrapScript.src =
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        bootstrapScript.onload = initTooltips;
        document.head.appendChild(bootstrapScript);
      }
    }
  }, []);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/images/noimage.jpg");
    }
  };

  // Handle card click (excluding icon button clicks)
  const handleCardClick = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) {
      return;
    }
    if (onCardClick) {
      onCardClick();
    } else if (onClick) {
      onClick();
    }
  };

  // Handle chair icon click
  const handleChairClick = (e) => {
    e.stopPropagation();
    if (onChairClick) {
      onChairClick();
    }
  };

  // Handle bag icon click
  const handleBagClick = (e) => {
    e.stopPropagation();
    if (onBagClick) {
      onBagClick();
    }
  };

  // Handle existing action button click
  const handleActionClick = (e) => {
    e.stopPropagation();
    if (onAction) {
      onAction();
    }
  };

  return (
    <div
      className={`card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden ${className}`}
      onClick={handleCardClick}
      style={{ cursor: onCardClick || onClick ? "pointer" : "default" }}
    >
      {/* image + seller chip */}
      <div className="position-relative p-1">
        <img
          src={imgSrc}
          alt={"Product Image"}
          onError={handleError}
          className="card-img-top object-fit-cover product_img22"
          style={{ height: imgHeight }}
        />
        {showOrderBtn && (
          <div
            className="position-absolute d-flex align-items-center gap-2"
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
          <div className="position-absolute top-0 start-0 m-2">
            <div
              className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm"
              style={{ maxWidth: "120px" }}
            >
              <img
                src={
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/${sellerImage}` ||
                  "/images/userAvatar.jpg"
                }
                alt="Seller"
                width={25}
                height={25}
                className="rounded-circle object-fit-cover flex-shrink-0"
              />
              <small
                ref={sellerNameRef}
                className="fw-bold text-white text-nowrap text-truncate"
                style={{ maxWidth: "70px" }}
                data-bs-toggle="tooltip"
                data-bs-title={sellerName || "N/A"}
                data-bs-placement="top"
              >
                {sellerName || "N/A"}
              </small>
            </div>
          </div>
        )}
        {showProgress && (
          <div className="circle-container d-flex justify-content-center align-items-center position-absolute">
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
      <div className="card-footer border-warning2 text-dark border-0 py-3">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="flex-grow-1 min-w-0">
            {/* Business Name */}
            <h6
              ref={businessNameRef}
              className="card-title text-white mb-1 text-truncate w-100"
              data-bs-toggle="tooltip"
              data-bs-title={title || "N/A"}
              data-bs-placement="top"
            >
              {title || "N/A"}
            </h6>

            {/* Address */}
            <span
              ref={businessAddressRef}
              className="small fw-semibold text-white text-truncate d-inline-block w-100"
              data-bs-toggle="tooltip"
              data-bs-title={subTitle || "N/A"}
              data-bs-placement="top"
            >
              {subTitle || "N/A"}
            </span>
          </div>

          {showCalender && (
            <button
              type="button"
              className="btn btn-dark btn-sm rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
              aria-label="Add to cart"
              onClick={handleActionClick}
              style={{ width: 32, height: 32 }}
            >
              <RiShoppingBag3Line color="#D49621" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .min-w-0 {
          min-width: 0;
        }

        /* Custom tooltip styling to match Bootstrap 5.3 */
        :global(.custom-tooltip .tooltip-inner) {
          background-color: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          max-width: 300px;
        }

        :global(.custom-tooltip .tooltip-arrow) {
          display: block;
        }

        :global(.custom-tooltip .tooltip-arrow::before) {
          border-top-color: rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
}
