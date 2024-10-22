import { useEffect, useState } from 'react';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import CourseCountSearch from './CourseCountSearch';

function CoursePage() {
    const [courses, setCourses] = useState();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseSelect = (courseId) => {
        async function getCourse(courseId) {
            const response = await fetch(`api/course/${courseId}`);
            const data = await response.json();
            setSelectedCourse(data);
        }

        getCourse(courseId);
    };

    useEffect(() => {
        async function getCourses() {
            const response = await fetch('api/course');
            const data = await response.json();
            setCourses(data);
        }

        getCourses();
    }, []);

    return (
        <div className="course-container">
            <div className="course-list-container">
                <h2>Courses</h2>
                <CourseCountSearch/>
                <CourseList courses={courses} onSelectCourse={handleCourseSelect} />
            </div>

            <div className="course-details-container" style={{ display: selectedCourse ? 'block' : 'none' }}>
                {selectedCourse && (
                    <CourseDetails course={selectedCourse} onBack={() => setSelectedCourse(null)} />
                )}
            </div>
        </div>
    );
}

export default CoursePage;