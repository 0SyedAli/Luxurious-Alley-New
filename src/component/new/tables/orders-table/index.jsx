"use client";
import { useState } from "react";
import "../style.css";

const OrdersTable = ({ data, title = "Orders List", rowsPerPage = 5 }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter by search
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.performance.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  // Helper to get badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#28a74693"; // green
      case "Pending":
        return "#ffc1078a"; // yellow
      case "Complete":
        return "#007bff8a"; // blue
      case "Canceled":
        return "#dc354691"; // red
      case "Delivered":
        return "#17a3b87e"; // teal
      default:
        return "#6c757d"; // gray
    }
  };
  return (
    <div className="table-container mx-auto mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h5 className="fw-bold mb-2 text-light">{title}</h5>
        <input
          type="text"
          className="table-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date/Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.length ? (
              visibleData.map((vendor, i) => (
                <tr key={i}>
                  <td>{vendor.id}</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${vendor.image}`}
                        alt="product-image"
                        className="object-fit-cover me-2 rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                        height={40}
                        width={40}
                      />
                      <span>{vendor.name}</span>
                    </div>
                  </td>
                  <td>{vendor.dateTime}</td>
                  <td>${vendor.price}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "5px",
                        color: "#fff",
                        backgroundColor: getStatusColor(vendor.status),
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {vendor.status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-secondary py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > rowsPerPage && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-light">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} users
          </small>

          <div>
            <button
              onClick={handlePrev}
              className="btn btn-sm btn-outline-light me-1"
              disabled={page === 1}
            >
              &lt; Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${page === i + 1 ? "active-paginate" : "btn-outline-light"
                  } mx-1`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="btn btn-sm btn-outline-light ms-1"
              disabled={page === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default OrdersTable;
