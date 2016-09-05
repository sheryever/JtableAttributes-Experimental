using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JtableAttributes.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Orders()
        {
            return  Json(new {Result = "OK", Records = GetOrders().Take(10)});
        }

        [HttpPost]
        public ActionResult OrdersWithPaging(int jtStartIndex, int jtPageSize)
        {
            var order = GetOrders();
            //var startIndex =  jtStartIndex+jtPageSize;
            return Json(
                new { Result = "OK"
                , Records = GetOrders().Skip(jtStartIndex).Take(jtPageSize)
                , TotalRecordCount = order.Count });
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public IList<Order> GetOrders()
        {

            var orders = new List<Order>();

            for (int i = 0; i < 72; i++)
            {
                orders.Add(new Order()
                {
                    OrderId = i,
                    ShipName = "Ship " + i.ToString(),
                    ShipCountry = "Pakistan",
                    OrderDate = DateTime.Now.AddDays(i),
                    Shipped = true
                });
            }
            return orders;
        }


    }

    public class Order
    {
        public int OrderId { get; set; }
        public string ShipName { get; set; }
        public string ShipCountry { get; set; }
        public DateTime OrderDate { get; set; }
        public bool Shipped { get; set; }
    }
}