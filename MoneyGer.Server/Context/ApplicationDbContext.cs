using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Models;


namespace MoneyGer.Server.Context
{
    public class ApplicationDbContext:IdentityDbContext<moneyger_users>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        //public DbSet<moneyger_users> moneyger_users { get; set; }
    }
}
