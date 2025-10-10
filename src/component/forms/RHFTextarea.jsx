// components/forms/RHFTextarea.jsx
"use client";

import React from "react";

const RHFTextarea = ({ name, label, placeholder, rows = 4, register, errors, ...rest }) => {
  const isInvalid = !!errors[name];

  return (
    <div className="form-group">
      <textarea
        id={name}
        placeholder={placeholder || label}
        rows={rows}
        {...register(name)}
        className={` ${isInvalid ? "is-invalid" : ""}`}
        {...rest}
      />
      {isInvalid && <div className="invalid-feedback">{errors[name]?.message}</div>}
    </div>
  );
};

export default RHFTextarea;
