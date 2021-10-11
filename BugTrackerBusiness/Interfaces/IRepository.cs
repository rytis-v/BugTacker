using System.Collections.Generic;

namespace BugTrackerBusiness.Interfaces
{
    public interface IRepository<T>
    {
        T Create(T entity);
        T Get(int id);
        T Update(T entity);
        void Delete(T entity);
        long Count();
        bool Exists(int id);
        IEnumerable<T> All();
        void SaveChanges();
    }
}
