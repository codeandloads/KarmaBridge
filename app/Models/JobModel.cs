using app.Enums;
using System.ComponentModel;

namespace app.Models;

public class JobModel
{
    public int Id { get; set; }
    public Guid RefId { get; set; } = Guid.NewGuid();
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public required string? LongDescription { get; set; }
    public required Types Type { get; set; } = Types.Casual;
    public CategoryModel? Category { get; set; }
    public required int CategoryModelId { get; set; }
    public required string UserModelId { get; set; }
    public string? Keywords { get; set; }
    [DefaultValue("NOW()")]
    public DateTime? CreatedAt { get; set; } 
    public required List<LocationModel> Locations { get; set; }
}
