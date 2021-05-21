using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ProductsApp.DAL.Helpers;

namespace ProductsApp.DAL.Commons
{
    public interface IUnitOfWork : IDisposable
    {
        ITransaction BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted);
        bool Add<T>(T entity) where T : class, IDbEntity;
        bool Update<T>(T entity) where T : class, IDbEntity;
        bool SetDateDeleted<T>(T entity) where T : class, IDbEntity; // ახალი დამატება
        IQueryable<T> Query<T>() where T : class, IDbEntity;
        bool Delete<T>(T entity) where T : class, IDbEntity;
        void Commit();
        Task CommitAsync();
    }
}
