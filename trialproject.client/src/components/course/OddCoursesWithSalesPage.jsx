import React, { useState } from 'react';

function OddCoursesWithSalesPage() {
    const [inputValue, setInputValue] = useState(0);
    const [courses, setCourses] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/course/odd_by_sales?sales=${inputValue}`);

            if (response.ok) {
                const result = await response.json();
                setCourses(result);
                setError(null);
            } else {
                const errorText = await response.text();
                setCourses(null);
                setError(errorText);
            }
        } catch (error) {
            setCourses(null);
            setError(error.message);
        }
    };

    return (
        <div className='course-list-container'>
            <form onSubmit={handleSubmit} className='table-function-container'>
                <label>Get every second course with salses more than:  </label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Update input value in state
                />

                <button className="search-button" type="submit">Submit</button>
            </form>

            {error && <p>Error: {error}</p>}
            {courses !== null && (
                <table className="purchases-table">
                    <tr>
                        <th>Course</th>
                        <th>Topic</th>
                        <th>Sales</th>
                    </tr>
                    {
                        courses && courses.length > 0 && (
                        courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{course.topic}</td>
                                <td>{course.saleQuantity}</td>
                            </tr>
                        ))
                    )}
                </table>
            )}
        </div>
    );
}

export default OddCoursesWithSalesPage;