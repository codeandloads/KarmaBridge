using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    IEnumerable<JobDto> GetJobs(PaginatedQuery query);
    IEnumerable<JobDto> SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
