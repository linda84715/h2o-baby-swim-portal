import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 處理輸入變更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3033/api/auth/login", inputs, {
        withCredentials: true, // 包含 cookie 以便後端可以設置 session
      });
      navigate("/dashboard"); // 登錄成功後跳轉到首頁
    } catch (err: any) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="loginpage">
      <div className="wrapper">
        <h1>Login</h1>
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
              type="password" 
              placeholder="Password" 
              id="loginPassword" 
              name="password" 
              onChange={handleChange} 
              required 
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn">Login</button>
          {err && <p>{err}</p>}
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link> </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;