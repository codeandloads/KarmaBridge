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
        public JobsResponse<JobDto> Index([FromQuery] PaginatedQuery query)
        {
            return jobsService.GetJobs(query);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<JobDto> Get(Guid RefId)
        {
            var job = jobsService.GetJob(RefId);
            if (job == null)
            {
                return NoContent();
            }
            return Ok(job);
        }

        [HttpGet]
        [AllowAnonymous]
        // INFO: Instead of a seperate / and /search route, can't I just use search route ?
        public ActionResult<JobsResponse<JobDto>> Search([FromQuery] JobSearchQuery jobSearchQuery)
        {
            var results = jobsService.SearchJobs(jobSearchQuery);
            if (results.Jobs.Any())
            {
                return Ok(results);
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

        [HttpPut]
        public IActionResult SaveJob(int id)
        {
            var result = jobsService.SaveJob(id);
            if (result)
            {
                return CreatedAtAction(nameof(SaveJob), result);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        public JobsResponse<SavedJobsDto> SavedJobs()
        {
            var results = jobsService.SavedJobs();
            return results;
        }
    }
}
