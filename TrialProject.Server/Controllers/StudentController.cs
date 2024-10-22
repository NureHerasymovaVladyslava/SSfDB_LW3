using TrialProject.Server.Models;
using TrialProject.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TrialProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentRepository _studentRepository;
        private readonly ILogger<StudentController> _logger;

        public StudentController(ILogger<StudentController> logger, StudentRepository studentRepository)
        {
            _logger = logger;
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _studentRepository.GetStudents();
            return Ok(students);
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> Get(int studentId)
        {
            var course = await _studentRepository.GetStudent(studentId);
            return Ok(course);
        }

        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetForCourse(int courseId)
        {
            var students = await _studentRepository.GetStudentsInCourse(courseId);
            return Ok(students);
        }
    }
}
