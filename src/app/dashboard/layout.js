"use client"
import Topbar from '@/component/Topbar';
import SidebarDash from '@/component/SidebarDash';
import '../dashboard_main.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
  const adminId = typeof window !== "undefined" ? sessionStorage.getItem("adminId") : null;

  useEffect(() => {
    if (!token || !adminId) router.replace("/auth/signin");
  }, [token, adminId, router])

  if (!token || !adminId) return null;

  return (
    <div className="dashboard-container">
      <SidebarDash />
      <div className="main-content main-dashboard">
        <div className='dash_bg_image'></div>
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}