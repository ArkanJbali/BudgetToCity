using BudgetToCity.Model;
using BudgetToCity.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Repository
{
    public class AirportRepository : IAirport
    {
        private DBContext db;

        AirportRepository(DBContext _db)
        {
            db = _db;
        }



        public IEnumerable<Airports> GetAirports => db.Airports;
    }
}
/*
        public Airports GetAirport(string airportCode)
        {
            Airports dbEntity = db.Airports.Find(airportCode);
            return dbEntity;
        }
    } 
} */
