using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Dtos
{
    public class UserCompanyDetailDto
    {
        public string User {get;set;} = null;
        public string Role {get;set;} =  null;
        public string Company {get;set;} = null;
    }
}