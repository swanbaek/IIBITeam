//프로토타입 객체를 할당하는 경우
//프로토타입만 정의한 후 module.exports에 할당하면 
//메인 파일에서 new연산자 사용 가능함
function User(name,id){
    this.name=name;
    this.id=id;    
}
module.exports=User;
