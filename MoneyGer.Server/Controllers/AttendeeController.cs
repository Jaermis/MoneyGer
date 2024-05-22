using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
                        id_event = events.Id,
                        Id = attendees.Id,
                        Description  = events.Description,
                        DateStart  = events.DateStart,
                        EventTime = events.EventTime,
                    }
                ).ToListAsync();

            return Ok(eventAttendees);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteEvents([FromBody] int[] attendeeIds)
        {
            List<Events>eventsToRemove = new List<Events>();
            var attendeesToRemove = _context.Attendee.Where(c => attendeeIds.Contains(c.Id)).ToList();
            
            foreach(var attendees in attendeesToRemove){
                var eventToDelete = await _context.Events.FirstOrDefaultAsync(ucr => ucr.Id == attendees.DateId);

                if(eventToDelete is null){
                    return BadRequest();
                }

                eventsToRemove.Add(eventToDelete);
            }

            try{
            if (attendeesToRemove.Any())
            {
                _context.Attendee.RemoveRange(attendeesToRemove);
                _context.Events.RemoveRange(eventsToRemove);
                
                await _context.SaveChangesAsync();
                return Ok(new { message = "Contacts removed" });
            }

            return NotFound(new { message = "No contacts found with the provided IDs" });
            }
            catch(Exception ex){
                return BadRequest(new {message=ex.StackTrace});
            }
        }
    }
}