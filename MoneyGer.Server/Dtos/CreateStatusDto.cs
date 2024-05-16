using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateStatusDto
    {
        [Required]
        public string Name {get;set;} = null;
    }
}
