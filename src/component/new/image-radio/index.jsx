"use client";
import Image from "next/image";
import { useId, useState } from "react";
import "./style.css";

export default function ImageRadio({
  name,
  options,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Options",
  className = "",
  showSeparators = true,
}) {
  const autoName = useId();
  const groupName = name ?? `image-radio-${autoName}`;
  const [internal, setInternal] = useState(
    defaultValue ?? options[0]?.value ?? ""
  );
  const isControlled = typeof value === "string";
  const current = isControlled ? value : internal;

  const handleChange = (val) => {
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`image-radio-group d-flex flex-wrap align-items-center ${className}`}
    >
      {options.map((opt, idx) => {
        const id = `${groupName}-${idx}`;
        const checked = current === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className="image-radio-item d-flex align-items-center"
          >
            {/* Hidden native input for accessibility */}
            <input
              id={id}
              name={groupName}
              type="radio"
              value={opt.value}
              checked={checked}
              onChange={() => handleChange(opt.value)}
              className="image-radio-input"
            />

            {/* Custom styled radio */}
            <span
              className={`image-radio-control ${checked ? "checked" : ""}`}
            />

            {/* Image card */}
            <span className="image-radio-card">
              <Image
                alt={opt.imageAlt ?? opt.label}
                src={opt.imageSrc || "/placeholder.svg"}
                width={70}
                height={50}
                className="image-radio-logo"
              />
            </span>
          </label>
        );
      })}
    </div>
  );
}
