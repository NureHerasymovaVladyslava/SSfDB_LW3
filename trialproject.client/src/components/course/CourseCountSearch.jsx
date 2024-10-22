import React, { useState } from 'react'

function CourseCountSearch() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/course/check_count?namePart=${inputValue}`);

            if (response.ok) {
                const result = await response.text();
                setResult(parseInt(result));
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Check course count:  </label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                
                <button className="search-button" type="submit">Submit</button>
            </form>

            {error && <p>{error}</p>}
            {result !== null && (
                <div>
                    <h3>Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default CourseCountSearch;