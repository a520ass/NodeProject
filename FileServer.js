/**
 * Created by 520 on 2016/12/28.
 */
// 引入http模块
var http = require("http");
var fs = require("fs");

http.createServer(function (request,response) {
    if(request.method!="GET"){
        response.writeHead(403);
        response.end();
        return null;
    }

    var sep=request.url.indexOf('?');
    var filePath = sep < 0 ? request.url : request.url.slice(0, sep);
    console.log("GET file: " + filePath);

    //
    fs.stat("."+filePath,function (err,stats) {
        if(err){
            response.writeHead(404);
            response.end();
            return null;
        }
        response.writeHead(200, {"Content-Type": "text/plain", "Content-Length": stats.size});
        var stream=fs.createReadStream("."+filePath);
        stream.on('data',function(chunk){
            response.write(chunk);
        });

        stream.on('end',function(){
            response.end();
        });

        stream.on('error',function(){
            response.writeHead(500);
            response.end();
        });
    });
}).listen(8000);
console.log("Hello World start listen on port 8000");