import { Link } from 'react-router-dom';

const DashboardButtons = () => {
  return (
    <div className="dashboard-buttons">
      <button><Link to="/dashboard/schedule">My Schedule</Link></button>
      <button><Link to="/dashboard/book-class">Book Course</Link></button>
      <button><Link to="/dashboard/edit-profile">Member info</Link></button>
      <button><Link to="/dashboard/kidinfo">Kid info / Register Kid</Link></button>
    </div>
  );
};

export default DashboardButtons;