using app.Enums;
using app.Models;

namespace app.Dto
{
    public class JobsResponse<T>
    {
        public int? TotalRows { get; set; }
        public required IEnumerable<T> Jobs { get; set; } = [];
    }
}
