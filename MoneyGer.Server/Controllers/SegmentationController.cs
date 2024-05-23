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
    public class SegmentationController:ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        
        public SegmentationController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet] //api/Segmentation
        public async Task<ActionResult<IEnumerable<Sales>>> GetSegmentation()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);
            
            var segment = await _context.Segmentation
                .Where(a => a.Company == company!.CompanyId)
                .Join(
                    _context.Inventory,
                    item=>item.ProductId,
                    inv => inv.Id,
                    (item,inv) => new SegmentationFetchDto
                    {
                        Id = item.Id,
                        Company = item.Company,
                        Product = inv.Product,
                        Date = item.Date,
                        Sold = item.Sold
                    }
                )
                .ToListAsync();

            return Ok(segment);
        }

        [HttpPost]
        public async Task<IActionResult> AddSegmentation([FromBody] CreateSegmentationDto[] createSegmentationDto)
        {
            string today = DateTime.Now.ToString("MM/yyyy");
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);

            foreach(var segment in createSegmentationDto){
                var item = await _context.Inventory.FirstOrDefaultAsync(i=>i.Product == segment.ProductId);
                var productExist = await _context.Segmentation.FirstOrDefaultAsync(ucr => ucr.Date == today && ucr.ProductId == item!.Id);

                if(productExist is not null) 
                {
                    productExist.Sold += segment.Sold;

                    _context.Segmentation.Update(productExist);
                }

                else
                {
                    var add = new Segmentation
                    {
                        Date = today,
                        Company = company!.CompanyId,
                        ProductId = item!.Id,
                        Sold = segment.Sold
                    };
                    
                    _context.Segmentation.Add(add);
                }
            }

            try{
            await _context.SaveChangesAsync();  

            return Ok(new {message = "Segmentation Passed Successfully"});
            }

            catch(Exception e){
            return BadRequest("Segmentation creation failed "+ e.StackTrace);
            }
        }
    }
}