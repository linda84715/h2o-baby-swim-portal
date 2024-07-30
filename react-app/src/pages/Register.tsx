import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { API } from '../../config';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    points: 10 // 默認為 10
  });

  const navigate = useNavigate(); // 使用 useNavigate 來處理跳轉

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(API.AUTH.REGISTER, inputs);
      console.log(res);
      alert("Your account has been successfully registered!"); // 顯示註冊成功通知
      navigate("/login"); // 跳轉到 /dashboard
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="loginpage">
      <div className="wrapper">
        <h1>Register</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
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
              type="text"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="login-box">
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
            />
            <i className='bx bxs-user'></i>
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
          <button type="submit" className="btn">Register</button>
          <div className="register-link">
            <p>Do you have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
