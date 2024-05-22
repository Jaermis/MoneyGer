using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateSaleDto
    {
        public float Profit{ get; set;}
        public float Revenue {get;set;}
        public float? Expenses {get;set;}
    }
} 