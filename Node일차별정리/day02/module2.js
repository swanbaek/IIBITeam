/*2.모듈 안에서 인스턴스 객페를 만들어 할당하는 경우
=> module.exports = 객체;
   이 때 객체는 하나만 내보낼 수 있다.
*/
function User(id,name){ //생성자 함수
    this.id=id;
    this.name=name;
}
User.prototype.getUser=function(){
    var user={id:this.id, name:this.name};
    return user;
}
User.prototype.printInfo=function(){
    console.log("이름: %s  아이디: %s", this.name, this.id);
}
//exports.user=new User('kim','김길동'); //[x]
module.exports=new User('Kim','김길동');//[o]


