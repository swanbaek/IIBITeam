//ex18post.js
/*라우팅 --------------------------
get /  ==> MyHome보여주기
get /login ==> login.html페이지 보여주기
post /login => 로그인 처리 (사용자 인증)
get /users ==> 회원목록 페이지
get /users/1 ==> 1번 회원정보 보여주기
그 외 요청시 ==> 404 Page Not Found
-----------------------------------
*/
var http=require('http')
, express=require('express')
, fs=require('fs')
, static=require('serve-static')
, path=require('path')
, bodyParser=require('body-parser')//post방식일 때 필요한 모듈

var app=express();
app.use('/', static(path.join(__dirname,'public')));
///////////////////////////////////////
app.use(bodyParser.urlencoded({extended:true}))
            //true값을 주면 객체 안에 객체를 파싱할 수 있도록 함
/////////////////////////////////////            
app.get('/', (req,res)=>{
    res.send("<h1> My Home</h1>");
})            

//http://localhost:3333/login.html
app.get("/login",function(req,res){
    //fs로 login.html파일 읽어서  응답 보내기
    fs.readFile("./public/login.html","utf8", function(err, data){
        if(err){
            console.log(err);
        }
        //res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
       // res.write(data);
        res.send(data);
        //res.end();
    })
})
app.post('/login',function(req,res){
    var dummy={
        userid:'hong',
        pwd:'123'
    }

    //var uid=req.query.userid;//get방식일 경우
    var uid=req.body.userid;//post방식일 경우=> body-parser 설치해야
    var upw=req.body.pwd;
    //사용자가 입력한 아이디와 비번이 dummy의 userid,pwd와 같다면=>"환영메시지"
    //                                                  다르다면=>"일치하지 않아요"
    if(uid==dummy.userid && upw==dummy.pwd){
        //res.send("<h1>"+uid+"님 환영합니다</h1>");
        //홈페이지로 돌려보내자.
        res.redirect('/')  //redirect방식으로 페이지 이동
    }else{
        res.send("<h1>아이디 또는 비밀번호가 틀려요</h1>");
    }   
    // res.send("<h1>아이디: "+uid+", 비번: "+upw+"</h1>");
    //npm i body-parser --s해서 설치하기
})

app.get('/users',(req,res)=>{
    res.send("<h1>모든 회원 목록 페이지</h1>")
})

app.get("/users/:uid", (req,res)=>{
    //요청 패스에 따라 다르게 들어오는 :uid =>요청파라미터를 받아보자.
    //req.query.userid
    //req.body.userid
    var uid=req.params.uid;
    res.send(`<h1>${uid} 정보 보기</h1>`)
} )

app.all("*",(req,res)=>{
    res.status(404).send("<h1>해당 페이지는 존재하지 않아요</h1>")
})

http.createServer(app).listen(3333,function(){
    console.log("3333 port");
})