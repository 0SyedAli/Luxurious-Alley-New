"use client"
import { useRouter } from 'next/navigation';
import Sidebar from '../../component/SideBar';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
  const adminId = typeof window !== "undefined" ? sessionStorage.getItem("adminId") : null;

  useEffect(() => {
    if (token && adminId) router.replace("/dashboard");
  }, [token, adminId, router])

  if (token && adminId) return null;

  return (
    <div className="dashboard-container auth_dashboard">
      <Sidebar />
      <div className="dash_bg_image">
      </div>
        <div className="mc_left_line"></div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}