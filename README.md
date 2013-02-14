jq.pluginFactory.js
==============

What is it?
--------------

PluginFactory is a jQuery plugin that aids in jQuery plugin development. It provides a simple API for creating new
jQuery plugins allowing you to focus more on your plugin, and less on your boilerplate code.

Why should you use it?
--------------

I created PluginFactory because I found myself needing to create new UI components in projects. Some of these were
simple, while others were more complex. I love the ease of use of jQueryUI and the standard way of invoking methods, and
I wanted to replicate that in all my new component plugins, so I did.

But.

It was the simple components that bothered me the most. Writing all that boilerplate for something so simple really
seemed like overkill.

So, if you want a quicker way to get started with your plugin with less boilerplate cluttering your code, PluginFactory
is for you!

Getting Started
--------------

Consider this example
```javascript
(function($, document, window) {

    var foo = {

        pluginName : "foo",

        // Stores configuration options for this plugin instance.
        defaultConfig : {

            bar : ""

        },

        /*
         * Stores methods available to this plugin.
         *
         * These methods each have access to the attached element and the config merged from
         * the optional constructor parameter.
         *
         * Ex:
         * init : function() {
         *     this.$elem;  // the element
         *     this.config; // the merged config
         * }
         */
        methods : {

            // This method is invoked when a new plugin instance is created.
            init : function() {
                // init code
            }

            // Plugin method
            qux : function() {
                // qux code
            }

        }

    }

    $.createPlugin(foo);

})(jQuery, document, window);
```

Using your plugin:
```javascript
var $foo = $('.someClass').foo();
```

Initialize optional configurations:
```javascript
// config.bar == "baz" for this plugin instance
var $foo = $('.someClass').foo({bar: "baz"});
```

Invoking a method:
```javascript
$foo.foo('qux'); // invokes qux method.
```

Invoke a method with arguments:
```javascript
$foo.foo('qux', 'arg1', 'arg2'); // 'arg3', etc...
```

Return values in methods work too:
```javascript
var result = $foo.foo('qux');
```