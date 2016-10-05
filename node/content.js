'use strict'

var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function(request,response){
    var resurl = url.parse(request.url);
    console.log(resurl.pathname);
    if (resurl.pathname === '/'){
        response.end('233');
    }
});

server.listen(80);