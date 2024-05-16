using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Models;


namespace MoneyGer.Server.Context
{
    public class ApplicationDbContext:IdentityDbContext<moneyger_users>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Company> companies { get; set; }
        public DbSet<UserCompanyRole> UserCompanyRole { get; set; }
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Status> Status { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserCompanyRole>()
                .HasKey(ucr => new { ucr.UserId, ucr.RoleId, ucr.CompanyId });

             modelBuilder.Entity<UserCompanyRole>()
                .HasIndex(ucr => ucr.UserId);
            
            modelBuilder.Entity<Contacts>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Status>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}

