using ProductsApp.BLL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductsApp.BLL.Interfaces
{
    public interface IProductRepository
    {
        Task<List<ProductTypeModel>> GetProductTypes(Guid? id);
        Task<ProductTypeModel> AddProductType(ProductTypeAddModel model);
        Task<bool> DeleteProductType(Guid id);
        Task<List<CountryModel>> GetCountries();
        Task<List<ProductModel>> GetProductsByProductTypeID(Guid id);
        Task<ProductModel> AddProduct(ProductModel model);
        Task<ProductModel> UpdateProduct(ProductModel model);
        Task<CountryModel> AddCountry(string countryName);
    }
}
