using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsApp.DAL.Domain
{
    public class Product
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
