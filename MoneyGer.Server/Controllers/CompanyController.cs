using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly UserManager<moneyger_users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public CompanyController(RoleManager<IdentityRole> roleManager, UserManager<moneyger_users> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

          [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyDto createCompanyDto)
        {
            if (string.IsNullOrEmpty(createCompanyDto.Name))
            {
                return BadRequest("Company name is required");
            }


            var company = new Company
            {
                Id = Guid.NewGuid().ToString(),
                Name = createCompanyDto.Name,
                Location = createCompanyDto.Location
            };

            _context.companies.Add(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Company Created Successfully" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            var companies = await _context.companies.ToListAsync();
            return Ok(companies);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.companies.FindAsync(id);

            if (company == null)
            {
                return NotFound("Company not Found");
            }

            _context.companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Company deleted" });
        }

        [HttpPost("AssignCompany")]
        public async Task<IActionResult> AssignCompany([FromBody] CompanyAssignDto companyAssignDto)
        {
            var user = await _userManager.FindByIdAsync(companyAssignDto.UserId);

            if (user is null)
            {
                return NotFound("User not found.");
            }

            var role = await _roleManager.FindByIdAsync(companyAssignDto.RoleId);

            if (role is null)
            {
                return NotFound("Role not found");
            }
            
            var company = await _context.companies.FindAsync(companyAssignDto.CompanyId);

            if (company is null)
            {
                return NotFound("Company not found");
            }

            // Check if the user already has a role assigned in the specified company
            var existingUserRole = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == user.Id && ucr.CompanyId == company.Id);

            if (existingUserRole != null)
            {
                // Update the role for the user in the specified company
                existingUserRole.RoleId = role.Id;
            }
            else
            {
                // Create a new entry for the user in the specified company
                var newUserRole = new UserCompanyRole
                {
                    UserId = user.Id,
                    RoleId = role.Id,
                    CompanyId = company.Id
                };

                _context.UserCompanyRole.Add(newUserRole);
                
                user.Company = company.Name;
                var result = await _userManager.UpdateAsync(user);

                if(!result.Succeeded)
                    return BadRequest(result);
            }
            await _context.SaveChangesAsync();

            return Ok(new { message = "Company assignment successful!" });
        }
    }
}