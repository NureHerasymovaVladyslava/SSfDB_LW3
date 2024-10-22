import React, { useState, useEffect } from 'react';

function PurchasePage() {
    const [purchases, setPurchases] = useState();

    useEffect(() => {
        async function getPurchases() {
            const response = await fetch('api/purchase');
            const data = await response.json();
            setPurchases(data);
        }

        getPurchases();
    }, []);

  return (
      <div className='course-list-container'>
          <h2>Purchases</h2>
          <table className="purchases-table">
              <tr>
                  <th>Course</th>
                  <th>Course ID</th>
                  <th>Student</th>
                  <th>Student ID</th>
              </tr>
              {purchases && purchases.length > 0 && (
                  purchases.map((purchase) => (
                      <tr key={`${purchase.courseId}-${purchase.studentId}`}>
                        <td>{purchase.course.name}</td>
                        <td>{purchase.course.courseId}</td>
                        <td>{purchase.student.fullName}</td>
                        <td>{purchase.student.studentId}</td>
                      </tr>
                  ))
              )}
          </table>
      </div>
  );
}

export default PurchasePage;