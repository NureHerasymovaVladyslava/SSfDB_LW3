using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrialProject.Server.Repositories;

namespace TrialProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseBlockLogController : ControllerBase
    {
        private readonly CourseBlockLogRepository _courseBlockLogRepository;
        private readonly ILogger<CourseBlockLogController> _logger;

        public CourseBlockLogController(ILogger<CourseBlockLogController> logger, 
            CourseBlockLogRepository courseBlockLogRepository)
        {
            _logger = logger;
            _courseBlockLogRepository = courseBlockLogRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _courseBlockLogRepository.GetCourseBlockLogs();
            return Ok(logs);
        }
    }
}
