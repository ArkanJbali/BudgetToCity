using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetToCity.Model;
using Microsoft.EntityFrameworkCore;

namespace BudgetToCity.Repository
{
    public class DBContext : DbContext
    {
        public DBContext()
        {

        }
        public DBContext(DbContextOptions<DBContext>options):base(options)
        {

        }
        public DbSet<Airports> Airports { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=BudgeToCity;Trusted_Connection=True;MultipleActiveResultSet=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Airports>(entity =>
            {
                entity.HasKey(e => e.airportCode);


                entity.Property(e => e.airportCode).HasColumnName("airportCode");


                entity.Property(e => e.airportName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
