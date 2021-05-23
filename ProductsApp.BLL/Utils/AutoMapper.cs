using AutoMapper;
using ProductsApp.BLL.Models;
using ProductsApp.DAL.Domain;

namespace ProductsApp.BLL.Utils
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<ProductType, ProductTypeModel>();
            CreateMap<ProductTypeModel, ProductType>()
                .ForMember(x => x.ID, y => y.Ignore())
                .ForMember(x => x.DateCreated, y => y.Ignore());

            CreateMap<Country, CountryModel>();
            CreateMap<CountryModel, Country>()
                .ForMember(x => x.ID, y => y.Ignore())
                .ForMember(x => x.DateCreated, y => y.Ignore());

            CreateMap<Product, ProductModel>();
            CreateMap<ProductModel, Product>()
                .ForMember(x => x.ID, y => y.Ignore())
                .ForMember(x => x.DateCreated, y => y.Ignore());

            CreateMap<Country, CountryModel>();
            CreateMap<CountryModel, Country>()
                .ForMember(x => x.ID, y => y.Ignore())
                .ForMember(x => x.DateCreated, y => y.Ignore());
        }
    }
}
