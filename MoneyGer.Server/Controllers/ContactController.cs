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
    [Authorize]
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
            
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingUser = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == currentUserId);

            var contact = new Contacts
            {
                Id = Guid.NewGuid().ToString(),
                Name = contactStatusDto.Name,
                Company = existingUser!.CompanyId,
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
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingUser = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == currentUserId);

            var contactsGroupedByCompany = await _context.Contacts
                .Where(c => c.Company == existingUser!.CompanyId)
                .Join(
                    _context.Status, // Join with the Statuses table
                    contact => contact.Status, // Join condition: contact's StatusId
                    status => status.Id, // Join condition: StatusId in the Statuses table
                    (contact, status) => new { contact, status } // Result selector
                )
                .Join(
                    _context.companies, // Join with the Companies table
                    temp => temp.contact.Company, // Join condition: contact's CompanyId
                    company => company.Id, // Join condition: CompanyId in the Companies table
                    (temp, company) => new ContactFetchDto // Result selector
                    {
                        Id = temp.contact.Id,
                        Name = temp.contact.Name,
                        Email = temp.contact.Email,
                        PhoneNumber = temp.contact.PhoneNumber,
                        Facebook = temp.contact.Facebook,
                        Twitter = temp.contact.Twitter,
                        Instagram = temp.contact.Instagram,
                        Status = temp.status.Name, // Populate Status with the corresponding status name
                        Company = company.Name // Populate Company with the corresponding company name
                    }
                )
                .ToListAsync();

            return Ok(contactsGroupedByCompany);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteContacts([FromBody] string[] contactIds)
        {
            var contactsToRemove = _context.Contacts.Where(c => contactIds.Contains(c.Id)).ToList();
            
            if (contactsToRemove.Any())
            {
                _context.Contacts.RemoveRange(contactsToRemove);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Contacts removed" });
            }

            return NotFound(new { message = "No contacts found with the provided IDs" });
        }
    }
}