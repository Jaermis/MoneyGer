using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoneyGer.Server.Dtos;

namespace MoneyGer.Server.Dtos
{
    public class EditContactDto
    {
        public string? Id {get;set;}
        public string CompanyName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; } 
        public string? Facebook { get; set; } 
        public string? Twitter { get; set; } 
        public string? Instagram { get; set; }
    }
}