using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class ContactFetchDto
    {
        public string Id { get; set; }
        public string Name { get; set; } = null!;
        public string Company { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; } 
        public string? Facebook { get; set; } 
        public string? Twitter { get; set; } 
        public string? Instagram { get; set; }
        public string Status {get;set;} = null!; 
    }
}
