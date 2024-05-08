using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
   }
}