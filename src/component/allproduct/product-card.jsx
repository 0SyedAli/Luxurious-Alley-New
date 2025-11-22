"use client";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export function ProductCard({
  title,
  price,
  image,
  sellerName,
  sellerAvatar = "/images/order-prof.png",
  onAction,
  onActionBtn,
  onDelete,
}) {
  return (
    <div
      className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden card_container"
      style={{ cursor: "pointer" }}
      onClick={onAction}
    >
      {/* image + seller chip */}
      <div className="position-relative p-1">
        <img
          src={image || "/images/product2.png"}
          alt={title}
          className="card-img-top object-fit-cover product_img22"
          style={{ height: 180 }}
        />

        {/* Seller avatar chip */}
        <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm">
          <img src={sellerAvatar} width={25} height={25} className="rounded-circle" />
          <small className="fw-bold text-white">{sellerName}</small>
        </div>

        {/* DELETE ICON (bottom-right) */}
        <button
          type="button"
          className="btn btn-danger btn-sm rounded-circle position-absolute"
          style={{
            bottom: "10px",
            right: "10px",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <AiOutlineDelete size={16} />
        </button>
      </div>

      {/* footer */}
      <div className="card-footer border-warning2 text-dark border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title text-white mb-1">{title || "Unknown"}</h6>
            <span className="small fw-semibold text-white">
              ${price ? price.toFixed(2) : 0}
            </span>
          </div>

          {/* EDIT BUTTON */}
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
            aria-label="Edit"
            style={{ width: 32, height: 32, fontSize: "20px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card's onClick
              onActionBtn?.();
            }}
          >
            <AiOutlineEdit color="#D49621" />
          </button>
        </div>
      </div>
    </div>
  );
}
