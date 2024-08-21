import { db } from "../db.js";

// 創建一個方法來獲取會員資料
export const getUserInfo = (req, res) => {
  // 從 session 中獲取使用者 ID
  const userId = req.session.userId;
  // 如果沒有找到使用者 ID，返回 401 未授權的錯誤
  if (!userId) {
    return res.status(401).json("Unauthorized"); // 設定 HTTP 狀態碼為 401，表示未授權
  }

  // 查詢語句，從資料庫中選取使用者的名字和姓氏
  // 這行代碼定義了一個 SQL 查詢語句，使用 ? 作為佔位符，用於防止 SQL 注入。
  const q = "SELECT id,firstname, lastname, email, address, phone, points FROM users WHERE id = ?";
  // 執行查詢
  db.query(q, [userId], (err, data) => {
    // 如果查詢出錯，返回 500 伺服器錯誤
    if (err) return res.status(500).json(err); // 設定 HTTP 狀態碼為 500，表示伺服器內部錯誤
    // 如果查詢結果為空，返回 404 找不到使用者
    if (data.length === 0) return res.status(404).json("User not found"); // 設定 HTTP 狀態碼為 404，表示找不到資源
    // 查詢成功，返回使用者資訊
    return res.json(data[0]);
  });
};
/* 
上面的data 是一個數組，包含查詢到的用戶記錄, data[0] 是數組中的第一個
回饋會是：
{
    "firstname": "John",
    "lastname": "Doe"
  } */

    export const getSchedule = (req, res) => {
      const userId2 = req.session.userId;
      const { studentID } = req.query;
    
      let query = `
        SELECT 
            s.FirstName AS StudentFirstName,
            s.LastName AS StudentLastName,
            c.CourseName,
            c.Location,
            co.FirstName AS CoachFirstName,
            co.LastName AS CoachLastName,
            cs.Date,
            cs.TimeSlot,
            cs.WeekNumber
        FROM 
            Students s
        JOIN 
            Bookings b ON s.StudentID = b.StudentID
        JOIN 
            Courses c ON b.CourseID = c.CourseID
        JOIN 
            CourseSessions cs ON c.CourseID = cs.CourseID
        JOIN 
            Coaches co ON c.CoachID = co.CoachID
        WHERE 
            s.UserID = ? AND cs.Date >= CURDATE()
      `;
    
      const params = [userId2];
    
      if (studentID) {
        query += ' AND s.StudentID = ?';
        params.push(studentID);
      }
    
      query += ' ORDER BY cs.Date, cs.TimeSlot';
    
      db.query(query, params, (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json(results);
      });
    };

/* 印出來的樣子
[
    {
      "StudentFirstName": "John",
      "StudentLastName": "Doe",
      "CourseName": "Swimming Basics",
      "Location": "Pool A",
      "CoachFirstName": "Jane",
      "CoachLastName": "Smith",
      "Date": "2023-07-01",
      "TimeSlot": "10:00 AM",
      "WeekNumber": 1
    },
    {
      "StudentFirstName": "John",
      "StudentLastName": "Doe",
      "CourseName": "Swimming Basics",
      "Location": "Pool A",
      "CoachFirstName": "Jane",
      "CoachLastName": "Smith",
      "Date": "2023-07-08",
      "TimeSlot": "10:00 AM",
      "WeekNumber": 2
    },
    ...
  ] */

//顯示可預定的課程
export const getAvailableCourses = (req, res) => {
  const userId3 = req.session.userId; // 假設用戶 ID 存儲在 session 中

  // 查詢課表信息
  const query = "SELECT * FROM AvailableCourses";

  db.query(query, [userId3], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query for error" });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: "目前沒有預計課程" });
    }

    return res.status(200).json(results);
  });
};

// 獲取用戶的所有孩子資料
  export const getStudentsList = (req, res) => {
  const userId5 = req.session.userId;
  

  const query = "SELECT * FROM Students WHERE UserID = ?";
  db.query(query, [userId5], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    return res.status(200).json(results);
  });
};
/* 
export const bookCourse = (req, res) => {
  console.log('bookCourse called');
  console.log('Request body:', req.body);
  console.log('Session:', req.session); // 檢查會話內容

  const { courseId, studentId } = req.body;
  const userId7 = req.session.userId;

  console.log('userId7:', userId7); // 打印 userId7 的值

  if (!userId7) {
    return res.status(401).json({ message: "id7 Unauthorized", session: req.session });
  }

  res.status(200).json({ message: "Authorized", userId7 });
}; */

