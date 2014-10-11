module.exports = function(grunt) {

// 1. All configuration goes here

    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        },
        clean: {
            build: {
                src: [ 'coverage', 'build' ],
                options: { force: true }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/ng-cordova-text-storage-module.js',
                    'src/**/*.js'
                ],
                dest: 'ng-cordova-text-storage.dist.js'
            }
        },
        ngmin: {
            all:{
                src:['ng-cordova-text-storage.dist.js'],
                dest: 'build/ng-cordova-text-storage.ng.js'
            }
        },
        uglify: {
            build: {
                src: 'build/ng-cordova-text-storage.ng.js',
                dest: 'ng-cordova-text-storage.min.js'
            }
        },
        shell: {
            install: {
                options: { stdout: true },
                command: [
                    'npm install',
                    'bower install'
                ].join('&&')
            }
        }
    });

    //Modules
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');


    //Tasks
    grunt.registerTask('install', ['shell:install']);
    grunt.registerTask('build', ['clean','karma','concat','ngmin', 'uglify']);
    grunt.registerTask('default', ['install', 'build']);
};