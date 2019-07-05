var obj=require('./module3.js');

var aaa=new obj("Happy","김행복");

console.dir(aaa);

aaa.printInfo=function(){
    console.log("Name: %s", this.name);
    console.log("ID  : %s", this.id);
}
aaa.printInfo();