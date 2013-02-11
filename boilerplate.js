(function($, document, window) {

    var yourPlugin = {

        // Name of your Plugin
        pluginName : 'yourPlugin', // $('.someClass').yourPlugin();

        // Config Defaults. Overridden by Map arg passed to plugin init.
        defaults : {

            // Config values here

        },

        methods : {

            /**
             * Init gets called for each selected element.
             */
            init : function() {

                var that = this;

                // that.opts: Options to use for this plugin instance. (Defaults overridden by given options)
                // that.$elem: jQuery element for this plugin instance.


            },

            /**
             * $('.someClass').yourPlugin('doSomething', 'text');
             */
            doSomething : function(text) {

            },

            /**
             * Not available to call via plugin syntax
             *
             * i.e. $('.someClass').yourPlugin('_doSomethingPrivate', 'text'); will not work.
             */
            _doSomethingPrivate : function(text) {

            }

        }

    }

    $.createPlugin(yourPlugin);

})(jQuery, document, window);