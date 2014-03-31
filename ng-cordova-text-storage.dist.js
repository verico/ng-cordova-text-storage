angular.module('com.verico.ng-cordova-text-storage',[]);
angular.module('com.verico.ng-cordova-text-storage')
    .service('fileReader', function ($q,fileSystem,filenameFactory) {

        var _public ={};
        var _private ={};


        _public.readFile = function(fs,name){
            var deferred = $q.defer();

            fileSystem.getFileSystem().then(function(fs){
                fs.root.getFile(filenameFactory.getFilename(name), {create: false, exclusive: false}, function(fileEntry){
                    var reader = fileSystem.getFileReader();
                    reader.onloadend = function(evt) {
                        deferred.resolve(evt.target.result);
                    };
                    reader.readAsText(fileEntry);

                }, deferred.reject);


            },deferred.reject);


            return deferred.promise;
        };




        return _public;
});
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
angular.module('com.verico.ng-cordova-text-storage').
    factory('filenameFactory', function () {
        var _public = {};
        var _private = {};

        _private.saveFolder = 'textStorage';

        _public.getFilename = function(key){
            return _private.saveFolder + '/' + key + '.json';
        };

        return _public;
    });
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