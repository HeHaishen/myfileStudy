<!--
 * @Description: 气象实时信息展示
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-20 16:02:19
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="realTimeDisplayClose"
    opsition="slefPoint"
    :title="title"
    ref="RealTimeDisplay"
    class="real-time-display"
  >
    <template slot="content">
      <ul class="list">
        <li
          class="child"
          v-for="(item, index) in typeList"
          :key="item.key"
          :class="[typeIndex === index ? 'active' : '']"
          @click="typeClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="bottom">
        <div class="temp" v-show="typeIndex == 0">温度</div>
        <div class="wind" v-show="typeIndex == 1">风力风向</div>
        <div class="rain" v-show="typeIndex == 2">降雨</div>
      </div>
    </template>
  </pop-up-layer>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      title: "气象实时信息展示",
      parentData: {},
      typeIndex: 0,
      typeList: [
        { name: "气温", key: 1 },
        { name: "风力风向", key: 2 },
        { name: "降雨", key: 3 },
      ],
    };
  },
  mounted() {
    this.$on("show", (data) => {
      // return;
      this.show = !this.show;
      if (this.show) {
        this.parentData = data;
        console.log(data.saveEvent);
        this.typeIndex = data.activeIndex;
        this.$refs.RealTimeDisplay.saveEvent = null;
        this.$refs.RealTimeDisplay.saveEvent = data.saveEvent;
      }
    });
  },
  methods: {
    realTimeDisplayClose() {
      this.show = false;
    },

    typeClick(index) {
      this.typeIndex = index;
    },
  },
};
</script>

<style scoped="scoped" lang="less">
@import "./index.less";
</style>
