export function StarRating({ rating, size = "1rem" }) {
  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
          style={{ color: "#FFA500", fontSize: size }}
        />
      ))}
    </div>
  )
}
