using app.Models;
using app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config =>
{
  var policy = new AuthorizationPolicyBuilder()
                   .RequireAuthenticatedUser()
                   .Build();
  config.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowSpecificOrigins",
            builder =>
            {
              builder.WithOrigins(
                    "http://localhost:5173"  // If you need to allow a local development server
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
      });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{ options.UseNpgsql(builder.Configuration.GetConnectionString("pg")); });

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<UserModel>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddHttpContextAccessor();

// INFO: Injecting services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJobService, JobsService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<CategoryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.MapIdentityApi<UserModel>();

// INFO: do not want forced https in development.
// app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.UsePathBase("/api");

app.Run();
