<!--
 * @Author: 何 海深 813936564@qq.com
 * @Date: 2023-02-17 10:39:28
 * @LastEditors: 何 海深 813936564@qq.com
 * @LastEditTime: 2023-02-17 14:05:03
 * @FilePath: \undefinede:\git同步个人学习总结\myfileStudy\vue学习\vue2-extend-install-component-use.md
 * @Description: vue2 中公共api 的使用
-->
## VUE2 中对install、extend、components、use、mixins、extends使用和详解

#### 一、vue中install使用和详解
---
#### 二、vue中extend使用和详解
- extend 是vue中的全局API
- 比较会在业务组件中使用，使用约独立组件的开发场景
- 结合Vue.extends + Vue.$mount()使用
- extend 创建的是 Vue 构造器,不是组件实例
- 不可以通过 new Vue({ components: componentsName }) 来直接使用
- ##### 基础使用
``` html
// 挂载的元素
<div id="use-extends"></div>
```
``` js
// 使用
import Vue from "vue";
const vueExtendsComponent = Vue.extend({
    template:"<div>{{text}}</div>",
    data:()=>{
        return {
            text: "显示文本"
        }
    }
})
// extend 创建的是 Vue 构造器,不是组件实例
// 不可以通过new Vue({components: componentsName})使用
// 需要通过 vueExtendsComponent.$mount("挂载元素")来使用
vueExtendsComponent.$mount("#use-extends")

//  显示结果
// <div>显示文本</div>
```
- ##### 第二种用法
``` html
// 挂载的元素
<div id="use-extends"></div>
```
``` js
import Vue from 'vue';
const ExtendsComponent = {
    template: '<div>{{text}}</div>',
    data:() => {
        return {
            text: '显示的文本'
        }
    }
}
// 调用
const extendHtml = Vue.extend(ExtendsComponent)
new extendHtml().$mount('#use-extends')
```
#### example
- ##### example 1.类似于ElementUi的Toast组件封装和用法
``` HTML
<template>
    <div class="gulu-toast" :class="toastClasses">
        <div class="toast" ref="toast">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose">
            {{closeButton.text}}
        </span>
        </div>
    </div>
</template>
```
``` JS
<script>
  //构造组件的选项
  export default {
    name: 'Toast',
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: 5,
        validator (value) {
          return value === false || typeof value === 'number';
        }
      },
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭', callback: undefined
          }
        }
      },
      enableHtml: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'middle'].indexOf(value) >= 0
        }
      }
    },
    mounted () {
      // 这里是为了防止不断点击，出现多个弹窗
      const toast = document.getElementsByClassName('gulu-toast')[0]
      toast && document.body.removeChild(toast)
      this.updateStyles()
      this.execAutoClose()
    },
    computed: {
      toastClasses () {
        return {
          [`position-${this.position}`]: true
        }
      }
    },
    methods: {
      updateStyles () {
        this.$nextTick(() => {
          this.$refs.line.style.height =
            `${this.$refs.toast.getBoundingClientRect().height}px`
        })
      },
      execAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoClose * 1000)
        }
      },
      close () {
        this.$el.remove()
        this.$emit('close')
        this.$destroy()
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback(this)//this === toast实例
        }
      }
    }
  }
</script>
```
使用extends
``` js
import Vue from "vue";
import Toast from "./toast.vue";
Toast.install = (Vue) => {
    Vue.prototype.$Toast = (text, props) => {
        const innerComponents =  Vue.extend(Toast);
        const innerExtendNew = new innerComponents({
            propsData: props
        })
        // 插槽使用
        innerExtendNew.$slots.default = [text];
        // innerExtendNew.$mount().$el 该段代码意义为：
        // 文档之外渲染，并且获取该实例的根DOM元素，将其插入到body元素中。
        documents.body.appendChild(innerExtendNew.$mount().$el);
    }
}
export default Toast
```
具体使用 - main.js
``` js
import Vue from 'vue'
import Toast from "./Toast"
Vue.use(Toast)
```
``` js
this.$toast("关闭吗？", {
        closeButton: {
          text: "关闭",
          callback: () => {
            console.log('已经关闭了');
          },
        },
        autoClose: 12,s
        position: 'bottom'
      });
```
- ##### example 2.类似于ElementUi的建立一个 loading组件封装和用法
```html
<template lang="html">
    <div class="">
        <div class="ajax-loading load-status" v-show="showLoading">
            <div class="head-space"></div>
            <div class="loading-box">
                <div class="la-square-jelly-box">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
```
``` js
let loadTemp = require('./loading.vue ').default;     // cli3.0以后引入vue模板需要default

let Load = {};  // 定义插件对象

Load.install = (Vue, options) => { //Vue的install方法，用于定义vue插件
    // 如果存在loading 不重复创建DOM
    if (document.getElementsByClassName('.load-status').length) return

    // 创建一个VUE构造器
    let lTemp = Vue.extend(loadTemp);

    // 提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。
    // 在实例挂载之后，可以通过$vm.$el访问。
    // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
    // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
    // let $vm = new toastTpl({
    //  el: document.createElement('div')
    // })

    // 实例化VUE实例
    let $vm = new lTemp();

    // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
    let tpl = $vm.$mount().$el;
    document.body.appendChild(tpl);

    Vue.prototype.$loading = { //在Vue的原型上添加实例方法，以全局调用
        show(options) {
            //通过传入props改变$vm下的属性控制组件 例如$vm.text = options
            if (options == "loading") {
                $vm.showLoading = true;
            } else if (options == "toast") {
                $vm.showToast = true;
            }
        },
        hide() {
            $vm.showLoading = false;
            $vm.showToast = false;
        }
    }
}
//导出Load
export default Load;
```
全局注册组件
``` js
//在你的main.js里通过以下方式引入组件

import Loading from '@/components/loading'

//然后通过 USE方法全局注册

Vue.use(Loading);
```
使用
``` js
this.$loading.show(options) //注意这里的this指向的是全局对象VUE
this.$loading.hide(options)
```
- ##### example 3.类似于ElementUi的建立一个 Message组件封装和用法
``` html
<template>
  <div
    :class="['message-box', 'message-box-' + type]"
    :style="{ top: top + 'px' }"
  >
    <header>
      <span class="close">X</span>
    </header>
    <div class="message--box-content">
      {{ message }}
    </div>
  </div>
</template>
```
```js
<script>
    <script>
export default {
  data() {
    return {};
  },
  props: {
    message: {
      type: String,
      default: "this is message box",
    },
    type: {
      validator(value) {
        return ["success", "error", "default"].indexOf(value) !== -1;
      },
      default: "default",
    },
    top: {
      type: Number,
      default: 20,
    },
  },
};
</script>
```
``` less
<style lang="less">
.message-box {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 50px;
  background-color: #ccc;
  .close {
    position: absolute;
    top: 0;
    right: 5px;
    cursor: pointer;
  }
  .message--box-content {
    line-height: 50px;
    text-indent: 2em;
  }
  &.message-box-success {
    background-color: green;
  }
  &.message-box-error {
    background-color: red;
  }
  &.message-box-default {
    background-color: #eee;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
```

