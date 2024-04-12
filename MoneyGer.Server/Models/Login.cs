using Microsoft.AspNetCore.Identity;

namespace MoneyGer.Server.Models
{
    public class Login : IdentityUser
    {
        public required string WorkEmail { get; set; }
        public required string UserPassword { get; set; }
    }
}
