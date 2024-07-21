using app.Models;

namespace app.Dto
{
  public class JobDto
  {
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public string? LongDescription { get; set; }
    public required int CategoryId { get; set; }
    public CategoryModel? Category { get; set; }
    public required string Type { get; set; }
  }
}
