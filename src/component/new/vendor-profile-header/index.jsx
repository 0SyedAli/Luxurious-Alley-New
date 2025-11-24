"use client";

import * as React from "react";
import { FaPlus } from "react-icons/fa";
import "./style.css";
import { FaCircleCheck } from "react-icons/fa6";
import { RiEdit2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Image from "next/image";

const ProfileHeader = ({
  defaultCoverSrc,
  defaultAvatarSrc,
  name,
  location,
  statusLabel = "Active",
  className,
  profileChange,
  onAvatarChange,
  onCoverChange,
}) => {
  console.log("propImage", defaultCoverSrc);

  const [coverSrc, setCoverSrc] = useState(defaultCoverSrc);
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatarSrc);
  const router = useRouter();
  useEffect(() => {
    setCoverSrc(defaultCoverSrc);
  }, [defaultCoverSrc]);

  useEffect(() => {
    setAvatarSrc(defaultAvatarSrc);
  }, [defaultAvatarSrc]);



  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverSrc(url);
      onCoverChange?.(file);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
      onAvatarChange?.(file);
    }
  }
  console.log("stateImage", coverSrc);
  const getImageSrc = (img) => {
    if (!img) return "/images/profile_cover.png";

    // If blob URL, return directly
    if (img.startsWith("blob:") || img.startsWith("data:")) {
      return img;
    }

    // Otherwise, prepend server URL
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`;
  };
  return (
    <div className={`profile-header ${className}`}>
      {/* Cover */}
      <div className="cover-container">
        <div className="cover-image-container position-relative">
          <Image
            src={getImageSrc(coverSrc)}
            width={1000}
            height={300}
            alt="Profile cover"
            className="cover-image"
          />
          <div className="cover_image_change_btn">

            {/* Cover Upload */}
            {profileChange && (
              <button className="avatar-upload-btn"
                onClick={() => coverInputRef.current?.click()}
              >
                <FaPlus color="white" />
              </button>
            )}

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleCoverChange}
            />
          </div>

        </div>

        {/* Avatar */}
        <div className="avatar-container">
          <div className="avatar-wrapper-profile">
            <Image
              src={getImageSrc(avatarSrc)}
              width={150}
              height={150}
              alt="Profile photo"
              className="avatar-image"
            />
            {/* Avatar Upload */}
            {profileChange && (
              <button
                className="avatar-upload-btn"
                onClick={() => avatarInputRef.current?.click()}
              >
                <FaPlus />
              </button>
            )}
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {!profileChange && (
        <div className="info-section">
          <div className="user-info">
            <h1 className="user-name d-flex align-items-center gap-3">
              {name}
              <button className="edit-button-container">
                <RiEdit2Line onClick={() => router.push(`/dashboard/setting`)} />
              </button>
            </h1>

            {location && <p className="user-location">{location}</p>}

            <div className="status-container">
              <FaCircleCheck className="status-indicator" />
              <span className="status-label">{statusLabel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
