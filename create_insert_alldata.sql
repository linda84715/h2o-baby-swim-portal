USE user_system;

DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS CourseSessions;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Coaches;
DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
   StudentID INT AUTO_INCREMENT PRIMARY KEY,
   UserID INT,
   FirstName VARCHAR(255),
   LastName VARCHAR(255),
   Birthdate DATE,
   FOREIGN KEY (UserID) REFERENCES users(id)
);

CREATE TABLE Coaches (
    CoachID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(20),
    DateOfBirth DATE NOT NULL,
    Address VARCHAR(255) NOT NULL,
    HireDate DATE NOT NULL
);

CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    Location VARCHAR(255) NOT NULL,
	StartDate DATE,         -- 新增，課程開始日期
    TimeSlot VARCHAR(20),   -- 表示上課時段
	DayOfWeek VARCHAR(10),  -- 表示星期幾進行課程
    CoachID INT,
    TotalWeeks INT,
    FOREIGN KEY (CoachID) REFERENCES Coaches(CoachID)
);

CREATE TABLE CourseSessions (
    SessionID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT,
    Date DATE,             -- 新增，表示課程具體的日期
    TimeSlot VARCHAR(20),  -- 使用原來 Courses 表的格式，例如 '12:00-13:00'
    WeekNumber INT, -- Course中的第幾週
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

CREATE TABLE Bookings (
  BookingID INT AUTO_INCREMENT PRIMARY KEY,
  CourseID INT,  -- 更改外鍵指向 CourseID
  StudentID INT,
  DateBooked DATE,
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

INSERT INTO Coaches (FirstName, LastName, Email, Phone, DateOfBirth, Address, HireDate)
VALUES 
('Sharon', 'Yeh', 'sharon.Yeh@example.com', '555-1234', '1995-07-15', '1234 Elm Street', '2019-01-01'),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '1982-08-25', '2345 Oak Avenue', '2019-06-15'),
('Jim', 'Taylor', 'jim.taylor@example.com', '555-8765', '1979-12-30', '3456 Pine Road', '2018-03-20'),
('Julia', 'Lee', 'julia.lee@example.com', '555-4321', '1984-05-05', '4567 Maple Lane', '2020-11-11'),
('Jacob', 'Brown', 'jacob.brown@example.com', '555-6789', '1975-10-10', '5678 Cedar Blvd', '2017-07-07');

INSERT INTO Students (UserID, FirstName, LastName, Birthdate)
VALUES 
(12, 'Alice', 'Johnson', '2017-03-01'),
(12, 'Bob', 'Smith', '2016-08-15'),
(12, 'Charlie', 'Brown', '2017-05-21'),
(12, 'David', 'Wilson', '2016-11-01'),
(12, 'Eva', 'Martinez', '2017-07-30');

INSERT INTO Courses (CourseName, Location, DayOfWeek, TimeSlot, StartDate, CoachID, TotalWeeks)
VALUES 
('1v1 Baby Class', 'Community Center', 'Wednesday', '12:00-13:00', '2024-01-03', 3, 10),
('1v1 Toddler Swimming Intro', 'Local Pool', 'Tuesday', '12:00-13:00', '2024-01-02', 2, 10),
('1v1 Adult Swim Beginners', 'Local Pool', 'Monday', '12:00-13:00', '2024-01-01', 1, 10),
('3v1 Water Babies Class', 'Community Center', 'Thursday', '12:00-13:00', '2024-01-04', 4, 10),
('4v1 Little Swimmers Level 1', 'Local Pool', 'Friday', '12:00-13:00', '2024-01-05', 5, 10);

INSERT INTO CourseSessions (CourseID, Date, TimeSlot, WeekNumber)
VALUES 
(1, '2024-01-01', '12:00-13:00', 1),
(1, '2024-01-08', '12:00-13:00', 2),
(1, '2024-01-15', '12:00-13:00', 3),
(1, '2024-01-22', '12:00-13:00', 4),
(1, '2024-01-29', '12:00-13:00', 5),
(1, '2024-02-05', '12:00-13:00', 6),
(1, '2024-02-12', '12:00-13:00', 7),
(1, '2024-02-19', '12:00-13:00', 8),
(1, '2024-02-26', '12:00-13:00', 9),
(1, '2024-03-04', '12:00-13:00', 10),
(2, '2024-01-01', '12:00-13:00', 1),
(2, '2024-01-08', '12:00-13:00', 2),
(2, '2024-01-15', '12:00-13:00', 3),
(2, '2024-01-22', '12:00-13:00', 4),
(2, '2024-01-29', '12:00-13:00', 5),
(2, '2024-02-05', '12:00-13:00', 6),
(2, '2024-02-12', '12:00-13:00', 7),
(2, '2024-02-19', '12:00-13:00', 8),
(2, '2024-02-26', '12:00-13:00', 9),
(2, '2024-03-04', '12:00-13:00', 10);

INSERT INTO Bookings (CourseID, StudentID, DateBooked)
VALUES 
(1, 1, '2023-12-01'),  -- Alice 預訂了 "1v1 Adult Swim Beginners"
(2, 2, '2023-12-02');  -- Bob 預訂了 "1v1 Toddler Swimming Intro"

