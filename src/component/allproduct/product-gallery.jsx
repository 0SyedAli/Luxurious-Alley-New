export function ProductGallery({ mainImage, thumbnails, alt }) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="rounded-3 overflow-hidden bg-white p-4" style={{ minHeight: "300px" }}>
        <img src={mainImage || "/placeholder.svg"} alt={alt} className="w-100 h-100 object-fit-contain" />
      </div>
      <div className="d-flex gap-2">
        {thumbnails.map((thumb, idx) => (
          <button
            key={idx}
            className="btn p-0 border-0 rounded-3 overflow-hidden bg-white"
            style={{ width: "90px", height: "90px" }}
          >
            <img
              src={thumb || "/placeholder.svg"}
              alt={`${alt} thumbnail ${idx + 1}`}
              className="w-100 h-100 object-fit-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
