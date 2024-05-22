using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Models
{
    public class Segmentation
    {
        [Key]
        public int Id { get; set; }
        public string Company{ get; set;} = null!;
        public int ProductId{ get; set;} 
        public string Date { get; set;} = null!;
        public int Sold {get;set;}
    }
} 