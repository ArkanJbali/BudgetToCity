using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Models
{
    public partial class Cars
    {
        public int Id { get; set; } = 0;
        public string Manufacturer { get; set; } = "";
        public string Model { get; set; } = "";
        public string Category { get; set; } = "";
        public int Year { get; set; } = 0;
        public string Gear_box { get; set; } = "";
        public string Doors { get; set; } = "";
        public string Fuel_type { get; set; } = "";
        public string Color { get; set; } = "";
        public int Price { get; set; } = 0;

    }
}
