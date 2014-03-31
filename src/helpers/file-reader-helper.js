angular.module('com.verico.ng-cordova-text-storage')
    .service('fileReader', function ($q,fileSystem,filenameFactory) {

        var _public ={};
        var _private ={};


        _public.readFile = function(name){
            var deferred = $q.defer();

            fileSystem.getFileSystem().then(function(fs){
                fs.root.getFile(filenameFactory.getFilename(name), {create: false, exclusive: false}, function(fileEntry){
                    fileEntry.file(function(file){
                        var reader = fileSystem.getFileReader();
                        reader.onloadend = function(evt) {
                            deferred.resolve(evt.target.result);
                        };
                        reader.readAsText(file);

                    }, deferred.reject);

                }, deferred.reject);


            },deferred.reject);


            return deferred.promise;
        };




        return _public;
});