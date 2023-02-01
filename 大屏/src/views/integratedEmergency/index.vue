<!--
 * @Description: 应急综合管理平台
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-04 14:56:35
-->
<template>
  <div class="c-integratede-mergency">
    <headers title="应急综合管理平台"> </headers>
    <center-btns @btnActive="centerBtnActive" />
    <div
      :class="[
        pageTypeClassList[(Object.keys(pageTypeClassList))[pageTypeIndex]] + '-content',
      ]"
    >
      <div class="left">
        <!-- 平时 -->
        <normal-left />
      </div>
      <div class="center">
        <center />
      </div>
      <div class="right">
        <!-- <right /> -->
      </div>
    </div>
  </div>
</template>

<script>
import headers from "@/components/APicture/header";
import centerBtns from "./components/centerBtns";
import Center from "./components/center";
/* 页面组件-平时 */
import NormalLeft from "./components/normalComponents/left";
// import Right from "./components/right";
export default {
  // components: { headers, Left, Center, Right },
  components: {
    headers,
    centerBtns,
    Center,
    NormalLeft,
  },
  data() {
    return {
      pageTypeIndex: 0,
      pageTypeClassList: {
        normal: "normal",// 平时
        wind: "wind",// 防风
        rain: "rain",// 防雨
        floodControl: "floodControl", // 防汛
        droughtControl: "droughtControl",// 防旱
      },
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    init() {},
    initChart() {},
    /* 中间部分切换模式 */
    centerBtnActive(item) {
      this.pageTypeIndex = item.index;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
