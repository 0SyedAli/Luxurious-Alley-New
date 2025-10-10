// components/forms/RHFSelect.jsx
"use client";

import React from 'react';

const RHFSelect = ({ name, label, options = [], register, errors, ...rest }) => {
    const isInvalid = errors[name];

    return (
        <div className="form-group">
            <select
                id={name}
                // Connect RHF register function
                {...register(name)}
                className={isInvalid ? 'select-error' : ''}
                {...rest}
            >
                {/* The first option is typically a placeholder */}
                <option value="">{label || 'Select'}</option> 
                
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Display the error message */}
            {isInvalid && <p className="text-danger mt-1">{isInvalid.message}</p>}
        </div>
    );
};

export default RHFSelect;