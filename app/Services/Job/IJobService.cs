using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    JobsResponse<JobDto> GetJobs(PaginatedQuery query);
    JobDto? GetJob(Guid RefId);
    bool SaveJob(int id);
    JobsResponse<SavedJobsDto> SavedJobs();
    JobsResponse<JobDto> SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
