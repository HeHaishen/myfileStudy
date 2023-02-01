<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-08-04 11:36:16
-->
<template>
  <div class="inner-right"></div>
</template>

<script>
import Clist from "@/components/APicture/c-table";
export default {
  components: { Clist },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    init() {},
    initChart() {},
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
