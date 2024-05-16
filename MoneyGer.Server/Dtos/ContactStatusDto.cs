using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class ContactStatusDto
    {
        [Key]
        public string Id {get;set;}
        [Required]
        public string Name { get; set; } = null!;
        public string Company { get; set; } = null!;
        public string PhoneNumber { get; set; } = null;
        public string Email { get; set; } = null;
        public string Facebook { get; set; } = null;
        public string Twitter { get; set; } = null;
        public string Instagram { get; set; } = null;
        public int Status { get; set; }
    }
}
