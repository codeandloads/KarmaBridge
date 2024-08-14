using app.Dto;
using app.Models;
using app.Services;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{

  [Route("[controller]/[action]")]
  [ApiController]
  public class CategoryController : ControllerBase
  {

    private readonly CategoryService CategoryService;

    public CategoryController(CategoryService Service)
    {
      CategoryService = Service;
    }

    [HttpGet]
    public IEnumerable<CategoryDto> Index()
    {
      return [];
    }

    [HttpPost]
    public IActionResult Post(CategoryModel category)
    {
      var response = CategoryService.AddCategory(category);
      if (response)
      {
        return Ok();
      }
      return Accepted();
    }
  }
}
