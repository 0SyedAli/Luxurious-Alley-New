
'use client'
import '../dashboard_main.css';
import Sidebar from '@/component/user/sidebar';
import Header from '@/component/user/header';
import { usePathname } from 'next/navigation';
import './style.css'

export default function UserDashboardLayout({ children }) {

  const pathname = usePathname()

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content main-dashboard">
        <div className='dash_bg_image'></div>
        <Header />
        <div className="content" >{children}</div>
      </div>
    </div>
  );
}