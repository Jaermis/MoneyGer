using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class RoleResponseDto
    {
        public string? Id {get;set;}
        public string? Name {get;set;}
        public int TotalUsers { get; set; }
    }
}
