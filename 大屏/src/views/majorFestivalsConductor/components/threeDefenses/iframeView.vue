<!--
 * @Description: iframe
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-13 09:51:13
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-13 15:15:21
-->
<!-- iframe -->
<template>
  <div class="iframe_view">
    <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  components: {},
  props: {
    url: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      src: "",
    };
  },
  watch: {
    url: {
      immediate: true,
      handler(val) {
        if (!val) {
          return false;
        }
        let url = "";
        let token = Cookies.get("token");
        url += `${val}?token=${token}`;
        this.src = url;
        console.log(this.src, "--");
      },
    },
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {},
};
</script>
<style lang='less' scoped>
@import "../../common.less";
.iframe_view {
  width: 70vw;
  height: 85vh;
  z-index: 99999;
  padding-top: 20vh * @h;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>