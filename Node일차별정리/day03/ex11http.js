// ex11http.js
var http=require('http');

/* response객체:
    [1] writeHead(상태코드,[상태메시지][headers])
    [2] write() 응답 데이터를 쓸때
    [3] end([data][encoding][callback]):응답 본문을 작성
*/
var server=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end("<h1>Hello NodeJS</h1>");
}).listen(3333,function(){
    console.log("server started...at 3333");
})