<!--
 * @Description: 物联点数据实时显示
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-20 15:09:44
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="IOTDataClose"
    opsition="slefPoint"
    :title="title"
    class="IOT-data"
  >
    <template slot="content">
      <ul class="list">
        <li
          class="child"
          v-for="item in tabList"
          :key="item.key"
          :class="[activeName == item.name ? 'active' : '']"
          @click="tabClick(item.name)"
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
      activeName: "",
      show: false,
      title: "物联点数据实时显示",
      parentData: {},
      tabIndex: 0,
      tabList: [
        { name: "云台摄像机", key: 1 },
        { name: "热成像仪", key: 2 },
        { name: "温度传感器", key: 3 },
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
      console.log(data);
      if (this.show) {
        // this.initData();
        this.parentData = data;
        console.log(data.saveEvent);
        this.activeName = data.name;
        // this.$refs.IOTData.saveEvent = null;
        // this.$refs.IOTData.saveEvent = data.saveEvent;
      }
    });
  },
  methods: {
    IOTDataClose() {
      this.show = false;
    },

    tabClick(name) {
      console.log(name);
      this.activeName = name;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>


