using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Models
{
    public class moneyger_users
    {
        [Key]

        public int AccountID { get; set; }
        public string WorkEmail { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime DateCreated { get; set; }
    }
}
