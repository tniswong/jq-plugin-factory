module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            files: ['src/*.js', 'test/unit/*.js'],
            directives: { // example directives
                browser: true,
                unparam: true,
                todo: true,
                nomen: true,
                predef: [ // array of pre-defined globals
                    'jQuery','module','QUnit','test','ok','equal','deepEqual'
                ]
            },
            options: {
                junit: 'out/junit.xml', // write the output to a JUnit XML
                log: 'out/lint.log',
                jslintXml: 'out/jslint_xml.xml',
                errorsOnly: true, // only display errors
                failOnError: false, // defaults to true
                shebang: true, // ignore shebang lines
                checkstyle: 'out/checkstyle.xml' // write a checkstyle-XML
            }
        },
        qunit: {
            all: ['test/tests.html']
        },
        uglify: {
            my_target: {
                options: {
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n\n' +
                            grunt.file.read("mit-license.txt") + ' */\n'
                },
                files: {
                    'dist/jq.plugin-factory.min.js' : ['src/jq-plugin-factory.js']
                }
            }
        }
    });

    // Load tasks from "grunt-sample" grunt plugin installed via Npm.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jslint');

    // Default task.
    grunt.registerTask('default', ['jslint', 'qunit', 'uglify']);

};