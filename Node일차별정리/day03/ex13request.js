//ex13request.js
//url모듈도 함께 사용
var http=require('http')
, fs=require('fs')
, url=require('url');
/* request의 속성
[1] method : 요청방식
[2] url : 요청 url
[3] headers: 요청 메시지 헤더
[4] httpVersion: http버전 정보
[5] trailers : 요청 메시지 트레일러

*/
var server=http.createServer(function(req,res){
    var meth=req.method;
    var path=req.url;
    var hds=req.headers;
    console.log("요청방식: "+meth);
    console.log("요청url: "+path);
    //console.log("요청헤더: "+hds);
    //console.dir(hds);
    //요청 url '/'  ====> Card.html
    if(path=='/'){
        fs.readFile("Card.html","utf8",(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        })
    }else if(path=='/login'){
        fs.readFile("login.html","utf8",(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        });

    }else if(path=='/join'){
        fs.readFile("join.html","utf8",function(err, data){
            //data에 파일내용이 담긴다.
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        });
    }

    //         '/login'  ==> login.html
    //         '/join' ===> join.html 로 응답을 내보내세요


});
server.listen(3333,function(){
    console.log("started...at 3333");
})