angular.module('com.verico.ng-cordova-text-storage')
    .service('ngTextStorage',function(fileWriter, fileReader){

    var _public = {};
    var _private = {};

    _public.setItem = function(key,value){
       return fileWriter.writeToFile(key,value);
    };

    _public.getItem = function(key){
        return fileReader.readFile(key);
    };

    return _public;
});