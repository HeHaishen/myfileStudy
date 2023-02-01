<!--
 * @Description: 指令内容模块 下达-跟踪
 * @Author: liuxin
 * @Date: 2021-11-01 15:30:48
 * @LastEditTime: 2021-11-11 17:33:30
 * @LastEditors: Aidam_Bo
-->
<template>
  <div class="instruction">
    <div class="tabBarStyle">
      <div
        v-for="(item, index) in tabBarList"
        :key="index"
        class="tabBar-item"
        :class="{ active: currentIndex == index }"
        @click="tabBarChange(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="public-content">
      <Order v-show="currentIndex === 0" :eventData="eventData" />
      <OrderTracking v-show="currentIndex === 1" :eventData="eventData" />
      <PlanDetail
        v-show="currentIndex === 2"
        :eventData="eventData"
        :planId="currentPlanId"
      />
      <HiddenDanger v-show="currentIndex === 3" :eventData="eventData" />
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import OrderTracking from "./orderTracking/index.vue";
import Order from "./order/index.vue";
import PlanDetail from "./order/planDetail.vue";
import HiddenDanger from "./hiddenDanger/index.vue";
import Cookies from "js-cookie";

export default {
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  components: { Order, OrderTracking, PlanDetail, HiddenDanger },
  data() {
    return {
      title: "指令下达",
      tabBarList: ["指令下达", "指令跟踪", "当前预案", "风险隐患"],
      currentIndex: 0,
      /** 当前预案id */
      currentPlanId: null,
    };
  },
  watch: {
    '$store.state.planId':{
      handler(newVal){
        this.currentPlanId = newVal;
      },

    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    tabBarChange(index) {
      if (index == 2) {
        this.getPlan();
      }
      this.currentIndex = index;
    },
    /** 获取当前预案id */
    getPlan() {
      // let planId = Cookies.get(`${this.eventData.jbbh}_bigplanIds`);
      let planId = this.$store.state.planId;
      this.currentPlanId = planId;
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";
.instruction {
  border: 2px solid #015ebd;
  width: 100%;
  height: 948px;
  position: relative;
  background-color: #001941;

  .tabBarStyle {
    display: flex;
    height: 84px;
    width: 100%;
    padding: 0 40px;
    color: #fff;
    font-weight: bold;
    font-size: 38px;
    line-height: 84px;
    cursor: pointer;
    user-select: none;
    .tabBar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 40px;
      border-bottom: 5px solid transparent;
    }
    .active {
      color: #2789fb;
      border-bottom: 5px solid #1b77ff;
    }
  }
}
</style>