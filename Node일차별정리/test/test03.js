var obj=require('./test_module03.js');

var user=new obj("김사랑",'love');

console.dir(user);
user.printInfo=function(){
    console.log('이름: %s',this.name);
    console.log('아이디: %s',this.id);
}
user.printInfo();