using app.Dto;
using System.Linq.Expressions;

namespace app.Services
{
    public static class GenericFilters
    {
        public static IQueryable<T> sortingFilter<T>(this IQueryable<T> query, PaginatedQuery paginated)
        {
            var type = typeof(T);
            var property = type.GetProperty(paginated.Column!, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
            if (property != null)
            {
                return query;
            }
            var parameterExpression = Expression.Parameter(type, "sort");
            var propertyAccess = Expression.MakeMemberAccess(parameterExpression, property!);
            var orderByExp = Expression.Lambda(propertyAccess, parameterExpression);
            var methodName = paginated.SortingOrder.Equals(-1) ? "OrderByDescending" : "OrderBy";
            var methodCall = Expression.Call(typeof(Queryable), methodName, [type, property!.PropertyType], Expression.Quote(orderByExp));
            if (property != null)
            {
            }
            return query.Provider.CreateQuery<T>(methodCall);
        }

        public static IQueryable<T> paginatedFilter<T>(this IQueryable<T> query, PaginatedQuery paginated)
        {
            return query.Skip((int)(paginated.Page! * paginated.DataPerPage!)).Take((int)(paginated.DataPerPage!));
        }
    }
}
