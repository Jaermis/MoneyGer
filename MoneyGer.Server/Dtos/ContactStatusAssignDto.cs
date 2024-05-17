using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class ContactStatusAssignDto
    {
        [Key]
        public string Id {get;set;}
        public string Name { get; set; } = null!;
        public int Status { get; set; }
    }
}
