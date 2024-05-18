using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        public string Company{ get; set;} = null!;
        public string Product{ get; set;} = null!;
        public float Price{ get; set;}
        public int Quantity {get;set;}
    }
} 