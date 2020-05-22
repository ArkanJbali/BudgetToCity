using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetToCity.Model;


namespace BudgetToCity.Service
{
    public interface ICars
    {
        IEnumerable<Cars> GetCars { get; }

    }
}
