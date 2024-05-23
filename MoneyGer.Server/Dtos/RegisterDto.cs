using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public List<string>? Roles { get; set; }

        public string PhoneNumber {get;set;} = string.Empty;
    }
}
