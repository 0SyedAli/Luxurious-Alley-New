"use client";
import { useState } from "react";
import "../style.css";

const AnalyticsTable = ({ data, title = "Analytics", rowsPerPage = 5 }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Define performance ranking
  const performanceRank = {
    Excellent: 1,
    Good: 2,
    Average: 3,
    Poor: 4,
  };

  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const perfCompare =
        (performanceRank[a.performance] || 5) - (performanceRank[b.performance] || 5);
      if (perfCompare !== 0) return perfCompare;

      // Convert totalSale string to number
      const totalA = parseFloat(a.totalSale.replace("$", "")) || 0;
      const totalB = parseFloat(b.totalSale.replace("$", "")) || 0;
      return totalB - totalA; // Descending order
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="table-container mx-auto mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="mb-2">
          <h5 className="fw-bold mb-1 text-light">{title}</h5>
          <p className="text-light mb-1">Detailed breakdown of sales and orders by vendor</p>
        </div>

        <input
          type="text"
          className="table-search"
          placeholder="Search by vendor name..."
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
              <th>#</th>
              <th>Vendor Name</th>
              <th>Total Sales</th>
              <th>Orders Received</th>
              <th>Average Order Value</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.length ? (
              visibleData.map((item, i) => (
                <tr key={i}>
                  <td>{startIndex + i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.totalSale}</td>
                  <td>{item.ordersReceived}</td>
                  <td>${item.averageOrderValue}</td>
                  <td>
                    <span
                      className={
                        item.performance === "Excellent"
                          ? "badge-active"
                          : item.performance === "Good"
                            ? "badge-good"
                            : item.performance === "Average"
                              ? "badge-average"
                              : "badge-inactive"
                      }
                    >
                      {item.performance}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-secondary py-4">
                  No analytics found
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
            {filteredData.length} vendors
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
                className={`btn btn-sm ${page === i + 1 ? "active-paginate" : "btn-outline-light"} mx-1`}
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

export default AnalyticsTable;
