using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class UserDetailDto
    {
        public string? Id {get;set;}
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public string? Email {get;set;}
        public string[]? Roles {get;set;}
        public string? PhoneNumber {get;set;}
        public bool PhoneNumberConfirmed {get;set;}
        public bool TwoFactorEnabled {get;set;}
        public int AccessFailedCount {get;set;}
        public string? Company {get;set;}
    }
}