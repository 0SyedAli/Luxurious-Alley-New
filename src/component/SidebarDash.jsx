"use client"
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdDisplaySettings, MdMiscellaneousServices } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { persistor } from "@/redux/store"; // import persistor
import { useRouter } from "next/navigation";

export default function SidebarDash() {
  const dispatch = useDispatch();
  const router = useRouter();
  const links = [
    { href: '/', name: 'Dashboard', icon: HiOutlineSquares2X2 },
    { href: '/myappointments', name: 'My Appointments', icon: IoCalendarOutline },
    { href: '/allproducts', name: 'Products', icon: BiMessageSquareDots },
    { href: '/allservices', name: 'Services', icon: MdMiscellaneousServices },
    { href: '/addstylist', name: 'Add Stylist', icon: FaUserTie },
    { href: '/inbox', name: 'Inbox', icon: MdDisplaySettings },
    { href: '/setting', name: 'Settings', icon: MdDisplaySettings },
  ];
  const handleLogout = async () => {
    // 1️⃣ clear redux state + session storage
    dispatch(logout());

    // 2️⃣ purge persisted data from localStorage
    await persistor.purge();
    sessionStorage.clear();
    // 3️⃣ redirect to login page
    router.push("/auth/signin");
  };
  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
      </div>
      <div className="side_menu2 side_menu2_top">
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <span>{link.icon && <link.icon />}</span>
              <Link href={`/dashboard${link.href}`} prefetch={true}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="side_menu2 sm2-end mb-5">
        <ul className='pt-0 m-0'>
          <li className='pt-0 m-0'>
            <span><RiLogoutBoxLine /></span>
            <Link href="/auth/signin" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
{/* <li>
            <span><IoCalendarOutline /></span>
            <Link href="/dashboard/appointments">Appointments</Link>
          </li>
          <li>
            <span><BiMessageSquareDots /></span>
            <Link href="/dashboard/messages">Messages</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/account-setting">Account Settings</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/clients-profile">Clients Profiles</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/employees">Employees</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/services">Services</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/marketing">Marketing</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/refer-friend">Refer a Friend</Link>
          </li> */}