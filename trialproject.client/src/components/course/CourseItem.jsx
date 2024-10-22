import React from 'react';

function CourseItem({ course, onSelectCourse }) {
    return (
        <div className="course-item" onClick={() => onSelectCourse(course.courseId)}>
            <h3>{course.name}</h3>
        </div>
    );
}

export default CourseItem;
