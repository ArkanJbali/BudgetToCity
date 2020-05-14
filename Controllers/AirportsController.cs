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
    public class AirportsController : ControllerBase
    {
        private readonly BudgeToCityContext _context;
        public AirportsController(BudgeToCityContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAirports()
        {
            var data = await _context.Airports.ToListAsync();
            return Ok(data);

        }
        // GET: api/Airports
        /*[HttpGet]
        public IEnumerable<Airports> Get()
        {
            List<Airports> airports = new List<Airports>()
            {
                
               
                new Airports(){airportCode = "123", airportName="TLV"},
                new Airports(){airportCode = "333", airportName="SFO"},
                new Airports(){airportCode = "444", airportName="SAN"}
            };
            return airports;
        }*/

        // GET: api/Airports/5
        [HttpGet("{id}", Name = "GetAirports")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Airports
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Airports/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
