<!--
 * @Description: 救援队伍、救灾物资、突发事件
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:04:13
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="team_supplies_device">
    <RescueTeam />
    <ReliefSupplies />
    <EmergencyDevice />
  </div>
</template>
<script>
import RescueTeam from "./rescueTeam/index.vue"; // 救援队伍
import ReliefSupplies from "./reliefSupplies/index.vue"; // 救灾物资
import EmergencyDevice from "./emergencyDevice/index.vue"; // 应急设备

export default {
  name: "",
  props: {},
  components: { RescueTeam, ReliefSupplies, EmergencyDevice },
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
.team_supplies_device {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>