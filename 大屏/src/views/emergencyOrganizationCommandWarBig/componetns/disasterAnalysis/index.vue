<!--
 * @Description: 右下角 灾情分析
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-30 11:07:55
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-01 14:15:54
-->
<!-- 右下角 灾情分析 -->
<template>
  <div class="disaster_analysis">
    <Catastrophe :eventData="eventData" />
    <TeamSituation :eventData="eventData" />
    <ResourceDemand :eventData="eventData" />
  </div>
</template>

<script>
import Catastrophe from "./catastrophe.vue"; // 灾损统计
import TeamSituation from "./teamSituation.vue"; // 队伍情况
import ResourceDemand from "./resourceDemand.vue"; // 资源调配

export default {
  components: { Catastrophe, TeamSituation, ResourceDemand },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {},
};
</script>
<style lang='less' scoped>
</style>