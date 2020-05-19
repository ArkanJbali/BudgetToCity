using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetToCity.Models
{
    public class UsersPosts
    {
        public int postID { get; set; }
        public string postTitle { get; set; }
        public string postContent { get; set; }
        public DateTime postTime { get; set; }
        public int isApproved { get; set; }
        public string userName { get; set; }
        public string userEmail { get; set; }
    }
}
