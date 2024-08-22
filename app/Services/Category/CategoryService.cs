using app.Models;

namespace app.Services
{
    public class CategoryService

    {
        private readonly ApplicationDbContext ApplicationDbContext;

        public CategoryService(ApplicationDbContext context)
        {
            ApplicationDbContext = context;
        }

        public IEnumerable<CategoryModel> GetAll()
        {
            return ApplicationDbContext.Categories.ToList();

        }

        public bool AddCategory(CategoryModel model)
        {
            var response = ApplicationDbContext.Categories.Add(model).Entity;
            ApplicationDbContext.SaveChanges();
            if (response != null)
            {
                return true;
            }
            return false;
        }
    }
}
