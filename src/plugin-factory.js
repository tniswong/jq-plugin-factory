; var com = com || {};
com.tniswong = com.tniswong || {};
com.tniswong.jq = com.tniswong.jq || {};

(function($, doc, win) {

    com.tniswong.jq.PluginFactory = {

        plugins : {},

        createPlugin : function(pluginName, defaults, methods) {

            this.plugins[pluginName] = new com.tniswong.jq.PluginDelegate(pluginName, defaults);

            $.each(methods, function(key, value) {
                com.tniswong.jq.PluginFactory.plugins[pluginName].PluginContext.prototype[key] = value;
            });

            $.fn[pluginName] = function(method) {

                var delegate = com.tniswong.jq.PluginFactory.plugins[pluginName];

                if(com.tniswong.jq.PluginFactory._single$ElementAndMethodIsString(this, method)) {
                    return delegate.methodCall($(this[0]), method, Array.prototype.slice.call(arguments, 1));
                } else {

                    this.each(function(index, element) {
                        delegate.methodCall($(element), method, Array.prototype.slice.call(arguments, 1));
                    });

                    return this;

                }

            };

        },

        _single$ElementAndMethodIsString : function($element, method) {
            return $element.length == 1 && typeof method === "string";
        }

    };

    com.tniswong.jq.PluginDelegate = function(name, defaults) {

        this.name = name;

        this.defaults = defaults;

        this.methodCall = function($elem, method) {

            var pluginContext = $elem.data(this.name);

            if(this._pluginContextUndefinedAnd_methodUndefinedOrMethodIsConfig(pluginContext, method)) {

                var delegate = com.tniswong.jq.PluginFactory.plugins[this.name];

                pluginContext = new delegate.PluginContext($elem, this.defaults, method);
                pluginContext.init();

                $elem.data(this.name, pluginContext);

            } else {

                if(typeof method === "string" && method[0] != "_") {
                    return pluginContext[method].apply(pluginContext, Array.prototype.slice.call(arguments, 2)[0]);
                }

            }

        };

        this._pluginContextUndefinedAnd_methodUndefinedOrMethodIsConfig = function(pluginContext, method) {
            return !pluginContext && (!method || $.isPlainObject(method))
        }

        this.PluginContext = function($elem, defaults, opts) {

            this.$elem = $elem;

            this.opts = $.extend(defaults, opts);

        };

    };

    $.createPlugin = function(name, defaults, methods) {
        if(typeof name === "string") {
            com.tniswong.jq.PluginFactory.createPlugin(name, defaults, methods);
        } else if($.isPlainObject(name) && !defaults && !methods) {
            com.tniswong.jq.PluginFactory.createPlugin(name.pluginName, name.defaults, name.methods);
        }
    };

})(jQuery, document, window);