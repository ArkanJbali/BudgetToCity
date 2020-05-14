using BudgetToCity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Service
{
    public class IUsers
    {
        IEnumerable<Users> GetUsers{ get; }
    }
}
