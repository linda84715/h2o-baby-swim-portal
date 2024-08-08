// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentButtons from '../components/StudentButtons';
import Milestones from '../components/Milestones';
import ProgressTable from '../components/ProgressTable';
import { API } from '../../config'; // 確保路徑正確

const MyProgress = () => {
    const [userId, setUserId] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [progressData, setProgressData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.USERS.GET_USERINFO, {
            withCredentials: true,
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          })
            .then(res => {
                setUserId(res.data.id);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(API.USERS.GET_STUDENTS, {
                withCredentials: true,
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                }
              })
                .then(res => {
                    setStudents(res.data);
                    if (res.data.length > 0) {
                        setSelectedStudent(res.data[0].StudentID);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [userId]);

    useEffect(() => {
        if (selectedStudent) {
            axios.get(API.PROGRESS.GET_STUDENT(selectedStudent), {
                withCredentials: true,
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                }
              })
                .then(res => setProgressData(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedStudent]);

    if (students.length === 0) {
        return (
            <div className="no-students">
                <p>Currently, there are no registered children. Click <a href="/dashboard/kidinfo">here</a> to register.</p>
            </div>
        );
    }

    const selectedStudentName = students.find(student => student.StudentID === selectedStudent)?.FirstName;

    return (
        <div className="my-progress">
            <div className="student-buttons">
                <StudentButtons 
                    students={students} 
                    onSelectStudent={setSelectedStudent} 
                    selectedStudent={selectedStudent} 
                />
            </div>
            <div className="progress-section">
                <div className="milestones">
                    <Milestones progressData={progressData} studentName={selectedStudentName} />
                </div>
                <div className="progress-table">
                    <ProgressTable progressData={progressData} studentName={selectedStudentName} />
                </div>
            </div>
        </div>
    );
};

export default MyProgress;
