import { logout } from "@/redux/features/auth/authSlice";
import { persistor } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function Sidebar({ links = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    // 1️⃣ clear redux state + session storage
    dispatch(logout());

    // 2️⃣ purge persisted data from localStorage
    await persistor.purge();
    sessionStorage.clear()
    // 3️⃣ redirect to login page
    router.push("/user-auth/signin");
  };
  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image
          src={"/images/logo.png"}
          alt="Profile"
          width={353}
          height={190}
        />
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
          {links?.map((link, i) => (
            <li key={i} onClick={() => setIsOpen(false)}>
              <span>{link.icon && <link.icon />}</span>
              <Link href={link.href} prefetch={true}>
                {link.name}
              </Link>
            </li>
          ))}
          
          <li className="d-flex d-lg-none" onClick={() => setIsOpen(false)}>
            <span>
              <RiLogoutBoxLine />
            </span>
            <Link href="/user-auth/signin" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="side_menu2 sm2-end mb-5 d-none d-lg-block">
        <ul className="pt-0 m-0">
          <li className="pt-0 m-0">
            <span>
              <RiLogoutBoxLine />
            </span>
            <Link href="/user-auth/signin" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
