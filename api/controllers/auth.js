import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  
    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const user = data[0];

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

  // 設置 session
  req.session.userId = user.id; // 將用戶 ID 存儲在 session 中
  req.session.username = user.username; // 將用戶名存儲在 session 中

  res.status(200).json({ message: "Login successful!", userId: user.id }); //很重要！將userId傳給前端
  });
};


/*
  //看gpt
export const login = (req, res) => {
  
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const user = data[0];

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

    res.status(200).json("Login successful!");
  });
};*/

// 用於處理用戶登出


export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Could not log out due to server error." });
    }
    res.clearCookie('session_cookie_name', { path: '/' }); // 確保清除cookie的path與你的session cookie path一致
    res.status(200).json({ message: "Logout successful." });
  });
};


export const checkAuth = (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).json({ isAuthenticated: true, userId: req.session.userId });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
};