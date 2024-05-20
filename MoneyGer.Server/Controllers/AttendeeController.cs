using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Migrations;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeController : ControllerBase
    {
        private readonly UserManager<moneyger_users> _userManager;
        private readonly ApplicationDbContext _context;

          public AttendeeController(UserManager<moneyger_users> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AssignAttendee([FromBody] AssignAttendeeDto assignAttendeeDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingUser = await _context.Attendee.FirstOrDefaultAsync(ucr => ucr.UserId == currentUserId);

            var attendee = new Attendee
            {
                    UserId = currentUserId,
                    DateId = assignAttendeeDto.DateId,
            };

                _context.Attendee.Add(attendee);
                await _context.SaveChangesAsync();

         return Ok(new { message = "Attendee attends event successfully" });      
        }
        
        [HttpGet("AllAttendees")] //api/AllAttendees
        public async Task<ActionResult<IEnumerable<Attendee>>> GetAttendee()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var eventAttendees = await _context.Attendee
                .Where(a => a.UserId == currentUserId)
                .Join(
                    _context.Events,
                    attendees => attendees.DateId, 
                    events => events.Id,
                    (attendees, events) => new EventsFetchDto
                    {
                        Id = attendees.Id,
                        Description  = events.Description,
                        DateStart  = events.DateStart,
                        EventTime = events.EventTime,
                    }
                ).ToListAsync();

            return Ok(eventAttendees);
        }

        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Attendee.FindAsync(id);

            if (company is null)
            {
                return NotFound("Company not Found");
            }

            _context.Attendee.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact removed" });
        }
    }
}