using BudgetToCity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Service
{
    public interface IAirport
    {
        IEnumerable<Airports> GetAirports { get; }
      /*  Airports GetAirport(string airportCode); */

       

    }
}
