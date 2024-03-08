using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Models;


namespace MoneyGer.Server.Context
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
       
        public DbSet<moneyger_users> moneyger_users { get; set; }
        public DbSet<moneyger_roles> moneyger_roles { get; set; }
    }
}
