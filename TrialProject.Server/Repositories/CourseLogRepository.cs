using Dapper;
using System.Data.SqlClient;
using TrialProject.Server.Models;

namespace TrialProject.Server.Repositories
{
    public class CourseLogRepository
    {
        private readonly string _connectionString;

        public CourseLogRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<CourseLog>> GetCourseLogs()
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT l.COURSE_LOG_ID AS CourseLogId,
            l.MODIFY_DATE AS ModifyDate, 
            l.COURSE_ID AS CourseId, c.NAME AS Name
            FROM CoursesLogs l
            JOIN Courses c ON l.COURSE_ID = c.COURSE_ID";

            var logs = await connection.QueryAsync<CourseLog, Course, CourseLog>(
                sql,
                (log, course) =>
                {
                    log.Course = course;
                    log.CourseId = course.CourseId;
                    return log;
                }, null, splitOn: "CourseId");

            return logs;
        }
    }
}
