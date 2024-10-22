using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrialProject.Server.Repositories;

namespace TrialProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly TopicRepository _topicRepository;
        private readonly ILogger<TopicController> _logger;

        public TopicController(ILogger<TopicController> logger, TopicRepository topicRepository)
        {
            _logger = logger;
            _topicRepository = topicRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var topics = await _topicRepository.GetTopics();
            return Ok(topics);
        }

        [HttpGet("{topicId}")]
        public async Task<IActionResult> Get(int topicId)
        {
            var topic = await _topicRepository.GetTopic(topicId);
            return Ok(topic);
        }
    }
}
