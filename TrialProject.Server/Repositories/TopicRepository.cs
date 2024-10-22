using Dapper;
using System.Data.SqlClient;
using TrialProject.Server.Models;

namespace TrialProject.Server.Repositories
{
    public class TopicRepository
    {
        private readonly string _connectionString;

        public TopicRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DBConnectionString");
        }

        public async Task<IEnumerable<Topic>> GetTopics()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<Topic>
                ("SELECT TOPIC_ID AS TopicId, NAME AS Name FROM Topics");
        }

        public async Task<Topic> GetTopic(int topicId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"SELECT TOPIC_ID AS TopicId, NAME AS Name 
            FROM Topics
            WHERE TOPIC_ID = @TopicId";

            var topics = await connection.QueryAsync<Topic>
                (sql, new { TopicId = topicId });

            return topics.FirstOrDefault();
        }
    }
}
