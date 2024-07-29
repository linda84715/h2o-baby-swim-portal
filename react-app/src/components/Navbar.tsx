import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config.tsx';


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查使用者是否已登錄
    fetch(API.AUTH.CHECK_AUTH, {
      method: 'GET',
      credentials: 'include' // 確保傳遞cookie
    })
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
    .catch(error => {
      console.error('Error checking auth status:', error);
    });
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:3033/api/auth/logout', {
      method: 'POST',
      credentials: 'include' // 確保傳遞cookie
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Logout successful.') {
        alert('You have been logged out.');
        setIsLoggedIn(false);
        navigate('/');
      }
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <h1>H2O Baby Swim</h1> {/*<img src={Logo} alt="Logo" className="logo-image"/>*/}
        </div>
        <div className="links">
          <Link className='link' to='/'><h6>About Us</h6></Link>
          {isLoggedIn ? (
            <>
              <Link className='link' to='/dashboard/book-class'><h6>Booking</h6></Link>
              <Link className='link' to='/dashboard'><h6>Dashboard</h6></Link>
              <Link className='link' to='/myprogress'><h6>My Kid's Progress</h6></Link>
              <span className="write" onClick={handleLogout}><h6>Logout</h6></span>
            </>
          ) : (
            <Link className="write" to='/login'><h6>Login</h6></Link>
          )}
        </div>
      </div>
    </div>  
  );
};

export default Navbar;
