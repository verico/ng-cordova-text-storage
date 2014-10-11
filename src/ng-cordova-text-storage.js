(function(){
    var NgTextStorage = function(fileWriter, fileReader){

        var _public = {};

        _public.setItem = function(key,value){
            return fileWriter.writeToFile(key,value);
        };

        _public.getItem = function(key){
            return fileReader.readFile(key);
        };

        return _public;
    };

    angular.module('com.verico.ng-cordova-text-storage').service('ngTextStorage',NgTextStorage);
})();