using System;

namespace ProductsApp.DAL.Commons
{
    public interface ITransaction : IDisposable
    {
        void Commit();
        void Rollback();
    }
}
