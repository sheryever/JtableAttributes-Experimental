# JtableAttributes-Experimental

An experiment to load jtable from a html table

```html
  <table id="OrdersJTable" class="jt-config" data-jt-title="Orders List" data-jt-list-action="@Url.Action("Orders")">
      <tr>
          <th data-jt-list="false">OrderId</th>
          <th data-jt-width="40%" data-jt-column="ShipName">Firm</th>
          <th data-jt-width="20%">Ship Country</th>
          <th data-jt-width="20%" data-jt-type="date">Order Date</th>
          <th data-jt-width="20%" data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
      </tr>
  </table>
  <br/>
  <table id="OrdersJTable2" class="jt-config" data-jt-title="Orders List 2" data-jt-list-action="@Url.Action("Orders")">
      <tr>
          <th data-jt-key="true" data-jt-list="false" data-jt-column="OrderId">OrderId</th>
          <th data-jt-width="40%" data-jt-column="ShipName">Ship Name</th>
          <th data-jt-width="20%" data-jt-column="ShipCountry">Ship Country</th>
          <th data-jt-width="20%" data-jt-type="date" data-jt-column="OrderDate">Order Date</th>
          <th data-jt-width="20%" data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
      </tr>
  </table>
  <br/>
  <table id="OrdersJTable3" class="jt-config" data-jt-title="Order with paging" data-jt-paging="true" data-jt-page-size="10"   data-jt-list-action="@Url.Action("OrdersWithPaging")">
    <thead>
        <tr>
            <th>OrderId</th>
            <th>Ship Name</th>
            <th>Ship Country</th>
            <th data-jt-type="date">Order Date</th>
            <th data-jt-type="checkbox" data-jt-true="Shipped" data-jt-false="Not Shipped">Shipped</th>
        </tr>
    </thead>
  </table>
```

## Asp.net MVC
```C#
public class HomeController : Controller
{

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
}
```


```javascript
  <script src="~/Scripts/jquery-ui-1.9.2.min.js"></script>
  <script src="~/Scripts/jtable/jquery.jtable.min.js"></script>
  <script src="~/Scripts/jtable/extensions/jquery.jtable.buildFromAttributes.js"></script>
  
  <script type="text/javascript">
  
      $(function() {
      
          $.hik.jtable.loadFromAttributes('.jt-config');
  
      });
  </script>
```
