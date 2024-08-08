interface Student {
    StudentID: number;
    FirstName: string;
    LastName: string;
}

interface StudentButtonsProps {
    students: Student[];
    onSelectStudent: (studentID: number) => void;
    selectedStudent: number;
}

const StudentButtons: React.FC<StudentButtonsProps> = ({ students, onSelectStudent, selectedStudent }) => {
    return (
        <div className="student-buttons">
            {students.map(student => (
                <button
                    key={student.StudentID}
                    className={selectedStudent === student.StudentID ? 'selected' : 'default'}
                    onClick={() => onSelectStudent(student.StudentID)}
                >
                    {student.FirstName} {student.LastName}
                </button>
            ))}
        </div>
    );
};

export default StudentButtons;