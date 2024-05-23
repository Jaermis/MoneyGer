using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateSegmentationDto
    {
        public string? Company{ get; set;}
        public string? ProductId{ get; set;} 
        public int Sold {get;set;}
    }
} 