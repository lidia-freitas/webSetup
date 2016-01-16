'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var config = {
        app: ''
    };

    grunt.initConfig({
        config: config,

        watch: {
            options: {
                livereload: true
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wireUp'],
                options: {
                  spawn: false,
                },
            },
            sass: {
                files: ['<%= config.app %>Assets/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true
                }
            },
            html: {
                files: ['<%= config.app %>*.html'],
            },
            css: {
                files: ['<%= config.app %>Assets/css/**/*.css'],
            },
            js: {
                files: ['<%= config.app %>Assets/js/**/*.js'],
                tasks: ['jshint'],
            },
            img: {
                files: ['<%= config.app %>Assets/img/**/*.{jpg,png,gif,ico}'],
            },
            fonts: {
                options: {
                    cwd: '<%= config.app %>'
                },
                files: ['*.zip'],
                tasks: ['iconfonts']
            }
        },

        exec: {
            installDependencies: {
                command: 'bower install',
                stdout: true
            },
            copyDependencies: {
                command: 'bower-installer',
                stdout: true
            }
        },

        wiredep: {
            task: {
                src: ['<%= config.app %>*.html']
            }
        },
        replace: {
            task:{
                src: ['<%= config.app %>*.html'],
                overwrite: true,
                replacements: [{
                    from: 'bower_components/',
                    to: "Assets/vendor/"
                }]
            }
        },

        sass: {
            server: {
                options: {
                    sourcemap: 'auto',
                    trace: true,
                    style: 'expanded',
                    lineNumbers: true,
                    includePaths: [
                        'bower_components/bourbon/app/assets/stylesheets/',
                        'bower_components/neat/app/assets/stylesheets/',
                        'bower_components/normalize-scss/'
                    ],
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>Assets/scss',
                    src: ['*.scss'],
                    dest: '<%= config.app %>Assets/css',
                    ext: '.css'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: ['Assets/vendor/**/*.js']
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>Assets/js/**/*.js'
            ]
        },

        iconfonts: {
            icomoon: {
                options: {
                    src: './icomoon.zip',
                    cssDest: '<%= config.app %>Assets/scss/_icons.scss',
                    fontsDest: '<%= config.app %>Assets/fonts/icomoon',
                    fontsUrl: '../fonts/icomoon'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= config.app %>'
                }
            }
        }
    });


    // ================ Grunt Register Tasks ==============//
    grunt.registerTask('wireUp', ['exec:installDependencies', 'exec:copyDependencies', 'wiredep', 'replace']);
    grunt.registerTask('default', ['connect', 'watch']);
};
