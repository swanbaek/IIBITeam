
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
/////////////////////
var server=app.listen(3000);//express포트 3000설정
var io=require('socket.io').listen(server);
console.log("Ebaord Server started...");

//웹소켓 연결시
io.sockets.on('connection',function(socket){
	socket.on('linesend',function(data){
		//console.log(data);
		//특정 클로부터 받은 linesend 관련 데이터를 모든 클에게 linesend_toclient로 전송
		socket.broadcast.emit('linesend_toclient',data);
	});
	socket.on('disconnect',function(){//연결 종료시
		console.log('User Disconnected');
	});
});

/*http.createServer(app).listen(app.get('port'), f0unction(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
