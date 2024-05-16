using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class Status
    {
        [Key]
        public int Id {get;set;}
        [Required]
        public string Name { get; set; } = null!;
    }
}
