using System;
using System.Collections.Generic;

namespace BudgetToCity.Models
{
    public partial class Users
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Permession { get; set; }
        public string Role { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Password { get; set; }
        public int IsApproved { get; set; }
    }
}
