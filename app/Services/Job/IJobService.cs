using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    JobsResponse GetJobs(PaginatedQuery query);
    JobsResponse SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