export const bookCourse = (req, res) => {

  const { courseId, studentId } = req.body;
  const userId7 = req.session.userId;

  if (!userId7) {
    return res.status(401).json({ message: "id7 Unauthorized", session: req.session });
  }

  // 檢查課程可用性並進行訂課
  const checkQuery = "SELECT AvailableSpots FROM Courses WHERE CourseID = ?";

  db.query(checkQuery, [courseId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: "Database query error" });
    }

    if (results.length === 0 || results[0].AvailableSpots <= 0) {
      return res.status(400).json({ message: "No available spots for this course." });
    }

    // 插入新的訂課記錄
    const insertQuery = "INSERT INTO Bookings (CourseID, StudentID, DateBooked, TimeBooked) VALUES (?, ?, ?, ?)";
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split("T")[0]; // 取得 YYYY-MM-DD 格式的日期
    const currentTime = currentDateTime.toISOString().split("T")[1].split(".")[0]; // 取得 HH:MM:SS 格式的時間
    const dateTime = `${currentDate} ${currentTime}`; // 合併成 YYYY-MM-DD HH:MM:SS 格式

    db.query(insertQuery, [courseId, studentId, currentDate, dateTime], (err, results) => {
      if (err) {
        console.error('Error booking the course:', err);
        return res.status(500).json({ error: "Error booking the course" });
      }

      // 更新可用名額
      const updateCourseQuery = "UPDATE Courses SET AvailableSpots = AvailableSpots - 1 WHERE CourseID = ?";
      db.query(updateCourseQuery, [courseId], (err, results) => {
        if (err) {
          console.error('Error updating available spots:', err);
          return res.status(500).json({ error: "Error updating available spots" });
        }

        // 減少用戶點數
        const updateUserPointsQuery = "UPDATE Users SET Points = Points - 1 WHERE id = ?";
        db.query(updateUserPointsQuery, [userId7], (err, results) => {
          if (err) {
            console.error('Error updating user points:', err);
            console.error('SQL Query:', updateUserPointsQuery); // 添加日誌輸出
            console.error('UserID:', userId7); // 添加日誌輸出
            return res.status(500).json({ error: "Error updating user points" });
          }

          return res.status(200).json({ message: "Successfully booked the course." });
        });
      });
    });
  });
};


/*// 添加新學生
export const addStudent = (req, res) => {
  const userId = req.session.userId;
  const { FirstName, LastName, Birthdate } = req.body;

  const query = "INSERT INTO Students (UserID, FirstName, LastName, Birthdate) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, FirstName, LastName, Birthdate], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    return res.status(201).json({ StudentID: results.insertId, UserID: userId, FirstName, LastName, Birthdate });
  });
};*/

// 添加新學生測試
export const addStudent = (req, res) => {
  const userId = req.session.userId;
  const { FirstName, LastName, Birthdate } = req.body;

  const query = "INSERT INTO Students (UserID, FirstName, LastName, Birthdate) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, FirstName, LastName, Birthdate], (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database query error" });
      }

      const newStudentId = results.insertId;
      // 插入預設進度數據
      const defaultProgress = [
          // Little Fun Time
          [newStudentId, 1, '2023-07-01', 'Coach Linda', 'Enjoyed the activity'],
          [newStudentId, 2, '2023-07-03', 'Coach Linda', 'Completed successfully'],
          [newStudentId, 3, '2023-07-07', 'Coach Sharon', 'Baby is doing great!!'],
          [newStudentId, 4, '2023-07-11', 'Coach Sharon', 'Very comfortable in water'],
          // Little Floater
          [newStudentId, 5, '2023-07-15', 'Test Coach', 'Test progress feature'],
          [newStudentId, 6, '2023-07-15', 'Test Coach', 'Test progress feature'],
          [newStudentId, 7, '2023-07-17', 'Test Coach', 'Test progress feature'],

      ];

      const progressQuery = "INSERT INTO progress (student_id, item_id, completion_date, coach_signature, notes) VALUES ?";
      db.query(progressQuery, [defaultProgress], (err) => {
          if (err) {
              return res.status(500).json({ error: "Database query error while inserting default progress" });
          }
          return res.status(201).json({ StudentID: newStudentId, UserID: userId, FirstName, LastName, Birthdate });
      });
  });
};

// 更新學生信息
export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Birthdate } = req.body;

  const query = "UPDATE Students SET FirstName = ?, LastName = ?, Birthdate = ? WHERE StudentID = ?";
  db.query(query, [FirstName, LastName, Birthdate, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    return res.status(200).json({ message: "Student updated successfully" });
  });
};


// 更新會員資料
export const updateUserProfile = (req, res) => {
  const userId = req.session.userId;
  const { firstname, lastname, email, phone, address } = req.body;

  const q = "UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ? WHERE id = ?";
  db.query(q, [firstname, lastname, email, phone, address, userId], (err, results) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Profile updated successfully" });
  });
};
