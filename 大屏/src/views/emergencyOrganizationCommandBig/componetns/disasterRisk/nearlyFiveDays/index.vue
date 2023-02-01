<!--
 * @Description: 近5日灾害风险监测情况
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-03 13:55:36
-->
<template>
  <div class="nearly_five_days">
    <div class="public-head">
      近5日灾害风险监测情况
      <div class="more" @click="onMore">
        <a-icon type="rollback" v-show="showType == 2" title="返回" />
      </div>
    </div>
    <div class="public-content">
      <ComprehensiveStatistics
        v-show="showType == 1"
        @echartsClick="echartsClick"
      />
      <DistrictsStatistics v-if="showType == 2" :formData="formData" />
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import ComprehensiveStatistics from "./comprehensiveStatistics.vue";
import DistrictsStatistics from "./districtsStatistics.vue";

export default {
  name: "",
  props: {},
  components: { ComprehensiveStatistics, DistrictsStatistics },
  data() {
    return {
      showType: 1,
      formData: {},
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /** echarts 点击事件 */
    echartsClick(params) {
      this.showType = 2;
      this.formData = params;
    },
    /** 更多事件点击 */
    onMore() {
      this.formData = {};
      this.showType = 1;
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";
.nearly_five_days {
  border: 2px solid #015ebd;
  width: 100%;
  height: 945px;
  position: relative;
  background-color: #001941;

  .public-head {
    position: relative;
    .more {
      position: absolute;
      top: -2px;
      right: 40px;
      cursor: pointer;
    }
  }
}
</style>
