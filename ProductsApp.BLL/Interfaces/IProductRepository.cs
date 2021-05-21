using ProductsApp.BLL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductsApp.BLL.Interfaces
{
    public interface IProductRepository
    {
        Task<List<ProductTypeModel>> GetProductTypes();
    }
}
