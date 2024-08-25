namespace app.Dto
{
  public class UserDto
  {
    public string? Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? ImageUrl { get; set; }
    public List<SavedJobsDto>? Saved { get; set; }
  }
}
