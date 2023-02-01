<!--
 * @Description: 指令下达
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 14:15:38
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-08 10:32:36
-->
<!-- 指令下达 -->
<template>
  <div class="order_tab">
    <div class="tabs">
      <div
        class="tab"
        v-for="item in tabs"
        :key="item.value"
        @click="changeTab(item)"
        :class="[currentTab.value == item.value && 'active']"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="content">
      <Order v-show="currentTab.value == 1" :eventData="eventData" />
      <PlanDetail
        v-show="currentTab.value == 2"
        :planId="currentPlanId"
        :eventData="eventData"
      />
    </div>
  </div>
</template>

<script>
import Order from "./order.vue";
import Cookies from "js-cookie";
import PlanDetail from "./planDetail.vue";

export default {
  components: { Order, PlanDetail },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabs: [
        { value: "1", label: "指令下达" },
        { value: "2", label: "当前预案" },
      ],
      /** 当前对象 */
      currentTab: {
        value: "1",
        label: "指令下达",
      },
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
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    /** 标签点击事件 */
    changeTab(record) {
      this.currentTab = record;
      if (record.value != 1) {
        this.getPlan();
      }
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

.order_tab {
  position: relative;
  width: 100%;
  .tabs {
    position: absolute;
    width: 100%;
    top: -98vh * @h;
    left: 0;
    text-align: left;
    line-height: 64vh * @h;
    color: white;
    font-size: 32vh * @h;

    .tab {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      &.active {
        border-bottom: 3vh * @h #1b77ff solid;
      }
    }
  }
}
</style>