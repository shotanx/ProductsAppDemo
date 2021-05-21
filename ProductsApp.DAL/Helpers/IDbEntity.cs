using System;

namespace ProductsApp.DAL.Helpers
{
    public interface IDbEntity
    {
        Guid ID { get; set; }

        DateTime DateCreated { get; set; }
        DateTime? DateChanged { get; set; }
        DateTime? DateDeleted { get; set; }
    }
}
