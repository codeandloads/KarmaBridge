using app.Dto;
using app.Models;

namespace app.Utilities
{
    public static class Converter
    {


        public static LocationModel convertToLocation(LocationModelDto location)
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
