var express=require('express')
, session=require('express-session')
, http=require('http')
//npm i express-session --s

var app=express();

//session()함수를 use하겠다하면 세션이 시작된다.
app.use(session({
    secret:'asdfwe1!',
    resave: false,
    //세션 데이터가 바뀌기 전까지 세션저장소의 값을 저장하지 않음
    saveUninitialized:true
    //true주면 세션이 필요하기 전까지는 세션을 구동하지 않는단 의미
}))

app.get('/',(req,res)=>{
    //세션에 num이라는 숫자를 저장할 예정
    if(req.session.num===undefined){
        //세션에 저장된 num의 값이 없다면
        req.session.num=1; //세션에 num이란 변수에 1값을 저장
    }else{
        req.session.num+=1;//세션변수num이 있다면 1씩 누적
    }
    res.send(`<h1>Hello Session: ${req.session.num} </h1>`)
})

http.createServer(app).listen(3333,()=>{
    console.log("http://localhost:3333");
})
