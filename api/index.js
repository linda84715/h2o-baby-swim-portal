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
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const MySQLStoreSession = MySQLStore(session);

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
  key: 'session_cookie_name',
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/progress', progressRoutes);

app.get('/test', (req, res) => {
  res.json('It works!');
});

const port = 3033;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
