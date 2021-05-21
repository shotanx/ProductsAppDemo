using ProductsApp.DAL.Helpers;
using System;

namespace ProductsApp.DAL.Domain
{
    public class Product : IDbEntity
    {
        public Guid ID { get; set; }
        public string ProductName { get; set; }
        public Guid ProductTypeID { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        public ProductType ProductType { get; set; }
    }
}
