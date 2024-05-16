using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly UserManager<moneyger_users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public ContactController(RoleManager<IdentityRole> roleManager, UserManager<moneyger_users> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] ContactStatusDto contactStatusDto)
        {
            if (string.IsNullOrEmpty(contactStatusDto.Name))
            {
                return BadRequest("Contact name is required");
            }
            
            var contact = new Contacts
            {
                Id = Guid.NewGuid().ToString(),
                Name = contactStatusDto.Name,
                Company = contactStatusDto.Company,
                PhoneNumber = contactStatusDto.PhoneNumber,
                Email = contactStatusDto.Email,
                Facebook = contactStatusDto.Facebook,
                Twitter = contactStatusDto.Twitter,
                Instagram = contactStatusDto.Instagram,
                Status = 1
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact Added Successfully" });
        }

        [HttpGet("AllCompany")]
        public async Task<ActionResult<IEnumerable<Contacts>>> GetContacts()
        {
            var companies = await _context.Contacts.ToListAsync();
            return Ok(companies);
        }

        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> DeleteCompany(string id)
        {
            var company = await _context.Contacts.FindAsync(id);

            if (company is null)
            {
                return NotFound("Company not Found");
            }

            _context.Contacts.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact removed" });
        }
    }
}