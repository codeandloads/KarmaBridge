using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using app.Models;

public class ApplicationDbContext : IdentityDbContext<UserModel>
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
      base(options)
  {
  }

  public DbSet<JobModel> jobs { get; set; }
  public DbSet<CategoryModel> categories { get; set; }
  public DbSet<ServiceModel> services { get; set; } = default!;
  public DbSet<LocationModel> locations { get; set; } = default!;

  // protected override void OnModelCreating(ModelBuilder modelBuilder)
  // {
  //   modelBuilder.Entity<JobModel>()
  //       .Property(e => e.Type)
  //       .HasConversion<int>();
  // }

}
