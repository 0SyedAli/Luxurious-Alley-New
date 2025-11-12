import React from "react";
import "../style.css";

const StatsCard = ({ title, count, rating, icon }) => {
  return (
    <div className="admin-dashboard-stats p-4">
      <div className="admin-dashboard-stats-content w-100">
        <div>
          <p className="text-light mb-3">{title}</p>
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <h4 className="text-light mb-0">{count}</h4>
            <div className="stats-icon">{icon}</div>
          </div>
        </div>
        <p className="mb-0">{rating}</p>
      </div>
    </div>
  );
};

export default StatsCard;
