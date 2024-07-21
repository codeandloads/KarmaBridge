using app.Dto;
using app.Models;

namespace app.Services
{
    public interface IServiceService
    {
        Task<ServiceModel> AddService(ServiceDto serviceDto);

        IEnumerable<ServiceModel> GetServices();

        Task<ServiceModel?> GetService(int id);
    }
}
