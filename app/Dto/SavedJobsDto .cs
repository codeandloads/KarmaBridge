namespace app.Dto;

public class SavedJobsDto
{
    public required int JobModelId { get; set; }
    public required JobDto Job { get; set; }
    public required string UserModelId { get; set; }
}
