var http=require('http'),
express=require('express')
, path=require('path')
, fs=require('fs')
, static=require('serve-static');

var app=express();

app.use('/', static(path.join(__dirname,'public')));

app.get("/login",function(req,res){
    //get방식일 경우 사용자가 입력한 값 받기
    var uid=req.query.userid;
    var upw=req.query.pwd;
    res.writeHead(200,{'Content-Type':'text/html; charset=utf8'})
    res.write("<h1>사용자가 보낸 데이터</h1>")
    res.write("<h2>아이디: "+uid+"</h2>");
    res.write("<h2>비밀번호: "+upw+"</h2>");
    res.end();
})

http.createServer(app).listen(3333,function(){

    console.log("port 3333");
})
