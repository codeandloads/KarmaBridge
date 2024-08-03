using app.Enums;

namespace app.Dto
{
    public class PaginatedQuery
    {
        public int? Page { get; set; } = 0;
        public int? DataPerPage { get; set; } = 10;
        public int? SortingOrder { get; set; } = -1;
        public string? ColumnName { get; set; } = "CreatedAt";
    }
}

