﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using app.Models;

public class ApplicationDbContext : IdentityDbContext<UserModel>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    {
    }
    public DbSet<JobModel> jobs { get; set; }
    public DbSet<CategoryModel> Categories { get; set; }
    public DbSet<ServiceModel> Services { get; set; } = default!;
    public DbSet<LocationModel> Locations { get; set; } = default!;
    public DbSet<SavedJobsModel> Saved { get; set; } = default!;

}
