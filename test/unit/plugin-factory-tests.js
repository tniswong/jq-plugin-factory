(function ($, module, QUnit, test, ok, equal, deepEqual) {

    "use strict";

    module("pluginFactoryTests");

    QUnit.testDone(function (details) {
        $.removeData(document);
    });

    var testPlugin = {

        pluginName: 'testPlugin',

        defaultConfig : {

        },

        methods : {

            init : function () {}

        }

    };

    test("Plugin Created", function () {
        ok($.createPlugin, "PluginFactory Created Successfully");
    });

    test("Plugin via $.createPlugin() Created", function () {

        $.createPlugin(testPlugin);

        var result = $.fn.testPlugin;
        ok(result, "testPlugin Created Successfully");

    });

    test("Created Plugin methods.init called", function () {

        var initialized, mockTestPlugin;

        initialized = false;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {
                    initialized = true;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $(document).testPlugin();

        ok(initialized, "Init called Successfully");

    });

    test("Created Plugin method call 0 args", function () {

        var myMethodCalled, mockTestPlugin, $testPlugin;

        myMethodCalled = false;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                myMethod : function () {
                    myMethodCalled = true;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();
        $testPlugin.testPlugin('myMethod');

        ok(myMethodCalled, "MyMethod called Successfully");

    });

    test("Created Plugin method call 1 args", function () {

        var argValue, mockTestPlugin, $testPlugin;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                myMethod : function (arg1) {
                    argValue = arg1;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();
        $testPlugin.testPlugin('myMethod', 'arg1');

        equal(argValue, 'arg1', "Arg 1 passed successfully");

    });

    test("Created Plugin method call 2 args", function () {

        var arg1Value, arg2Value, mockTestPlugin, $testPlugin;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                myMethod : function (arg1, arg2) {
                    arg1Value = arg1;
                    arg2Value = arg2;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();
        $testPlugin.testPlugin('myMethod', 'arg1', 'arg2');

        equal(arg1Value, 'arg1', "Arg 1 passed successfully");
        equal(arg2Value, 'arg2', "Arg 2 passed successfully");

    });

    test("Created Plugin method call n args", function () {

        var mockTestPlugin, $testPlugin, result;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                myMethod : function (a, b, c, d, e) {
                    return [a, b, c, d, e];
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();
        result = $testPlugin.testPlugin('myMethod', 'a', 'b', 'c', 'd', 'e');

        deepEqual(result, ["a", "b", "c", "d", "e"], "N Args passed successfully");

    });

    test("Created Plugin method call return value", function () {

        var mockTestPlugin, $testPlugin, result;
        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                myMethod : function () {
                    return "result";
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();
        result = $testPlugin.testPlugin('myMethod');

        equal(result, "result", "Method return Successfully");

    });

    test("Created Plugin private method call fails", function () {

        var privateMethodCalled, mockTestPlugin, $testPlugin;

        privateMethodCalled = false;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {

                },
                _privateMethod : function () {
                    privateMethodCalled = true;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $testPlugin = $(document).testPlugin();

        $testPlugin.testPlugin('_privateMethod');

        ok(!privateMethodCalled, "Private Method Not Called");

    });

    test("Created Plugin has $elem available", function () {

        var $element, mockTestPlugin;

        mockTestPlugin = $.extend(testPlugin, {
            methods : {
                init : function () {
                    $element = this.$elem;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $(document).testPlugin();

        deepEqual($element, $(document), "$elem was available");

    });

    test("Created Plugin has config available", function () {

        var options, mockTestPlugin;

        mockTestPlugin = $.extend(testPlugin, {
            defaultConfig : {
                someValue : "someValue"
            },
            methods : {
                init : function () {
                    options = this.config;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        $(document).testPlugin();

        deepEqual(options, mockTestPlugin.defaultConfig, "config was available");

    });

    test("Created Plugin config overrides defaults", function () {

        var config, mockTestPlugin, configOptions;

        mockTestPlugin = $.extend(testPlugin, {
            defaultConfig : {
                someValue : "someValue",
                anotherValue : "anotherValue"
            },
            methods : {
                init : function () {
                    config = this.config;
                }
            }
        });

        $.createPlugin(mockTestPlugin);

        configOptions = {someValue: 'notSomeValue'};
        $(document).testPlugin(configOptions);

        deepEqual(config, $.extend(mockTestPlugin.defaultConfig, configOptions), "config was available and extended");
        equal(config.someValue, "notSomeValue", "Opt was overridden properly");

    });
}(jQuery, module, QUnit, test, ok, equal, deepEqual));