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
            return  Json(new {Result = "OK", Records = GetOrders()});
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
            return new [] {new Order
            {
                OrderId = 1, ShipName = "Ship 1", ShipCountry = "Pakistan", OrderDate = DateTime.Now.AddDays(1), Shipped = true 
            }, new Order
            {
                OrderId = 2, ShipName = "Ship 2", ShipCountry = "Pakistan", OrderDate = DateTime.Now.AddDays(3), Shipped = true
            }, new Order
            {
                OrderId = 3, ShipName = "Ship 3", ShipCountry = "Pakistan", OrderDate = DateTime.Now.AddDays(2), Shipped = false 
            
            }, new Order
            {
                OrderId = 4, ShipName = "Ship 4", ShipCountry = "Pakistan", OrderDate = DateTime.Now.AddDays(5), Shipped = false 
            
            }, new Order
            {
                OrderId = 5, ShipName = "Ship 5", ShipCountry = "Pakistan", OrderDate = DateTime.Now.AddDays(3), Shipped = true 
            
            } };
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