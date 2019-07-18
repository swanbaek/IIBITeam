var userdb=require('../../model/userdb.js');
var fs=require('fs');

exports.join=function(req,res){
    //views/user/join.ejs
    var data={title:'Member Join Form'}
    res.render('user/join',data)
}

exports.joinEnd=function(req,res){
    //사용자가 입력한 name, userid, pwd 값 받아서
    var name=req.body.name;
    var userid=req.body.userid;
    var pwd=req.body.pwd;
    var user={
        name: name,
        userid: userid,
        pwd: pwd
    }
    userdb.joinEnd(user,req,res);
    //res.send("<h1>회원가입 처리중..."+JSON.stringify(user)+"</h1>");
}

exports.idcheck=function(req,res){
    //넘어온 userid값 받기
    var userid=req.query.userid;//get방식 req.query를 통해 받는다.
    userdb.idcheck(userid, req, res);
}


exports.list=function(req,res){
    userdb.listUser(req,res);
}
// /users/delete/1
exports.delete=function(req,res){
    //삭제할 회원정보 받기
    //req.query.idx =>get방식의 쿼리스트링
    //req.body.idx => post방식
    //req.params.idx => path접근방식
    console.log("삭제할 회원번호: "+req.params.idx);
    var data={idx:req.params.idx};
    userdb.deleteUser(data, req, res);
}

exports.userView=function(req,res){
    //수정할 회원번호 받기
    var data={idx:req.params.idx};
    console.log(JSON.stringify(data));
    userdb.selectUser(data,req,res);
}

exports.userEdit=function(req, res){
    //회원의 수정 정보 받기
    var idx=req.body.idx;
    var name=req.body.name;
    var userid=req.body.userid;
    var pwd=req.body.pwd;

    var data={
        idx:idx,
        name:name,
        userid:userid,
        pwd:pwd
    }
    console.log(JSON.stringify(data));
    userdb.editUser(data, req, res);
}//---------------------------------

exports.loginForm=function(req, res){
    fs.readFile('public/login.html','utf8', function(err,data){
        if(err) throw err;
        res.end(data);
    })
}//----------------------------------

exports.loginEnd=function(req, res){
    //사용자가 입력한 아이디,비번 받기
    var uid=req.body.userid;
    var upw=req.body.pwd;
    var tmpUser={userid:uid, pwd:upw};
    console.log("tmpUser="+JSON.stringify(tmpUser));
    userdb.loginEnd(tmpUser, req, res);    
}//----------------------------------
