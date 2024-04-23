using System.ComponentModel.DataAnnotations;

namespace MoneyGer.Server.Dtos
{
    public class RoleAssignDto
    {
        public string UserId {get;set;} = null;
        public string RoleId {get;set;} =  null;
    }
}