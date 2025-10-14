"use client"
import { AiOutlineEdit } from "react-icons/ai";

export function ServiceCard({
  title,
  price,
  image,
  sellerName,
  sellerAvatar = "/images/order-prof.png",
  onAction,
  onActionBtn,
}) {
  return (
    <div className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden" style={{cursor:"pointer"}} onClick={onAction}>
      {/* image + seller chip */}
      <div className="position-relative p-1">
        <img
          src={image || "/images/product2.png"}
          alt={title}
          className="card-img-top object-fit-cover product_img22"
          style={{ height: 160 }}
        />
        <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm">
          <img src={sellerAvatar || "/images/dashboard-prof.png"} alt="" width={25} height={25} className="rounded-circle" />
          <small className="fw-bold text-white ">{sellerName}</small>
        </div>
      </div>

      {/* footer */}
      <div className="card-footer border-warning2 text-dark border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title text-white mb-1">{title}</h6>
            <span className="small fw-semibold text-white">${price.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn text-white d-flex align-items-center justify-content-center p-0"
            aria-label="Add to cart"
            style={{ width: 32, height: 32 }}
            onClick={onActionBtn}
          >
            <AiOutlineEdit color="#FFFF" size={25} />
          </button>
        </div>
      </div>
    </div>
  )
}
