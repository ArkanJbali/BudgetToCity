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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersPostsController : ControllerBase
    {
        private readonly BudgeToCityContext _context;

        public UsersPostsController(BudgeToCityContext context)
        {
            _context = context;
        }

        // GET: api/UsersPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersPosts>>> GetUsersPosts()
        {
            return await _context.UsersPosts.ToListAsync();
        }

        // GET: api/UsersPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersPosts>> GetUsersPosts([FromRoute] int id)
        {
            var usersPosts = await _context.UsersPosts.FindAsync(id);

            if (usersPosts == null)
            {
                return NotFound();
            }

            return usersPosts;
        }

        // PUT: api/UsersPosts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersPosts([FromRoute] int id, [FromBody] UsersPosts usersPosts)
        {
            //Console.WriteLine(usersPosts.postTitle);
            //Console.WriteLine(id);

            if (id != usersPosts.postID)
            {
                
                return BadRequest();
            }

            _context.Entry(usersPosts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersPostsExists(id))
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

        // POST: api/UsersPosts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UsersPosts>> PostUsersPosts([FromBody] UsersPosts usersPosts)
        {
            _context.UsersPosts.Add(usersPosts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsersPosts", new { id = usersPosts.postID }, usersPosts);
        }

        // DELETE: api/UsersPosts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersPosts>> DeleteUsersPosts([FromRoute] int id)
        {
            var usersPosts = await _context.UsersPosts.FindAsync(id);
            if (usersPosts == null)
            {
                return NotFound();
            }

            _context.UsersPosts.Remove(usersPosts);
            await _context.SaveChangesAsync();

            return usersPosts;
        }

        private bool UsersPostsExists(int id)
        {
            return _context.UsersPosts.Any(e => e.postID == id);
        }
    }
}
