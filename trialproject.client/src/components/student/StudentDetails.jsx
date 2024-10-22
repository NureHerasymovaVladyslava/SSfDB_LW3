import React, { useState, useEffect } from 'react';

function StudentDetails({ student, onBack }) {
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function getCourses() {
            const response = await fetch(`api/course/student/${student.studentId}`);
            const data = await response.json();
            setCourses(data);
        }

        if (student) {
            getCourses();
        }
    }, [student]);
    return (
        <div>
            <h2>{student.fullName}</h2>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Username:</strong> {student.username}</p>
            {courses ? (
                <>
                    <h4>Purchased courses:</h4>
                    {courses.map((course) => (
                        <p key={course.courseId}>{course.name}</p>
                    ))}
                </>
            ) : (
                <p>Loading courses...</p>
            )}
            <button onClick={onBack}>Close</button>
        </div>
    );
}

export default StudentDetails;
