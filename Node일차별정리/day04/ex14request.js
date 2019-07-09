// ex14request.js
/*url내장모듈을 활용하여 request의
쿼리스트링을 추출해봅시다.
 */
var http=require('http')
, url=require('url');

var server=http.createServer(function(req,res){
    //요청 url
    var reqUrl=req.url;
    var queryObj=url.parse(reqUrl, true).query;
    res.writeHead(200,{'Content-Type':'text/html'});
    var data="<h1>"+JSON.stringify(queryObj)+"</h1>";
    res.end(data);
}).listen(3333,function(){
    console.log('server started at 3333 port');
})
//http://localhost:3333?name=aaa&userid=bbb