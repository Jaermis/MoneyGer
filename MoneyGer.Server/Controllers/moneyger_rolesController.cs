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
    public class moneyger_rolesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public moneyger_rolesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/moneyger_roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<moneyger_roles>> Getmoneyger_roles(int id)
        {
            var moneyger_roles = await _context.moneyger_roles.FindAsync(id);

            if (moneyger_roles == null)
            {
                return NotFound();
            }

            return moneyger_roles;
        }

        // PUT: api/moneyger_roles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmoneyger_roles(int id, moneyger_roles moneyger_roles)
        {
            if (id != moneyger_roles.RoleID)
            {
                return BadRequest();
            }

            _context.Entry(moneyger_roles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!moneyger_rolesExists(id))
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

        // POST: api/moneyger_roles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<moneyger_roles>> Postmoneyger_roles(moneyger_roles moneyger_roles)
        {
            _context.moneyger_roles.Add(moneyger_roles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmoneyger_roles", new { id = moneyger_roles.RoleID }, moneyger_roles);
        }

        // DELETE: api/moneyger_roles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletemoneyger_roles(int id)
        {
            var moneyger_roles = await _context.moneyger_roles.FindAsync(id);
            if (moneyger_roles == null)
            {
                return NotFound();
            }

            _context.moneyger_roles.Remove(moneyger_roles);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool moneyger_rolesExists(int id)
        {
            return _context.moneyger_roles.Any(e => e.RoleID == id);
        }
    }
}
