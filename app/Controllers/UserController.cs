using app.Dto;
using app.Models;
using app.Services;
using app.Services.User;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet]
    public ActionResult<UserDto> PublicProfile()
    {
      var response = IUserService.Info();
      if (response != null)
      {
        return response;
      }
      return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfilePic(IFormFile? file)
    {
      var response = await IUserService.UpdateProfilePic(file);
      if (response != null)
      {
        return Ok(response);
      }
      return NoContent();
    }
  }
}
