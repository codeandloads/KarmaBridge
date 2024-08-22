using Microsoft.AspNetCore.Identity;

namespace app.Models
{
  public class UserModel : IdentityUser
  {
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public string? ImageUrl { get; set; }
    public List<JobModel>? Jobs { get; set; }
    public List<ServiceModel>? Services { get; set; }
    public List<SavedJobsModel>? Saved { get; set; }
  }
}
