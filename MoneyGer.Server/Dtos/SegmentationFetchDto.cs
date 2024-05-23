using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class SegmentationFetchDto
    {
        public int Id { get; set; }
        public string Company { get; set;} = null!;
        public string Product { get; set;} = null!; 
        public string Date { get; set;} = null!;
        public int Sold {get;set;}
    }
}
