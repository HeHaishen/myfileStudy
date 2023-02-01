<!--
 * @Description: 全市重大危险源一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-10 17:32:04
-->
<template>
  <div class="c-city-danger">
    <headers title="全市重大危险源一张图"> </headers>
    <div class="city-danger-content">
      <div class="left">
        <left />
      </div>
      <div class="center">
        <center />
      </div>
      <div class="right">
        <right />
      </div>
    </div>
  </div>
</template>

<script>
import headers from "@/components/APicture/header";
import Left from "./components/left";
import Center from "./components/center";
import Right from "./components/right";
export default {
  components: { headers, Left, Center, Right },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      document.querySelector(".right").style.zIndex = 7775;
      this.addGrayLayer()
    });
  },
  methods: {
    init() {},
    initChart() {},
    // 添加蒙层
    addGrayLayer() {
      this.$nextTick(() => {
        const leftDiv = document.querySelector(".left"); // 获取左部元素
        const rightDiv = document.querySelector(".right"); // 获取右部元素
        let wrapDiv = document.querySelector(".c-city-danger"); // 最外层
        let innerDiv = document.querySelector(".city-danger-content"); // 中间内容
        /* 左侧 */
        let styleObj = {
          width: leftDiv.clientWidth + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          "background-image":
            "linear-gradient(to right, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          'z-index':7773
        };
        let leftDivs = document.createElement("div");
        for (let k in styleObj) {
          leftDivs.style[k] = styleObj[k];
        }
        /* 右侧边 */
        let styleObjRight = {
          width: rightDiv.clientWidth + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          right: 0,
          "background-image":
            "linear-gradient(to left, #182734, #182734, #182734, #182734,#182734,rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          'z-index':7773
        };
        let cRightDivs = document.createElement("div");
        for (let k in styleObjRight) {
          cRightDivs.style[k] = styleObjRight[k];
        }
        innerDiv.appendChild(leftDivs);
        innerDiv.appendChild(cRightDivs);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
