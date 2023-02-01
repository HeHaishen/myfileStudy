<!--
 * @Description: 应急概览一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-07-24 16:54:52
-->
<template>
  <div class="c-construction-achievement">
    <headers title="建设成果展示"> </headers>
    <div class="construction-achievement-content">
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
  mounted() {},
  methods: {
    init() {},
    initChart() {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
