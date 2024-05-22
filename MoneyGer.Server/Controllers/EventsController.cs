using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class EventsController : ControllerBase
    {
       private readonly ApplicationDbContext _context;
        public EventsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpPost]
    public async Task<IActionResult> AddEvent([FromBody] CreateEventsDto createEventsDto)
    {
        CultureInfo originalCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo("ja-JP");
        
        if (string.IsNullOrEmpty(createEventsDto.Description))
        {
            return BadRequest("Event name is required");
        }

        var eventsModel = new Events
        {
            Description = createEventsDto.Description,
            DateStart = createEventsDto.DateStart.ToShortDateString(),
            EventTime = createEventsDto.EventTime
        };

        _context.Events.Add(eventsModel);
        await _context.SaveChangesAsync();
        
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingUser = await _context.Attendee.FirstOrDefaultAsync(ucr => ucr.UserId == currentUserId);

        var attendee = new Attendee
        {
                UserId = currentUserId,
                DateId = eventsModel.Id,
        };

        _context.Attendee.Add(attendee);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Contact Added Successfully" });
    }

    [HttpGet("Events")]
    public async Task<ActionResult<IEnumerable<Events>>> GetEvents()
    {
        var events = await _context.Events
        .ToListAsync();
        return Ok(events);
    }

    [HttpDelete("Delete{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var events = await _context.Events.FindAsync(id);

          if (events is null)
            {
                return NotFound("Events not Found");
            }

             _context.Events.Remove(events);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Events removed" });
    }
    }
  
}