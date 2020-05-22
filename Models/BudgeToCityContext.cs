using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using BudgetToCity.Models;

namespace BudgetToCity.Models
{
    public partial class BudgeToCityContext : DbContext
    {
        

        public virtual DbSet<Airports> Airports { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Cars> Cars { get; set; }
        public virtual DbSet<BudgetToCity.Models.HotelManager> HotelManager { get; set; }
        public DbSet<BudgetToCity.Models.UsersPosts> UsersPosts { get; set; }
        public BudgeToCityContext()
        {
        }

        public BudgeToCityContext(DbContextOptions<BudgeToCityContext> options)
            : base(options)
        {
        }
        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //                optionsBuilder.UseSqlServer("Server=LAPTOP-NJDEMKOO\\SQLEXPRESS;Database=BudgeToCity;Trusted_Connection=True;");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsersPosts>(entity =>
            {
                entity.HasKey(e => e.postID);

                entity.Property(e => e.postTitle).IsRequired()
                    .HasColumnName("postTitle")
                    .HasMaxLength(50);

                entity.Property(e => e.postContent).IsRequired()
                    .HasColumnName("postContent")
                    .HasMaxLength(250);

                entity.Property(e => e.postTime).IsRequired()
                    .HasColumnName("postTime");
                entity.Property(e => e.isApproved).IsRequired()
                    .HasColumnName("isApproved");
                entity.Property(e => e.userName).IsRequired()
                    .HasColumnName("userName")
                    .HasMaxLength(50);
                entity.Property(e => e.userEmail).IsRequired()
                    .HasColumnName("userEmail")
                    .HasMaxLength(50);
            });
            modelBuilder.Entity<Airports>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AirportCode)
                    .HasColumnName("airportCode")
                    .HasMaxLength(255);

                entity.Property(e => e.AirportName)
                    .HasColumnName("airportName")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Cities>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Email);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Fname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsApproved).HasColumnName("isApproved");

                entity.Property(e => e.Lname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<Cars>(entity =>
            {
                entity.HasKey(e => e.Id);


                entity.Property(e => e.Id).HasColumnName("Id").IsUnicode(false);
                entity.Property(e => e.Manufacturer).HasColumnName("Manufacturer").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Model).HasColumnName("Model").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Category).HasColumnName("Category").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Year).HasColumnName("Year").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Gear_box).HasColumnName("Gear_box").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Doors).HasColumnName("Doors").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Fuel_type).HasColumnName("Fuel_type").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Color).HasColumnName("Color").HasMaxLength(255).IsUnicode(false);
                entity.Property(e => e.Price_per_day).HasColumnName("Price_per_day").IsUnicode(false);

            });
            modelBuilder.Entity<HotelManager>(entity =>
            {
                entity.HasKey(e => e.id);

                entity.Property(e => e.managerName).HasColumnName("managerName")
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.managerEmail).HasColumnName("managerEmail")
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.hotelID).HasColumnName("hotelID")
                    .IsRequired();

                entity.Property(e => e.hotelName).HasColumnName("hotelName")
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.hotelDescription).HasColumnName("hotelDescription")
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

       
    }
}
