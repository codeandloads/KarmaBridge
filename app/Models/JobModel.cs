using app.Enums;

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
    // TODO this is not really a timeStamp value, change that to timestamp, look
    // at your db row to find out about it.
    public string? CreatedAt { get; set; } = new DateTime().ToLongDateString();
    public required List<LocationModel> Locations { get; set; }
}
