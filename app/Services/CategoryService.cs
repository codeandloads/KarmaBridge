using System;
using app.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.NET.StringTools;

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
            return ApplicationDbContext.categories.ToList();

        }

        // TODO: allow ADMIN to add multiple categories at once.
        public bool AddCategory(CategoryModel model)
        {
            var response = ApplicationDbContext.categories.Add(model).Entity;
            ApplicationDbContext.SaveChanges();
            if (response != null)
            {
                return true;
            }
            return false;
        }
    }
}
