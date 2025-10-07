import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
      </div>
      <h4 className="side_h4">Your Business, Beautifully Organized</h4>
      <div className="side_bottom"></div>
      <div className="side_menu">
        <p>Transform your salon's workflow into a seamless, sophisticated experience that keeps everything running effortlessly.</p>
        <ul>
          <li>
            <span></span>
            <Link href="#!">Streamlined Scheduling</Link>
          </li>
          <li>
            <span></span>
            <Link href="#!">Integrated Payment Solutions</Link>
          </li>
          <li>
            <span></span>
            <Link href="#!">Client Engagement</Link>
          </li>
          <li>
            <span></span>
            <Link href="#!">Real-Time Analytics</Link>
          </li>
          <li>
            <span></span>
            <Link href="#!">Stress-Free Management</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}