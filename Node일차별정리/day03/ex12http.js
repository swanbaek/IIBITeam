// ex12http.js
var fs=require('fs')
, http=require('http');

http.createServer(function(req,res){

    fs.readFile("Card.html","utf8",function(err,data){
        //data에 파일내용이 담긴다. 
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    })
    //fs를 이용해서 Card.html파일을 읽으세요
    //읽은 파일 데이터를 res를 통해 응답하세요

}).listen(3333,function(){
    console.log("server started...at %d",3333);
})