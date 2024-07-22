import UserInfo from './UserInfo';
import Announcements from './Announcements';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <UserInfo />
      <Announcements />
    </div>
  );
};

export default Sidebar;