"use client"
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

export function ProductCard({
  title,
  price,
  image,
  sellerName,
  sellerAvatar = "/images/order-prof.png",
  onAction,
  onActionBtn,
  onDelete, // Add this new prop for delete functionality
}) {
  return (
    <div className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden" style={{ cursor: "pointer" }} onClick={onAction}>
      {/* image + seller chip + delete icon */}
      <div className="position-relative p-1">
        <img
          src={image || "/images/product2.png"}
          alt={title}
          className="card-img-top object-fit-cover product_img22"
          style={{ height: 180 }}
        />
        
        {/* Seller chip - top left */}
        <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm">
          <img src={sellerAvatar || "/images/dashboard-prof.png"} alt="" width={25} height={25} className="rounded-circle" />
          <small className="fw-bold text-white ">{sellerName}</small>
        </div>

        {/* Delete icon - bottom right */}
        <button
          type="button"
          className="position-absolute bottom-0 end-0 m-2 btn btn-danger btn-sm rounded-circle d-inline-flex align-items-center justify-content-center shadow"
          aria-label="Delete product"
          style={{ width: 32, height: 32 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            onDelete?.();
          }}
        >
          <AiOutlineDelete color="#fff" size={16} />
        </button>
      </div>

      {/* footer */}
      <div className="card-footer border-warning2 text-dark border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title text-white mb-1">{title ? title : "Unknown"}</h6>
            <span className="small fw-semibold text-white">${price ? price.toFixed(2) : 0}</span>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle d-inline-flex align-items-center justify-content-center "
            aria-label="Add to cart"
            style={{ width: 32, height: 32, fontSize: "20px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card's onClick
              onActionBtn?.();
            }}
          >
            <AiOutlineEdit color="#D49621"  />
          </button>
        </div>
      </div>
    </div>
  )
}