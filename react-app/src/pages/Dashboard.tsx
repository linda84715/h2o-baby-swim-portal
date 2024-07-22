import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardButtons from '../components/DashboardButtons';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardButtons />
        <div className="dashboard-display">
          <Outlet /> {/*<Outlet /> 是一個占位符，用於渲染其父路由中定義的子路由*/}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;