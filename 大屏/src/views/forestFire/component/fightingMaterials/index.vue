<!--
 * @Description: 当前救火物资情况
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-20 15:43:27
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="fightingMaterialsClose"
    opsition="slefPoint"
    :title="title"
    ref="fightingMaterials"
    class="fighting-materials"
  >
    <template slot="content">
      <ul class="list">
        <li
          class="child"
          v-for="(item, index) in tabList"
          :key="item.key"
          :class="[tabIndex == index ? 'active' : '']"
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
      show: false,
      title: "当前救火物资情况",
      parentData: {},
      tabIndex: 0,
      tabList: [
        { name: "消防车", key: 1 },
        { name: "灭火器", key: 2 },
        { name: "直升机", key: 3 },
        { name: "无人机", key: 4 },
        { name: "防护服", key: 5 },
        { name: "喷雾剂", key: 6 },
        { name: "卫星电话", key: 7 },
        { name: "油锯", key: 8 },
      ],
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "order", width: "13%" },
        { title: "物资类型", index: 1, textIndex: "type", width: "25%" },
        { title: "所属区域", index: 2, textIndex: "region", width: "25%" },
        { title: "所属部门", index: 3, textIndex: "department", width: "24%" },
        { title: "数量", index: 4, textIndex: "number", width: "13%" },
      ],
      tabelListData: [
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 2,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 3,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 2,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 3,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 2,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 3,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 1,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 2,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
        },
        {
          order: 3,
          type: "消防车",
          region: "大田村委会",
          department: "ssss消防局",
          number: "2辆",
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
        this.tabIndex = data.activeIndex;
        this.$refs.fightingMaterials.saveEvent = null;
        this.$refs.fightingMaterials.saveEvent = data.saveEvent;
      }
    });
  },
  methods: {
    fightingMaterialsClose() {
      this.show = false;
    },

    tabClick(index) {
      this.tabIndex = index;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>


