<!--
 * @Description: 突发事件与应急设备
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:56:26
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="emergency-and-equipment">
    <Emergency />
    <EmergencyEquipment />
  </div>
</template>
<script>
import Emergency from './emergency'
import EmergencyEquipment from './emergencyEquipment'

export default {
  name: '',
  props: {},
  components: { Emergency, EmergencyEquipment },
  data() {
    return {

    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>
<style lang='less' scoped>
.emergency-and-equipment {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>