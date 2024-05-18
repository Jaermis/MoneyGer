using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace MoneyGer.Server.Models
{
    public class Events
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; } =null!;
        public string DateStart { get; set; } = null!;
        public string? EventTime{get; set; }
    }

}