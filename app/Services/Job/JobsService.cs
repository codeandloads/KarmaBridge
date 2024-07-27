using System.Diagnostics;
using System.Security.Claims;
using app.Dto;
using app.Models;
using Microsoft.EntityFrameworkCore;

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

        public JobModel AddJob(JobDto jobDto)
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
                Location = jobDto.Location,
                UserModelId = UserModelId
            };
            var job = ApplicationDbContext.jobs.Add(model).Entity;
            ApplicationDbContext.SaveChanges();
            return job;
        }

        public IEnumerable<JobDto> GetJobs()
        {
            return ApplicationDbContext.jobs
            .Include(job => job.Category).Select(job => new JobDto
            {
                Category = job.Category,
                Title = job.Title,
                ShortDescription = job.ShortDescription,
                CategoryId = job.CategoryModelId,
                Type = job.Type,
                Location = job.Location
            });
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
                Location = job.Location,
            });

            if (!string.IsNullOrWhiteSpace(jobSearchQuery.Title))
            {
                query = query.Where(job => job.Title.ToLower().Contains(jobSearchQuery.Title.ToLower()));
            }
            if (!string.IsNullOrWhiteSpace(jobSearchQuery.Query))
            {
                query = query.Where(job =>
                job.Location.City == jobSearchQuery.Query
               || job.Location.State == jobSearchQuery.Query ||
               job.Location.State == jobSearchQuery.Query
               || job.Location.PostCode == jobSearchQuery.Query ||
               job.Location.Suburb == jobSearchQuery.Query
                );
            }
            return [.. query];
        }

    }
}
