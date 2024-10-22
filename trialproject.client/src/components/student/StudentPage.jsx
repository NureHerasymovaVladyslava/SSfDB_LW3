import { useEffect, useState } from 'react';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';

function StudentPage() {
    const [students, setStudents] = useState();
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleStudentSelect = (studentId) => {
        async function getStudent(studentId) {
            const response = await fetch(`api/student/${studentId}`);
            const data = await response.json();
            setSelectedStudent(data);
        }

        getStudent(studentId);
    };

    useEffect(() => {
        async function getStudents() {
            const response = await fetch('api/student');
            const data = await response.json();
            setStudents(data);
        }

        getStudents();
    }, []);

    return (
        <div className="course-container">
            <div className="course-list-container">
                <StudentList students={students} onSelectStudent={handleStudentSelect} />
            </div>

            <div className="course-details-container" style={{ display: selectedStudent ? 'block' : 'none' }}>
                {selectedStudent && (
                    <StudentDetails student={selectedStudent} onBack={() => setSelectedStudent(null)} />
                )}
            </div>
        </div>
    );
}

export default StudentPage;