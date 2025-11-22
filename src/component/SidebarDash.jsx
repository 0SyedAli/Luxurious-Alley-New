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
import { useState } from 'react';

export default function SidebarDash() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '/', name: 'Dashboard', icon: HiOutlineSquares2X2 },
    { href: '/myappointments', name: 'My Appointments', icon: IoCalendarOutline },
    { href: '/allproducts', name: 'Products', icon: BiMessageSquareDots },
    { href: '/allservices', name: 'Services', icon: MdMiscellaneousServices },
    { href: '/allstylist', name: 'Stylists', icon: FaUserTie },
    { href: '/inbox', name: 'Inbox', icon: MdDisplaySettings },
    { href: '/setting', name: 'Setting', icon: MdDisplaySettings },
  ];
  const handleLogout = async () => {
    // 1️⃣ clear redux state + session storage
    dispatch(logout());

    // 2️⃣ purge persisted data from localStorage
    await persistor.purge();

    // 3️⃣ redirect to login page
    router.push("/auth/signin");
  };
  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      <div className={`side_menu2 ${isOpen ? "open" : ""}`}>
        <div className="logo d-block d-lg-none">
          <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
        </div>
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ margin: "20px auto 0px" }}>
          x
        </button>
        <ul>
          {links.map((link, i) => (
            <li key={i} onClick={() => setIsOpen(false)}>
              <span>{link.icon && <link.icon />}</span>
              <Link
                href={`/dashboard${link.href}`}
                prefetch={true}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li className="d-flex d-lg-none" onClick={() => setIsOpen(false)}>
            <span><RiLogoutBoxLine /></span>
            <Link href="/auth/signin" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="side_menu2 sm2-end mb-5 d-none d-lg-block">
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