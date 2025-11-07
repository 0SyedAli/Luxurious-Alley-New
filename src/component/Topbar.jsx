"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const defaultAvatar = "/images/profile_demo.jpg";
export default function Topbar() {
  const router = useRouter()
  // ✅ Logged-in user data
  const user = useSelector((state) => state.auth.user);
  const profileAvatar = user?.bImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.bImage}`
    : defaultAvatar;

  // ✅ User info
  const fullName = user?.bName || "Unknown User";
  const location = user?.bAddress.slice(0, 20) || user?.city || "Location not provided";
  return (
    <div className="dash_top_header my-4 ">
      <header className="d-flex align-items-center justify-content-between dth_content">
        <div>
          <h2 className="display-6 fw-semibold text-balance text-brand-primary mb-1">Hi Hair Affair,</h2>
          <p className="text-white small mb-0">A reason to dye</p>
        </div>
        <div className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard/profile")}>
          <Image
            src={profileAvatar}
            alt="User avatar"
            width={44}
            height={44}
            className="rounded-circle object-fit-cover text-white"
            style={{ width: 44, height: 44 }}
          />
          <div className="text-start me-2">
            <h4 className="fw-medium text-white">{fullName}</h4>
            <div className="text-white small">{location}</div>
          </div>
        </div>
      </header>
    </div>
  );
}