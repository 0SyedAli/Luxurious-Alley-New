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
}) => {
  const [coverSrc, setCoverSrc] = React.useState(defaultCoverSrc);
  const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatarSrc);
  const router = useRouter();
  const { id } = useParams();

  const coverInputRef = React.useRef(null);
  const avatarInputRef = React.useRef(null);

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverSrc(url);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
    }
  }

  return (
    <div className={`profile-header ${className}`}>
      {/* Cover */}
      <div className="cover-container">
        <div className="cover-image-container">
          <img
            src={coverSrc || "/placeholder.svg"}
            alt="Profile cover"
            className="cover-image"
          />
        </div>

        <div className="cover-actions">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleCoverChange}
            aria-label="Change cover photo"
          />
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => coverInputRef.current?.click()}
          >
            Change cover
          </button>
        </div>

        {/* Avatar */}
        <div className="avatar-container">
          <div className="avatar-wrapper">
            <img
              src={avatarSrc || "/placeholder.svg"}
              alt={`${name} profile photo`}
              className="avatar-image"
            />
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

        {/* Edit button on the right */}
      </div>
    </div>
  );
};

export default ProfileHeader;
