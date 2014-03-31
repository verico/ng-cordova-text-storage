angular.module('com.verico.ng-cordova-text-storage').
    factory('filenameFactory', function () {
        var _public = {};
        var _private = {};

        _private.saveFolder = 'textStorage';

        _public.getFilename = function(key){
            return key + '.json';
        };

        return _public;
    });