import React from 'react';

function StudentItem({ student, onSelectStudent }) {
    return (
        <div className="course-item" onClick={() => onSelectStudent(student.studentId)}>
            <h3>{student.fullName}</h3>
        </div>
    );
}

export default StudentItem;
