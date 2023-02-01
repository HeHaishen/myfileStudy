<!--
 * @Description: 易着火节日统计
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-15 13:44:15
 * @LastEditTime: 2021-08-20 15:43:04
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="fireFestivalClose"
    opsition="slefPoint"
    :title="title"
    ref="FireFestival"
    class="fire-festival"
  >
    <template slot="content">
      <ul class="list">
        <li
          class="child"
          v-for="(item, index) in tabList"
          :key="item.key"
          :class="[tabIndex === index ? 'active' : '']"
          @click="tabClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="festival-chart"></div>
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
      title: "易着火节日",
      tabIndex: 0,
      festivalChart: null,
      tabList: [
        { name: "春节", key: 1 },
        { name: "清明", key: 2 },
      ],
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "order", width: "13%" },
        { title: "节日", index: 1, textIndex: "festival", width: "25%" },
        { title: "年份", index: 2, textIndex: "year", width: "25%" },
        {
          title: "森林火灾发生次数",
          index: 3,
          textIndex: "number",
          width: "24%",
        },
        {
          title: "经济损失(万元)",
          index: 4,
          textIndex: "lost",
          width: "13%",
        },
      ],
      tabelListData: [
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
        {
          order: 1,
          festival: "春节",
          year: "2021年",
          number: 0,
          lost: 0,
        },
      ],
    };
  },

  created() {
    this.$nextTick(() => {
      this.initChart();
    });
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
        this.$refs.FireFestival.saveEvent = null;
        this.$refs.FireFestival.saveEvent = data.saveEvent;
      }
    });
  },
  methods: {
    initChart() {
      this.festivalChart = this.$echarts.init(
        document.getElementsByClassName("festival-chart")[0]
      );
      this.festivalChart.setOption(this.festivalBar());

      let that = this;
      window.onresize = function () {
        that.festivalChart.resize();
      };
    },
    fireFestivalClose() {
      this.show = false;
    },

    tabClick(index) {
      this.tabIndex = index;
    },

    // 易着火节日统计
    festivalBar() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "3%",
          right: "0%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          // data: ["事故起数", "死亡人数", "受伤人数", "经济损失"],
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              type: "shadow",
            },
            data: [2016, 2017, 2018, 2019, 2020, 2021],
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: 18,
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：件数/人数",
            min: 0,
            max: 5,
            interval: 0.5,
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              formatter: "{value} ",
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: 14,
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
          },
          {
            type: "value",
            name: "单位:(万元)",
            min: 0,
            max: 80,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: 14,
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "right",
            },
          },
        ],
        series: [
          {
            name: "事故起数",
            type: "bar",
            data: [1, 2, 3, 4, 3, 2],
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#5096d6",
          },

          {
            name: "经济损失",
            type: "line",
            color: "#ffc000",
            data: [0, 20, 30, 24, 30, 34],
            //这句用来设置经济损失对应的右边的y轴
            yAxisIndex: 1,
          },
        ],
      };
      return option;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>