全局挂载和方法封装
```js
import Vue from "vue";
import Message from "./Message.vue";
let messageBoxConstructor = Vue.extend({
  ...MessageBoxOption,
});
export default {
  install(Vue) {
    Vue.prototype.$Message = {
      instanceList: [],
      hide(types) {
        for (let instance of this.instanceList) {
          if (instance.types == types) {
            instance &&
              document.body.removeChild(instance.$el) &&
              Reflect.deleteProperty(this, types);
          }
        }
      },
      success(message) {
        if (!this.vmSuccess) {
          let messageBox = new messageBoxConstructor({
            propsData: {
              message,
              type: "success",
              top: (this.instanceList.length + 1) * 55,
            },
          });
          let $Message = messageBox.$mount();
          this.vmSuccess = $Message;
          this.instanceList.push({ ...$Message, types: "vmSuccess" });
          document.body.appendChild($Message.$el);
          setTimeout(() => {
            this.hide("vmSuccess");
          }, 4000);
        }
      },
      error(message) {
        if (!this.vmError) {
          let messageBox = new messageBoxConstructor({
            propsData: {
              message,
              type: "error",
              top: (this.instanceList.length + 1) * 55,
            },
          });
          let $Message = messageBox.$mount();
          this.vmError = $Message;
          this.instanceList.push({ ...$Message, types: "vmError" });
          document.body.appendChild($Message.$el);
          setTimeout(() => {
            this.hide("vmError");
          }, 6000);
        }
      },
    };
  },
};

```
main.js引入挂载
``` js
import Vue from 'vue';
import Message from './Message'
Vue.use(Message)
```
使用
``` js
this.$Message.success("恭喜你，这是一条成功消息");
this.$Message.error("sorry,这是一条失败消息");
```

- ##### extend 源码分析是如何初始化和挂载的
  有待补充
  
---
#### 三、vue中components使用和详解
---
#### 四、vue中use使用和详解
---
#### 五、vue中mixins使用和详解
---
#### 六、vue中extends使用和详解
---