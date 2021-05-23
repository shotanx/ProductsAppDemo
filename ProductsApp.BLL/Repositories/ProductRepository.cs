using ProductsApp.DAL.Commons;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsApp.BLL.Models;
using ProductsApp.DAL.Domain;
using Microsoft.EntityFrameworkCore;
using ProductsApp.BLL.Interfaces;
using System;

namespace ProductsApp.BLL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DbContext _context;

        public ProductRepository(IUnitOfWork unitOfWork, IMapper mapper, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<ProductTypeModel>> GetProductTypes(Guid? id)
        {
            var query = _unitOfWork.Query<ProductType>().Where(s => s.DateDeleted == null).AsNoTracking();
            var entities = await query.ToListAsync();

            var result = _mapper.Map<List<ProductTypeModel>>(entities);

            result.ForEach(item => item.Children = result.Where(child => child.ParentID == item.ID).ToList());

            if (id != null)
            {
                result = result.Where(item => item.ID == id).ToList();
            }
            else
            {
                result = result.Where(item => item.ParentID == null).ToList();
            }

            return result;
        }

        public async Task<ProductTypeModel> AddProductType(ProductTypeAddModel model)
        {
            var entity = new ProductType() { ID = Guid.NewGuid(), ProductTypeName = model.ProductTypeName, DateCreated = DateTime.Now };
            if (model.FutureParentID != null)
            {
                entity.ParentID = model.FutureParentID;

                _unitOfWork.Add(entity);
                await _unitOfWork.CommitAsync();
            }
            else if (model.FutureChildID != null)
            {
                var childEntity = new ProductType() { ID = model.FutureChildID.Value, ParentID = entity.ID };

                if (model.FutureChildsParentID != null)
                {
                    entity.ParentID = model.FutureChildsParentID;
                }

                _unitOfWork.Add(entity);

                await _unitOfWork.CommitAsync();

                var set = _context.Set<ProductType>();
                set.Attach(childEntity);
                _context.Entry(childEntity).Property(x => x.ParentID).IsModified = true;
                await _context.SaveChangesAsync();
            }
            else if (model.FutureParentID == null && model.FutureChildID == null)
            {
                _unitOfWork.Add(entity);

                await _unitOfWork.CommitAsync();
            }

            var result = _mapper.Map<ProductTypeModel>(entity);

            return result;
        }

        public async Task<bool> DeleteProductType(Guid id)
        {
            var models = await GetProductTypes(id);

            var dependencyIDs = NestedModelToIDs(models);

            var currentTime = DateTime.Now;

            var result = true;

            foreach (var idToDelete in dependencyIDs)
            {
                var productTypeMockUp = new ProductType() { ID = idToDelete, DateCreated = currentTime, DateDeleted = currentTime };

                result =_unitOfWork.SetDateDeleted(productTypeMockUp);
            }

            await _unitOfWork.CommitAsync();

            if (!result)
                throw new Exception("პრობლემა პროდუქტის ტიპის შენახვისას");

            return result;
        }


        public List<Guid> NestedModelToIDs(List<ProductTypeModel> nestedModels)
        {
            var IDs = new List<Guid>();

            foreach (var item in nestedModels)
            {
                IDs.Add(item.ID);
                IDs.AddRange(NestedModelToIDs(item.Children));
            }

            return IDs;
        }

        public async Task<List<CountryModel>> GetCountries()
        {
            var query = _unitOfWork.Query<Country>().Where(s => s.DateDeleted == null).AsNoTracking();
            var entities = await query.ToListAsync();

            var result = _mapper.Map<List<CountryModel>>(entities);

            return result;
        }

        public async Task<CountryModel> AddCountry(string countryName)
        {
            var entity = new Country() { ID = Guid.NewGuid(), CountryName = countryName, DateCreated = DateTime.Now };
            _unitOfWork.Add(entity);

            await _unitOfWork.CommitAsync();

            var result = _mapper.Map<CountryModel>(entity);

            return result;
        }

        public async Task<List<ProductModel>> GetProductsByProductTypeID(Guid id)
        {
            var query = _unitOfWork.Query<Product>().Where(s => s.ProductTypeID == id && s.DateDeleted == null).AsNoTracking();
            var entities = await query.ToListAsync();

            var result = _mapper.Map<List<ProductModel>>(entities);

            return result;
        }

        public async Task<ProductModel> AddProduct(ProductModel model)
        {
            var entity = _mapper.Map<Product>(model);
            entity.ID = Guid.NewGuid();
            entity.DateCreated = DateTime.Now;
            
            _unitOfWork.Add(entity);

            await _unitOfWork.CommitAsync();

            var result = _mapper.Map<ProductModel>(entity);

            return result;
        }

        public async Task<ProductModel> UpdateProduct(ProductModel model)
        {
            var entity = new Product() { ID = model.ID, DateChanged = DateTime.Now };

            _mapper.Map(model, entity);

            _unitOfWork.Update(entity);

            await _unitOfWork.CommitAsync();

            var result = _mapper.Map<ProductModel>(entity);

            return result;
        }
    }
}
