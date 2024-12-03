using System.Security.Claims;
using app.Context;
using app.Dto;
using app.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace app.Services.User
{
    public class UserService(
        ApplicationDbContext context,
        IHttpContextAccessor
        httpContext) : IUserService
    {

        public ActionResult<UserDto> Info()
        {
            var userIdentity = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var userModelId = userIdentity!.FindFirst(ClaimTypes.NameIdentifier)!.Value ?? throw new ArgumentNullException("USER!.FindFirst(ClaimTypes.NameIdentifier)!.Value");
            var user = context.Users
            .Where(x => x.Id == userModelId).Select(x => new UserDto
            {
                Email = x.Email!,
                FirstName = x.FirstName!,
                LastName = x.LastName!,
                ImageUrl = x.ImageUrl
            }).FirstOrDefault();
            return (user ?? null) ?? throw new InvalidOperationException();
        }

        /// <summary>
        /// This should allow users to view the default profile of the user.  
        /// and by default, that means public profile.
        /// </summary>
        /// <returns></returns>
        public ActionResult<UserDto>? PublicProfile()
        {
            // TODO: update profile, maybe a PUT route.
            throw new NotImplementedException();
        }

        public ActionResult<UserDto> UpdateProfile(UserDto dto)
        {
            // TODO: update user details, i.e. firstName, middleName, lastName
            // more importantly the imageUrl. so need to deal with file upload.
            // INFO: so if there's no changes at all just return in the 
            // (old ) userDto. 
            var userIdentity = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var userModelId = userIdentity!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var user = context.Users
            .Where(x => x.Id == userModelId)
            .Select(x => x.ToDto())
            .FirstOrDefault();
            return (user ?? null) ?? dto;
        }

        public ActionResult<UserDto> UpdateProfile()
        {
            throw new NotImplementedException();
        }

        public async Task<string> UpdateProfilePic(IFormFile? file)
        {
            var USER = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = USER!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if (file == null || file.Length == 0)
                return "No file provided !";

            // TODO: get FOLDER path for a CONFIG, by injecting to controller
            var folderPath = Path.Combine("wwwroot", "avatars");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var extension = Path.GetExtension(file.FileName);
            var fakeName = Path.Combine(Path.GetRandomFileName() + extension);
            var filePath = Path.Combine(folderPath, fakeName);
            try
            {
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
            }
            catch (Exception denfex)
            {
                    return denfex.Message;
            }
            var user = context.Users
            .FirstOrDefault(x => x.Id == UserModelId);
            if (user == null)
                return "Something went wrong !";
            user.ImageUrl = fakeName;
            context.Users.Update(user);
            await context.SaveChangesAsync();
            return "Profile pic updated !";
        }
    }
}
