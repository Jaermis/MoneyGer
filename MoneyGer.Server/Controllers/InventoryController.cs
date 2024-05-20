using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController:ControllerBase //Modify this to cater needs when dealing with inventory. Add api for updating stocks
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        
        public InventoryController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddInventory([FromBody] CreateInventoryDto createInventoryDto)
        {
            if(string.IsNullOrEmpty(createInventoryDto.Product))
            {
                return BadRequest("Status name is required");
            }

            var roleExist = await _context.Status.FirstOrDefaultAsync(ucr => ucr.Name == createInventoryDto.Product);

            if(roleExist is not null) 
            {
                return BadRequest("Status already exist");
            }

            var add = new Inventory
            {
                Price = createInventoryDto.Price,
                Product = createInventoryDto.Product,
                Quantity = 0
            };

            try{
            _context.Inventory.Add(add);

            await _context.SaveChangesAsync();
            return Ok(new {message = "Status Created Successfully"});
            }
            catch(Exception e){
            return BadRequest("Role creation failed "+ e.StackTrace);
            }
        }

        [HttpGet("AllInventory")] //api/AllAttendees
        public async Task<ActionResult<IEnumerable<Attendee>>> GetAttendee()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);

            var companyInventory = await _context.Attendee
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

            return Ok(companyInventory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatus(string id)
        {
            var role = await _context.Status.FindAsync(id);

            if(role is null){
                return NotFound("Role not Found");
            }

            try
            {
                _context.Status.Remove(role);
                return Ok( new{message = "Role deleted"});
            }
            catch(Exception e){
            return BadRequest("Role deletion  failed. "+ e.StackTrace);
            }
        }
    }
}