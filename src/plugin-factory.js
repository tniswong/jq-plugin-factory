; var com = com || {};
com.tniswong = com.tniswong || {};
com.tniswong.jq = com.tniswong.jq || {};

(function($, doc, win) {

    /**
     * Does PluginFactory stuff
     * @class com.tniswong.jq.PluginFactory
     * @static
     * @type {Object}
     */
    com.tniswong.jq.PluginFactory = {

        /**
         * Plugins map
         * @static
         * @type {Object}
         */
        plugins : {},

        /**
         * $.createPlugin(pluginName, defaults, methods)
         *
         * @static
         * @param pluginName
         * @param defaults
         * @param methods
         */
        createPlugin : function(pluginName, defaults, methods) {

            this.plugins[pluginName] = new com.tniswong.jq.Plugin(pluginName, defaults);

            // Merge methods with BackingObj prototype
            $.each(methods, function(key, value) {
                com.tniswong.jq.PluginFactory.plugins[pluginName].BackingObj.prototype[key] = value;
            });

            /*
             * Assigns to jQuery.fn the function (named by the pluginName variable)
             * which handles plugin initialization and method delegation.
             *
             * @param {Object / String} method
             */
            $.fn[pluginName] = function(method) {

                if(com.tniswong.jq.PluginFactory._single$ElementAndMethodIsString(this, method)) {

                    return com.tniswong.jq.PluginFactory.plugins[pluginName].call($(this[0]), method, Array.prototype.slice.call(arguments, 1));

                } else {

                    this.each(function(index, element) {
                        com.tniswong.jq.PluginFactory.plugins[pluginName].call($(element), method, Array.prototype.slice.call(arguments, 1));
                    });

                    return this;

                }

            };

        },

        /**
         * private method
         * @private
         * @static
         * @method
         * @param $element
         * @param method
         */
        _single$ElementAndMethodIsString : function($element, method) {
            return $element.length == 1 && typeof method === "string";
        }

    };

    /**
     * Plugin interface. Defines traits of new plugin.
     *
     * @class com.tniswong.jq.Plugin
     * @constructor
     * @param {String} name Plugin Name
     * @param {*} defaults Plugin Defaults
     */
    com.tniswong.jq.Plugin = function(name, defaults) {

        /**
         * Plugin Name
         * @type {String}
         */
        this.name = name;

        /**
         * Defaults
         * @type {Object}
         */
        this.defaults = defaults;

        /**
         * Calls the underlying plugin method
         * @param $elem
         * @param method
         */
        this.call = function($elem, method) {

            var pluginBackingObj = $elem.data(this.name);

            if(this._pluginUndefinedAnd_methodUndefinedOrMethodIsConfig(pluginBackingObj, method)) {

                var backingObj = new com.tniswong.jq.PluginFactory.plugins[this.name].BackingObj($elem, this.defaults, method);
                backingObj.init();

                $elem.data(this.name, backingObj);

            } else {

                if(typeof method === "string") {
                    return pluginBackingObj[method](Array.prototype.slice.call(arguments, 2));
                }

            }

        };

        /**
         *
         * @private
         * @method
         * @param pluginBackingObj
         * @param method
         */
        this._pluginUndefinedAnd_methodUndefinedOrMethodIsConfig = function(pluginBackingObj, method) {
            return !pluginBackingObj && (!method || $.isPlainObject(method))
        }

        /**
         * @class com.tniswong.jq.Plugin.BackingObj
         *
         * BackingObj holds created plugin instances.
         */
        this.BackingObj = function($elem, defaults, opts) {

            /**
             * Element
             * @type {*}
             */
            this.$elem = $elem;

            /**
             * Defaults
             * @type {*}
             */
            this.defaults = defaults;

            /**
             * Options
             * @type {*}
             */
            this.opts = $.extend(this.defaults, opts);

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