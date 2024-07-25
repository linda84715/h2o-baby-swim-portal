import React from 'react';

const StudentButtons = ({ students, onSelectStudent }) => {
    return (
        <div className="students-section">
            {students.map(student => (
                <button 
                    key={student.StudentID} 
                    onClick={() => onSelectStudent(student.StudentID)}>
                    {student.FirstName} {student.LastName}
                </button>
            ))}
        </div>
    );
};

export default StudentButtons;
