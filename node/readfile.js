var http = require('http');
var fs = require("fs");
var server = http.createServer();
server.listen(9001, function(){
    console.log('服务器正在端口号：9001上运行......');
})
server.on('request',function(request,response){
		
    var url = request.url;
    if(url ==='/'){
        //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
        response.writeHead(200,{'Content-Type':'text/html'})
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('../空.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    
    }else if(url === '/login'){
        response.writeHead(200,{'Content-Type':'text/html'});
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('../测试.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }else if(url === '/index'){
        response.writeHead(200,{'Content-Type':'text/html'});
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('../测试.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }else{
        response.writeHead(200,{'Content-Type':'text/html'});
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('../测试.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    
})