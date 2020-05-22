using BudgetToCity.Model;
using BudgetToCity.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Repository
{
    public class CarsRepository : ICars
    {
        private DBContext db;

        CarsRepository(DBContext _db)
        {
            db = _db;
        }

        public IEnumerable<Cars> GetCars => db.Cars;
    }
}
