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

        // Navigation properties
    public ICollection<Contacts> Contacts { get; set; } = new List<Contacts>();
    public ICollection<Inventory> Inventory { get; set; } = new List<Inventory>();
    public ICollection<Sales> Sales { get; set; } = new List<Sales>();
    public ICollection<Segmentation> Segmentations { get; set; } = new List<Segmentation>();
    public ICollection<UserCompanyRole> UserCompanyRoles { get; set; } = new List<UserCompanyRole>();
    }
}
