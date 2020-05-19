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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<BudgetToCity.Models.UsersPosts> UsersPosts { get; set; }
    }
}
