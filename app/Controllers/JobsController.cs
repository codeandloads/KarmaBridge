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
        public IEnumerable<JobDto> Index()
        {
            return jobsService.GetJobs();
        }

        [HttpGet]
        public ActionResult<IEnumerable<JobDto>> Search([FromQuery] JobSearchQueryDto jobSearchQueryDto)
        {
            if (string.IsNullOrWhiteSpace(jobSearchQueryDto.Title))
            {
                return BadRequest("Search parameter is invalid");
            }
            var jobs = jobsService.SearchJobs(jobSearchQueryDto);
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
