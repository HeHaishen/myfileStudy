### EventBus 实现和使用方式
#### 使用方式
```js
class MyEventBus {
    constructor(){
        this.list = {};
    };
    // 发布这
    $emit(name: string, data: any){
        if(this.list[name]) {
            this.list[name].forEach(fn=>{fn(data)})
        }
    }
    // 订阅者
    $on(name: string, fn: function){
        this.list[name] = this.list[name] || [];
        this.list[name].push(fn);
    }
    // 取消订阅
    $off(name: string){
        if(this.list[name]) {
            delete this.list[name];
        }
    }
}
export default new MyEventBus;
```
#### 使用
- ##### 1.发布
  ```html
  <template>
    <div></div>
  </template>
  ```
  ```js
    import {ref} from "vue"
    import EventBus from "./MyEventBVus";
    let refValue = ref(123444)
    EventBus.$emit("EventBusName",  refValue)
  ```
- ##### 2.订阅
```js
import {ref} from "vue"
import EventBus from "./MyEventBVus";
EventBus.$on("EventBusName",(res)=>{
    console.log('refValue',res)
})
onUnmounted( () => { Bus.$off('EventBusName') } )
```
- ##### 3.取消订阅
```js
import EventBus from "./MyEventBVus";
EventBus.$off("EventBusName");
````
