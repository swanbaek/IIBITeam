//ex15express.js
var http=require('http')
, express=require('express')
, path=require('path')
, static=require('serve-static');

//express를 설치해야 함. npm install express --save
//express모듈(외장모듈): http모듈처럼 사용할 수 있으며, http보다
//                      더 많은 기능을 가지고 있는 모듈

var app=express();
//express객체 생성

app.use('/', static(path.join(__dirname,'public')));
//public이라는 디렉토리에 정적인 파일들을 두고 
// '/' 경로로 접근하고자 할 때 사용


//미들웨어
app.use(function(req,res,next){
    console.log("1. 미들웨어에서 요청 처리....");
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write("<h1>Hello Express</h1>");
    next();
})
app.use(function(req,res,next){
    console.log("2. 미들웨어에서 요청 처리....");
    req.user="Hong";
    next();
})
app.use(function(req,res,next){
    console.log("3. 미들웨어에서 요청 처리....");
    res.write("<h2 style='color:red'> I'm "+req.user+"</h2>");
    res.write("<img src='/images/1.jpg'>")
    res.end();
});
//Express서버 시작
http.createServer(app).listen(3333,function(){
    console.log("Express Servet started at 3333 port")
})

