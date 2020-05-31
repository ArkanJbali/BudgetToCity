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

        public DbSet<Cities> Cities { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<BudgetToCity.Models.Cars> Cars { get; set; }

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
            modelBuilder.Entity<Cities>(entity =>
            {
                entity.HasKey(e => e.City);


                    entity.Property(e => e.City).HasColumnName("City");


                    entity.Property(e => e.Id)
                        .HasMaxLength(50)
                        .IsUnicode(false);
                });
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Email);


                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.Permession).HasColumnName("Permession");
                entity.Property(e => e.Role).HasColumnName("Role");
                entity.Property(e => e.Fname).HasColumnName("Fname");
                entity.Property(e => e.Lname).HasColumnName("Lname");
                entity.Property(e => e.Password).HasColumnName("Password");
                entity.Property(e => e.isApproved).HasColumnName("isApproved");
            });
            modelBuilder.Entity<BudgetToCity.Models.Cars>(entity =>
            {
                entity.HasKey(e => e.Id);


                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Manufacturer).HasColumnName("Manufacturer");
                entity.Property(e => e.Model).HasColumnName("Model");
                entity.Property(e => e.Category).HasColumnName("Category");
                entity.Property(e => e.Year).HasColumnName("Year");
                entity.Property(e => e.Gear_box).HasColumnName("Gear_box");
                entity.Property(e => e.Doors).HasColumnName("Doors");
                entity.Property(e => e.Fuel_type).HasColumnName("Fuel_type");
                entity.Property(e => e.Color).HasColumnName("Color");
                entity.Property(e => e.Price).HasColumnName("Price_per_day");

            });


        }
    }
}
