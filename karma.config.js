module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',
        // frameworks to use
        frameworks: ['jasmine'],
        plugins: ['karma-coverage','karma-spec-reporter', 'karma-jasmine', 'karma-phantomjs-launcher'],


        preprocessors : {
            'ng-cordova-text-storage-module.js': 'coverage'
        },
        // list of files / patterns to load in the browser
        files: [
            //Angular files
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',

            //Source files
            'src/ng-cordova-text-storage-module.js',
            'src/**/*.js',
            //Specg
            'tests/textStorageSpec.js'
        ],
        exclude: [],
        reporters: ['progress','coverage'],
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        port: 9876,
        runnerPort: 0,
        captureTimeout: 60000,
        singleRun: true,
        coverageReporter : {
            type : 'html',
            dir : 'coverage/',
            file : 'coverage.txt'
        }
    });
};