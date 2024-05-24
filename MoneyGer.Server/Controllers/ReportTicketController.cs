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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReportTicket([FromBody] CreateReportTicketDto createReportTicketDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reportTicket = new ReportTicket
            {
                Description = createReportTicketDto.Description,
                DateStart = DateTime.Now.ToShortDateString()
            };

            _context.ReportTickets.Add(reportTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReportTicketById), new { id = reportTicket.Id }, reportTicket);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReportTicketById(int id)
        {
            var reportTicket = await _context.ReportTickets.FindAsync(id);

            if (reportTicket == null)
            {
                return NotFound();
            }

            return Ok(reportTicket);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllReportTickets()
        {
            var reportTickets = await _context.ReportTickets.ToListAsync();
            return Ok(reportTickets);
        }
    }
}