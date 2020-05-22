using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Models
{
    public class HotelManager
    {
        public int id { get; set; }
        public string managerName { get; set; }
        public string managerEmail { get; set; }
        public int hotelID { get; set; }
        public string hotelName { get; set; }
        public string hotelDescription { get; set; }
    }
}
