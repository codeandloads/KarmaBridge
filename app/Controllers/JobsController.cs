﻿using app.Dto;
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
        public JobsResponse Index([FromQuery] PaginatedQuery query)
        {
            return jobsService.GetJobs(query);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<JobsResponse> Search([FromQuery] JobSearchQuery jobSearchQuery)
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
    }
}
