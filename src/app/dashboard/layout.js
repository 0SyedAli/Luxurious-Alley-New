import Topbar from '@/component/Topbar';
import SidebarDash from '@/component/SidebarDash';
import '../dashboard_main.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <SidebarDash />
      <div className="main-content main-dashboard">
        <div className='dash_bg_image'></div>
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}