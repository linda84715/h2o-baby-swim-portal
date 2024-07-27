import React from 'react';

const StudentButtons = ({ students, onSelectStudent, selectedStudent }) => {
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
