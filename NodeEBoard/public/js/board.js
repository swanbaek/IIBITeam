/**
 * http://usejsdoc.org/
 */
var ctx;

//s.io 전역변수
var socket;
$(function(){
	ctx = $('#cv').get(0).getContext('2d');
	var cv=$('#cv');
	socket=io.connect('http://'+window.location.host);
	console.log(window.location.host+"로 연결 ..");
	$('#cv').bind("mousedown",draw.start);
	$('#cv').bind("mousemove",draw.move);
	$('#cv').bind("mouseup",draw.end);
	$('#clear').bind('click',draw.clear);
	shape.setShape('white',1);
	//shape.setShape('yellow',5);
});
//shape객체 정의////////////////////////////////////////////////
var shape={
	color:'white',
	width:1,
	setShape:function(color,width){
		//console.log(color,width);
		if(color!==null){
			this.color=color;
		}
		if(width!==null){
			this.width=width;
		}
		ctx.strokeStyle=this.color;
		ctx.lineWidth=this.width;
		//펜모양 부분의 영역을 지움
		ctx.clearRect(703,0,860,90);
		//펜모양 부분에 라인을 그림
		ctx.beginPath();
		ctx.moveTo(715,58);
		ctx.lineTo(825,58);
		ctx.stroke();
	}
};
//msg객체 정의////////////////////////////////////////////
var msg={
	line:{
		send:function(type,x,y){
			
			socket.emit('linesend',
					{'type':type,'x':x,'y':y,'color':shape.color,'width':shape.width});
			console.log('서버로 line.send()');
		}
	}	
};///////////////////////////////////////////////////
//draw객체 정의/////////////////////////////////////////////////
var draw={
		drawing:null,
		start:function(e){
			ctx.beginPath();
			ctx.moveTo(e.pageX,e.pageY);
			this.drawing=true;
			msg.line.send('start',e.pageX,e.pageY);
		},
		move:function(e){
			if(this.drawing){
				ctx.lineTo(e.pageX,e.pageY);
				ctx.stroke();
				msg.line.send('move',e.pageX,e.pageY);
			}
		},
		end:function(e){
			this.drawing=false;
			msg.line.send('end');
		},
		clear:function(e){
			ctx.clearRect(0,0,cv.width, cv.height);
			shape.setShape();
			msg.line.send('clear');
		},
		drawfromServer:function(data){
			switch(data.type){
				case 'start':{
					ctx.beginPath();
					ctx.moveTo(data.x,data.y);
					ctx.strokeStyle=data.color;
					ctx.lineWidth=data.width;
				}break;
				case 'move':{
					ctx.lineTo(data.x, data.y);
					ctx.stroke();
				}break;
				case 'end':{}break;
				case 'clear':{
					ctx.clearRect(0,0,cv.width,cv.height);
					shape.setShape();
				}break;
					
			}
		}
	};


$(function(){
	socket.on('linesend_toclient',function(data){
		draw.drawfromServer(data);
	});

});

