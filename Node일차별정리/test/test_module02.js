//2. 모듈안에서 인스턴스 객체를 만들어 할당하는 경우
//모듈을 불러온 후 해당 객체의 메소드를 호출하거나 속성을
//사용할 수 있다.
function User(name, id){
    this.name=name;
    this.id=id;
}
User.prototype.getUser=function(){
   var user={ name:this.name,id:this.id}
   return user;
};
User.prototype.print=function(){
    console.log('이름: %s 아이디: %s',this.name, this.id);
}
module.exports=new User("김소망","Hope01");