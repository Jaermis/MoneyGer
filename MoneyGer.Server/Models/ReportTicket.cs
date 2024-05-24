using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyGer.Server.Models
{
    public class ReportTicket
    {
        
        public int Id { get; set; }
        public string Description { get; set; } =null!;
        public string DateStart { get; set; } = null!;
    }
}