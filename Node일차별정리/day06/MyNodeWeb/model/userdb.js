//oracledb모듈 설치
//npm i  oracledb --s

var db=require('oracledb')
db.autoCommit=true;//자동 커밋

exports.joinEnd=function(user, req, res){
    //db연결
    db.getConnection({
        connectString:'localhost:1521/xe',
        user:'mydev',
        password:'tiger'
    }, function(err, con){
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
                if(n>0){
                    res.send("<h1>회원 가입 성공</h1>");
                }else{
                    res.send("<h1>회원 가입 실패</h1>")
                }
            })//con.close()-------
        })//con.execute()--------------
    })//con.getConnection()---------------

}//joinEnd()--------------------------------