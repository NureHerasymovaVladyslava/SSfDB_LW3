import React, { useState, useEffect } from 'react';

function CourseLogPage() {
    const [logs, setLogs] = useState();

    useEffect(() => {
        async function getLogs() {
            const response = await fetch('api/courselog');
            const data = await response.json();
            setLogs(data);
        }

        getLogs();
    }, []);

    function formatDate(dateStr) {
        const date = new Date(dateStr);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <div className='course-list-container'>
            <h2>Course Logs</h2>
            <table className="purchases-table">
                <tr>
                    <th>Course Log ID</th>
                    <th>Course ID</th>
                    <th>Course</th>
                    <th>Modification Date</th>
                </tr>
                {logs && logs.length > 0 && (
                    logs.map((log) => (
                        <tr key={log.courseLogId}>
                            <td>{log.courseLogId}</td>
                            <td>{log.course.courseId}</td>
                            <td>{log.course.name}</td>
                            <td>{formatDate(log.modifyDate)}</td>
                        </tr>
                    ))
                )}
            </table>
        </div>
    );
}

export default CourseLogPage;