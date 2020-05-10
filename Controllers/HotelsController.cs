using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetToCity.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetToCity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly DBContext _context;
        public HotelsController(DBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetHotels()
        {
            var data = await _context.Cities.ToListAsync();
            return Ok(data);

        }
    }
}