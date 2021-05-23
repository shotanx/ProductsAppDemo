using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsApp.BLL.Models
{
    public class CountryModel
    {
        public Guid ID { get; set; }
        [Required]
        public string CountryName { get; set; }
    }
}
