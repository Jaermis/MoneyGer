using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateInventoryDto
    {
        public string Company{ get; set;} = null!;
        public string Product{ get; set;} = null!;
        public float Price{ get; set;}
        public int Quantity {get;set;}
    }
} 