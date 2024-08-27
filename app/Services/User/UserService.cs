using System.Diagnostics;
using System.Security.Claims;
using app.Dto;
using app.Extensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace app.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext ApplicationDbContext;

        private readonly IHttpContextAccessor httpContext;

        public UserService(ApplicationDbContext context, IHttpContextAccessor
        httpContext)
        {
            ApplicationDbContext = context;
            this.httpContext = httpContext;
        }

        public ActionResult<UserDto>? Info()
        {
            var USER = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = USER!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var user = ApplicationDbContext.Users
            .Where(x => x.Id == UserModelId).Select(x => new UserDto
            {
                Email = x.Email!,
                FirstName = x.FirstName!,
                LastName = x.LastName!,
                ImageUrl = x.ImageUrl
            }).FirstOrDefault();
            if (user != null)
            {
                return user;
            }
            return null;
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
            var USER = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = USER!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var user = ApplicationDbContext.Users
            .Where(x => x.Id == UserModelId)
            .Select(x => x.ToDto())
            .FirstOrDefault();
            if (user != null)
            {
                return user;
            }
            return null;
        }

        public ActionResult<UserDto> UpdateProfile()
        {
            throw new NotImplementedException();
        }

        public async Task<string> UpdateProfilePic(IFormFile file)
        {
            var USER = httpContext!.HttpContext!.User.Identity as ClaimsIdentity;
            var UserModelId = USER!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if (file == null || file.Length == 0)
                return "No file provided !";

            // TODO: get FOLDER path for a CONFIG, by injecting to controller
            // IConfiguration
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
                if (denfex != null)
                {
                    return denfex.Message;
                }
            }
            var user = ApplicationDbContext.Users
            .Where(x => x.Id == UserModelId)
            .FirstOrDefault();
            if (user != null)
            {
                user.ImageUrl = fakeName;
                ApplicationDbContext.Users.Update(user);
                ApplicationDbContext.SaveChanges();
                return "Profile pic updated !";
            }
            return "Something went wrong !";
        }
    }
}
