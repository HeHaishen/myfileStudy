<!--
 * @Description: 实时监测与指令下达
 * @Author: liuxin
 * @Date: 2021-11-01 16:36:30
 * @LastEditTime: 2021-11-05 16:56:22
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="disaster-instruction">
    <disaster-risk :eventData="eventData"></disaster-risk>
    <instruction-content :eventData="eventData"></instruction-content>
  </div>
</template>
<script>
import DisasterRisk from "./disasterRisk/index.vue";
import InstructionContent from "./instructionContent/index.vue";

export default {
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => { },
    },
  },
  components: { DisasterRisk, InstructionContent },
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
.disaster-instruction {
  width: 1450px;
  height: 1934px;
  // margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>