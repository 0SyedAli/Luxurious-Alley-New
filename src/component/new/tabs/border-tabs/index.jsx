"use client";
import * as React from "react";
import Image from "next/image";
import "./style.css";

// Main Component
const BorderTabs = ({
  tabs,
  activeTab,
  onTabChange,
  centered = false,
  fullWidth = false,
  className,
  iconSize = 24,
  onWriteReviewClick,
}) => {
  const handleChange = (newValue) => {
    console.log("Tab clicked in BorderTabs:", newValue);
    onTabChange(newValue);
  };

  if (!tabs.length) return null;

  return (
    <div className={`border-tabs-container ${className || ""}`}>
      <div className="border-tabs-wrapper">
        <div className="nav nav-tabs border-tabs-custom" role="tablist">
          {/* Left side - All tabs */}
          <div className="border-tabs-left">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                className={`border-tab-item ${
                  activeTab === tab.value ? "active" : ""
                } ${tab.disabled ? "disabled" : ""}`}
                onClick={() => !tab.disabled && handleChange(tab.value)}
                role="tab"
                aria-selected={activeTab === tab.value}
                aria-disabled={tab.disabled}
              >
                {tab.iconImg && (
                  <Image
                    src={tab.iconImg}
                    alt={`${tab.label} icon`}
                    width={iconSize}
                    height={iconSize}
                    priority={false}
                    className="border-tab-icon"
                  />
                )}
                <span className="border-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right side - Conditional button */}
          {activeTab === "customers reviews" && (
            <div className="border-tabs-right">
              <button className="border-tab-custom-button" onClick={onWriteReviewClick}>
                Write Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorderTabs;