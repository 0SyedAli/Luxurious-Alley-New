"use client";
import "../dashboard_main.css";
import Sidebar from "@/component/new/admin_sidebar";
import Header from "@/component/new/header";
import { usePathname } from "next/navigation";
import "./style.css";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdDisplaySettings } from "react-icons/md";

const adminLinks = [
  { href: "/admin", name: "Home", icon: HiOutlineSquares2X2 },
  { href: "/admin/all-users", name: "All Users", icon: IoCalendarOutline },
  { href: "/admin/all-vendors", name: "All Vendors", icon: BiMessageSquareDots },
  { href: "/admin/analytics", name: "Analytics", icon: MdDisplaySettings },
  { href: "/admin/settings", name: "Settings", icon: MdDisplaySettings },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="dashboard-container">
      <Sidebar links={adminLinks} />
      <div className="main-content main-dashboard">
        <div className="dash_bg_image"></div>
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
