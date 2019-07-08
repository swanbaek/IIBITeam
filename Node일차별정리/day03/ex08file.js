//ex08file.js
var fs=require('fs');
//비동기방식
fs.readFile("package.json","utf8",function(err, data){
    //파일 내용은 콜백함수의 data에 담겨있음
    if(err){
        throw err;
    }
    console.log("==읽은 파일 내용====");
    console.log(data);
})
console.log("The End~~~");

var data=fs.readFileSync("readme.txt","utf8");
console.log("***********");
console.log(data);
console.log("The End2~~~");
