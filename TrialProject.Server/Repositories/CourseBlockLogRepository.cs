using Dapper;
using System.Data.SqlClient;
using TrialProject.Server.Models;

namespace TrialProject.Server.Repositories
{
    public class CourseBlockLogRepository
    {
        private readonly string _connectionString;

        public CourseBlockLogRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<CourseBlockLock>> GetCourseBlockLogs()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<CourseBlockLock>(
                @"SELECT COURSE_BLOCK_LOG_ID AS CourseBlockLockId, NAME AS Name, 
                DESCRIPTION AS Description, ADDITIONAL_INFO AS AdditionalInfo, PRICE AS Price, 
                TOPIC_ID AS TopicId, ATTEMPT_DATE AS AttemptDate FROM CoursesWeekendBlockLogs");
        }
    }
}
