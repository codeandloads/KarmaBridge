using System.ComponentModel.DataAnnotations;

namespace app.Dto
{
  public class ServiceDto
  {
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public string? LongDescription { get; set; }
    public required int CategoryId { get; set; }
    public required string Type { get; set; }
    }
}
