<!--
 * @Description: 事件概览与监控视频
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:56:38
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="incident-monitoring">
    <event-details :eventData="eventData"></event-details>
    <surveillance-video></surveillance-video>
  </div>
</template>
<script>
import EventDetails from './eventDetails/index.vue'
import SurveillanceVideo from './surveillanceVideo'

export default {
  name: '',
  props: {
    eventData: {
      type: Object,
      default: () => { return { } }
    }
  },
  components: { EventDetails, SurveillanceVideo },
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
.incident-monitoring {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>