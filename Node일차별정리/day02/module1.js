/* #모듈화하여 내보내는 방법
1. 함수를 할당하는 방법 exports전역객체에 
   여러 함수를 등록하여 내볼낼 수 있다.
   => exports.변수=function(){}
2. 모듈 안에서 인스턴스 객체를 만들어 할당하는 경우
  => module.exports =객체;
3. 프로토타입 객체를 할당하는 경우
   => 프로토타입을 정의한 후 module.exports에 할당한다.
      그러면 이를 가져다 쓰는 파일에서 new연산자를 사용할 수 있다.

*/

exports.plus=function(a,b){
    console.log(a+"+"+b+"="+(a+b));
}

exports.plus2=(a,b)=> console.log(`${a}+${b}=${a+b}`);

//a,b받아서 그 차를 구하는 minus함수를 만들어서 내보내세요
exports.minus=function(a,b){
    console.log(a+"-"+b+"="+(a+b));
}

exports.minus2=(a,b)=>a-b;

/*exports.minus2=function(a,b){
    return a-b;
}
*/