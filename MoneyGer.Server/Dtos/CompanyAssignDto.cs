using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Dtos
{
    public class CompanyAssignDto
    {
        public string UserId {get;set;} = null;
        public string? CompanyId {get;set;}
    }
}