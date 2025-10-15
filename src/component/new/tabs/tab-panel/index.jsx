"use client";
import React from "react";
import "./style.css";

const TabPanel = ({ children, value, tabValue, className, ...other }) => {
  const isActive = value === tabValue;

  if (!isActive) return null;
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabValue}`}
      aria-labelledby={`tab-${tabValue}`}
      className={`tab-panel ${className || ""}`}
      {...other}
    >
      <div className="tab-panel-content">{children}</div>
    </div>
  );
};

export default TabPanel;
