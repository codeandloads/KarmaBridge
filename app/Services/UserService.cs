using System.Security.Claims;
using app.Dto;
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
                FirstName = x.FirstName,
                LastName = x.LastName,
                ImageUrl = x.ImageUrl
            }).FirstOrDefault();
            if (user != null)
            {
                return user;
            }
            return null;
        }
    }
}
