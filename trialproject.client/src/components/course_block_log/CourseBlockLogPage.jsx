import React, { useState, useEffect } from 'react';

function CourseBlockLogPage() {
    const [logs, setLogs] = useState();

    useEffect(() => {
        async function getLogs() {
            const response = await fetch('api/courseblocklog');
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
            <h2>Course Weekend Block Logs</h2>
            <table className="purchases-table">
                <tr>
                    <th>Course Log ID</th>
                    <th>Topic ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Additional info</th>
                    <th>Price</th>
                    <th>Attempt Date</th>
                </tr>
                {logs && logs.length > 0 && (
                    logs.map((log) => (
                        <tr key={log.courseBlockLockId}>
                            <td>{log.courseBlockLockId}</td>
                            <td>{log.topicId}</td>
                            <td>{log.name}</td>
                            <td>{log.description}</td>
                            <td>{log.additionalInfo}</td>
                            <td>{log.price}</td>
                            <td>{formatDate(log.attemptDate)}</td>
                        </tr>
                    ))
                )}
            </table>
        </div>
    );
}

export default CourseBlockLogPage;