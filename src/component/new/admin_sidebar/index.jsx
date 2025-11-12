"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar({ links = [] }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all session storage
    sessionStorage.clear();

    // Redirect to signin page
    router.push("/admin-auth/signin");
  };

  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
      </div>

      <div className="side_menu2">
        <ul>
          {links?.map((link, i) => (
            <li key={i}>
              <span>{link.icon && <link.icon />}</span>
              <Link href={link.href} prefetch={true}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="side_menu2 sm2-end mb-5">
        <ul className="pt-0 m-0">
          <li className="pt-0 m-0 cursor-pointer" onClick={handleLogout}>
            <span>
              <RiLogoutBoxLine />
            </span>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
