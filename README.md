# JtableAttributes-Experimental

An experiment to load jtable from a html table.
All jtable and jtable fields options are supported except functions / delegates / events

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
|key                              | key     |                 |
|list                             | list    |                 |
|listClass                        | list-class     |                 |
|options                          | options    | Only Url is supported with jt-attributes               |
|optionsSorting                   | options-sorting     |                 |
|sorting                          | sorting      |                 |
|title                            | title     |                 |
|visibility                       | visibility    |                 |
|width                            | width    |                 |
|type                             | type    |  if the type is **checkbox** then use `jt-true` and `jt-false` attributes the configure the values options                  |


Jtable extension [jquery.jtable.buildFromAttributes.js](JtableAttributes/Scripts/jtable/extensions/jquery.jtable.buildFromAttributes-0.2.js)

```html
<table id="OrdersJTable" data-jt-title="Orders List" data-jt-list-action="@Url.Action("Orders")">
    <tr>
        <th data-jt-list="false">OrderId</th>
        <th data-jt-width="40%" data-jt-column="ShipName">Firm</th>
        <th data-jt-width="20%">Ship Country</th>
        <th data-jt-width="20%" data-jt-type="date">Order Date</th>
        <th data-jt-width="20%" data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
    </tr>
</table>
<br/>
<table id="OrdersJTable2" data-jt-title="Orders List 2" data-jt-list-action="@Url.Action("Orders")">
    <tr>
        <th data-jt-key="true" data-jt-list="false" data-jt-column="OrderId">OrderId</th>
        <th data-jt-width="40%" data-jt-column="ShipName">Ship Name</th>
        <th data-jt-width="20%" data-jt-column="ShipCountry">Ship Country</th>
        <th data-jt-width="20%" data-jt-type="date" data-jt-column="OrderDate">Order Date</th>
        <th data-jt-width="20%" data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
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

## Adding jtable options other options (functions/events)
### Html
``` Html
<table id="OrdersJTable2"  data-jt-title="Orders List 2" data-jt-list-action="@Url.Action("Orders")">
    <tr>
        <th data-jt-key="true" data-jt-list="false" data-jt-column="OrderId">OrderId</th>
        <th data-jt-width="40%" data-jt-column="ShipName">Ship Name</th>
        <th data-jt-width="20%" data-jt-column="ShipCountry">Ship Country</th>
        <th data-jt-width="20%" data-jt-type="date" data-jt-column="OrderDate">Order Date</th>
        <th data-jt-width="20%" data-jt-type="checkbox" data-jt-true="True" data-jt-false="False">Shipped</th>
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
                    OrderId: {
                        display: function (data) {
                            return '<a href="/firmsDetail?firmName=' + data.record.OrderId + '">' + data.record.OrderId + '</a>';
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
