using app.Dto;
using Microsoft.AspNetCore.Mvc;

namespace app.Services.User
{
    public interface IUserService
    {
        ActionResult<UserDto>? Info();
        ActionResult<UserDto>? PublicProfile();
        ActionResult<UserDto> UpdateProfile();
        Task<string> UpdateProfilePic(IFormFile? file);
    }
}
