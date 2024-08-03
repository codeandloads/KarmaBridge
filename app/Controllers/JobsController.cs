using app.Dto;
using app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{

    [Route("[controller]/[action]")]
    [ApiController]
    public class JobsController : ControllerBase
    {

        private readonly IJobService jobsService;

        public JobsController(IJobService jobsService)
        {
            this.jobsService = jobsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<JobDto> Index([FromQuery] PaginatedQuery query)
        {
            return jobsService.GetJobs(query);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<JobDto>> Search([FromQuery] JobSearchQuery jobSearchQuery)
        {
            var jobs = jobsService.SearchJobs(jobSearchQuery);
            if (jobs.Any())
            {
                return Ok(jobs);
            }
            return NoContent();
        }


        [HttpPost]
        public IActionResult Post(JobDto jobDto)
        {
            var model = jobsService.AddJob(jobDto);
            if (model != null)
            {
                return CreatedAtAction(nameof(Post), model);
            }
            return NoContent();
        }
    }
}
