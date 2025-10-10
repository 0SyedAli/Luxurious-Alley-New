// components/Button.jsx
"use client";

import React from 'react';

const MyButton = ({ children, type = 'submit', className = 'theme-btn2', disabled, isLoading }) => {
    return (
        <button
            type={type}
            className={className}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default MyButton;