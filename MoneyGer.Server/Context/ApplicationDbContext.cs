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
        public DbSet<Events> Events { get; set; }
        public DbSet<Attendee> Attendee { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<Inventory> Inventory { get; set; } 
        public DbSet<Segmentation> Segmentation { get; set; } 
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
            
            modelBuilder.Entity<Events>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Attendee>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<Company>().HasKey(x => x.Id);
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<UserCompanyRole>()
        .HasKey(ucr => new { ucr.UserId, ucr.RoleId, ucr.CompanyId });
    modelBuilder.Entity<UserCompanyRole>()
        .HasIndex(ucr => ucr.UserId);

    modelBuilder.Entity<Contacts>().HasKey(x => x.Id);
    modelBuilder.Entity<Status>().HasKey(x => x.Id);
    modelBuilder.Entity<Events>().HasKey(x => x.Id);
    modelBuilder.Entity<Attendee>().HasKey(x => x.Id);

    // Configure one-to-many relationships
    modelBuilder.Entity<Company>()
        .HasMany(c => c.Contacts)
        .WithOne()
        .HasForeignKey(c => c.Company)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Company>()
        .HasMany(c => c.Inventory)
        .WithOne()
        .HasForeignKey(c => c.Company)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Company>()
        .HasMany(c => c.Sales)
        .WithOne()
        .HasForeignKey(c => c.Company)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Company>()
        .HasMany(c => c.Segmentations)
        .WithOne()
        .HasForeignKey(c => c.Company)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Company>()
        .HasMany(c => c.UserCompanyRoles)
        .WithOne()
        .HasForeignKey(c => c.CompanyId)
        .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

