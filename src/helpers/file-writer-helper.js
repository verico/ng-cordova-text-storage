angular.module('com.verico.ng-cordova-text-storage')
    .service('fileWriter', function ($q,fileSystem,filenameFactory) {


        var _public = {};
        var _private = {};
        _private.saveFolder = 'textStorage';

        _private.getWriter = function(fs,name){
            var deferred = $q.defer();

            fs.root.getFile(filenameFactory.getFilename(name), {create: true, exclusive: false}, function(fileEntry){
                    fileEntry.createWriter(function(fileWriter){
                        deferred.resolve(fileWriter);
                    }, deferred.reject);
                }, deferred.reject);

            return deferred.promise;
        };

        _public.writeToFile = function(key,value){
            var deferred = $q.defer();

            fileSystem.getFileSystem().then(function(fs){

                _private.getWriter(fs,key).then(function(writer){
                    writer.write(value);
                    deferred.resolve();
                },deferred.reject);
            });

            return deferred.promise;
        };


        return _public;
    });