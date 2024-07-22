CREATE DATABASE user_system;  -- 創建一個名為 user_system 的新資料庫

USE user_system;  -- 選擇 user_system 資料庫

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 自動增長的用戶ID，作為主鍵
    username VARCHAR(255) NOT NULL,  -- 用戶名，不允許為空
    password VARCHAR(255) NOT NULL,  -- 密碼，不允許為空，將存儲加密后的密碼
    email VARCHAR(255) NOT NULL UNIQUE  -- 電子郵件地址，不允許為空，必須唯一
);
INSERT INTO users (username, password, email) 
VALUES ('john_doe', 'hashed_password', 'john.doe@example.com');
