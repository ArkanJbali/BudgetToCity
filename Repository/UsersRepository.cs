using BudgetToCity.Model;
using BudgetToCity.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Repository
{
    public class UsersRepository: IUsers
    {
        private DBContext db;
        UsersRepository(DBContext _db)
        {
            db = _db;
        }
        public IEnumerable<Users> GetUsers => db.Users;
    }
}
