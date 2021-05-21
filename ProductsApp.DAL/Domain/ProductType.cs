using ProductsApp.DAL.Helpers;
using System;
using System.Collections.Generic;

namespace ProductsApp.DAL.Domain
{
    public class ProductType : IDbEntity
    {
        public Guid ID { get; set; }
        public string ProductTypeName { get; set; }
        public Guid? ParentID { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
