import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config.tsx';

// 設定 Modal 的 root 元素（通常在應用初始化時設置一次）
Modal.setAppElement("#root");
axios.defaults.withCredentials = true;

// 定義了課程和學生的數據結構
interface Course {
  CourseID: number;
  CourseName: string;
  Location: string;
  StartDate: string;
  TimeSlot: string;
  DayOfWeek: string;
  TotalWeeks: number;
  CoachFirstName: string;
  CoachLastName: string;
  AvailableSpots: number;
}

interface Student {
  StudentID: number;
  FirstName: string;
  LastName: string;
}

// 使用 useState 定義了一些狀態變量來管理課程列表、學生列表、加載狀態、消息、選擇的學生和課程、模態框打開狀態。
const BookClass: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // 獲取課程和學生數據
  useEffect(() => {
    axios
      .get(API.USERS.GET_AVAILABLE_COURSES, {
        withCredentials: true,
      })
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
        setLoading(false);
      });

    axios
      .get(API.USERS.GET_STUDENTS, {
        withCredentials: true,
      })
      .then((response) => {
        setStudents(response.data);
        if (response.data.length > 0) {
          setSelectedStudent(response.data[0].StudentID);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []); /* useEffect 用於在組件加載時發送兩個請求，一個請求獲取可用課程列表，一個請求獲取學生列表。
  withCredentials: true 確保請求帶上用戶的憑證（如 Cookie），這對於需要驗證用戶身份的請求非常重要。 */

  // openModal 函數用於打開模態框並設置選中的課程 ID。
  const openModal = (courseID: number) => {
    if (students.length === 0) {
      window.alert('No kid registered, please register a kid first.');
      navigate('/dashboard/kidinfo'); // 跳轉到 KidInfo 頁面
    } else {
      setSelectedCourse(courseID);
      setModalIsOpen(true);
    }
  };

  // closeModal 函數用於關閉模態框並重置選擇的學生和課程。
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
    setSelectedCourse(null);
  };

  const bookCourse = () => {
    if (selectedStudent === null || selectedCourse === null) {
      window.alert('Please select a student.');
      return;
    }

    axios.post(API.USERS.BOOK_COURSE, { courseId: selectedCourse, studentId: selectedStudent }, { withCredentials: true })
      .then(response => {
        window.alert(response.data.message); // 使用 window.alert 顯示成功消息
        closeModal();
        // Reload the available courses
        axios.get('API.USERS.GET_AVAILABLE_COURSES', { withCredentials: true })
          .then(response => {
            setCourses(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the courses!', error);
          });
      })
      .catch(error => {
        console.error('There was an error booking the course!', error);
        window.alert('There was an error booking the course.'); // 使用 window.alert 顯示錯誤消息
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (courses.length === 0) {
    return <div>目前沒有可預定的課程</div>;
  }

  return (
    <div>
      {courses.map(course => (
        <div key={course.CourseID} className="card">
          <h3>{course.CourseName}</h3>
          <div className="card-info">
            <p>Location : {course.Location}</p>
            <p>Start Date : {course.StartDate}</p>
            <p>Time Slot : {course.TimeSlot}</p>
            <p>Day of Week : {course.DayOfWeek}</p>
            <p>Coach : {course.CoachFirstName} {course.CoachLastName}</p>
            <p>Available Spots : {course.AvailableSpots}</p>
            <p>Total Weeks : {course.TotalWeeks} </p>
          </div>
          <button onClick={() => openModal(course.CourseID)}>Book this course</button>
        </div>
      ))}

      {/* 當 modalIsOpen 為 true 時，模態框會被渲染 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Student"
      >
        <h2>Select a student to book the course</h2>
        <select
          value={selectedStudent ?? ''}
          onChange={e => setSelectedStudent(Number(e.target.value))}
        >
          <option value="" disabled>Select a student</option>
          {students.map(student => (
            <option key={student.StudentID} value={student.StudentID}>
              {student.StudentID} - {student.FirstName} {student.LastName}
            </option>
          ))}
        </select>
        <button onClick={bookCourse}>Confirm Booking</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default BookClass;
