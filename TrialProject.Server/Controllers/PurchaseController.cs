using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrialProject.Server.Repositories;

namespace TrialProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly PurchaseRepository _purchaseRepository;
        private readonly ILogger<PurchaseController> _logger;

        public PurchaseController(ILogger<PurchaseController> logger, PurchaseRepository purchaseRepository)
        {
            _logger = logger;
            _purchaseRepository = purchaseRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _purchaseRepository.GetPurchases();
            return Ok(courses);
        }
    }
}
