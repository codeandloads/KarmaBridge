using app.Dto;
using app.Models;
using app.Services;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{

  [Route("[controller]/[action]")]
  [ApiController]
  public class UserController : ControllerBase
  {

    private readonly IUserService IUserService;

    public UserController(IUserService Service)
    {
      IUserService = Service;
    }

    [HttpGet]
    public ActionResult<UserDto> Info()
    {
      var response = IUserService.Info();
      if (response != null)
      {
        return response;
      }
      return NoContent();
    }
  }
}
