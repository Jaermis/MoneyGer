using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class moneyger_users : IdentityUser
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public DateTime DateCreated { get; set; }
        public string? Company {get; set; }
        public string? Instagram {get; set; }
        public string? Facebook {get; set; }
        public string? Twitter {get; set; }
        public override string? PhoneNumber { get; set; }
    }
}
