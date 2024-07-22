import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // 更換為您的 MySQL 用戶名
    password: 'queenmary',    // 更換為您的 MySQL 密碼
    database: 'user_system'
})


// 連接數據庫
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});
