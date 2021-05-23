using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsApp.BLL.Models
{
    public class ProductTypeAddModel
    {
        [Required]
        public string ProductTypeName { get; set; }
        public Guid? FutureParentID { get; set; }
        public Guid? FutureChildID { get; set; }
        public Guid? FutureChildsParentID { get; set; }
    }
}
