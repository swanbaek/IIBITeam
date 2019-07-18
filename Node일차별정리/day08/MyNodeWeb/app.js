//app.js
//Express기본 모듈 불러오기
var http=require('http')
,express=require('express')
,path=require('path')
,fs=require('fs')

//Express 미들웨어 불러오기
var bodyParser=require('body-parser')
, static=require('serve-static')

//사용자 정의 모듈 불러오기
var routes=require('./routes') //Controller
var user=require('./routes/user/member.js')
//routes.js가 있는지 먼저 찾고 없으면 routes디렉토리를 찾아  index.js 를 찾는다.

//express-session관련 모듈 불러오기
var session=require('express-session')
, FileStore=require('session-file-store')(session);


var app=express();

app.set('port', 3333)
app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/',static(path.join(__dirname,'public')))
app.use(session({
    secret:'asfkslfl',
    resave:false,
    saveUninitialized:true,
    store:new FileStore()
}))
//post방식일 때 설정
app.use(bodyParser.urlencoded({extended:true}))

app.use("*",function(req,res,next){
console.log(">>>>"+JSON.stringify(req.session.loginUser))
res.locals.isLogin=(req.session.loginUser===undefined)?false:true;
res.locals.user=(req.session.loginUser)? req.session.loginUser.user:null;
next();
})

app.get('/', routes.index)
// app.get('/',(req,res)=>{
//     res.send("<h1>Hello MyNodeWeb</h1>")
// })
//회원가입 관련----------
app.get('/join',user.join)
app.post('/join',user.joinEnd)
app.get('/idcheck',user.idcheck)
app.get('/users', user.list)
app.get('/users/delete/:idx', user.delete)
app.get('/users/:idx', user.userView)
app.post('/users/edit', user.userEdit)
//로그인 관련-------------
app.get('/login',user.loginForm)
app.post('/login',user.loginEnd)

http.createServer(app).listen(app.get('port'), function(){
    console.log('http://localhost:'+app.get('port'))
})