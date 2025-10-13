"use client";

const TextBox = ({ title, description }) => {
  return (
    <div
      className="p-3"
      style={{
        backgroundColor: "rgba(75, 64, 52, 0.9)",
        border: "1px solid #F4BB01",
        borderRadius: "16px",
      }}
    >
      <h4 className="text-light">{title}</h4>
      <p className="mb-0 text-light">{description}</p>
    </div>
  );
};

export default TextBox;
