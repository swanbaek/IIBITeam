var http=require('http'),
express=require('express')
, path=require('path')
, fs=require('fs')
, static=require('serve-static')
, bodyParser=require('body-parser');
//npm i body-parser --save

var app=express();

app.use('/', static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}))
//객체 안에 객체를 파싱할 수 있게하려면 true.
app.set("views",path.join(__dirname,'/views'))
app.set("view engins","ejs");


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
app.post('/login',function(req,res){
    var dummy={
        userid:'hong',
        pwd:'tiger'
    }
    var uid=req.body.userid;
    var upw=req.body.pwd;
    var str="";
    if(uid==dummy.userid&& upw==dummy.pwd){
        str+=uid+"님 환영합니다.";
    /*    res.writeHead(200,{'Content-Type':'text/html; charset=utf8'})
    res.write("<h1>사용자가 보낸 데이터</h1>")
    res.write("<h2>아이디: "+uid+"</h2>");
    res.write("<h2>비밀번호: "+upw+"</h2>");
    res.end();*/
    res.send(str);
    }else{
        //str+="<script>alert('아이디 틀려요');</script>"
        res.redirect("/login.html")
    }
    
    //res.send("hohoh");
    
})

http.createServer(app).listen(3333,function(){

    console.log("port 3333");
})
