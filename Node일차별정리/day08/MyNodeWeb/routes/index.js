//index.js
exports.index=function(req,res){
    var data={title:'MyNodeWeb'}
    //console.log(">>>>"+JSON.stringify(req.session.loginUser))
    if(req.session.loginUser===undefined||
        !Boolean(req.session.loginUser.isLogin)){
        data.isLogin=false;
    }else{
        data.isLogin=true;
        data.user=req.session.loginUser.user;
    }

    res.render('main',data,function(err,html){
        //main.ejs => 를 렌더링함. 동적인 html생성 모듈
        if(err)
            throw err;
        //console.log(html);    
        res.send(html)
    })
}