"use client";
import { FaStar } from "react-icons/fa";
import { RiShoppingBag3Line, RiShoppingBag4Fill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
import { useState, useRef } from "react";

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
  items,
}) {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${items?.bImage}` || "/images/noimage.jpg"
  );
  const [hasError, setHasError] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

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

  // Simple tooltip handlers
  const showTooltip = (e, text) => {
    if (text && text.length > 15) {
      const rect = e.target.getBoundingClientRect();
      setTooltip({
        show: true,
        text,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  const hideTooltip = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden"
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
            style={{ height: 200 }}
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
                style={{ maxWidth: '120px' }}
                onMouseEnter={(e) => showTooltip(e, items?.fullName || "N/A")}
                onMouseLeave={hideTooltip}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${items?.image}` || "/images/userAvatar.jpg"}
                  alt="Seller"
                  width={25}
                  height={25}
                  className="rounded-circle object-fit-cover flex-shrink-0"
                />
                <small 
                  className="fw-bold text-white text-nowrap text-truncate"
                  style={{ maxWidth: '70px' }}
                  title={items?.fullName || "N/A"}
                >
                  {items?.fullName || "N/A"}
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
              <div 
                className="w-100"
                onMouseEnter={(e) => showTooltip(e, items?.bName || "N/A")}
                onMouseLeave={hideTooltip}
              >
                <h6 
                  className="card-title text-white mb-1 text-truncate w-100"
                  title={items?.bName || "N/A"}
                >
                  {items?.bName || "N/A"}
                </h6>
              </div>
              
              {/* Address */}
              <div 
                className="w-100"
                onMouseEnter={(e) => showTooltip(e, items?.bAddress || "N/A")}
                onMouseLeave={hideTooltip}
              >
                <span 
                  className="small fw-semibold text-white text-truncate d-inline-block w-100"
                  title={items?.bAddress || "N/A"}
                >
                  {items?.bAddress || "N/A"}
                </span>
              </div>
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
      </div>

      {/* Global Tooltip */}
      {tooltip.show && (
        <div 
          className="global-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)',
            zIndex: 9999
          }}
        >
          <div className="tooltip-content bg-dark text-white px-2 py-1 rounded small">
            {tooltip.text}
            <div className="tooltip-arrow"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .global-tooltip {
          pointer-events: none;
        }
        .tooltip-content {
          background: rgba(0, 0, 0, 0.87) !important;
          font-size: 12px;
          border-radius: 4px;
          padding: 6px 8px;
          white-space: nowrap;
          box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 
                      0px 2px 2px 0px rgba(0,0,0,0.14), 
                      0px 1px 5px 0px rgba(0,0,0,0.12);
        }
        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid rgba(0, 0, 0, 0.87);
        }
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .min-w-0 {
          min-width: 0;
        }
      `}</style>
    </>
  );
}