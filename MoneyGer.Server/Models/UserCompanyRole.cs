using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyGer.Server.Models
{
    public class UserCompanyRole
    {
        public string UserId {get;set;} = null!;
        public string RoleId { get; set; } = null!;
        public string CompanyId { get; set; } = null!;
    }
}