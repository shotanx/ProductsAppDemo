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
        }
    }
}
