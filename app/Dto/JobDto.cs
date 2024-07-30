using app.Enums;
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
        public required Types Type { get; set; } = Types.Casual;
        public List<LocationModelDto> Locations { get; set; } = [];
    }
}
