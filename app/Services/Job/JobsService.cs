using System.Diagnostics;
using System.Security.Claims;
using app.Dto;
using app.Models;
using Microsoft.EntityFrameworkCore;
using app.Extensions;

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
                Locations = jobDto.Locations!.Select(
                    location => location.ToModel()).ToList(),
                UserModelId = UserModelId,
                CreatedAt = DateTime.UtcNow
            };
            var job = ApplicationDbContext.jobs.Add(model).Entity;
            ApplicationDbContext.SaveChanges();
            /* TODO fix your fuck up, with the Category to CategoryDto converstion
             error in reponse, null reference here, because there's not category object included inside our job object/entity, just categoryId.
             since, populating/including category, isn't really necessary at least
             for now, we gonna fix this in near future. */
            return new JobDto
            {
                // Category = job.ToCategoryDto(),
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                LongDescription = job.LongDescription,
                CreatedAt = job.CreatedAt,
                CategoryId = job.CategoryModelId,
                Type = job.Type,
                Locations = job.Locations.Select(location => location.ToDto()).ToList(),
            };

        }

        public JobsResponse<JobDto> GetJobs(PaginatedQuery query)
        {
            var TotalRows = ApplicationDbContext.jobs.Count();
            var results = ApplicationDbContext.jobs
            .paginatedFilter(query).sortingFilter(query)
            .Include(job => job.Category)
            .Include(job => job.Locations)
            .Select(job => new JobDto
            {
                RefId = job.RefId,
                Category = job.ToCategoryDto(),
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                LongDescription = job.LongDescription,
                CategoryId = job.CategoryModelId,
                CreatedAt = job.CreatedAt,
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
            return new JobsResponse<JobDto> { Jobs = results, TotalRows = TotalRows };
        }

        public JobsResponse<JobDto> SearchJobs(JobSearchQuery jobSearchQuery)
        {
            var query = ApplicationDbContext.jobs
            .Select(job => new JobDto
            {
                Category = job.Category!.ToDto(),
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                CategoryId = job.CategoryModelId,
                CreatedAt = job.CreatedAt,
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
                    job.Locations!.Any(location =>
                location.City == jobSearchQuery.Query
               || location.State == jobSearchQuery.Query ||
               location.Street == jobSearchQuery.Query
               || location.PostCode == jobSearchQuery.Query ||
               location.Suburb == jobSearchQuery.Query
                    )
                );
            }
            return new JobsResponse<JobDto> { Jobs = [.. query], TotalRows = query.Count() };
        }

        public JobDto? GetJob(Guid RefId)
        {
            var job = ApplicationDbContext.jobs
                .Include(job => job.Category)
                .Include(job => job.Locations)
                .FirstOrDefault(job => job.RefId == RefId);
            if (job == null)
            {
                return null;
            }
            else
            {
                return new JobDto
                {
                    Category = new CategoryDto { Title = job!.Category!.Title, Id = job.Category.Id },
                    Title = job.Title,
                    ShortDescription = job.ShortDescription,
                    LongDescription = job.LongDescription,
                    CategoryId = job.CategoryModelId,
                    Type = job.Type,
                    CreatedAt = job.CreatedAt,
                    Locations = job.Locations.Select(
                         location => location.ToDto()
                         )
                     .ToList(),
                };
            }


        }

        public bool SaveJob(int id)
        {
            var user = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = user!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var exists = ApplicationDbContext.Saved.FirstOrDefault(saved => saved.JobModelId == id);
            if (exists != null)
            {
                // delete the link    
                var deleted = ApplicationDbContext.Saved.Remove(exists);
                ApplicationDbContext.SaveChanges();
                if (deleted != null)
                {
                    return true;
                }
                return false;
            }
            else
            {
                var joined = ApplicationDbContext.Saved.Add(
                    new SavedJobsModel { JobModelId = id, UserModelId = UserModelId })
                    .Entity;
                ApplicationDbContext.SaveChanges();
                if (joined != null)
                {
                    return false;
                }

            }
            return false;
        }

        public JobsResponse<SavedJobsDto> SavedJobs()
        {
            // TODO: fix this please, although the query is working, the navigation
            // prop is not
            // select s."id", s."jobmodelid", s."usermodelid", j."id", j."categorymodelid", j."createdat", j."keywords", j."lastupdated", j."longdescription", j."refid", j."shortdescription", j."title", j."type", j."usermodelid"
            //       from "saved" as s
            //       where s."usermodelid" = '883fafbc-dd2d-4b97-a56a-15d7db484d6c';
            //       inner join jobs as j on s."jobmodelid" = j."id"
            var user = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = user!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var jobs = ApplicationDbContext.Saved
            .Include(saved => saved.Job)
            .Where(saved => saved.UserModelId == UserModelId)
            .Select(saved => saved.ToDto());
            var count = jobs.Count();
            return new JobsResponse<SavedJobsDto>
            {
                TotalRows = count,
                Jobs = jobs
            };
        }
    }
}
