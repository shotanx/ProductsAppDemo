using Microsoft.EntityFrameworkCore;

namespace ProductsApp.DAL.Domain
{
    public class ProductsAppContext : DbContext
    {
        public ProductsAppContext(DbContextOptions<ProductsAppContext> options) : base(options) { }


        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Country> Countries { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Countries");
            });

            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.ToTable("ProductTypes");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");

                entity.HasOne(d => d.ProductType)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductTypeID);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CountryID);
            });
        }
    }
}
