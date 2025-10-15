import React from "react";
import "../style.css";

const StatsCard = ({ title, count, rating, icon }) => {
  return (
    <div className="admin-dashboard-stats p-4">
      <div className="admin-dashboard-stats-content">
        <div>
          <p className="text-light mb-3">{title}</p>
          <h4 className="mb-3 text-light">{count}</h4>
        </div>
        <p className="mb-0">{rating}</p>
      </div>
      <div className="stats-icon">{icon}</div>
    </div>
  );
};

export default StatsCard;
