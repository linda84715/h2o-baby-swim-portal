import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3033/api/auth/register", inputs)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  };
  

  console.log(inputs); // output:{username: '123', email: 'email', password: 'pass'}

  return (

    <div className="loginpage">
      <div className="wrapper">
        <h1>Register</h1>
        <form id="loginForm"> {/* 不需要 onSubmit */}
          <div className="login-box">
            <input 
              type="text" 
              placeholder="Username" 
              id="loginUsername" 
              name="username" 
              onChange={handleChange} 
              required 
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="login-box">
            <input 
              type="password" 
              placeholder="Password" 
              id="loginPassword" 
              name="password" 
              onChange={handleChange} 
              required 
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="login-box">
            <input 
              type="email" 
              placeholder="Email" 
              id="loginEmail" 
              name="email" 
              onChange={handleChange} 
              required 
            />
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button onClick={handleSubmit} className="btn">Register</button>
          
          <div className="register-link">
            <p>Do you have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
