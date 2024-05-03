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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly UserManager<moneyger_users> _userManager;
        private readonly ApplicationDbContext _context;

        public CompanyController(UserManager<moneyger_users> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

          [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyDto createCompanyDto)
        {
            if (string.IsNullOrEmpty(createCompanyDto.Name))
            {
                return BadRequest("Company name is required");
            }

            var company = new moneyger_company
            {
                Name = createCompanyDto.Name
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Company Created Successfully" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<moneyger_company>>> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();
            return Ok(companies);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound("Company not Found");
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Company deleted" });
        }

        [HttpPost("AssignCompany")]
        public async Task<IActionResult> AssignCompany ([FromBody] CompanyAssignDto companyAssignDto)
        {
            var user = await _userManager.FindByIdAsync(companyAssignDto.UserId);

            if(user is null)
            {
                return  NotFound("User not found.");
            }

           var company = _context.FindAsync(companyAssignDto.CompanyId);

            if(company is null)
            {
                return NotFound(" not found");
            }

            var result = _userManager.UpdateAsync(user,);

            if(result.Succeeded)
            {
                return Ok(new {message = "Role assignment successfull!"});
            }

            var error = result.Errors.FirstOrDefault();
            return BadRequest();
        }
    }
}