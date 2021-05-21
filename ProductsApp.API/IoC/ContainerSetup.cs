using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProductsApp.BLL.Interfaces;
using ProductsApp.BLL.Repositories;
using ProductsApp.DAL.Commons;
using ProductsApp.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsApp.API.IoC
{
    public class ContainerSetup
    {
        public static void SetUp(IServiceCollection services, IConfiguration configuration)
        {
            //services.AddServices();
            //services.AddInvoker("services.json");
            //services.AddUmUtil("security.json");

            AddUnitOfWork(services, configuration);
            AddRepositories(services);
            AddAutoMapper(services);
            //PopulateCachingMethods(services, configuration);
        }

        private static void AddAutoMapper(IServiceCollection services)
        {
            var mapperConfiguration = new MapperConfiguration(mc => mc.AddProfile(new BLL.Utils.AutoMapper()));
            var mapper = mapperConfiguration.CreateMapper();
            services.AddSingleton(mapper);
        }

        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
        }

        private static void AddUnitOfWork(IServiceCollection services, IConfiguration configuration)
        {
            services.AddEntityFrameworkSqlServer();

            services.AddDbContextPool<ProductsAppContext>(
                options => options.UseSqlServer(
                    configuration.GetConnectionString("ConnectionString")));

            services.AddScoped<IUnitOfWork, UnitOfwork>(ctx => new UnitOfwork(ctx.GetRequiredService<ProductsAppContext>()));
            //services.AddScoped<IActionTransactionHelper, ActionTransactionHelper>();
            //services.AddScoped<UnitOfWorkFilterAttribute>();
        }
    }
}
