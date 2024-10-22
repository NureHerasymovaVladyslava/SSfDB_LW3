import React, { useState } from 'react';

function ErrorProcedurePage() {
    const [discountPercent, setDiscountPercent] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [courses, setCourses] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/course/discount_courses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    discountPercent: parseInt(discountPercent),
                    totalSum: parseInt(totalSum),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCourses(data);
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
            <h2>Apply Discounts to Courses</h2>
            <form onSubmit={handleSubmit} className="table-function-container">
                <div>
                    <label htmlFor="discountPercent">Discount Percent:  </label>
                    <input
                        type="number"
                        id="discountPercent"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="totalSum">Total sum:  </label>
                    <input
                        type="number"
                        id="totalSum"
                        value={totalSum}
                        onChange={(e) => setTotalSum(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="search-button">Apply Discount</button>
            </form>

            {error && <p>{error}</p>}
            {courses !== null && (
                <table className="purchases-table">
                    <tr>
                        <th>Course</th>
                        <th>Old price</th>
                        <th>New price</th>
                        <th>Sale quantity</th>
                    </tr>
                    {
                        courses && courses.length > 0 && (
                            courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.name}</td>
                                    <td>{course.oldPrice}</td>
                                    <td>{course.newPrice}</td>
                                    <td>{course.saleQuantity}</td>
                                </tr>
                            ))
                        )}
                </table>
            )}
        </div>
    );
}

export default ErrorProcedurePage;