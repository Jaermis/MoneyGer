using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateCompanyDto
    {
        public string Id;
       [Required(ErrorMessage ="Company Name is required.")]
        public string Name {get;set;} = null;
        public string Location{get;set;} = null;
    }
}
