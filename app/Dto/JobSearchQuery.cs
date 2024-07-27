using app.Enums;

namespace app.Dto
{
  public class JobSearchQuery
  {
    public string? Title { get; set; }
    public string? Query { get; set; }
    public Types? Type { get; set; }
  }
}

