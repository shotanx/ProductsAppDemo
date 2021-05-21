using ProductsApp.DAL.Commons;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProductsApp.BLL.Models;
using ProductsApp.DAL.Domain;
using Microsoft.EntityFrameworkCore;
using ProductsApp.BLL.Interfaces;

namespace ProductsApp.BLL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductRepository(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<ProductTypeModel>> GetProductTypes()
        {
            var query = _unitOfWork.Query<ProductType>().Where(s => s.DateDeleted == null);
            var entities = await query.ToListAsync();

            var result = _mapper.Map<List<ProductTypeModel>>(entities);

            return result;
        }
    }
}
