import { Link } from "react-router-dom";

const DashboardButtons = () => {
  return (
    <div className="dashboard-buttons">
      <Link to="/dashboard/schedule">
        <button className="button1">My Schedule</button>
      </Link>
      <Link to="/dashboard/book-class">
        <button className="button1">Book Course</button>
      </Link>
      <Link to="/dashboard/edit-profile">
        <button className="button1">Member info</button>
      </Link>
      <Link to="/dashboard/kidinfo">
        <button className="button1">Kid info / Register Kid</button>
      </Link>
    </div>
  );
};

export default DashboardButtons;
