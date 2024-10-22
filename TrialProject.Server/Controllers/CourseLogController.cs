using Microsoft.AspNetCore.Mvc;
using TrialProject.Server.Repositories;

namespace TrialProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseLogController : ControllerBase
    {
        private readonly CourseLogRepository _courseLogRepository;
        private readonly ILogger<CourseLogController> _logger;

        public CourseLogController(ILogger<CourseLogController> logger, CourseLogRepository courseLogRepository)
        {
            _logger = logger;
            _courseLogRepository = courseLogRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _courseLogRepository.GetCourseLogs();
            return Ok(logs);
        }
    }
}
