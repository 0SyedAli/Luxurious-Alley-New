import Sidebar from '../../component/SideBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dash_bg_image">

        </div>
        {children}
      </div>
    </div>
  );
}