<!--
 * @Description: 应急预案统计、监控点视频
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:04:09
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="plan_video">
    <EmergencyPlanStatistics />
    <VideoSurveillance />
  </div>
</template>
<script>
import EmergencyPlanStatistics from "./emergencyPlanStatistics/index.vue"; // 应急预案统计
import VideoSurveillance from "./videoSurveillance/index.vue"; // 监控点视频

export default {
  name: "",
  props: {},
  components: { EmergencyPlanStatistics, VideoSurveillance },
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
.plan_video {
  width: 1239px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>