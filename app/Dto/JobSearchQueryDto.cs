namespace app.Dto
{
  public class JobSearchQueryDto
  {
    public required string Title { get; set; }
    public string? Type { get; set; }
    public string? Location { get; set; }
  }
}

