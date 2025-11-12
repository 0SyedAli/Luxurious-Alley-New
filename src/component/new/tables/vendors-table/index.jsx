"use client";
import { useState } from "react";
import "../style.css";

const VendorsTable = ({ data, title = "Vendors List", rowsPerPage = 5 }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter by search
  const filteredData = data.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

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
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Join Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.length ? (
              visibleData.map((vendor, i) => (
                <tr key={i}>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.catagories}</td>
                  <td>{vendor.joinDate}</td>
                  <td>
                    <span
                      className={
                        vendor.status === "Active"
                          ? "badge-active"
                          : "badge-inactive"
                      }
                    >
                      {vendor.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-secondary py-4">
                  No vendors found
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
      )}

    </div>
  );
};

export default VendorsTable;
