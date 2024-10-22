using TrialProject.Server.Models;
using System.Data.SqlClient;
using Dapper;

namespace TrialProject.Server.Repositories
{
    public class PurchaseRepository
    {
        private readonly string _connectionString;

        public PurchaseRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<Purchase>> GetPurchases()
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT c.COURSE_ID AS CourseId, c.NAME AS Name, 
            s.STUDENT_ID AS StudentId, s.FULL_NAME AS FullName 
            FROM Courses c
            JOIN Purchases p ON p.COURSE_ID = c.COURSE_ID
            JOIN Students s ON s.STUDENT_ID = p.STUDENT_ID
            ORDER BY c.NAME";

            var purchases = await connection.QueryAsync<Course, Student, Purchase>(
                sql,
                (course, student) =>
                {
                    var purchase = new Purchase();
                    purchase.Course = course;
                    purchase.CourseId = course.CourseId;
                    purchase.Student = student;
                    purchase.StudentId = student.StudentId;

                    return purchase;
                }, null, splitOn: "StudentId");

            return purchases;
        }
    }
}
