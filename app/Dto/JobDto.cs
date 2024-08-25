using System.ComponentModel.DataAnnotations.Schema;
using app.Enums;

namespace app.Dto
{
    public class JobDto
    {
        public required string Title { get; set; }
        public Guid? RefId { get; set; } = Guid.NewGuid();
        public required string ShortDescription { get; set; }
        public string? LongDescription { get; set; }
        public required int CategoryId { get; set; }
        public CategoryDto? Category { get; set; }
        public required Types Type { get; set; } = Types.Casual;
        public List<LocationModelDto>? Locations { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedAt { get; set; }
    }
}
