<!--
 * @Description: 灾害风险实时监测情况、近5日灾害风险监测情况
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:04:00
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="disaster_risk">
    <RealInspection />
    <NearlyFiveDays />
  </div>
</template>
<script>
import RealInspection from "./realInspection/index.vue"; // 灾害风险实时监测情况
import NearlyFiveDays from "./nearlyFiveDays/index.vue"; // 近5日灾害风险监测情况

export default {
  name: "",
  props: {},
  components: { RealInspection, NearlyFiveDays },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
.disaster_risk {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>