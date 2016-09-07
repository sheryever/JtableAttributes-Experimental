/************************************************************************
* DATA jtable html attributes extension for jTable                      *
* Author: Abu Ali Muhammad Sharjeel                                     *
*************************************************************************/
/* TODO
 * Read the attributes from the table
 * Create jtable configuration
 * Accept html Jtable as configuration 
 * Allow extend the jtable configuration if it is coming as object to
 * 
 */

(function ($) {
    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create
    };

    $.extend(true,
        $.hik.jtable.prototype,
        {
            /************************************************************************
            * OVERRIDED METHODS                                                     *
            *************************************************************************/

            /* Overrides base method to create reload button.
             *************************************************************************/

            _create: function() {
                if (this.element.is('table')) {
                    var self = this;
                    $.hik.jtable.initFromAttributes('#' + this.element.attr('id'), self.options);
                    return;
                }
                base._create.apply(this, arguments);
            }

        });


})(jQuery);

(function () {
	var getSetting = function ($element, attribute, defaultVal, fieldSettings, valFoundCallback, defaultValueCallBack) {
	    var val = $element.data('jt-' + attribute);
	    if (val !== undefined && val !== null) {
		    if (valFoundCallback) {
		    	valFoundCallback($element, val, fieldSettings);
		    }
		    return val;
	    } else {
		    if (defaultValueCallBack) {
		    	defaultValueCallBack($element, val, fieldSettings);
		    }
		    return defaultVal;
	    }
	}

    var JtSettings = function($element, settings) {
        this.$element = $element;
        this.settings = settings;

        this.val = function(attr, defaultVal, valFoundCallback, defaultValueCallback) {
            var val = this.$element.data('jt-' + attribute);
            if (val !== undefined && val !== null) {
                if (valFoundCallback) {
                    valFoundCallback(this.$element, val, this.settings);
                }
                return val;
            } else {
                if (defaultValueCallback) {
                    defaultValueCallback(this.$element, val, this.settings);
                }
                return defaultVal;
            }
        }
    }

    $.hik.jtable.loadFromAttributes = function (configClass) {
	    if (configClass === undefined || configClass === null) {
	        configClass = '.jt-config';
	    }

	    $.hik.jtable.initFromAttributes(configClass).jtable('load');

        //$(configClass)
		    //.each(function (idx, obj) {
		    //	//console.log(obj);
		    //	$(obj).jtable('load');
		    //});

    }

    $.hik.jtable.buildConfigFromAttributes = function(configElementId) {
    	var $config = $('#' + configElementId);

        var jtableConfig = {
    	    title: getSetting($config, 'title', ""),
    	    paging: getSetting($config, 'paging', false),
    	    pageSize: getSetting($config, 'page-size', 10),
    		actions: {
    			listAction: getSetting($config, 'list-action', "")
    		},
    		fields: {

    		}
    	}
    	var keyFound = false;
    	var firstField = null;


    	$config.find("th")
			.each(function (idx, obj) {

				var $th = $(obj);
				var fieldName = getSetting($th, 'column', $th.text().replace(' ', ''));
				var fieldTitle = getSetting($th, 'title', $th.text());
				if (idx === 0) {
					firstField = fieldName;
				}

				var fieldConfig = {
					title: fieldTitle,
					width: getSetting($th, 'width', '10%'),
					list: getSetting($th, 'list', true)
				}

				fieldConfig.key = getSetting($th, 'key', false, fieldConfig,
	                function(value) {
	                    keyFound = true;
	                });

	            fieldConfig.type = getSetting($th, 'type', 'string', fieldConfig,
	                function($element, val, fieldSettings) {
	                    if (val === "checkbox") {
	                        fieldSettings.values = {
	                            'false': getSetting($element, 'false', 'False'),
	                            'true': getSetting($element, 'true', 'True')
	                        }
	                    }
	                });

	            fieldConfig.display = eval(getSetting($th, 'display', undefined));

				jtableConfig.fields[fieldName] = fieldConfig;
			});

    	if (!keyFound) {
    		jtableConfig.fields[firstField].key = true;
    	}

    	//$config.html('');
    	console.log(jtableConfig);
        return jtableConfig;
    }

    $.hik.jtable.initFromAttributes = function (configClass, jsConfig) {
	    if (configClass === undefined || configClass === null) {
		    configClass = '.jt-config';
	    }
	    $(configClass)
		    .each(function (idx, obj) {
		    	//console.log(obj);
		    	var jtableConfig = $.hik.jtable.buildConfigFromAttributes(obj.id);
		    	var $config = $('#' + obj.id);

		    	$config.html('');

			    var jtableId = $config.attr('id');
			    var jtableContainer = '<div  id="' + jtableId + '" class="' + configClass.replace('.', '') + '"></div>';

			    $('#' + jtableId)
				    .replaceWith(jtableContainer);
                if (jsConfig) {
                    $.extend(true, jsConfig, jtableConfig);
                }
                console.log(jsConfig);
	            console.log(jtableConfig);
                

	            $('#' + jtableId).jtable(jsConfig);

		    });
	    return $(configClass);
    }
})();