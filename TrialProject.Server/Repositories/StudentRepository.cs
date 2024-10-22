using Dapper;
using System.Data.SqlClient;
using TrialProject.Server.Models;

namespace TrialProject.Server.Repositories
{
    public class StudentRepository
    {
        private readonly string _connectionString;

        public StudentRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<Student>> GetStudents()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<Student>
                ("SELECT STUDENT_ID AS StudentId, FULL_NAME AS FullName FROM Students");
        }

        public async Task<Student> GetStudent(int studentId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT STUDENT_ID AS StudentId, 
            FULL_NAME AS FullName, USERNAME AS Username 
            FROM Students
            WHERE STUDENT_ID = @StudentId";

            var students = await connection.QueryAsync<Student>
                (sql,new { StudentId = studentId });

            return students.FirstOrDefault();
        }

        public async Task<IEnumerable<Student>> GetStudentsInCourse(int courseId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT s.STUDENT_ID AS StudentId, FULL_NAME AS FullName 
            FROM Students s
            JOIN Purchases p ON s.STUDENT_ID = p.STUDENT_ID
            WHERE p.COURSE_ID = @CourseId";

            return await connection.QueryAsync<Student>(
                sql, new { CourseId = courseId });
        }
    }
}
