using ProductsApp.DAL.Helpers;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProductsApp.DAL.Domain
{
    public class Product : IDbEntity
    {
        public Guid ID { get; set; }
        [Required]
        public string ProductCode { get; set; }
        [Required]
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public Guid ProductTypeID { get; set; }
        public Guid CountryID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        public Country Country { get; set; }
        public ProductType ProductType { get; set; }
    }
}
