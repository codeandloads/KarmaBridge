using app.Dto;
using app.Models;

namespace app.Utilities
{
    public static class JobDtoExtensions
    {
        public static LocationModel convertToLocationModel(this LocationModelDto location)
        {
            return new LocationModel
            {
                City = location.City,
                Country = location.Country,
                PostCode = location.PostCode,
                State = location.State,
                Suburb = location.Suburb,
                Street = location.Street
            };
        }

    }
}
