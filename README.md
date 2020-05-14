# JtableAttributes-Experimental

An experiment to cofigure jtable from a html table.

Jtable extension [jquery.jtable.attributableconfig.js](JtableAttributes/Scripts/jtable/extensions/jquery.jtable.attributableconfig.js)

```html
<table id="OrdersJTable" data-jt-title="Orders List" data-jt-list-action="Home/Orders">
    <tr>
        <th data-jt-list="false">OrderId</th>
        <th data-jt-width="40%" data-jt-column="ShipName">Firm</th>
        <th data-jt-width="20%">Ship Country</th>
        <th data-jt-type="date">Order Date</th>
        <th data-jt-type="checkbox">Shipped</th>
    </tr>
</table>
<br/>
<table id="OrdersJTable2" data-jt-title="Orders List 2" data-jt-list-action="Home/Orders">
    <tr>
        <th data-jt-key="true" data-jt-list="false" data-jt-column="OrderId">OrderId</th>
        <th data-jt-width="40%" data-jt-column="ShipName">Ship Name</th>
        <th data-jt-width="20%" data-jt-column="ShipCountry">Ship Country</th>
        <th data-jt-type="date" data-jt-column="OrderDate">Order Date</th>
        <th data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
    </tr>
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
}
```
## JSON Result 
```json
{
    "Result": "OK",
    "Records": [
        { "OrderId": 10, "ShipName": "Ship 10", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475067648987)\/", "Shipped": true },
        { "OrderId": 11, "ShipName": "Ship 11", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475154048987)\/", "Shipped": false },
        { "OrderId": 12, "ShipName": "Ship 12", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475240448987)\/", "Shipped": true },
        { "OrderId": 13, "ShipName": "Ship 13", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475326848987)\/", "Shipped": false },
        { "OrderId": 14, "ShipName": "Ship 14", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475413248987)\/", "Shipped": true },
        { "OrderId": 15, "ShipName": "Ship 15", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475499648987)\/", "Shipped": true },
        { "OrderId": 16, "ShipName": "Ship 16", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475586048987)\/", "Shipped": false },
        { "OrderId": 17, "ShipName": "Ship 17", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475672448987)\/", "Shipped": true },
        { "OrderId": 18, "ShipName": "Ship 18", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475758848987)\/", "Shipped": false },
        { "OrderId": 19, "ShipName": "Ship 19", "ShipCountry": "Pakistan", "OrderDate": "\/Date(1475845248987)\/", "Shipped": true }]
}
```

## javascript code
```javascript
<script src="~/Scripts/jquery-ui-1.9.2.min.js"></script>
<script src="~/Scripts/jtable/jquery.jtable.min.js"></script>
<script src="~/Scripts/jtable/extensions/jquery.jtable.buildFromAttributes-0.2.js"></script>

<script type="text/javascript">

    $(function() {
    
		$('#OrdersJTable').jtable();
        $('#OrdersJTable').jtable('load');
        
        $('#OrdersJTable2').jtable();
        $('#OrdersJTable2').jtable('load');

    });
</script>
```

### jtable with paging

```html
<table id="OrdersJTable3" data-jt-title="Order with paging" data-jt-paging="true"   data-jt-list-action="Home/OrdersWithPaging">
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

## Adding jtable other options (functions/events)
### Html
``` Html
<table id="OrderJtableWithOtherOptions"  data-jt-title="Orders List 2" data-jt-list-action="Home/Orders">
    <tr>
        <th data-jt-list="false">OrderId</th>
        <th data-jt-column="ShipName">Ship Name</th>
        <th>Ship Country</th>
        <th data-jt-type="date">Order Date</th>
        <th data-jt-type="checkbox" data-jt-true="Done" data-jt-false="In progress">Shipped</th>
    </tr>
</table>
```

### JavaScript
```javascript
<script src="~/Scripts/jquery-ui-1.9.2.min.js"></script>
<script src="~/Scripts/jtable/jquery.jtable.min.js"></script>
<script src="~/Scripts/jtable/extensions/jquery.jtable.buildFromAttributes-0.2.js"></script>

<script type="text/javascript">

    $(function() {
    
        $('#OrderJtableWithOtherOptions').jtable({
                fields: {
                    ShipName: {
                        display: function (data) {
                            return '<a href="/firmsDetail?firmName=' + data.record.OrderId + '">' + data.record.ShipName + '</a>';
                        }
                    }
                },
                rowInserted: function(event, data){
                    if (data.record.Shipped) {
                        data.row.css('color', 'green');
                    }
                }
        });
        $('#OrderJtableWithOtherOptions').jtable('load');

    });
</script>
```

All jtable and jtable fields options are supported except functions / delegates / events.

Jtable options must have the `data-jt-` prefix in html.

##### General Options
| Jtable Options                  |  jt-attributes      | Remarks |
|---------------------------------|---------------------|--------------------------------------|
|actions.listAction               | list-action         | |
|actions.createAction             | create-action       | |
|actions.updateAction             | update-action       | |
|actions.deleteAction             | delete-action       |   |
|animationsEnabled                | animations-enabled  |  |
|columnResizable                  | column-resizable     |                 |
|columnSelectable                 | column-selectable     |                 |
|defaultDateFormat                | default-date-format     |                 |
|defaultSorting                   | default-sorting    |                 |
|dialogShowEffect                 | dialog-show-effect     |                 |
|dialogShowEffect                 | dialog-show-effect     |                 |
|dialogHideEffect                 | animations-enabled     |                 |
|gotoPageArea                     | goto-page-area    |                 |
|jqueryuiTheme                    | jquery-ui-theme     |                 |
|loadingAnimationDelay            | loading-animation-delay    |                 |
|multiselect                      | multi-select     |                 |
|multiSorting                     | multi-sorting      |                 |
|paging                           | paging     |                 |
|pageList                         | page-list    |                 |
|pageSize                         | page-size    |                 |
|pageSizes                        | page-sizes    | example = `<table id='mytable" page-size="20,40,60,80"> ... </table>`                 |
|pageSizeChangeArea               | page-size-change-area    |                 |
|saveUserPreferences              | save-user-preferences    |                 |
|selecting                        | selecting     |                 |
|selectingCheckboxes              | selecting-checkboxes    |                 |
|selectOnRowClick                 | select-on-row-click    |                 |
|sorting                          | sorting     |                 |
|tableId                          | table-id     |                 |
|title                            | title    |                 |
|unAuthorizedRequestRedirectUrl   | un-authorized-request-redirect-url   |           .       |

##### Fields options
| Jtable Fields Options           |  jt-attributes      | Remarks |
|---------------------------------|---------------------|--------------------------------------|
|Field name                       | column  |  |
|columnResizable                  | column-resizable     |                 |
|create                           | create     |                 |
|edit                             | edit     |                 |
|defaultValue                     | default-value    |                 |
|inputClass                       | input-class     |                 |
|inputTitle                       | input-title     |                 |
|key                              | key     | If the `key` attribute is not used then first field will automatically become the key field   |
|list                             | list    |                 |
|listClass                        | list-class     |                 |
|options                          | options    | Only Url is supported with jt-attributes               |
|optionsSorting                   | options-sorting     |                 |
|sorting                          | sorting      |                 |
|title                            | title     |                 |
|visibility                       | visibility    |                 |
|width                            | width    |                 |
|type                             | type    |  if the type is **checkbox** then use `jt-true` and `jt-false` attributes the configure the values options                  |

