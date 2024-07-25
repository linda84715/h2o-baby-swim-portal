import React from 'react';

const StudentButtons = ({ students, onSelectStudent, selectedStudent }) => {
    return (
        <div>
            {students.map(student => (
                <button
                    key={student.StudentID}
                    className={selectedStudent === student.StudentID ? 'selected' : ''}
                    onClick={() => onSelectStudent(student.StudentID)}
                >
                    {student.FirstName} {student.LastName}
                </button>
            ))}
        </div>
    );
};

export default StudentButtons;
