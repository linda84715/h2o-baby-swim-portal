import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import StudentButtons from '../components/StudentButtons';
import Milestones from '../components/Milestones';
import ProgressTable from '../components/ProgressTable';


const MyProgress = () => {
    const [userId, setUserId] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [progressData, setProgressData] = useState([]);
    const navigate = useNavigate(); // 初始化 useNavigate

    // 獲取 userId
    useEffect(() => {
        axios.get('http://localhost:3033/api/users/userinfo')
            .then(res => {
                setUserId(res.data.id); // 假設後端返回的數據中包含用戶的 ID
            })
            .catch(err => console.error(err));
    }, []);

    // 獲取學生列表
    useEffect(() => {
        if (userId) {
            axios.get('http://localhost:3033/api/users/students')
                .then(res => {
                    setStudents(res.data);
                    if (res.data.length > 0) {
                        setSelectedStudent(res.data[0].StudentID); // 自動選擇第一個學生
                    }
                })
                .catch(err => console.error(err));
        }
    }, [userId]);

    // 獲取選定學生的進度數據
    useEffect(() => {
        if (selectedStudent) {
            axios.get(`http://localhost:3033/api/progress/${selectedStudent}`)
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

    return (
        <div className="my-progress">
            <div className="student-buttons">
                <StudentButtons students={students} onSelectStudent={setSelectedStudent} />
            </div>
            <div className="progress-section">
                <div className="milestones">
                    <Milestones progressData={progressData} />
                </div>
                <div className="progress-table">
                    <ProgressTable progressData={progressData} />
                </div>
            </div>
        </div>
    );
};

export default MyProgress;
