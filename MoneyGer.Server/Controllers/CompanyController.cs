using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
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
        private readonly ApplicationDbContext _context;
        private readonly UserManager<moneyger_users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly EmailConfiguration _emailConfiguration;

        public CompanyController(ApplicationDbContext context,UserManager<moneyger_users> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailSender emailSender,
            EmailConfiguration emailConfiguration)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailSender =  emailSender;
            _emailConfiguration  = emailConfiguration;
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
                var existingUserRole = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == user.Id);

                if (existingUserRole != null)
                {
                    _context.UserCompanyRole.Remove(existingUserRole);
                    await _context.SaveChangesAsync();
                }

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

        [HttpGet("Employee")]
        public async Task<ActionResult<IEnumerable<Company>>> GetEmployees()
        {
            List<EmployeeDto> employees = new List<EmployeeDto>();
            var owner = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == owner);
            var role = await _roleManager.FindByNameAsync("Member");
            
            var companies = await _context.UserCompanyRole
            .Where(c=>c.CompanyId == company!.CompanyId && c.RoleId == role!.Id)
            .ToListAsync();

            if(companies is not null){
                foreach(var collect in companies){
                    var result = await _userManager.FindByIdAsync(collect.UserId);

                    employees.Add(new EmployeeDto{
                        Id = result!.Id,
                        Name = result!.FirstName + " " + result.LastName,
                        Email = result.Email!,
                        PhoneNumber = result.PhoneNumber
                    });
                }
                return Ok(employees);
            }

            return Ok(null);
        }

       [HttpDelete("DeleteCompany")]
        public async Task<IActionResult> DeleteCompany()
        {
            var owner = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var companyToClear = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == owner);
            // Retrieve the company and related entities
            var company = await _context.companies
                .Include(c => c.Contacts)
                .Include(c => c.Inventory)
                .Include(c => c.UserCompanyRoles)
                .Include(c => c.Sales)
                .FirstOrDefaultAsync(c => c.Id == companyToClear!.CompanyId);

            if (company == null)
            {
                return NotFound(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Company not found"
                });
            }

            var user = await _userManager.FindByIdAsync(company.Owner);

            if (user == null)
            {
                return NotFound(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "User not found"
                });
            }
            

            try
            {
                // Start a database transaction
                using var transaction = await _context.Database.BeginTransactionAsync();

                // Delete related entities
                _context.Contacts.RemoveRange(company.Contacts);
                _context.Inventory.RemoveRange(company.Inventory);
                _context.UserCompanyRole.RemoveRange(company.UserCompanyRoles);
                _context.Sales.RemoveRange(company.Sales);

                // Delete roles associated with the company
                var companyRoles = await _roleManager.Roles.Where(r => r.Name.Contains(company.Name)).ToListAsync();
                foreach (var role in companyRoles)
                {
                    await _roleManager.DeleteAsync(role);
                }

                // Update user records associated with the company
                var users = await _userManager.Users.Where(u => u.Company == company.Id).ToListAsync();
                foreach (var u in users)
                {
                    u.Company = "N/A"; // or any other desired value
                    await _userManager.UpdateAsync(u);
                }

                // Delete the company
                _context.companies.Remove(company);
                await _context.SaveChangesAsync();

                // Commit the transaction
                await transaction.CommitAsync();

                return Ok(new AuthResponseDto
                {
                    IsSuccess = true,
                    Message = "Company deleted successfully"
                });
            }
            catch (Exception ex)
            {
                // Rollback the transaction
                await _context.Database.RollbackTransactionAsync();

                return BadRequest(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = ex.Message
                });
            }
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

        [HttpDelete("DeleteEmployee")]
        public async Task<IActionResult> DeleteUserCompany([FromBody] string[] employeeIds)
        {
            var companyRole = _context.UserCompanyRole.Where(c => employeeIds.Contains(c.UserId)).ToList();

            if (companyRole == null)
            {
                return NotFound(new { message = "User not found" });
            }

            try{
            if (companyRole.Any())
            {
                foreach(var employee in companyRole){

                    var user = await _userManager.FindByIdAsync(employee.UserId);
                    user!.Company = "N/A";

                    await _userManager.UpdateAsync(user);        
                }

                _context.UserCompanyRole.RemoveRange(companyRole);

                await _context.SaveChangesAsync();
                return Ok(new { message = "Employee/s removed" });
            }

            return NotFound(new { message = "No employee/s found with the provided IDs" });
            }

            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("Invite")]
        public async Task<ActionResult> Invite([FromBody] string email) 
        {
            var owner = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == owner);

            var nameCompany = await _context.companies.FindAsync(company!.CompanyId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userManager.FindByEmailAsync(email);

            if(user is null){
                return BadRequest(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "User does not exist"
                });    
            }
            
            var emailSender = new EmailSender(_emailConfiguration);
            var confirmationSubject = "MoneyGer Invitation Link";
            var emailHeader = $"Invitation to {nameCompany!.Name}";
            var confirmationHtmlMessage = $"Dear {email}, enter this code to join the company: <strong>{company.CompanyId}</strong>";
            await emailSender.SendEmailAsync(email, confirmationSubject, confirmationHtmlMessage, emailHeader);


            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Invitation Link Sent Successfully!"
            });
        }
      
      [AllowAnonymous]
      [HttpPut("ClearCompanyData")]
        public async Task<IActionResult> ClearCompanyData()
        {
            var owner = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var companyToClear = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == owner);
            // Retrieve the company and related entities
            var company = await _context.companies
                .Include(c => c.Contacts)
                .Include(c => c.Inventory)
                .Include(c => c.Sales)
                .Include(c => c.Segmentations)
                .Include(c => c.UserCompanyRoles)
                .FirstOrDefaultAsync(c => c.Id == companyToClear!.CompanyId);

            if (company == null)
            {
                return NotFound(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Company not found"
                });
            }

    try
    {
        // Start a database transaction
        using var transaction = await _context.Database.BeginTransactionAsync();

        // Remove related entities
        _context.Contacts.RemoveRange(company.Contacts);
        _context.Inventory.RemoveRange(company.Inventory);
        _context.Sales.RemoveRange(company.Sales);
        _context.Segmentation.RemoveRange(company.Segmentations);


        // Update users associated with the company, except for the owner
        var users = await _userManager.Users.Where(u => u.Company == company.Id && u.Id != company.Owner).ToListAsync();
        foreach (var u in users)
        {
            u.Company = "N/A";
             // Update the Company property
            await _userManager.UpdateAsync(u);
        }

        
        await _context.SaveChangesAsync();

        // Commit the transaction
        await transaction.CommitAsync();

        return Ok(new AuthResponseDto
        {
            IsSuccess = true,
            Message = "Company data cleared successfully"
        });
    }
    catch (Exception ex)
    {
        // Rollback the transaction
        await _context.Database.RollbackTransactionAsync();

        return BadRequest(new AuthResponseDto
        {
            IsSuccess = false,
            Message = ex.Message
        });
    }
}
    }
}