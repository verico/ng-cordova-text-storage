angular.module('com.verico.ng-cordova-text-storage').
    service('fileSystem', function ($q,$window) {
        var _public = {};

        var fileSystemObj = null;

        _public.getFileSystem = function() {
            var deferred = $q.defer();


            if(fileSystemObj != null)
            {
                deferred.resolve(fileSystemObj);
            }
            else{

                function onSuccess(fs) {
                    fileSystemObj = fs;
                    deferred.resolve(fs);
                }

                function onError(error) {
                    deferred.reject(error);
                }
                $window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);

            }

            return deferred.promise;
        };

        _public.getFileReader = function(){
            return new FileReader();
        };

        return _public;
    });