//oracledb모듈 설치
//npm i  oracledb --s

var db=require('oracledb')
var dbconfig=require('./dbconfig.js')
db.autoCommit=true;//자동 커밋

exports.joinEnd=function(user, req, res){
    //db연결
    db.getConnection(dbconfig, function(err, con){
        if(err) throw err;
        //console.log("con="+con)
        var sql="insert into node_user values(node_user_seq.nextval,"
            sql+=":userid, :name, :pwd,sysdate)";
        console.log('sql='+sql);
        con.execute(sql, user, function(err, result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                //결과 처리
                console.log('result='+JSON.stringify(result));
                var n=parseInt(result.rowsAffected);
                var data={};
                if(n>0){
                    data.msg="회원 가입 성공";
                    data.loc="/login";
                   // res.send("<h1>회원 가입 성공</h1>");
                }else{
                    data.msg="회원가입 실패";
                    data.loc="javascript:history.back()";
                   // res.send("<h1>회원 가입 실패</h1>")
                }
                res.render('message',data);
                //views/message.ejs
            })//con.close()-------
        })//con.execute()--------------
    })//con.getConnection()---------------

}//joinEnd()--------------------------------

exports.idcheck=function(uid, req,res){
    //console.log("db단: uid="+uid);
    db.getConnection(dbconfig,function(err,con){
        if(err) throw err;
        var sql="select idx from node_user where userid=:userid";
        var data={userid:uid}
        con.execute(sql,data,function(err,result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                console.log("result="+JSON.stringify(result));
                //데이터가 없으면 rows:[]
                //데이터가 있으면 rows:[[회원번호]]
                var rdata={};
                if(result.rows.length==0){
                    rdata.isUse=true;//사용 가능한 아이디
                    rdata.userid=uid;
                }else{
                    rdata.isUse=false;//이미 사용중
                    rdata.userid=uid;
                }
                res.json(rdata);//브라우저에 json객체를 출력함
            })
        })
    })
}//----------------------------------------------
exports.totalUser=function(callback){
    db.getConnection(dbconfig,function(err,con){
        if(err) throw err;
        var sql="select count(idx) from node_user";
        con.execute(sql, function(err,result){
            con.close(function(err){
                if(err) throw err
                console.log("result===>"+JSON.stringify(result))
                var resData={total:result.rows[0][0]}
                callback(resData.total);
            })
        }) 
    })
}//----------------------------------------
var totalCnt=0;
exports.listUser=function(req,res){
    
    this.totalUser(function(cnt){
        totalCnt=cnt;
        console.log("totalCnt=="+totalCnt);
    })
    var display=5;
    var pageCount=Math.ceil(totalCnt/display);
    
    //모든 회원 목록 가져오기
    db.getConnection(dbconfig,function(err,con){
        if(err) throw err;
        var sql="select * from node_user order by idx asc";
        con.execute(sql,function(err,result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                //회원목록 뷰페이지로 이동
                console.log("result="+JSON.stringify(result));
                var data={data:result.rows, total:totalCnt};
                //res.send("<h1>회원목록으로 갈예정..</h1>");
                res.render("user/userList.ejs", data);
            })
        })
    })

}

exports.deleteUser=function(data,req,res){
    db.getConnection(dbconfig,function(err,con){
        if(err) throw err;
        var sql="delete from node_user where idx=:idx";
        con.execute(sql, data, function(err,result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                console.log("result="+JSON.stringify(result));
                var obj={};
                if(parseInt(result.rowsAffected)>0){
                    obj.msg="삭제 성공";
                    obj.loc="/users";
                }else{
                    obj.msg="삭제 실패";
                    obj.loc="/users";
                }
                res.render("message",obj);
            })
        })
    })
}//------------------------------------

exports.selectUser=function(data, req,res){
    db.getConnection(dbconfig,function(err, con){
        if(err) throw err;
        var sql="select * from node_user where idx=:idx";
        con.execute(sql,data,function(err,result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                console.log("result="+JSON.stringify(result));
                var resData={data: result.rows};
                console.log("aaa");
                res.render('user/userInfo.ejs',resData);
            })
        })
    })
}//------------------------------------

//update문 작성해서 실행시키고 실행결과 msg, loc저장후 "message.ejs"로 render하기
exports.editUser=function(data,req,res){
    db.getConnection(dbconfig,function(err,con){
        if(err) throw err;
        var sql="update node_user set name=:name, userid=:userid"
                +", pwd=:pwd where idx=:idx";
        con.execute(sql,data,function(err, result){
            if(err) throw err;
            con.close(function(err){
                if(err) throw err;
                console.log(JSON.stringify(result));
                var resData={};
                if(parseInt(result.rowsAffected)>0){
                    resData.msg='수정 성공';
                    resData.loc='/users';
                }else{
                    resData.msg='수정 실패';
                    resData.loc='javascript:history.back()';
                }
                res.render('message.ejs',resData);
            })
        })        


    })

}//------------------------------------

