using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;
using NuGet.Common;
using RestSharp;

namespace MoneyGer.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class moneyger_usersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<moneyger_users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly EmailConfiguration _emailConfiguration;

        public moneyger_usersController(ApplicationDbContext context,UserManager<moneyger_users> userManager,
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

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new moneyger_users
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.Email,
                DateCreated = DateTime.UtcNow,
                Company = "N/A",
                Facebook = "N/A",
                Twitter = "N/A",
                Instagram = "N/A"
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            if(registerDto.Roles is null)
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                foreach (var role in registerDto.Roles)
                    await _userManager.AddToRoleAsync(user, role);
            }
            
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "moneyger_users", new { token, email = user.Email }, Request.Scheme);
            await _emailSender.SendEmailAsync(registerDto.Email, "Moneyger Confirmation email link", "Click here " + confirmationLink);

            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account Created Successfully!"
            });
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            // Validate token and email address
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(email))
            {
                // Invalid token or email address
                return BadRequest("Invalid token or email address.");
            }
            
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            
            // You would typically use your user manager or data access layer to perform this operation
            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                var emailSender = new EmailSender(_emailConfiguration);
                var confirmationSubject = "Confirmation Email";
                var emailHeader = "MoneyGer Confirmation Link";
                var confirmationHtmlMessage = $"Dear user, your email ({email}) has been confirmed successfully.";
                await emailSender.SendEmailAsync(email, confirmationSubject, confirmationHtmlMessage,emailHeader);

                return Ok("Email confirmed successfully.");
            }
            else
            {
                // Email confirmation failed
                return BadRequest("Email confirmation failed.");
            }
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
             if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); //PADAYONS 27:06
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if(user is null){
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Invalid Email"
                });
            }
            
            var result = await _userManager.CheckPasswordAsync(user,loginDto.Password);

            if(!result){
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Invalid Password"
                });
            }

            if(!string.Equals(loginDto.Email, "admin@example.com",StringComparison.OrdinalIgnoreCase)){
                var confirmed = await _userManager.IsEmailConfirmedAsync(user);

                if(!confirmed){
                    return Unauthorized(new AuthResponseDto{
                        IsSuccess = false,
                        Message = "Email is not confirmed"
                    });
                }
            }

            try{
            var token = GenerateToken(user);
            return Ok(new AuthResponseDto{
                Token = token,
                IsSuccess = true,
                Message = "Login Successfull"
            });

            }
            catch(Exception e){
                return BadRequest(new {message = e.StackTrace});
            }            
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);

            if(user is null)
            {
                return Ok(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "User does not exist"
                });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = $"https://localhost:4200/reset-password?email={user.Email}&token={WebUtility.UrlEncode(token)}";

            var emailSender = new EmailSender(_emailConfiguration);
            var emailSubject = "MoneyGer Forgot Password";
            var emailHeader = "MoneyGer Reset Password";
            var confirmationHtmlMessage = $"Dear {forgotPasswordDto.Email}, click this link to reset your password {resetLink}";
            await emailSender.SendEmailAsync(forgotPasswordDto.Email, emailSubject, confirmationHtmlMessage,emailHeader);

            return Ok(new AuthResponseDto{
                    IsSuccess = true,
                    Message = "Reset password email sent"
                });
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            resetPasswordDto.Token = WebUtility.UrlDecode(resetPasswordDto.Token);

            if(user is null)
                return BadRequest( new AuthResponseDto{
                    IsSuccess = false,
                    Message = "User does not exist"
                });
            
            var result = await _userManager.ResetPasswordAsync(user,resetPasswordDto.Token, resetPasswordDto.NewPassword);

            if(result.Succeeded)
            {
                return Ok(new AuthResponseDto{
                    IsSuccess = true,
                    Message = "Password reset Successfully"
                });
            }

            return BadRequest( new AuthResponseDto{
                IsSuccess = false,
                Message = result.Errors.FirstOrDefault()!.Description
            });
        }

        private string GenerateToken(moneyger_users user){
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII
            .GetBytes(_configuration.GetSection("JWTSetting").GetSection
            ("securityKey").Value!);

            var roles = _userManager.GetRolesAsync(user).Result;

            List<Claim> claims =
            [
                new (JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new (JwtRegisteredClaimNames.Name, user.FirstName + " " + user.LastName),
                new ("firstname", user.FirstName),
                new ("lastname", user.LastName),
                new ("company", user.Company), 
                new ("facebook",user.Facebook),
                new ("twitter",user.Twitter),
                new ("instagram",user.Instagram),
                new (JwtRegisteredClaimNames.NameId,user.Id ?? ""),
                new (JwtRegisteredClaimNames.Aud, _configuration.GetSection
                ("JWTSetting").GetSection("validAudience").Value!),
                new (JwtRegisteredClaimNames.Iss, _configuration.GetSection("JWTSetting")
                .GetSection("validIssuer").Value!)
            ];

            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        //api/moneyger_users/Detail
        [Authorize]
        [HttpGet("Detail")]
        public async Task<ActionResult<UserDetailDto>> GetUserDetail()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(currentUserId!);

            if(user is null){
                return NotFound(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "User Not Found"
                });
            }

            return Ok(new UserDetailDto{
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName =  user.LastName,
                Roles = [..await _userManager.GetRolesAsync(user)],
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                AccessFailedCount = user.AccessFailedCount,
                Company = user.Company
            });
        }

        //api/moneyger_users/UserDetail
        [Authorize]
        [HttpGet("UserDetail")]
        public async Task<ActionResult<UserCompanyDetailDto>> GetUserCompanyDetail()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            var user = await _userManager.FindByIdAsync(currentUserId!);

            if(user is null){
                return NotFound(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "User Not Found"
                });
            }

            var existingUser = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr => ucr.UserId == currentUserId);

            if(existingUser is null){
                return Ok(new UserCompanyDetailDto{
                User = user.FirstName +" "+ user.LastName,  
                Role = "New User"
            });
            }
            
            var role = await _roleManager.FindByIdAsync(existingUser.RoleId!);

            if(role is null){
                return NotFound(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Role Not Found"
                });
            }

            var company = await _context.companies.FindAsync(existingUser.CompanyId!);

            if(company is null){
                return NotFound(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Company Not Found"
                });
            }

            return Ok(new UserCompanyDetailDto{
                User = user.FirstName +" "+ user.LastName,  
                Role = role.Name!,
                Company = company.Name!
            });
        }

    
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDetails = users.Select(u => new UserDetailDto
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Roles = _userManager.GetRolesAsync(u).Result.ToArray(),
                Company = u.Company
            }).ToList();

            return Ok(userDetails);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if(user is null){
                return NotFound("User not Found");
            }

            var result = await _userManager.DeleteAsync(user);
            if(result.Succeeded)
            {
                return Ok( new{message = "User deleted"});
            }

            return BadRequest("User deletion failed.");
        }
        
        [HttpPost("EditProfile")]
        public async Task<ActionResult> EditProfile([FromBody] UserDetailDto editProfileDto)
        {
            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingUser = await _userManager.FindByIdAsync(user!);
             if (existingUser == null)
            {
                 return NotFound("User not found.");
            }


             if (!string.IsNullOrEmpty(editProfileDto.PhoneNumber))
            {
                existingUser.PhoneNumber = editProfileDto.PhoneNumber;
            }

             if (!string.IsNullOrEmpty(editProfileDto.Facebook))
            {
                existingUser.Facebook = editProfileDto.Facebook;
            }

             if (!string.IsNullOrEmpty(editProfileDto.Twitter))
            {
                existingUser.Twitter = editProfileDto.Twitter;
            }

             if (!string.IsNullOrEmpty(editProfileDto.Instagram))
            {
                existingUser.Instagram = editProfileDto.Instagram;
            }

            
            await _userManager.UpdateAsync(existingUser);

            
            return Ok(new {message = "Profile Edited Successfully"});
            }
    }
}
