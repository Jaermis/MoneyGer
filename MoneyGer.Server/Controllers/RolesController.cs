using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController:ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<moneyger_users> _userManager;
        
        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<moneyger_users> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            if(string.IsNullOrEmpty(createRoleDto.RoleName))
            {
                return BadRequest("Role name is required");
            }

            var roleExist = await _roleManager.RoleExistsAsync(createRoleDto.RoleName);

            if(roleExist)
            {
                return BadRequest("Role already exist");
            }

            var roleResult = await  _roleManager.CreateAsync(new IdentityRole(createRoleDto.RoleName));

            if(roleResult.Succeeded)
            {
                return Ok(new {message = "Role Created Successfully"});
            }

            return BadRequest("Role creation failed");
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetRoles()
        {
            var user_roles = await _roleManager.Roles.ToListAsync();
            //List of users with total user count
            var roles =  user_roles.Select(r=>new RoleResponseDto{
                Id = r.Id,
                Name = r.Name,
                TotalUsers = _userManager.GetUsersInRoleAsync(r.Name!).Result.Count
            }).ToList();

            return Ok(roles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if(role is null){
                return NotFound("Role not Found");
            }

            var result = await _roleManager.DeleteAsync(role);
            if(result.Succeeded)
            {
                return Ok( new{message = "Role deleted"});
            }

            return BadRequest("Role deletion  failed.");
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole ([FromBody] RoleAssignDto roleAssignDto)
        {
            var user = await _userManager.FindByIdAsync(roleAssignDto.UserId);

            if(user is null)
            {
                return  NotFound("User not found.");
            }

            var role = await _roleManager.FindByIdAsync(roleAssignDto.RoleId);

            if(role is null)
            {
                return NotFound("Role not found");
            }

            var result = await _userManager.AddToRoleAsync(user, role.Name!);

            if(result.Succeeded)
            {
                return Ok(new {message = "Role assignment successfull!"});
            }

            var error = result.Errors.FirstOrDefault();

            return BadRequest(error!.Description);
        }
    }
}