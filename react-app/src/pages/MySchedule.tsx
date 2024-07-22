import React, { useEffect, useState } from "react";
import axios from "axios";

interface CourseSession {
  StudentFirstName: string;
  StudentLastName: string;
  CourseName: string;
  Location: string;
  CoachFirstName: string;
  CoachLastName: string;
  Date: string;
  TimeSlot: string;
  WeekNumber: number;
}

interface Student {
  StudentID: number;
  FirstName: string;
  LastName: string;
}

const MySchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<CourseSession[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  useEffect(() => {
    // 獲取所有學生資料
    axios
      .get("http://localhost:3033/api/users/students", {
        withCredentials: true,
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });

    // 獲取課表
    axios
      .get("http://localhost:3033/api/users/schedule", {
        withCredentials: true,
      })
      .then((response) => {
        setSchedule(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the schedule!", error);
        setLoading(false);
      });
  }, []);

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentID = e.target.value === "all" ? null : Number(e.target.value);
    setSelectedStudent(studentID);

    const url =
      studentID === null
        ? "http://localhost:3033/api/users/schedule"
        : `http://localhost:3033/api/users/schedule?studentID=${studentID}`;

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the schedule!", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Schedule</h2>
      <label>
        Select Student: {/* 標籤，用於描述下拉選單的功能 */}
        <select onChange={handleStudentChange} value={selectedStudent ?? "all"}>
          {/* 下拉選單，當選項變更時觸發 handleStudentChange 函式 */}
          {/* 選定的選項是 selectedStudent 狀態，如果為 null，則設為 'all' */}
          <option value="all">All Students</option>
          {/* 預設選項，表示選擇所有學生 */}
          {students.map((student) => (
            // 對每個學生生成一個選項
            <option key={student.StudentID} value={student.StudentID}>
              {student.FirstName} {student.LastName}
              {/* 選項顯示學生的名字和姓氏 */}
            </option>
          ))}
        </select>
      </label>
      {schedule.length === 0 ? (
        <div>
          <p>目前沒有預計課程</p>
          <a href="/dashboard/book-class">我要訂課</a>
        </div>
      ) : (
        schedule.map((session, index) => (
          <div key={index} className="card">
            <h3>{session.CourseName}</h3>
            <div className="card-info">
              <p>
                Student: {session.StudentFirstName} {session.StudentLastName}
              </p>
              <p>
                Coach: {session.CoachFirstName} {session.CoachLastName}
              </p>
              <p>Location: {session.Location}</p>
              <p>Date: {new Date(session.Date).toLocaleDateString()}</p>
              <p>Time: {session.TimeSlot}</p>
              <p>Week: {session.WeekNumber}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MySchedule;
