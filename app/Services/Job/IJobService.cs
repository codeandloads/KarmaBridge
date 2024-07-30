using app.Dto;
using app.Models;

namespace app.Services
{
  public interface IJobService
  {
    JobDto AddJob(JobDto jobDto);
    IEnumerable<JobDto> GetJobs();
    IEnumerable<JobDto> SearchJobs(JobSearchQuery jobSearchQueryDto);
  }
}
