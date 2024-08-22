namespace app.Models;

public class SavedJobsModel
{
    public int Id { get; set; }
    public required int JobModelId { get; set; }
    public required string UserModelId { get; set; }
}
