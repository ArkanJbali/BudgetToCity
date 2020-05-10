using BudgetToCity.Model;
using BudgetToCity.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Repository
{
    public class HotelRepository : IHotel
    {

        private DBContext db;

        HotelRepository(DBContext _db)
        {
            db = _db;
        }
        public IEnumerable<Cities> GetHotels => db.Cities;

    }
}

