using TrialProject.Server.Models;
using Dapper;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Data;
using System.Data.Common;

namespace TrialProject.Server.Repositories
{
    public class CourseRepository
    {
        private readonly string _connectionString;

        public CourseRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<Course>> GetCourses()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<Course>
                ("SELECT COURSE_ID AS CourseId, NAME AS Name FROM Courses");
        }

        public async Task<Course> GetCourse(int courseId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT COURSE_ID AS CourseId, c.NAME AS Name, 
            DESCRIPTION AS Description, ADDITIONAL_INFO AS AdditionalInfo,
            PRICE AS Price, c.TOPIC_ID AS TopicId, t.NAME AS Name 
            FROM Courses c
            JOIN Topics t ON c.TOPIC_ID = t.TOPIC_ID
            WHERE c.COURSE_ID = @CourseId";

            var courses = await connection.QueryAsync<Course, Topic, Course>(
                sql,
                (course, topic) =>
                {
                    course.Topic = topic;
                    course.TopicId = topic.TopicId;
                    return course;
                }, new { CourseId = courseId }, splitOn: "TopicId");

            return courses.FirstOrDefault();
        }

        public async Task<IEnumerable<Course>> GetCoursesForStudent(int studentId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT c.COURSE_ID AS CourseId, NAME AS Name 
            FROM Courses c
            JOIN Purchases p ON c.COURSE_ID = p.COURSE_ID
            WHERE p.STUDENT_ID = @StudentId";

            return await connection.QueryAsync<Course>(
                sql, new { StudentId = studentId });
        }

        public async Task<IEnumerable<Course>> GetCoursesByTopic(int topicId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT COURSE_ID AS CourseId, NAME AS Name 
            FROM Courses
            WHERE TOPIC_ID = @TopicId";

            return await connection.QueryAsync<Course>(
                sql, new { TopicId = topicId });
        }

        public async Task<int> GetCourseCountByNamePart(string namePart)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QuerySingleAsync<int>("SELECT dbo.COUNT_COURSES(@NamePart)", new { NamePart = namePart });
        }

        public async Task<IEnumerable<CourseSale>> GetSecondCourseWithSales(int saleQuantity)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<CourseSale>(
                "SELECT name AS Name, topic AS Topic, sale_quantity AS SaleQuantity " +
                "FROM GET_COURSES(@MinSales)", new { MinSales = saleQuantity });
        }

        public async Task<IEnumerable<DiscountCourseResult>> DiscountCourses(int discountPercent, int totalSum)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<DiscountCourseResult>(
                "EXEC DISCOUNT_COURSES @DiscountPercent, @TotalSum",
                new { DiscountPercent = discountPercent, TotalSum = totalSum });
        }
    }
}
