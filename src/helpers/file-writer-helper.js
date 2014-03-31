angular.module('com.verico.ng-cordova-text-storage')
    .service('fileWriter', function ($q,fileSystem,filenameFactory) {


        var _public = {};
        var _private = {};
        _private.saveFolder = 'textStorage';

        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function gotFS(fileSystem) {
            fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
        }


        function gotFileWriter(writer) {
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample text'");
                writer.truncate(11);
                writer.onwriteend = function(evt) {
                    console.log("contents of file now 'some sample'");
                    writer.seek(4);
                    writer.write(" different text");
                    writer.onwriteend = function(evt){
                        console.log("contents of file now 'some different text'");
                    };
                };
            };
            writer.write("some sample text");
        }

        function fail(error) {
            console.log(error.code);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        }


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