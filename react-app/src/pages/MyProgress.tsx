import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentButtons from '../components/StudentButtons';
import Milestones from '../components/Milestones';
import ProgressTable from '../components/ProgressTable';
import { API } from '../../config'; // 確保路徑正確

interface Student {
    StudentID: number;
    FirstName: string;
    LastName: string;
    Birthdate: string;
}

const MyProgress: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [progressData, setProgressData] = useState<any[]>([]); // 假設 progressData 是數組

    useEffect(() => {
        axios.get(API.USERS.GET_USERINFO)
            .then(res => {
                setUserId(res.data.id);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (userId !== null) {
            axios.get(API.USERS.GET_STUDENTS)
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
        if (selectedStudent !== null) {
            axios.get(API.PROGRESS.GET_STUDENT(selectedStudent.toString())) // 轉換 selectedStudent 為字符串
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
                    selectedStudent={selectedStudent !== null ? selectedStudent : 0} // 默認值設置
                />
            </div>
            <div className="progress-section">
                <div className="milestones">
                    <Milestones progressData={progressData} studentName={selectedStudentName || ''} />
                </div>
                <div className="progress-table">
                    <ProgressTable progressData={progressData} studentName={selectedStudentName || ''} />
                </div>
            </div>
        </div>
    );
};

export default MyProgress;