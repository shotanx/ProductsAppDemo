using System;
using System.Collections.Generic;

namespace ProductsApp.BLL.Models
{
    public class ProductTypeModel
    {
        public Guid ID { get; set; }
        public string ProductTypeName { get; set; }
        public Guid? ParentID { get; set; }

        public List<ProductTypeModel> Children { get; set; }
    }
}
