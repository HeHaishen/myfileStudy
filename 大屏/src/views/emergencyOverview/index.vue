<!--
 * @Description: 应急概览一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-28 16:39:21
-->
<template>
  <div class="c-emergency-overview">
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>
    <headers title="应急一张图"> </headers>
    <div class="emergency-overview-content">
      <div class="left">
        <left @openConsulting="openConsulting" />
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
  mounted() {},
  methods: {
    init() {},
    initChart() {},
    openConsulting() {
      this.$refs.LayerConsulting.$emit("openConsulting", { set: 888888 });
      this.$refs.LayerConsulting.meetingVis = true;
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