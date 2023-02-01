/*
 * @Description: 全局消息显示
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-30 16:39:48
 * @LastEditTime: 2021-09-07 15:47:46
 */

import Vue from "vue";
import MyMessageCompoent from "./message.vue";

class Msg {
  constructor() {
    let vm = new Vue({
      render: (h) => h(MyMessageCompoent),
    }).$mount();
    document.body.appendChild(vm.$el);
    console.log("vm", vm);
    this.component = vm.$children[0];
  }
  success(options) {
    this.component.add({options,type:'success'});
  }
  error(options) {
    this.component.add({options,type:'error'});
  }
  info(options) {
    this.component.add({options,type:'info'});
  }
  warning(options) {
    this.component.add({options,type:'warning'});
  }
}
Msg.getInstance = (function () {
  let instance = undefined;
  return function () {
    if (!instance) {
      instance = new Msg();
    }
    return instance;
  };
})();

export const MyMessage = Msg.getInstance();
