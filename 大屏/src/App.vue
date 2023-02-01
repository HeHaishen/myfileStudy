<!--
 * @Description: 应用入口-App
 * @Version: 1.0
 * @Autor: SuDe
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-09-01 11:49:20
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { userLogin } from "@/api/login";
import { encrypt } from "@/utils/aes";

export default {
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      timer: null,
    };
  },
  created() {
    // console.log('字体',this.$setFontSize(30))
    // console.log('testThis',this,this.$store.getters);
    // 12小时获取一次token
    this.timer = setInterval(this.getToken, 12 * 60 * 60 * 1000);
  },
  methods: {
    // 定期获取token
    getToken() {
      userLogin({ body: encrypt("216admin") }).then((res) => {
        Cookies.set("token", res.body.token, { expires: 1 });
      });
    },
   
  },
};
</script>

<style lang="less">
@media screen and (max-width: 5800px) {
  :root {
    --title-font: 50px;
    --large-font: 38px;
    --middle-font: 32px;
    --small-font: 26px;
    --mini-font: 24px;
    --super-mini-font: 18px;
    --super3-mini-font: 16px;
    --super2-mini-font: 14px;
    --super1-mini-font: 12px;
    --mini-number-font: 34px;
  }
}

@media screen and (min-width: 5800px) {
  :root {
    --title-font: 50px;
    --large-font: 38px;
    --middle-font: 32px;
    --small-font: 26px;
    --mini-font: 24px;
    --super-mini-font: 22px;
    --super3-mini-font: 20px;
    --super2-mini-font: 18px;
    --super1-mini-font: 15px;
    --mini-number-font: 34px;
  }
}

#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
</style>
