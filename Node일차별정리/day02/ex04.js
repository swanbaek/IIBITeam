var obj=require('./module1.js');
//require('모듈의파일명')
//이 때 확장자'.js'는 생략해도 된다.
//require()하면 먼저 module1.js 파일을 찾는다.
// 만약 해당 파일이 없다면 module1이라는 디렉토리를 찾는다.
// 해당 디렉토리가 있다면 해당 디렉토리의 index.js파일을 찾는다.

obj.plus(10,20);

obj.minus(77,55);

obj.plus2(3,4);

console.log(obj.minus2(40,2));