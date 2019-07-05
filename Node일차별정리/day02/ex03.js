//ex03.js

//process객체 : 전역객체
console.log("argv속성의 파라미터 수: "+process.argv.length);
//console.dir(process.argv);

process.argv.forEach(function(arg, i){
    console.log(i+" : "+arg);
})

console.log('--------------------');
//console.dir(process.env);
console.log("OS환경 변수 값: "+process.env['OS']);

var handler=function(){
    console.log("Process Exit...Bye Bye~~");
}

//node에서 이벤트 등록. addListener('이벤트',함수) 또는
//                     on('이벤트', 함수)
//프로세스가 exit될 때 handler()를 호출하도록 처리
//process.addListener('exit', handler);
process.on('exit',handler);

//이벤트 강제로 발생시키고자 할 때는
//emit('이벤트 종류');
//myevent 를 발생을 시키면 해당 이벤트를 처리하는 핸들러를 만들어서 처리

process.on('myevent', function(){
    console.log("Hello I'm myevent...");
})

process.emit('myevent');


