import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const BookClass: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3033/api/users/available-courses')
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
        setLoading(false);
      });
  }, []);

  const bookCourse = (courseID: number) => {
    axios.post('http://localhost:3033/api/users/book-course', { userId: 12, courseId: courseID })
      .then(response => {
        setMessage(response.data.message);
        // Reload the available courses
        axios.get('/api/available-courses')
          .then(response => {
            setCourses(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the courses!', error);
          });
      })
      .catch(error => {
        console.error('There was an error booking the course!', error);
        setMessage('There was an error booking the course.');
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
      {message && <div className="message">{message}</div>}
      {courses.map(course => (
        <div key={course.CourseID} className="course-card">
          <h3>{course.CourseName}</h3>
          <p>Location: {course.Location}</p>
          <p>Start Date: {course.StartDate}</p>
          <p>Time Slot: {course.TimeSlot}</p>
          <p>Day of Week: {course.DayOfWeek}</p>
          <p>Coach: {course.CoachFirstName} {course.CoachLastName}</p>
          <p>Available Spots: {course.AvailableSpots}</p>
          <button onClick={() => bookCourse(course.CourseID)}>Book this course</button>
        </div>
      ))}
    </div>
  );
};

export default BookClass;
