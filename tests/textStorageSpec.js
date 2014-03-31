angular.module('textStorageTests',['com.verico.ng-cordova-text-storage']);

describe('Map tests', function() {
    var q;
    var timeout;
    var textStorage;
    var createdFile;
    var fileSystemMock;

    var fileFactory = function(path){
        var  retFile = { fullPath: path };
        retFile.file = function(cb,cbErr){
            cb({
                size: fileSize,
                remove : function(cb){
                    cb();
                }
            });
        };

        retFile.textContent ='';

        retFile.createWriter = function(cb){

            var writer = {};
            writer.write = function(text){
                retFile.textContent = text;
            };

            cb(writer);
        };
        return retFile;
    };


    //Load module
    beforeEach(function () {
        module('textStorageTests');
    });
    //Mocking of the cordova file transfer api
    beforeEach(function() {
        createdFile = {};

        fileSystemMock = {
            getFileSystem: function() {
                var fs = {};
                fs.root = {
                    getFile: function(file, options, callback, errorCallback) {
                        //When file dont exists,
                        if (options.create) {
                            var retFile = fileFactory(file);
                            createdFile = retFile;

                            callback(retFile);
                        }
                        else if(!options.create){
                            callback(createdFile);
                        }
                        else{
                            errorCallback('File do not exists');
                        }
                    }
                };

                var deferred = q.defer();
                timeout(function() {
                    deferred.resolve(fs);
                }, 0);


                return deferred.promise;
            },
            getFileReader : function(){
                var reader = {};
                reader.readAsText = function(file){
                    var env={
                        target : {
                            result : createdFile.textContent
                        }
                    };

                    reader.onloadend(env);
                };
                return reader;
            }
        };

        module(function($provide) {
            $provide.value('fileSystem', fileSystemMock);
        });
    });





    beforeEach(function () {
        inject(function ($q,$timeout, ngTextStorage) {
            q = $q;
            timeout = $timeout;
            textStorage = ngTextStorage;
        });
    });


    it('Service initialized',function(){
        expect(textStorage).not.toEqual(undefined);
    });

    describe('Set/get tests',function(){
        it('Write to file',function(done){
            var content = "string string string";

            textStorage.setItem('test',content).then(function(){
                expect(createdFile.textContent).toEqual(content);
                done();

            },function(){
                //Should NOT hit this.
                expect(true).toEqual(false);
                done();

            });
            timeout.flush();
        });

        it('Get file',function(done){
            var txt = 'test content in the file';

            createdFile = {
                textContent : txt
            };


            textStorage.getItem('test').then(function(content){
                expect(content).toEqual(txt);
                done();
            },function(err){
                //Should NOT hit this.
                expect(true).toEqual(false);
                done();
            });

            timeout.flush();
        });
    });
});

