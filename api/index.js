import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session'; // 使用 express-mysql-session 來存儲 session 到 MySQL
import { db } from './db.js'; // 確保導入數據庫連接
import progressRoutes from './routes/progress.js';

const app = express();



app.use(bodyParser.json()); // 解析 JSON 格式的請求體

// 設置 CORS 中間件，允許來自前端的跨域請求
/*app.use(cors({
  origin: 'http://localhost:5173', // 前端地址
  credentials: true // 允許攜帶 cookie
}));*/

app.use(cors({
  origin: 'https://linda84715.github.io',
  credentials: true
}));

const MySQLStoreSession = MySQLStore(session);

// 配置 session 中間件
const sessionStore = new MySQLStoreSession({
  expiration: 10800000,
  createDatabaseTable: true, // 自動創建 session 表
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  },
  connectionLimit: 1, // 防止創建多個連接
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'queenmary',
  database: 'user_system'
});

app.use(session({
  key: 'session_cookie_name', // 設置 cookie 的名稱
  secret: 'your_secret_key', // 用於加密 session ID 的 secret
  store: sessionStore,
  resave: false, // 不會在每次請求時強制保存 session
  saveUninitialized: false, // 只有在 session 有修改時才會保存
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 設置 cookie 的過期時間（24 小時）
        secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  }
}));

// 路由設置
app.use("/api/auth", authRoutes); // 設置 auth 路由
app.use("/api/users", userRoutes); // 設置 users 路由
app.use("/api/posts", postRoutes); // 設置 posts 路由
app.use('/api/progress', progressRoutes);

// 測試路由
app.get("/test", (req, res) => {
  res.json("It works!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});