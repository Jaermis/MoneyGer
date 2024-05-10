using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class Company
    {
        [Key]
        public string Id {get;set;}
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Location { get; set; } = null!;
        [Required]
        public string Owner {get;set;} = null!;
    }
}
