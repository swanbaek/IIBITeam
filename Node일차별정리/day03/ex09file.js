// ex09file.js
var fs=require('fs');
//writeFile(파일명,data, [옵션], 콜백함수): 비동기방식으로 파일에 내용을 쓴다.
//writeFileSync("파일명",data, [옵션]): 동기방식으로 파일에 내용을 씀

//"Hello ~~~ NodeJs"란 내용을 result.txt파일에 써보기
fs.writeFile("result.txt","Hello NodeJS~~~",function(err){
    if(err){
        console.log(err.message);
        return;
    }
    console.log("result.txt 파일에 쓰기 완료!!")
})
console.log("The End~~~~~~~~~~~~~");

fs.writeFileSync("result2.txt","Hi NodeJS~~");
console.log("The End2~~~~~~~~~~~~~");

//exists/existsSync : 파일이 존재는지 여부를 체크
fs.exists("package.json", function(bool){
    if(bool){
        console.log("package.json파일 존재함");
    }else{
        console.log("package.json파일 없음");
    }
})

var b=fs.existsSync("package2.json");
console.log("package2.json 존재 여부: "+b);