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
```
#### ts封装方式
```ts
 /**
 * 简易的发布订阅模式
 * 主要用于跨组件通信
 */
class EventBus {
  static list: { [key: string]: Array<Function> } = {};

  // 订阅
  static on(name: EventTypeName, fn: Function) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  static emit(name: EventTypeName, data?: any) {
    if (this.list[name]) {
      this.list[name].forEach((fn: Function) => {
        fn(data);
      });
    }
  }

  // 取消订阅
  static off(name: EventTypeName) {
    if (this.list[name]) {
      // delete this.list[name];
      Reflect.deleteProperty(this.list, name);
    }
  }

   // 只使用一次
    // static once(name: EventTypeName, fn: Function) {
    //  const _this = this
    //  const wrapper = function () {
    //    fn.apply(this, [arguments])
     //   _this.unListen(name, wrapper)
     // }
     // this.notify(eventName, wrapper)
   // }
}
export default EventBus;

/**
 * 用于规范统一命名，减少名称不一致导致的错误
 */
export enum EventTypeName {
  // 打开报告
  OPEN_REPORT,
  // 打开
  OPEN,
}
```
#### ts使用方法
```js
EventBus.on(EventTypeName.OPEN_REPORT, (data: any) => {
    console.log('data :>> ', data);
    let lti48Obj: any = {
      1: "inspection", // 检验
      2: "microorganism", //微生物
      99: "check", // 检查
    };
    state.reportId = data.reportId; // 报告id
    state.defaultValue = lti48Obj[data.lti48];
  });
EventBus.emit(EventTypeName.OPEN_REPORT, row)
// 或者
EventBus.emit(EventTypeName.OPEN_REPORT, (data: Function) => {
  data(row)
});
EventBus.on(EventTypeName.OPEN_REPORT, (data: any) => {
    let lti48Obj: any = {
      1: "inspection", // 检验
      2: "microorganism", //微生物
      99: "check", // 检查
    };
    state.reportId = data.reportId
    state.defaultValue = lti48Obj[data.lti48]
  });

//销毁EventBus
 onUnmounted(() => {
   EventBus.off(EventTypeName.OPEN_REPORT);
 });
```
