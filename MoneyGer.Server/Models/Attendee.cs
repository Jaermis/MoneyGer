

using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Models
{
    public class Attendee
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int DateId {get; set; }
    }
} 