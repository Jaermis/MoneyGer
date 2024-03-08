using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Models
{
    public class moneyger_roles
    {
        [Key]

        public int RoleID { get; set; }
        public string RoleDescription { get; set; } = null!;
    }
}
