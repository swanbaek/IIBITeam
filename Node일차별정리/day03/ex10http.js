// ex10http.js
/* 
http모듈
- http웹서버와 관련된 모든 기능을 담은 모듈
  http모듈의 createServer()메소드를 사용하여 server객체를 생성한다.
*/
var http=require('http');
var server=http.createServer();
server.on('request',function(code){
    //클이 요청을 보내면 발생되는 이벤트
    console.log("Request On: "+code);
})
server.on('connection',function(code){
    //클이 접속하면 발생되는 이벤트
    console.log("Connection On: "+code);
})
server.on('close',function(code){
    //서버 종료시 호출됨
    console.log("Close On: "+code);
})



server.listen(3333,function(){
    console.log("server started at http://localhost:3333");
})