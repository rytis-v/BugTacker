using BugTrackerData.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace BugTrackerData
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>().HasData(
                new Ticket
                {
                    Id = 1,
                    Title = "Some bug",
                    Description = "Information about this bug",
                    Priority = Enums.Priority.Low,
                    Status = Enums.Status.Open,
                    DateCreated = DateTime.Now
                }
                );
        }
    }
}
