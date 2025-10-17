"use client";
import * as React from "react";
import { FaPlus } from "react-icons/fa";
import "./style.css";
import { FaCircleCheck } from "react-icons/fa6";
import { RiEdit2Line } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";

const ProfileHeader = ({
  defaultCoverSrc,
  defaultAvatarSrc,
  name,
  location,
  statusLabel = "Active",
  className,
  loading,
  handleUpdatePicture
}) => {
  const [coverSrc, setCoverSrc] = React.useState(defaultCoverSrc);
  const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatarSrc);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { id } = useParams();

  const coverInputRef = React.useRef(null);
  const avatarInputRef = React.useRef(null);

  // Maximum file size: 2MB in bytes
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  // Validate file size and type
  const validateFile = (file) => {
    setError("");

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 2MB");
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPG, PNG, WebP, and GIF images are allowed");
    }

    return true;
  };

  // Fix: Handle avatar source properly
  React.useEffect(() => {
    if (defaultAvatarSrc) {
      setAvatarSrc(defaultAvatarSrc);
    }
  }, [defaultAvatarSrc]);

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverSrc(url);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    
    if (!file) return;

    try {
      // Validate file first
      validateFile(file);
      
      // Show preview immediately
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
      setError("");

      // Call the parent's update function
      handleUpdatePicture(file);
      
    } catch (error) {
      console.log("File validation error:", error);
      setError(error.message);
      // Clear the file input
      e.target.value = "";
    }
  }

  // Fix: Handle image error
  const handleImageError = (e) => {
    console.log("Image failed to load, using fallback");
    e.target.src = "/images/noimage.jpg";
  };

  return (
    <div className={`profile-header ${className}`}>
      {/* Cover */}
      <div className="cover-container">
        <div className="cover-image-container">
          <img
            src={coverSrc || "/placeholder.svg"}
            alt="Profile cover"
            className="cover-image"
            onError={handleImageError}
            sizes=""
          />
        </div>

        {/* Avatar */}
        <div className="avatar-container">
          <div className="avatar-wrapper-profile">
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <img
                src={avatarSrc}
                alt={`${name} profile photo`}
                className="avatar-image"
                onError={handleImageError}
              />
            )}
            {/* Upload button with plus icon */}
            <button
              className="avatar-upload-btn"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change profile photo"
            >
              <FaPlus className="plus-icon" />
            </button>
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleAvatarChange}
            aria-label="Change profile photo"
          />

          {/* Error message under avatar */}
          {error && (
            <div className="text-center mt-2">
              <small className="text-danger bg-light bg-opacity-75 px-2 py-1 rounded">
                {error}
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Info row */}
      <div className="info-section">
        <div className="user-info">
          <h1 className="user-name d-flex align-items-center gap-3">
            {name}{" "}
            {!id && (
              <button className="edit-button-container">
                <RiEdit2Line onClick={() => router.push(`/user/profile/1`)} />
              </button>
            )}
          </h1>
          {location && <p className="user-location">{location}</p>}
          {/* Status */}
          <div className="status-container">
            <FaCircleCheck className="status-indicator" />
            <span className="status-label">{statusLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;