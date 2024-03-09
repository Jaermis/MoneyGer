using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class moneyger_users
    {
        [Key]
        [Required]
        public string WorkEmail { get; set; } = null!;

        public int AccountID { get; set; }
        [Required]
        public string UserPassword { get; set; } = null!;
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public DateTime DateCreated { get; set; }
    }
}
