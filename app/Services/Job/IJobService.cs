using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    JobsResponse GetJobs(PaginatedQuery query);
    JobDto? GetJob(Guid RefId);
    JobsResponse SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
