using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class InventoryManageDto
    {
        public int Id {get;set;}
        public string? Product{ get; set;}
        public float? Price{ get; set;}
        public int? Quantity {get;set;}
    }
}