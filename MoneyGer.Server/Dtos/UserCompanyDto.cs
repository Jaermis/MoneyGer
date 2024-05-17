using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class UserCompanyDto
    {
        public string User {get;set;} = null;
        public string Role {get;set;} =  null;
        public string Company {get;set;} = null;
    }
}