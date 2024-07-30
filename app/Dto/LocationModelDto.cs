using app.Models;

namespace app.Dto;

public class LocationModelDto
{
    public int Id { get; set; }
    public string? Street { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public string? Country { get; set; } = "Australia";
    public required string Suburb { get; set; }
    public required string PostCode { get; set; }
}
