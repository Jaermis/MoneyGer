using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage ="Role Name is required.")]
        public string RoleName {get;set;} = null;
    }
}