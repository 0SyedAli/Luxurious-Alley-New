// components/Button.jsx
"use client";

import React from 'react';
const loadingSvg = "/images/tube-spinner.svg";
const MyButton = ({ children, type = 'submit', className = 'theme-btn2', disabled, isLoading, onClick }) => {
    return (
        <button
            type={type}
            className={className}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {isLoading ? <><img src={loadingSvg} style={{width:"40px"}} /></> : children}
        </button>
    );
};

export default MyButton;