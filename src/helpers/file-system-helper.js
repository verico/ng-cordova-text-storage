angular.module('com.verico.ng-cordova-text-storage').
    service('fileSystem', function ($q) {
        var _public = {};

        _public.getFileSystem = function() {
            var deferred = $q.defer();

            function onSuccess(fs) {
                deferred.resolve(fs);
            }

            function onError(error) {
                deferred.reject(error);
            }

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);


            return deferred.promise;
        };

        _public.getFileReader = function(){
            return new FileReader();
        };

        return _public;
    });