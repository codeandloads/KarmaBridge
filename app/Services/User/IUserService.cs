using app.Dto;
using app.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.Services
{
    public interface IUserService
    {
        ActionResult<UserDto>? Info();
        ActionResult<UserDto>? PublicProfile();
        ActionResult<UserDto> UpdateProfile();
        Task<string> UpdateProfilePic(IFormFile file);
    }
}
