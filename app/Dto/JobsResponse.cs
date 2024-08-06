using app.Enums;
using app.Models;

namespace app.Dto
{
    public class JobsResponse
    {
        public int? TotalRows { get; set; }
        public required IEnumerable<JobDto> Jobs { get; set; } = [];
    }
}
