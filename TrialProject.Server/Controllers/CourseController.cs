using TrialProject.Server.Models;
using TrialProject.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace TrialProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly CourseRepository _courseRepository;
        private readonly ILogger<CourseController> _logger;

        public CourseController(ILogger<CourseController> logger, CourseRepository courseRepository)
        {
            _logger = logger;
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseRepository.GetCourses();
            return Ok(courses);
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> Get(int courseId)
        {
            var course = await _courseRepository.GetCourse(courseId);
            return Ok(course);
        }

        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetForCourse(int studentId)
        {
            var courses = await _courseRepository.GetCoursesForStudent(studentId);
            return Ok(courses);
        }

        [HttpGet("topic/{topicId}")]
        public async Task<IActionResult> GetByTopic(int topicId)
        {
            var courses = await _courseRepository.GetCoursesByTopic(topicId);
            return Ok(courses);
        }

        [HttpGet("check_count")]
        public async Task<IActionResult> CheckCourseCount([FromQuery] string namePart)
        {
            var count = await _courseRepository.GetCourseCountByNamePart(namePart);
            return Ok(count);
        }

        [HttpGet("odd_by_sales")]
        public async Task<IActionResult> GetOddBySales([FromQuery] int sales)
        {
            var courseSales = await _courseRepository.GetSecondCourseWithSales(sales);
            return Ok(courseSales);
        }

        [HttpPut("discount_courses")]
        public async Task<IActionResult> DiscountCourses([FromBody] DiscountRequest input)
        {
            try
            {
                var discountResults = await _courseRepository
                    .DiscountCourses(input.DiscountPercent, input.TotalSum);
                return Ok(discountResults);
            }
            catch (SqlException ex)
            {
                return BadRequest($"Database error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class DiscountRequest
        {
            public int DiscountPercent { get; set; }
            public int TotalSum { get; set; }
        }
    }
}
