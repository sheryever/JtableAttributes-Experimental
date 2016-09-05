(function() {
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

    $.hik.jtable.initFromAttributes = function (configClass) {
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

			    $('#' + jtableId).jtable(jtableConfig);

		    });
	    return $(configClass);
    }
})();