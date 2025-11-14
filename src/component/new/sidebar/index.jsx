import { logout } from "@/redux/features/auth/authSlice";
import { persistor } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function Sidebar({ links = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
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
            <Link href="/user-auth/signin" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
