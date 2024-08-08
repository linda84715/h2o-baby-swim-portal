import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { db } from './db.js';
import progressRoutes from './routes/progress.js';

const app = express();

app.use(bodyParser.json());

// 設置 CORS 中間件，允許來自前端的跨域請求
app.use(cors({
  origin: 'https://linda84715.github.io', // 前端地址
  credentials: true // 允許攜帶 cookie
}));

const MySQLStoreSession = MySQLStore(session);

// 配置 session 中間件
const sessionStore = new MySQLStoreSession({
  expiration: 10800000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  },
  connectionLimit: 1,
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
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 設置 cookie 的過期時間（24 小時）
    secure: process.env.NODE_ENV === 'production', // 在生產環境下使用 secure cookie
    sameSite: 'None'
  }
}));

// 手動設置CORS標頭來確保ngrok不會覆蓋這些設置
app.use((req, res, next) => {
  
  res.header('Access-Control-Allow-Origin', 'https://linda84715.github.io');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// 路由設置
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/progress', progressRoutes);

// 測試路由
app.get('/test', (req, res) => {
  res.json('It works!');
});


/*const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); */

const dbport = process.env.PORT || 3001;

app.listen(dbport, () => console.log(`Server started on port ${dbport}`));

app.use(express.static('react-app')); //serving client side from express
//Json Middleware

