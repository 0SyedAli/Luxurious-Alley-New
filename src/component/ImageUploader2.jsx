"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { BiPlus, BiX } from "react-icons/bi";

export default function ImageUploader2({ initialImages = [], onChange }) {
  const [images, setImages] = useState(initialImages);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    onChange && onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {images.map((img, index) => (
        <div
          key={index}
          className="position-relative rounded overflow-hidden"
          style={{
            width: "130px",
            height: "130px",
          }}
        >
          <Image
            src={img.url}
            alt={`upload-${index}`}
            fill
            className="object-fit-cover rounded"
          />
          <button
            type="button"
            className="btn btn-sm position-absolute top-0 end-0 m-1 p-1 rounded-circle d-flex align-items-center justify-content-center"
            onClick={() => handleRemove(index)}
            style={{
              width: "22px",
              height: "22px",
              lineHeight: 0,
                background: "rgb(165 116 24)"
            }}
          >
            <BiX size={12} color="white" />
          </button>
        </div>
      ))}

      {/* Upload Button */}
      <div
        className="d-flex align-items-center justify-content-center rounded cursor-pointer"
        style={{
          width: "130px",
          height: "130px",
          cursor: "pointer",
          background: "#D49621"
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <BiPlus size={28} color="white" />
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
