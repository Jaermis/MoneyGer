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
            
            var owner = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = new Company
            {
                Id = Guid.NewGuid().ToString(),
                Name = createCompanyDto.Name,
                Location = createCompanyDto.Location,
                Owner = owner!
            };

            _context.companies.Add(company);
            await _context.SaveChangesAsync();

            var user = await _userManager.FindByIdAsync(owner!);

            if(user != null){

                var role = await _roleManager.FindByNameAsync("Owner");

                var newUserRole = new UserCompanyRole
                {
                    UserId = user.Id,
                    RoleId = role!.Id,
                    CompanyId = company.Id
                };
                
                _context.UserCompanyRole.Add(newUserRole);
                await _context.SaveChangesAsync();

                user.Company = createCompanyDto.Name;
                await _userManager.UpdateAsync(user);
            }

            return Ok(new { message = "Company Created Successfully" });
        }

        [HttpGet("AllCompany")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            var companies = await _context.companies.ToListAsync();
            return Ok(companies);
        }

        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> DeleteCompany(string id)
        {
            var company = await _context.companies.FindAsync(id);

            if (company == null)
            {
                return NotFound("Company not Found");
            }
            var user = await _userManager.FindByIdAsync(company.Owner);

            if (user == null)
            {
                return NotFound("User not Found");
            }

            user.Company ="N/A";

            _context.companies.Remove(company);
            
           var result = await _userManager.UpdateAsync(user); //Updates 'Company' column for user info

                if (!result.Succeeded)
                    return BadRequest(result);

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

            var role = await _roleManager.FindByNameAsync("Member");

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
            var existingUserRole = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == user.Id);

            if (existingUserRole != null)
            {
                 _context.UserCompanyRole.Remove(existingUserRole);
                await _context.SaveChangesAsync();
            }
            
            // Create a new entry for the user in the specified company
            var newUserRole = new UserCompanyRole
            {
                UserId = user.Id,
                RoleId = role.Id,
                CompanyId = company.Id
            };

            try
            {
                _context.UserCompanyRole.Add(newUserRole); //Add newUserRole to the database

                user.Company = company.Name;
                var result = await _userManager.UpdateAsync(user); //Updates 'Company' column for user info

                if (!result.Succeeded)
                    return BadRequest(result);

                await _context.SaveChangesAsync();
            }

            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }

            return Ok(new { message = "Company assignment successful!" });

        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUserCompany([FromBody] CompanyAssignDto companyAssignDto)
        {
            var companyRole = await _context.UserCompanyRole.FindAsync(companyAssignDto.UserId, companyAssignDto.RoleId, companyAssignDto.CompanyId);

            if (companyRole == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _context.UserCompanyRole.Remove(companyRole);
                    
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

            return Ok(new { message = "User deleted" });
        }
    }
}