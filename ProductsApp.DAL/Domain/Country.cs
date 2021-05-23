using ProductsApp.DAL.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsApp.DAL.Domain
{
    public class Country : IDbEntity
    {
        public Guid ID { get; set; }
        [Required]
        public string CountryName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
