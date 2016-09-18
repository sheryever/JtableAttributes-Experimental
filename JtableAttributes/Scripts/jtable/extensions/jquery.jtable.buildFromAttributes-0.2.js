/************************************************************************
* jtable html5 attributes extension for jTable  *
* Author: Abu Ali Muhammad Sharjeel       *
*************************************************************************/
/* TODO
 * Read the attributes from the table  (done)
 * Create jtable configuration (done)
 * Accept html Jtable as configuration   (done)
 * Allow extend the jtable configuration if it is coming as object  (done)
 * 
 */

(function ($) {
    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create
    };

    var JtSettings = function($element, settings) {
        this.$element = $element;
        this.settings = settings;

        this.val = function (attr, defaultVal, valFoundCallback, defaultValueCallback) {
            var val = this.$element.data('jt-' + attr);
            if (val !== undefined && val !== null) {
                if (valFoundCallback) {
                    return valFoundCallback(this.$element, val, this.settings);
                }
                return val;
            } else {
                if (defaultValueCallback) {
                    return defaultValueCallback(this.$element, val, this.settings);
                }
                return defaultVal;
            }
        }
    }

    var JtableFieldOptions = function($th) {

        var self = this;
        this.jtSettings = new JtSettings($th, self);
        this.column = this.jtSettings.val("column", $th.text().replace(' ', ''));

        this.columnResizable = this.jtSettings.val("column-resizable", true);
        this.create = this.jtSettings.val("create", true);
        this.edit = this.jtSettings.val("edit", true);
        this.defaultValue = this.jtSettings.val("default-value", undefined);

        this.inputClass = this.jtSettings.val("input-class", undefined);
        this.inputTitle = this.jtSettings.val("input-title", undefined);
        this.key = this.jtSettings.val("key", false);
        this.list = this.jtSettings.val("list", true);
        this.listClass = this.jtSettings.val("list-class", undefined);
        this.options = this.jtSettings.val("options", undefined);  // url only
        this.optionsSorting = this.jtSettings.val("options-sorting", undefined);
        this.sorting = this.jtSettings.val("sorting", true);;
        this.title = this.jtSettings.val("title", undefined);

        this.visibility = this.jtSettings.val("visibility", "visible");
        this.width = this.jtSettings.val("width", "10%");

        this.type = this.jtSettings.val("type", "text", function ($element, val, fieldSettings) {
            if (val === "checkbox") {
                fieldSettings.values = {
                    'false': fieldSettings.jtSettings.val('false', 'False'),
                    'true': fieldSettings.jtSettings.val('true', 'True')
                }
            }
            return val;
        });
    };

    var JtableOptions = function($table) {
        var self = this;
        var settings = new JtSettings($table, self);

        var jtableId = $table.attr('id') ? $table.attr('id') : "jtableContainer$" + (new Date()).valueOf();


        this.jtableContainerId = jtableId;
        this.animationsEnabled = settings.val("animations-enabled", true);
        this.columnResizable = settings.val("column-resizable", true);
        this.columnSelectable = settings.val("column-selectable", true);
        this.defaultDateFormat = settings.val("default-date-format", "yy-mm-dd");
        this.defaultSorting = settings.val("default-sorting", undefined);

        this.dialogShowEffect = settings.val("dialog-show-effect", "fade");
        this.dialogHideEffect = settings.val("animations-enabled", "fade");
        this.gotoPageArea = settings.val("goto-page-area", "combobox");

        this.jqueryuiTheme = settings.val("jquery-ui-theme", false);
        this.loadingAnimationDelay = settings.val("loading-animation-delay", 500);
        this.multiselect = settings.val("multi-select", false);
        this.multiSorting = settings.val("multi-sorting", false);
        /// this.openChildAsAccordion = "";   version 2
        this.paging = settings.val("paging", false);
        this.pageList = settings.val("page-list", "normal");
        this.pageSize = settings.val("page-size", 10);
        this.pageSizes = settings.val("page-sizes", [10, 25, 50, 100, 250, 500], function ($element, val, settings) {
            try {
                return val.split(',').map(Number);
            } catch (e) {
                this.warn('Error in settings pageSizes (data-jt-page-sizes) property');
                return [10, 25, 50, 100, 250, 500];
            }
        });

        this.pageSizeChangeArea = settings.val("page-size-change-area", true);
        this.saveUserPreferences = settings.val("save-user-preferences", true);
        this.selecting = settings.val("selecting", false);
        this.selectingCheckboxes = settings.val("selecting-checkboxes", false);
        this.selectOnRowClick = settings.val("select-on-row-click", true);
        //this.showCloseButton = "";    version 2
        this.sorting = settings.val("sorting", false);
        this.tableId = settings.val("table-id", jtableId + "Table");
        this.title = settings.val("title", undefined);
        this.unAuthorizedRequestRedirectUrl = settings.val("un-authorized-request-redirect-url", undefined);

        this.actions = {
            listAction : settings.val("list-action", undefined),
            createAction : settings.val("create-action", undefined),
            updateAction : settings.val("update-action", undefined),
            deleteAction : settings.val("delete-action", undefined)
        };

        this.fields = {};
        var keyFound = false;
        var firstField = null;


        $table.find('th')
            .each(function (index, th) {
                var $th = $(th);
                var fieldOptions = new JtableFieldOptions($th);
                if (index === 0) {
                    firstField = fieldOptions;
                }
                self.fields[fieldOptions.column] = fieldOptions;
                if (!keyFound && fieldOptions.key) {
                    keyFound = true;
                }
            });

        if (!keyFound) {
            firstField.key = true;
        }

    };

    $.extend(true,
        $.hik.jtable.prototype,
        {
            /************************************************************************
            * OVERRIDED METHODS   *
            *************************************************************************/

            /* Overrides base method to create reload button.
             *************************************************************************/

            _create: function () {
                if (this.element.is('table')) {
                    var self = this;
                    this._createFromAttributes($('#' + this.element.attr('id')), self.options);
                    return;
                }
                base._create.apply(this, arguments);
            },

            _createFromAttributes: function($table, otherOptions) {
                var tableOptions = new JtableOptions($table);
                $table.html('');

                var jtableContainer = '<div  id="' + tableOptions.jtableContainerId + '" ></div>';

                $table
				    .replaceWith(jtableContainer);
                if (otherOptions) {
                    $.extend(true, otherOptions, tableOptions);
                }
                //console.log(otherOptions);
               // console.log(tableOptions);


                $('#' + tableOptions.jtableContainerId).jtable(otherOptions);

            }
        });


})(jQuery);
