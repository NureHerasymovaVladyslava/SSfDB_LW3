import React, { useState, useEffect } from 'react';

function CourseDetails({ course, onBack }) {
    const [students, setStudents] = useState();

    useEffect(() => {
        async function getStudents() {
            const response = await fetch(`api/student/course/${course.courseId}`);
            const data = await response.json();
            setStudents(data);
        }

        if (course) {
            getStudents();
        }
    }, [course]);
    return (
        <div>
            <h2>{course.name}</h2>
            <p><strong>Course ID:</strong> {course.courseId}</p>
            <p><strong>Name:</strong> {course.name}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Topic:</strong> {course.topic.name}</p>
            <p><strong>Price:</strong> {course.price}</p>
            {students ? (
                <>
                    <h4>Students:</h4>
                    {students.map((student) => (
                        <p key={student.studentId}>{student.fullName}</p>
                    ))}
                </>
            ) : (
                <p>Loading students...</p>
            )}
            <button onClick={onBack}>Close</button>
        </div>
    );
}

export default CourseDetails;
