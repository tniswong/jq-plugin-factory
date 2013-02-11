module("pluginFactoryTests");

QUnit.testDone(function( details ) {
    $.removeData(document);
});

var testPlugin = {

    pluginName: 'testPlugin',

    defaultConfig : {

    },

    methods : {

        init : function() {}

    }

}

test("Plugin Created", function() {
    ok($.createPlugin, "PluginFactory Created Successfully")
});

test("Plugin via $.createPlugin() Created", function() {

    $.createPlugin(testPlugin);

    var result = $.fn.testPlugin;
    ok(result, "testPlugin Created Successfully")

});

test("Created Plugin methods.init called", function() {

    var initialized = false;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {
                initialized = true;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    $(document).testPlugin();

    ok(initialized, "Init called Successfully");

});

test("Created Plugin method call 0 args", function() {

    var myMethodCalled = false;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            myMethod : function() {
                myMethodCalled = true;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();
    $testPlugin.testPlugin('myMethod');

    ok(myMethodCalled, "MyMethod called Successfully");

});

test("Created Plugin method call 1 args", function() {

    var argValue;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            myMethod : function(arg1) {
                argValue = arg1;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();
    $testPlugin.testPlugin('myMethod', 'arg1');

    equal(argValue, 'arg1' , "Arg 1 passed successfully");

});

test("Created Plugin method call 2 args", function() {

    var arg1Value;
    var arg2Value;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            myMethod : function(arg1, arg2) {
                arg1Value = arg1;
                arg2Value = arg2;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();
    $testPlugin.testPlugin('myMethod', 'arg1', 'arg2');

    equal(arg1Value, 'arg1', "Arg 1 passed successfully");
    equal(arg2Value, 'arg2', "Arg 2 passed successfully");

});

test("Created Plugin method call n args", function() {

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            myMethod : function(a, b, c, d, e) {
                return [a, b, c, d, e];
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();
    var result = $testPlugin.testPlugin('myMethod', 'a', 'b', 'c', 'd', 'e');

    deepEqual(result, ["a","b","c","d","e"], "N Args passed successfully");

});

test("Created Plugin method call return value", function() {

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            myMethod : function() {
                return "result";
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();
    var result = $testPlugin.testPlugin('myMethod');

    equal(result, "result", "Method return Successfully");

});

test("Created Plugin private method call fails", function() {

    var privateMethodCalled = false;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {

            },
            _privateMethod : function() {
                privateMethodCalled = true;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var $testPlugin = $(document).testPlugin();

    $testPlugin.testPlugin('_privateMethod');

    ok(!privateMethodCalled, "Private Method Not Called");

});

test("Created Plugin has $elem available", function() {

    var $element;

    var mockTestPlugin = $.extend(testPlugin, {
        methods : {
            init : function() {
                $element = this.$elem;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    $(document).testPlugin();

    deepEqual($element, $(document), "$elem was available");

});

test("Created Plugin has config available", function() {

    var options;

    var mockTestPlugin = $.extend(testPlugin, {
        defaultConfig : {
            someValue : "someValue"
        },
        methods : {
            init : function() {
                options = this.config;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    $(document).testPlugin();

    deepEqual(options, mockTestPlugin.defaultConfig, "config was available");

});

test("Created Plugin config overrides defaults", function() {

    var config;

    var mockTestPlugin = $.extend(testPlugin, {
        defaultConfig : {
            someValue : "someValue",
            anotherValue : "anotherValue"
        },
        methods : {
            init : function() {
                config = this.config;
            }
        }
    });

    $.createPlugin(mockTestPlugin);

    var configOptions = {someValue: 'notSomeValue'};
    $(document).testPlugin(configOptions);

    deepEqual(config, $.extend(mockTestPlugin.defaultConfig, configOptions), "config was available and extended");
    equal(config.someValue, "notSomeValue", "Opt was overridden properly");

});