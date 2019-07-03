//1. 함수를 할당하는 경우
//모듈안에서 함수를 만들어 할당함
exports.printInfo=function(name){
    console.log("안녕하세요?? "+name+"님~~");
}

exports.hi=(name)=>console.log("Hi~~"+name+"님");