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
    public class InventoryController:ControllerBase //Modify this to cater needs when dealing with inventory. Add api for updating stocks
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        
        public InventoryController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddInventory([FromBody] CreateInventoryDto createInventoryDto)
        {
            if(string.IsNullOrEmpty(createInventoryDto.Product))
            {
                return BadRequest("Status name is required");
            }

            var productExist = await _context.Inventory.FirstOrDefaultAsync(ucr => ucr.Product == createInventoryDto.Product);

            if(productExist is not null) 
            {
                return BadRequest("Product already exists");
            }

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);

            var add = new Inventory
            {
                Company = company!.CompanyId,
                Price = createInventoryDto.Price,
                Product = createInventoryDto.Product,
                    Quantity = createInventoryDto.Quantity
                };

            try{
            _context.Inventory.Add(add);

            await _context.SaveChangesAsync();
            return Ok(new {message = "Inventory Created Successfully"});
            }
            catch(Exception e){
            return BadRequest("Inventory creation failed "+ e.StackTrace);
            }
        }

        [HttpGet("AllInventory")] //api/AllAttendees
        public async Task<ActionResult<IEnumerable<Attendee>>> GetInventory()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var company = await _context.UserCompanyRole.FirstOrDefaultAsync(ucr=>ucr.UserId == currentUserId);

            var companyInventory = await _context.Inventory
                .Where(a => a.Company == company!.CompanyId)
                .ToListAsync();

            return Ok(companyInventory);
        }

         [HttpDelete]
        public async Task<IActionResult> DeleteInventory([FromBody] int[] inventoryIds)
        {
            var inventoryToRemove = _context.Inventory.Where(c => inventoryIds.Contains(c.Id)).ToList();
            
            try{
            if (inventoryToRemove.Any())
            {
                _context.Inventory.RemoveRange(inventoryToRemove);
                
                await _context.SaveChangesAsync();
                return Ok(new { message = "Inventory removed" });
            }

            return NotFound(new { message = "No inventory found with the provided IDs" });
            }
            catch(Exception ex){
                return BadRequest(new {message=ex.StackTrace});
            }
        }

        [HttpPost("Manage")]
        public async Task<IActionResult> ManageInventory([FromBody] InventoryManageDto inventoryManageDto)
        {
            var inventoryToEdit = await _context.Inventory.FindAsync(inventoryManageDto.id);
            
            try{
                if (inventoryManageDto.Quantity is not null)
                {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    inventoryToEdit.Quantity = (int)inventoryManageDto.Quantity;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                }

                if (inventoryManageDto.Price is not null)
                {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    inventoryToEdit.Price = (float)inventoryManageDto.Price;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                }

                if (inventoryManageDto.Product is not null)
                {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    inventoryToEdit.Product = inventoryManageDto.Product;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                }
            
                _context.Inventory.Update(inventoryToEdit!);
                    
                await _context.SaveChangesAsync();
                return Ok(new { message = "Inventory edited" });
            }
            catch(Exception ex){
                return BadRequest(new {message=ex.StackTrace});
            }
        }
    }
}