<!--
 * @Description: 应急概览一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-10 17:37:19
 *@vh  48vw*@vw    39vh*@vh  48vw*@v
-->
<template>
  <div class="c-emergency-overview">
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>
    <headers title="龙舟水应急救援场景"> </headers>
    <div class="emergency-overview-content">
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
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue";
export default {
  components: { headers, Left, Center, Right, LayerConsulting },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(()=>{
      this.addGrayLayer()
    })
  },
  methods: {
    init() {},
    initChart() {},
    openConsulting() {
      this.$refs.LayerConsulting.$emit("openConsulting", { set: 888888 });
      this.$refs.LayerConsulting.meetingVis = true;
    },
    // 添加蒙层
    addGrayLayer() {
      this.$nextTick(() => {
        const leftDiv = document.querySelector(".left"); // 获取左部元素
        const rightDiv = document.querySelector(".right"); // 获取右部元素
        let wrapDiv = document.querySelector(".c-emergency-overview"); // 最外层
        let innerDiv = document.querySelector(".emergency-overview-content"); // 中间内容
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
          "z-index": 7773,
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
          "z-index": 7773,
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

.c-emergency-overview {
  .layer {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 99999;
    pointer-events: none;
  }
}
</style>
