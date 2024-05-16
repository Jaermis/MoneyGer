using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateCompanyDto
    {
       [Required(ErrorMessage ="Company Name is required.")]
        public string Name {get;set;} = null;
        [Required(ErrorMessage ="Company Location is required.")]
        public string Location{get;set;} = null;
    }
}
