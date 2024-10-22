import React from 'react';
import StudentItem from './StudentItem';

function StudentList({ students, onSelectStudent }) {
    return (
        <div>
            <h2>Students</h2>
            {students && students.length > 0 ? (
                students.map((student) => (
                    <StudentItem key={student.studentId} student={student} onSelectStudent={onSelectStudent} />
                ))
            ) : (
                <p>No students found.</p>
            )}
        </div>
    );
}

export default StudentList;
