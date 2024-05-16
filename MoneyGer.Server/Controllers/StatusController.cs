using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController:ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        
        public StatusController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStatus([FromBody] CreateStatusDto createStatusDto)
        {
            if(string.IsNullOrEmpty(createStatusDto.Name))
            {
                return BadRequest("Status name is required");
            }

            var roleExist = await _context.Status.FirstOrDefaultAsync(ucr => ucr.Name == createStatusDto.Name);

            if(roleExist is not null) 
            {
                return BadRequest("Status already exist");
            }

            var add = new Status
            {
                Name = createStatusDto.Name
            };

            try{
            _context.Status.Add(add);

            await _context.SaveChangesAsync();
            return Ok(new {message = "Status Created Successfully"});
            }
            catch(Exception e){
            return BadRequest("Role creation failed "+ e.StackTrace);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetStatus()
        {
            var user_roles = await _context.Status.ToListAsync();
            //List of Status with total user count
            var roles =  user_roles.Select(r=>new RoleResponseDto{
                Id = r.Id.ToString(),
                Name = r.Name,
            }).ToList();

            return Ok(roles);
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

        [Authorize(Roles = "Owner")]
        [HttpPost("AssignStatus")]
        public async Task<IActionResult> AssignStatus ([FromBody] ContactStatusDto contactStatusDto)
        {
            var user = await _context.Contacts.FindAsync(contactStatusDto.Id);

            if(user is null)
            {
                return  NotFound("User not found.");
            }

            var status = await _context.Status.FindAsync(contactStatusDto.Status);

            if(status is null)
            {
                return NotFound("Status not found");
            }

            user.Status = status.Id;
            try{
            _context.Contacts.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new {message = "Role assignment successfull!"});
            }
            catch(Exception e){            
            return BadRequest(e.StackTrace);
            }
        }
    }
}