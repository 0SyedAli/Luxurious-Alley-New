
'use client'
import '../dashboard_main.css';
import Sidebar from '@/component/new/sidebar';
import Header from '@/component/new/header';
import { usePathname } from 'next/navigation';
import './style.css'
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { IoCalendarOutline } from 'react-icons/io5';
import { BiMessageSquareDots } from 'react-icons/bi';
import { MdDisplaySettings } from 'react-icons/md';

const userLinks = [
  { href: "/user", name: "Home", icon: HiOutlineSquares2X2 },
  { href: "/user", name: "Location", icon: IoCalendarOutline },
  { href: "/user/salons", name: "Salons", icon: BiMessageSquareDots },
  { href: "/user/inbox", name: "Inbox", icon: MdDisplaySettings },
  { href: "/user/profile", name: "Settings", icon: MdDisplaySettings },
];

export default function UserDashboardLayout({ children }) {
  // const pathname = usePathname()

  return (
    <div className="dashboard-container">
      <Sidebar links={userLinks}/>
      <div className="main-content main-dashboard">
        <div className='dash_bg_image'></div>
        <Header />
        <div className="content" >{children}</div>
      </div>
    </div>
  );
}