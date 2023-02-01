<!--
 * @Description: 应急值守、指挥机构、突发事件
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 17:02:45
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="emergency_com_burst">
    <EmergencyDuty />
    <CommandAgency />
    <Emergencies />
  </div>
</template>
<script>
import EmergencyDuty from "./emergencyDuty/index.vue"; // 应急值守
import CommandAgency from "./commandAgency/index.vue"; // 指挥机构
import Emergencies from "./emergencies/index.vue"; // 突发事件

export default {
  name: "",
  props: {},
  components: { EmergencyDuty, CommandAgency, Emergencies },
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
.emergency_com_burst {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>