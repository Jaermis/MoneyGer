using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace MoneyGer.Server.Models
{
    public class Events
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; } =null!;
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime Time{get; set; }
    }

}