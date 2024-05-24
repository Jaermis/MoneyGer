using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;
using System.Threading.Tasks;

namespace MoneyGer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportTicketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportTicketController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateReportTicket([FromBody] string description)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reportTicket = new ReportTicket
            {
                Description = description,
                DateStart = DateTime.Now.ToShortDateString()
            };

            try{
                _context.ReportTicket.Add(reportTicket);
                await _context.SaveChangesAsync(); 
            }
            catch(Exception e){
                return BadRequest(new {message = e.StackTrace});
            }

            return Ok(new { message = "Ticket submitted" });
        }
    }
}