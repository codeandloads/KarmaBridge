using System;
using System.Diagnostics;
using System.Security.Claims;
using app.Context;
using app.Dto;
using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Services
{
    /// <summary>
    /// Fetch all jobs from database
    /// </summary>
    public class ServiceService : IServiceService
    {

        private readonly ApplicationDbContext ApplicationDbContext;
        private readonly IHttpContextAccessor httpContext;

        public ServiceService(ApplicationDbContext context, IHttpContextAccessor httpContext)
        {
            ApplicationDbContext = context;
            this.httpContext = httpContext;
        }

        public async Task<ServiceModel> AddService(ServiceDto serviceDto)
        {
            var user = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = user!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var model = new ServiceModel
            {
                CategoryModelId = serviceDto.CategoryId,
                Title = serviceDto.Title,
                ShortDescription = serviceDto.ShortDescription,
                LongDescription = serviceDto.LongDescription,
                type = serviceDto.Type,
                UserModelId = UserModelId
            };
            var service = await ApplicationDbContext.Services.AddAsync(model);
            await ApplicationDbContext.SaveChangesAsync();
            return service.Entity;
        }

        public IEnumerable<ServiceModel> GetServices()
        {
            return ApplicationDbContext.Services.ToList();
        }

        public async Task<ServiceModel?> GetService(int id)
        {
            var service = await ApplicationDbContext.Services.FindAsync(id);
            if(service == null)
            {
                return null;
            }
            return service;
        }
    }
}
