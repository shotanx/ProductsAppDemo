using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductsApp.DAL.Helpers;

namespace ProductsApp.DAL.Commons
{
    public class UnitOfwork : IUnitOfWork
    {
        private readonly DbContext _context;

        public UnitOfwork(DbContext context)
        {
            _context = context;
        }

        public ITransaction BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted)
        {
            return new DbTransaction(_context.Database.BeginTransaction());
        }

        public bool Add<T>(T entity) where T : class, IDbEntity
        {
            try
            {
                _context.Set<T>().Add(entity);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Update<T>(T entity) where T : class, IDbEntity
        {
            try
            {
                var set = _context.Set<T>();
                set.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool SetDateDeleted<T>(T entity) where T : class, IDbEntity // ახალი დამატება
        {
            try
            {
                var set = _context.Set<T>();
                set.Attach(entity);
                _context.Entry(entity).Property(x => x.DateDeleted).IsModified = true;

                return true;
            }
            catch
            {
                return false;
            }
        }

        public IQueryable<T> Query<T>() where T : class, IDbEntity
        {
            return _context.Set<T>();
        }

        public bool Delete<T>(T entity) where T : class, IDbEntity
        {
            try
            {
                var set = _context.Set<T>();
                set.Remove(entity);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
