using System.Diagnostics;
using System.Security.Claims;
using app.Dto;
using app.Models;
using Microsoft.EntityFrameworkCore;
using app.Utilities;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.Query;

namespace app.Services
{
    /// <summary>
    /// Fetch all jobs from database
    /// </summary>
    public class JobsService : IJobService
    {

        private readonly ApplicationDbContext ApplicationDbContext;
        private readonly IHttpContextAccessor httpContext;

        public JobsService(ApplicationDbContext context,
            IHttpContextAccessor httpContext)
        {
            ApplicationDbContext = context;
            this.httpContext = httpContext;
        }

        public JobDto AddJob(JobDto jobDto)
        {
            var user = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = user!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var model = new JobModel
            {
                CategoryModelId = jobDto.CategoryId,
                Title = jobDto.Title,
                ShortDescription = jobDto.ShortDescription,
                LongDescription = jobDto.LongDescription,
                Type = jobDto.Type,
                Locations = jobDto.Locations.Select(
                    location => ConvertTo(location)).ToList(),
                UserModelId = UserModelId
            };
            var job = ApplicationDbContext.jobs.Add(model).Entity;
            ApplicationDbContext.SaveChanges();

            return new JobDto
            {
                Category = job.Category,
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                LongDescription = job.LongDescription,
                CategoryId = job.CategoryModelId,
                Type = job.Type,
                Locations = job.Locations.Select(location => ConvertToDto(location)).ToList(),
            };

        }

        public IEnumerable<JobDto> GetJobs(PaginatedQuery query)
        {
            var results = ApplicationDbContext.jobs
            .paginatedFilter(query).sortingFilter(query).Select(job => new JobDto
            {
                Category = job.Category,
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                CategoryId = job.CategoryModelId,
                Type = job.Type,
                Locations = job.Locations.Select(
                    location =>
                     new LocationModelDto
                     {
                         City = location.City,
                         State = location.State,
                         Street = location.Street,
                         PostCode = location.PostCode,
                         Suburb = location.Suburb
                     }
                    )
                .ToList(),
            });
            return results;
        }

        public IEnumerable<JobDto> SearchJobs(JobSearchQuery jobSearchQuery)
        {
            var query = ApplicationDbContext.jobs
            .Select(job => new JobDto
            {
                Category = job.Category,
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                CategoryId = job.CategoryModelId,
                Type = job.Type,
                Locations = job.Locations.Select(
                    location =>
                     new LocationModelDto
                     {
                         City = location.City,
                         State = location.State,
                         Street = location.Street,
                         PostCode = location.PostCode,
                         Suburb = location.Suburb
                     }
                    )
                .ToList(),
            });

            if (!string.IsNullOrWhiteSpace(jobSearchQuery.Title))
            {
                query = query.Where(job => job.Title.ToLower().Contains(jobSearchQuery.Title.ToLower()));
            }
            if (!string.IsNullOrWhiteSpace(jobSearchQuery.Query))
            {
                query = query.Where(job =>
                    job.Locations.Any(location =>
                location.City == jobSearchQuery.Query
               || location.State == jobSearchQuery.Query ||
               location.Street == jobSearchQuery.Query
               || location.PostCode == jobSearchQuery.Query ||
               location.Suburb == jobSearchQuery.Query
                    )
                );
            }
            return [.. query];
        }

        public static LocationModel ConvertTo(LocationModelDto location)
        {
            return new LocationModel
            {
                Id = location.Id,
                City = location.City,
                Country = location.Country,
                PostCode = location.PostCode,
                State = location.State,
                Suburb = location.Suburb,
                Street = location.Street
            };
        }
        public static LocationModelDto ConvertToDto(LocationModel location)
        {
            return new LocationModelDto
            {
                Id = location.Id,
                City = location.City,
                Country = location.Country,
                PostCode = location.PostCode,
                State = location.State,
                Suburb = location.Suburb,
                Street = location.Street
            };
        }

    }


}
