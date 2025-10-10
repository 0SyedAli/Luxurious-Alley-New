// components/forms/RHFInput.jsx
"use client";

import React from 'react';

// 'name', 'label', and 'register' are required props from RHF
const RHFInput = ({ name, label, type = 'text', placeholder, register, errors, ...rest }) => {
    // Determine if the input should show an error style
    const isInvalid = errors[name];

    return (
        <div className="form-group">
            <input
                id={name}
                type={type}
                placeholder={placeholder || label}
                // Use the spread operator to connect RHF register function
                {...register(name)}
                className={isInvalid ? 'input-error' : ''}
                {...rest}
            />
            {/* Display the error message */}
            {isInvalid && <p className="text-danger mt-1">{isInvalid.message}</p>}
        </div>
    );
};

export default RHFInput;