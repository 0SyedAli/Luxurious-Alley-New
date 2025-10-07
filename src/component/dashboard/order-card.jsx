import { FiMessageSquare } from "react-icons/fi";

export default function OrderCard({
  title,
  time,
  image,
}) {
  return (
    <div className="card glass2 border-0 h-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-3 overflow-hidden" style={{ width: 56, height: 56 }}>
              <img
                src={image || "/placeholder.svg"}
                alt={`${title} thumbnail`}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <div>
              <div className="fw-semibold">{title}</div>
              <div className="text-white small">{time}</div>
            </div>
          </div>
          <span className="oc_message"><FiMessageSquare /></span>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-accept flex-grow-1">Accept</button>
          <button className="btn btn-sm btn-reject flex-grow-1">Reject</button>
        </div>
      </div>
    </div>
  )
}
