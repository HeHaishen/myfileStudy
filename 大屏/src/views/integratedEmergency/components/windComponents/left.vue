<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-08-04 11:36:01
-->
<template>
  <div class="inner-left"></div>
</template>

<script>
import moment from "moment";
import Clist from "@/components/APicture/c-table";
// import popUpLayer from '@/components/APicture/popUpLayer'
export default {
  components: { Clist },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  computed: {},
  methods: {
    moment,
    init() {},
    initChart() {},
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
