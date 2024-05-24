using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Dtos;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController:ControllerBase //Modify this to cater needs when dealing with inventory. Add api for updating stocks
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        
        public SaleController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet] //api/Sale
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);
            
            var companyInventory = await _context.Sales
                .Where(a => a.Company == company!.CompanyId)
                .ToListAsync();

            return Ok(companyInventory);
        }

        [HttpGet("Monthly")] //api/Sale
        public async Task<ActionResult<IEnumerable<Sales>>> GetMonthly()
        {
            var today = DateTime.Now.ToString("MM/yyyy");
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);
            
            var companyInventory = await _context.Sales
            .FirstOrDefaultAsync(a => a.Company == company!.CompanyId && a.Date == today);

            return Ok(companyInventory);
        }

        [HttpPost]
        public async Task<IActionResult> AddSale([FromBody] CreateSaleDto createSaleDto)
        {
            string today = DateTime.Now.ToString("MM/yyyy");
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);

            var salesExist = await _context.Sales.FirstOrDefaultAsync(ucr => ucr.Date == today && ucr.Company == company!.CompanyId);

            if(salesExist is not null) 
            {
                salesExist.Revenue += createSaleDto.Revenue;
 
                if (createSaleDto.Expenses is not null)
                {
                    salesExist.Expenses += createSaleDto.Expenses;
                }

                salesExist.Profit = salesExist.Revenue-(float)salesExist.Expenses!;

                _context.Sales.Update(salesExist);
            }

            else{
                var add = new Sales
                {
                    Date = today,
                    Company = company!.CompanyId,
                    Profit = 0,
                    Revenue = createSaleDto.Revenue,
                    Expenses = 0
                };
                
                _context.Sales.Add(add);
            }

            try{

            await _context.SaveChangesAsync();  
            return Ok(new {message = "Sales Created Successfully"});
            }
            catch(Exception e){
            return BadRequest("Sales creation failed "+ e.StackTrace);
            }
        }

        [HttpGet("AllInventory")] //api/AllAttendees
        public async Task<ActionResult<IEnumerable<Attendee>>> GetInventory()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);
            
            /*string Datelol = DateTime.Now.ToString("MM/yy");
            DateTime lol = DateTime.Parse(Datelol);

            lol.ToString("MMMM/yyyy");*/ //<-------------------------------IADD NI SA GetSales()
            var companyInventory = await _context.Inventory
                .Where(a => a.Company == company!.CompanyId)
                .ToListAsync();

            return Ok(companyInventory);
        }

         [HttpDelete]
        public async Task<IActionResult> DeleteSales([FromBody] int[] salesIds)
        {
            var salesToRemove = _context.Sales.Where(c => salesIds.Contains(c.Id)).ToList();
            
            try{
            if (salesToRemove.Any())
            {
                _context.Sales.RemoveRange(salesToRemove);
                
                await _context.SaveChangesAsync();
                return Ok(new { message = "Sales removed" });
            }

            return NotFound(new { message = "No sales found with the provided IDs" });
            }
            catch(Exception ex){
                return BadRequest(new {message=ex.StackTrace});
            }
        }
    }
}