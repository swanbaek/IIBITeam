//index.js
exports.index=function(req,res){
    var data={title:'MyNodeWeb'}
    
    res.render('main',data,function(err,html){
        //main.ejs => 를 렌더링함. 동적인 html생성 모듈
        if(err)
            throw err;
        //console.log(html);    
        res.send(html)
    })
}