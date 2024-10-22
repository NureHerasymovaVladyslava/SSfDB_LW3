import React, { useState, useEffect } from 'react';

function TopicDetails({ topic, onBack }) {
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function getCourses() {
            const response = await fetch(`api/course/topic/${topic.topicId}`);
            const data = await response.json();
            setCourses(data);
        }

        if (topic) {
            getCourses();
        }
    }, [topic]);
    return (
        <div>
            <h2>{topic.name}</h2>
            <p><strong>Topic ID:</strong> {topic.topicId}</p>
            {courses ? (
                <>
                    <h4>Courses:</h4>
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

export default TopicDetails;
