namespace app.Models;

public class CategoryModel
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public ICollection<JobModel>? Jobs { get; set; }
}
