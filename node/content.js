'use strict'

var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var qs = require('querystring');

var root =path.resolve('.');
var docsFile = path.join(root,'docs');


var server = http.createServer(function(request,response){
    var resurl = url.parse(request.url);
    var docsName = qs.parse(resurl.query).docs;
    if (docsName && docsName !== 'index'){
        response.writeHead(200);
        var docsPath = path.join(docsFile, docsName+'.md');
        fs.exists(docsPath, function(exists){
            if(exists){
                fs.createReadStream(docsPath).pipe(response);
            }else{
                response.write('文章'+docsName+'不存在');
                response.end();
            }
        }); 
    }else if(!(resurl.query)){
        var pathname = resurl.pathname;
        var filepath = path.join(root,pathname);
        fs.stat(filepath, function(err, stats){
            if(!err && stats.isFile()){
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            }else if(!err &&　stats.isDirectory()){
                fs.readdir(filepath, function(err, files){
                    if(err){
                        response.writeHead(404);
                        response.end('请刷新试试');
                    }else{
                        files.forEach(function(value){
                            if(value === 'home.html'){
                                response.writeHead(200);
                                fs.createReadStream(path.join(filepath,value)).pipe(response);
                            }
                        });
                    }
                });
            }else{
                response.writeHead(404);
                response.end('404')
            }
        });
    }else if(docsName === 'index'){ 
        fs.readFile(path.join(docsFile,'title.json'), 'UTF-8', function(err, data){
            if(err){
                response.writeHead(404);
                response.end('err:服务器出错，请重试');
            }else{
                response.writeHead(200);
                response.end(data);
            }
        })
    }
});

server.listen(80);