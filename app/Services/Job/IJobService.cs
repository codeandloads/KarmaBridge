using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    JobsResponse GetJobs(PaginatedQuery query);
    JobDto? GetJob(Guid RefId);
    bool SaveJob(int id);
    JobsResponse SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
