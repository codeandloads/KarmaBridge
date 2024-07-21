using Microsoft.AspNetCore.Mvc;
using app.Models;
using app.Services;
using app.Dto;

namespace app.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService serviceService;

        public ServicesController(IServiceService serviceService)
        {
            this.serviceService = serviceService;
        }

        // POST: api/Services/Add
        [HttpPost]
        public async Task<ActionResult<ServiceModel>> Add(ServiceDto serviceDto)
        {
            var service = await serviceService.AddService(serviceDto);
            if (service == null)
            {
                return NoContent();
            }
            return CreatedAtAction(nameof(Add), new { id = service.Id },
            service);
        }

        // GET: api/Services/All
        [HttpGet]
        public ActionResult<IEnumerable<ServiceModel>> All()
        {
            var services = serviceService.GetServices();
            if (services.Any())
            {
                return services.ToList();
            }
            return NoContent();
        }

        // GET: api/Services/Get/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceModel>> Get(int id)
        {
            var serviceModel = await serviceService.GetService(id);

            if (serviceModel == null)
            {
                return NotFound();
            }

            return serviceModel;
        }
    }
}
