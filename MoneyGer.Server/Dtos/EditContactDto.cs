using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyGer.Server.Dtos
{
    public class EditContactDto
    {
        public string Name { get; set; } = null!;
        public string Company { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; } 
        public string? Facebook { get; set; } 
        public string? Twitter { get; set; } 
        public string? Instagram { get; set; }
    }
}