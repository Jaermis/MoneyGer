using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class EmployeeDto
    {
        public string Id {get;set;} =null!;
        public string Name{ get; set;} = null!;
        public string Email {get;set;} = null!;
        public string? PhoneNumber {get;set;}
    }
} 