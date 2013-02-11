jq.pluginFactory.js
==============

What is it?
--------------

PluginFactory is a jQuery plugin that aids in jQuery plugin development. It provides a simple API for creating new
jQuery plugins allowing you to focus more on your plugin, and less on your boilerplate code.

Why should you use it?
--------------

I created PluginFactory because I found myself needing to create new UI components in projects. Some of these were
simple, while others were more complex. I love the ease of use of jQueryUI and the standard way of calling methods, and
I wanted to replicate that in all my new component plugins, so I did.

But.

It was the simple components that bothered me the most. Writing all that boilerplate for something so simple really
seemed like overkill.

So, if you want a quicker way to get started with your plugin with less boilerplate cluttering your code, PluginFactory
is for you!

Getting Started
--------------

Creating your plugin:
```javascript
    (function($, document, window) {

        var myPlugin = {

            pluginName : "myPlugin",

            defaultConfig : {
                // your default config
            },

            methods : {

                init : function() {
                    // initializer
                }

                // your methods here
            }

        }

        $.createPlugin(myPlugin);

    })(jQuery, document, window);
```

Calling your plugin:
```javascript
    // using your defaultConfig
    $('.someClass').myPlugin();

    // using custom config
    $('.anotherClass').myPlugin({someProperty: "override"});
```
