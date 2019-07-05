//fs모듈 사용하여 파일을 읽어봅시다.
//File System 모듈
var fs=require('fs');
//1. 동기방식으로 파일을 읽을 경우
var data=fs.readFileSync("readme.txt","utf8");
console.log(data);

/* 2. 비동기방식으로 파일을 읽을 경우

fs.readFile('readme.txt','utf8',function(err,data){
    //해당 파일을 찾아 있으면 읽어들인후 콜백함수의 매개변수 data로
    //파일 내용을 전달한다.

    //해당 파일이 없을 경우 예외를 발생시킴=>err로 전달함
    if(err) throw err;
    console.log("===읽은 파일 내용==========");
    console.log(data);
    console.log("==========================");
});
*/
console.log("Have a good time~~~");