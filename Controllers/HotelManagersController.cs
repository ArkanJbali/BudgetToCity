using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetToCity.Models;

namespace BudgetToCity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelManagersController : ControllerBase
    {
        private readonly BudgeToCityContext _context;

        public HotelManagersController(BudgeToCityContext context)
        {
            _context = context;
        }

        // GET: api/HotelManagers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelManager>>> GetHotelManager()
        {
            return await _context.HotelManager.ToListAsync();
        }

        // GET: api/HotelManagers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotelManager>> GetHotelManager(int id)
        {
            var hotelManager = await _context.HotelManager.FindAsync(id);

            if (hotelManager == null)
            {
                return NotFound();
            }

            return hotelManager;
        }

        // PUT: api/HotelManagers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotelManager(int id, HotelManager hotelManager)
        {
            if (id != hotelManager.id)
            {
                return BadRequest();
            }

            _context.Entry(hotelManager).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelManagerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HotelManagers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HotelManager>> PostHotelManager(HotelManager hotelManager)
        {
            _context.HotelManager.Add(hotelManager);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHotelManager", new { id = hotelManager.id }, hotelManager);
        }

        // DELETE: api/HotelManagers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HotelManager>> DeleteHotelManager(int id)
        {
            var hotelManager = await _context.HotelManager.FindAsync(id);
            if (hotelManager == null)
            {
                return NotFound();
            }

            _context.HotelManager.Remove(hotelManager);
            await _context.SaveChangesAsync();

            return hotelManager;
        }

        private bool HotelManagerExists(int id)
        {
            return _context.HotelManager.Any(e => e.id == id);
        }
    }
}
