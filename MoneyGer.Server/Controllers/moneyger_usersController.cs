using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class moneyger_usersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public moneyger_usersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/moneyger_users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<moneyger_users>>> Getmoneyger_users()
        {
            return await _context.moneyger_users.ToListAsync();
        }

        // GET: api/moneyger_users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<moneyger_users>> Getmoneyger_users(string id)
        {
            var moneyger_users = await _context.moneyger_users.FindAsync(id);

            if (moneyger_users == null)
            {
                return NotFound();
            }

            return moneyger_users;
        }

        // PUT: api/moneyger_users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmoneyger_users(string id, moneyger_users moneyger_users)
        {
            if (id != moneyger_users.WorkEmail)
            {
                return BadRequest();
            }

            _context.Entry(moneyger_users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!moneyger_usersExists(id))
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

        // POST: api/moneyger_users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<moneyger_users>> Postmoneyger_users(moneyger_users moneyger_users)
        {
            _context.moneyger_users.Add(moneyger_users);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (moneyger_usersExists(moneyger_users.WorkEmail))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Getmoneyger_users", new { id = moneyger_users.WorkEmail }, moneyger_users);
        }

        // DELETE: api/moneyger_users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletemoneyger_users(string id)
        {
            var moneyger_users = await _context.moneyger_users.FindAsync(id);
            if (moneyger_users == null)
            {
                return NotFound();
            }

            _context.moneyger_users.Remove(moneyger_users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool moneyger_usersExists(string id)
        {
            return _context.moneyger_users.Any(e => e.WorkEmail == id);
        }
    }
}
