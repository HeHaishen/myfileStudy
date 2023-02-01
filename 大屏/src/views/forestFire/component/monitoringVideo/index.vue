<!--
 * @Description: 监控视频
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-20 15:53:47
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="monitoringVideoClose"
    opsition="slefPoint"
    :title="title"
    class="monitoring-video"
  >
    <template slot="content">
      <ul class="list">
        <li
          class="child"
          v-for="(item, index) in tabList"
          :key="item.key"
          :class="[activeIndex == index ? 'active' : '']"
          @click="tabClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="table-list">
        <Clist :columns="tableHeaderList" :listData="tabelListData"></Clist>
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
import Clist from "@/components/APicture/c-table";
export default {
  components: {
    Clist,
  },
  data() {
    return {
      activeIndex: 0,
      show: false,
      title: "监控点视频列表",
      parentData: {},
      tabList: [
        { name: "无人机", key: 1 },
        { name: "温度传感器", key: 2 },
        { name: "热像仪", key: 3 },
        { name: "云台摄像机", key: 4 },
      ],
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "order", width: "13%" },
        { title: "物联设备类型", index: 1, textIndex: "type", width: "25%" },
        { title: "设备名称", index: 2, textIndex: "name", width: "25%" },
        { title: "所属部门", index: 3, textIndex: "department", width: "24%" },
        { title: "设备状态", index: 4, textIndex: "status", width: "13%" },
      ],
      tabelListData: [
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
        {
          order: 1,
          type: "无人机",
          name: "无人机01",
          department: "广州市园林局",
          status: "正常",
        },
      ],
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.show = !this.show;
    //   console.log(data);
      if (this.show) {
        // this.initData();
        // this.parentData = data;
        // console.log(data.saveEvent);
        // this.activeName = data.name;
        // this.$refs.IOTData.saveEvent = null;
        // this.$refs.IOTData.saveEvent = data.saveEvent;
      }
    });
  },
  methods: {
    monitoringVideoClose() {
      this.show = false;
    },

    tabClick(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>



