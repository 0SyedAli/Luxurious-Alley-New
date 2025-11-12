import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
      </div>
      <h2>Let your hair, <br /> Speak for itself</h2>
      <p>Let's make your hair attractive</p>
    </div>
  );
}