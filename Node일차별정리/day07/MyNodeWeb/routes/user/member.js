var userdb=require('../../model/userdb.js');
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