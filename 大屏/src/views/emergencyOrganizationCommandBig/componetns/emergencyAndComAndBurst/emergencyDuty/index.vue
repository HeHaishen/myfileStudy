<!--
 * @Description: 应急值守
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-03 13:56:21
-->
<template>
  <div class="emergency_duty">
    <div class="public-head">应急值守</div>
    <div class="public-content">
      <on-duty></on-duty>
      <depart-ment></depart-ment>
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import departMent from '../emergencyDuty/departMent.vue'
import onDuty from '../emergencyDuty/onDuty.vue'
export default {
  name: "",
  props: {},
  components: {
    departMent, onDuty
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
};
</script>
<style lang='less' scoped>
@import '../../../common.less';
.emergency_duty {
  border: 2px solid #015ebd;
  width: 100%;
  height: 650px;
  position: relative;
  background-color: #001941;
}
</style>
