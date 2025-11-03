"use client"
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";

export function ServiceCard({
  serviceName,
  price,
  images,
  salonId,
  sellerAvatar = "/images/order-prof.png",
  onAction,
  onActionBtn,
}) {
  // ✅ Fix: Safe image check with fallback
  const imageSrc =
    images && images.length > 0 && images[0]
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}`
      : "/images/empty.png";

  // ✅ Fix: Safe salon image check with fallback
  // const imageSalonSrc =
  //   salonId?.image && salonId?.image.length > 0 && salonId?.image[0]
  //     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}`
  //     : "/images/empty.png";

  return (
    <div className="card h-100 border-2 border-warning2 rounded-4 shadow-sm overflow-hidden" style={{ cursor: "pointer" }} onClick={onAction}>

      {/* image + seller chip */}
      <div className="position-relative p-1">
        <Image
          src={imageSrc}
          alt={serviceName}
          className="card-img-top object-fit-cover product_img22"
          width={220}
          height={200}
          style={{ width: "100%", height: 200 }}
        />
        <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-pill px-2 py-1 shadow-sm">
          <img src={salonId?.image && `${process.env.NEXT_PUBLIC_IMAGE_URL}/${salonId?.image}` || "/images/dashboard-prof.png"} alt="" width={25} height={25} className="rounded-circle" />
          <small className="fw-bold text-white ">{salonId?.fullName || "N/A"}</small>
        </div>
      </div>

      {/* footer */}
      <div className="card-footer border-warning2 text-dark border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title text-white mb-1">{serviceName ? serviceName : "Unknown"}</h6>
            <span className="small fw-semibold text-white">${price ? price.toFixed(2) : 0}</span>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle d-inline-flex align-items-center justify-content-center "
            aria-label="Add to cart"
            style={{ width: 32, height: 32 }}
            onClick={onActionBtn}
          >
            <AiOutlineEdit color="#D49621" size={25} />
          </button>
        </div>
      </div>
    </div>
  )
}
