#<center> Ts 的使用</center>

### ts安装

  npm install -g typescript
或 yarn global add typescript

---
 ### ts的数据类型有

 1）  所有：string、number、null、undefined、object(array,functon)、boolean、symbol()
 2)  原始型：string、number、boolean、null、undefined、symbol()
 3)  对象型：object(array、object、function)

---
 ### ts新增类型

 1) void
 2) any
 3) 接口
 4) 联合型
 5) 自定义类型(类型别名)
 6) 元组
 7) 字面量类型
 8) 枚举
 等等
 >
### 数据类型的使用

##### 1.原始数据类型的使用

let 变量:类型 =  初始值

``` ts
let num:number = 1
let str:string = 'str'
let nulls:null = null
let undefineds:undefined = undefined
let boolean:Boolean = true || false
let mySymbol:symbol = symbol()


```

##### 2.联合型
let 变量: 类型1 | 类型2 | 类型3 .... = 初始值
```ts
let strNum:string|number = 1
let isWhat: string | number | boolean;
isWhat = '1'
isWhat = 1
isWhat = true
```

##### 3.别名型
别名首字母必须大写
type 别名 = 类型1|类型2|类型3|..... 
let 变量:别名 = 初始值
```ts
type MyStrNum = string|number  
let a:MyStrNum = 1
let b:MyStrNum = 'str'
```
##### 4.数组
let 变量:类型[] = 初始值
let 变量:Array<类型> = 初始值
let 变量:
```ts
let arr:number[] = [1,2,3]
let arr1:Array<string> = ['str1','str2','str3']

interface NumberArray {
    [index: number]: number;
}
let fibonacce: NumberArray = [1,2,3,4]
```

##### 5.对象的使用
type 类型名称 = {
    参数1：类型1，
    
} 
```ts
type MyObjectType = {
    num:number,
    str:string,
    
}
let obj:MyObjectType = {
    num:1,
    str:'str'
}
```

##### 6.函数类型
1）正常函数写法
function 函数名称（参数1:类型，参数2:类型):返回的类型{}
其中返回类型
当返回类型为 ：无返回值 或 undefined 时 定义为：viod
let 函数名称 = (参数1:类型1，参数2:类型2):返回值类型{}
2） 箭头函数
(参数1：类型1,参数2:类型2):返回值类型=>{}
3）函数别名
type 别名 = （参数1:类型1,参数2:别名2)=>number
4） 函数可选参数
const 函数名称 = (参数1?:类型1,参数2?:类型2):void{}
```ts
// 函数
function fun(num1:number,num2:number):number{
    return num1 + num2
}
function fun1(num1?:number,num2:number = '0'):number{
    return num1 + num2
}
// 无返回值
function fun3():void{
    // 无return
    // return 
    // return undefined
};
let fun = (num1:number,num2:number):number{
    return num1 + num2
}

// 箭头函数
let fun1 =(num1:number,num2:number):number{
    return num1 + num2
}

// 函数别名
type MyFun = (num:number,num2:number)=>number
let fun:MyFun = (num,num2)=>{return num + num2} 

// 可选参数
const fun =(num?:number,num2?:number){}
```

##### 7.接口
``` ts
interface myObjType = {
    name:String
}
let myObj:myObjType ={
    name:'123'
}
1) 任意属性
interface everyType = {
    name: String;
    age?: number;
    [propName:String]: any;
}
let everyObj:everyType = {
    name: '名字',
    address: '地址'，
    gender: 123
}
```
##### 8.类型断言
```ts
用于手动指定一个值的类型

1) 基本语法
值 as 类型
a as b
```