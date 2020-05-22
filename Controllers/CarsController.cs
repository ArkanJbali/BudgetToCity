using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetToCity.Model;
using BudgetToCity.Models;
using BudgetToCity.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetToCity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly BudgeToCityContext _context;
        public CarsController(BudgeToCityContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetCars()
        {
            var data = await _context.Cars.ToListAsync();
            return Ok(data);

        }
    }
}