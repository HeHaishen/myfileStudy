<!--
 * @Description: 全市三防一张图（new）
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-28 14:33:53
-->
<template>
  <div class="c-three-proofing">
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>
    <headers title="全市三防一张图"> </headers>
    <div class="three-proofing-content">
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
import { MessagePush } from "@/utils/pushMinix";//混入
export default {
  mixins: [MessagePush],
  components: { headers, Left, Center, Right, LayerConsulting },
  data() {
    return {};
  },
  created() {
    console.log('本页面')
  },
  mounted() {},
  methods: {
    init() {
      console.log('aaaa2')
    },
    initChart() {},
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
