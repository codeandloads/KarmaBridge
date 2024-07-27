using app.Enums;

namespace app.Models;

public class JobModel
{
  public int Id { get; set; }
  public required string Title { get; set; }
  public required string ShortDescription { get; set; }
  public required string? LongDescription { get; set; }
  public required Types Type { get; set; } = Types.Casual;
  public CategoryModel? Category { get; set; }
  public required int CategoryModelId { get; set; }
  public required string UserModelId { get; set; }
  public string? Keywords { get; set; }
  public required LocationModel Location { get; set; }
}
