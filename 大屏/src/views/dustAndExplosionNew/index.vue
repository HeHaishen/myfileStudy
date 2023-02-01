<!--
 * @Description: 应急概览一张图
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:23:17
 * @LastEditTime: 2021-08-28 14:37:59
-->
<template>
  <div class="c-dust-explosion">
    <headers title="粉尘涉爆一张图"> </headers>
    <div class="dust-explosion-content">
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
import { MessagePush } from "@/utils/pushMinix"; //混入
export default {
  mixins: [MessagePush],
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
