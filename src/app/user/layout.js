
'use client'
import '../dashboard_main.css';
import Sidebar from '@/components/sidebar/index';
import Header from '@/components/header';
import { usePathname } from 'next/navigation';

export default function UserDashboardLayout({ children }) {

  const pathname = usePathname()

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content main-dashboard">
        <div className='dash_bg_image'></div>
        <Header />
        <div className="content" style={{
          borderTop: pathname === "/user/inbox" ? "1px solid #573D1A" : "none"
        }}>{children}</div>
      </div>
    </div>
  );
}