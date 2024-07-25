import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:3033/api/auth/logout', {
      method: 'POST',
      credentials: 'include' // 確保傳遞cookie
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Logout successful.') {
        alert('You have been logged out.');
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
          <Link className='link' to='/'><h6>Booking</h6></Link>
          <Link className='link' to='/login'><h6>Login</h6></Link>
          <Link className='link' to='/dashboard'><h6>Dashboard</h6></Link>
          <Link className='link' to='/myprogress'><h6>My Progress</h6></Link>
          <span className='link' onClick={handleLogout}><h6>Logout</h6></span>
          <span className="write">
            <Link to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>  
  );
};

export default Navbar;
