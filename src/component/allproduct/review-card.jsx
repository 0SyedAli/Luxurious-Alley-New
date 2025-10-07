import { StarRating } from "./star-rating"

export function ReviewCard({ name, avatar, rating, date, content }) {
  return (
    <div
      className="border rounded-4 p-4 mb-3"
      style={{
        borderColor: "#4A5568",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
      }}
    >
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex gap-3 align-items-center">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="rounded-circle"
            style={{ width: "48px", height: "48px", objectFit: "cover" }}
          />
          <div>
            <h6 className="mb-1 text-white fw-normal">{name}</h6>
            <StarRating rating={rating} size="0.875rem" />
          </div>
        </div>
        <span className="text-muted small">{date}</span>
      </div>
      <p className="text-muted mb-0" style={{ lineHeight: "1.6" }}>
        {content}
      </p>
    </div>
  )
}
