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