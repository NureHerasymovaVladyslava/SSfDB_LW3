import React from 'react';
import CourseItem from './CourseItem';

function CourseList({ courses, onSelectCourse }) {
    return (
        courses && courses.length > 0 ? (
            courses.map((course) => (
                <CourseItem key={course.courseId} course={course} onSelectCourse={onSelectCourse} />
            ))
        ) : (
            <p>No courses available.</p>
        )
    );
}

export default CourseList;
