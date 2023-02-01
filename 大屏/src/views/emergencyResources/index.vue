<!--
 * @Description: 应急资源一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-10 18:18:37
-->
<template>
  <div class="c-emergency-resources">
    <headers title="应急资源一张图"> </headers>
    <div class="emergency-resources-content">
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
      this.addGrayLayer();
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
        let wrapDiv = document.querySelector(".c-emergency-resources"); // 最外层
        let innerDiv = document.querySelector(".emergency-resources-content"); // 中间内容
        /* 左侧 */
        let styleObj = {
          width: leftDiv.clientWidth + 0 + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          "background-image":
            "linear-gradient(to right, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          "z-index": 8000,
        };
        let leftDivs = document.createElement("div");
        for (let k in styleObj) {
          leftDivs.style[k] = styleObj[k];
        }
        /* 右侧边 */
        let styleObjRight = {
          width: rightDiv.clientWidth + 0 + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          right: 0,
          "background-image":
            "linear-gradient(to left, #182734, #182734, #182734, #182734,#182734,rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          "z-index": 8000,
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
