<!--
 * @Description:全局消息提醒 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-01 11:51:30
 * @LastEditTime: 2021-09-07 15:56:34
-->
<template>
  <div class="c-my-message">
    <ul>
      <li
        v-for="(item, index) in messages"
        :key="index"
        class="my-message-li"
        :class="[item.type]"
      >
        <label for="" v-show="false">!</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.options }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      id: 0,
    };
  },
  methods: {
    add(options) {
      let layer = {
        id: this.id++,
        ...options,
      };
      console.log("options", options);
      layer.timer = setTimeout(() => {
        this.remove(layer);
        clearTimeout(layer.timer);
      }, 2000);
      this.messages.push(layer);
    },
    remove(layer) {
      this.messages = this.messages.filter((item) => item.id !== layer.id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common.less";
.c-my-message {
  width: auto;
  height: auto;
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 18vh * @h;
  animation: move 0.3s;
  z-index: 10000;
  ul {
    width: auto;
    height: auto;
    .my-message-li {
      padding: 14vh * @h 40vw * @w 14vh * @h 40vw * @w;
      .box-sizing();
      border-radius:4px 4px;
      font-size: 22vh * @h;
      margin-top:6vh*@h;
    }
   /*  label{
      display:inline-block;
      background:
    } */
    .info {
      color: white;
      background: rgba(0, 0, 0, 0.5);
    }
    .error {
      color: white;
      background: rgba(243, 5, 5, 0.5);
    }
    .success {
      color: white;
      background: rgba(4, 247, 105, 0.5);
    }
    .warning {
      color: white;
      background: rgba(248, 191, 3, 0.5);
    }
  }
}
@keyframes move {
  0% {
    top: 0;
    opacity: 0;
  }
  100% {
    top: 30px;
    opacity: 1;
  }
}
</style>
