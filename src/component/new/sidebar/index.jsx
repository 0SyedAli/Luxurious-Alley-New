import Image from "next/image";
import Link from "next/link";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdDisplaySettings, MdMiscellaneousServices } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar({ links = [] }) {
  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image
          src={"/images/logo.png"}
          alt="Profile"
          width={353}
          height={190}
        />
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
          <li className="pt-0 m-0">
            <span>
              <RiLogoutBoxLine />
            </span>
            <Link href="/auth/signin">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
