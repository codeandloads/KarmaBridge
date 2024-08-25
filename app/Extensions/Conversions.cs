using app.Dto;
using app.Models;

namespace app.Extensions
{
    public static class Conversions
    {

        public static LocationModelDto ToDto(this LocationModel locationModel)
        {
            return new LocationModelDto
            {
                City = locationModel.City,
                Country = locationModel.Country,
                PostCode = locationModel.PostCode,
                State = locationModel.State,
                Suburb = locationModel.Suburb,
                Id = locationModel.Id,
            };
        }

        public static CategoryDto ToCategoryDto(this JobModel job)
        {
            return job == null
                ? throw new ArgumentNullException(nameof(job))
            : new CategoryDto
            {
                Title = job.Category!.Title,
                Id = job.Category.Id,
            };
        }

        public static LocationModel ToModel(this LocationModelDto locationModelDto)
        {
            return new LocationModel
            {
                City = locationModelDto.City,
                Country = locationModelDto.Country,
                PostCode = locationModelDto.PostCode,
                State = locationModelDto.State,
                Suburb = locationModelDto.Suburb,
                Id = locationModelDto.Id,
            };
        }

        public static CategoryDto ToDto(this CategoryModel category)
        {
            return new CategoryDto
            {
                Title = category.Title,
                Id = category.Id,
            };
        }

        public static SavedJobsDto ToDto(this SavedJobsModel savedJobsModel)
        {
            return new SavedJobsDto
            {
                UserModelId = savedJobsModel.UserModelId,
                JobModelId = savedJobsModel.JobModelId,
            };
        }

        public static JobDto ConvertToJobDto(this SavedJobsModel savedJobsModel)
        {
            return new JobDto
            {
                Id = savedJobsModel!.Job!.Id,
                Title = savedJobsModel!.Job!.Title,
                RefId = savedJobsModel!.Job!.RefId,
                Category = savedJobsModel!.Job!.Category!.ToDto(),
                CategoryId = savedJobsModel!.Job!.CategoryModelId,
                Type = savedJobsModel!.Job!.Type,
                ShortDescription = savedJobsModel!.Job!.ShortDescription,
                LongDescription = savedJobsModel!.Job!.LongDescription,
            };
        }

        public static UserDto ToDto(this UserModel x)
        {
            return new UserDto
            {
                Email = x.Email!,
                FirstName = x.FirstName!,
                LastName = x.LastName!,
            };
        }
    }
}
