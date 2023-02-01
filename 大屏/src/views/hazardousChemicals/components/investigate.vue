<template>
  <div class="investigate">
    <div class="title">
      <div class="model-title">本年危化品企业隐患排查情况统计</div>
    </div>
    <div class="tab-box">
      <div
        class="tab-bt common-bt"
        v-for="(item, index) in hiddenDangerClassify"
        :key="index"
      >
        <div class="tab-bt-title">{{ item.name }}</div>
        <div class="tab-bt-number">
          {{ item.num }}<span class="tab-bt-unit">条</span>
        </div>
      </div>
    </div>
    <div class="sub-title">一般隐患统计</div>
    <div class="hidden-trouble-statistics"></div>
  </div>
</template>
<script>
import moment from "moment";
import * as api from "@/api/hazardousChemicals";
export default {
  data() {
    return {
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      },
      hiddenDangerClassify: [],
      statisticsObj: null,
    };
  },
  created() {
    this.init();
    this.getHiddenDangerClassify();
    this.getHiddenDangerCommon();
  },
  methods: {
    moment,
    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },

    // 隐患统计-分类统计
    getHiddenDangerClassify() {
      api.getHiddenDangerClassify(this.defaultParams).then((res) => {
        if (res.success) {
          this.hiddenDangerClassify = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },

    // 一般隐患统计
    getHiddenDangerCommon() {
      api.getHiddenDangerCommon(this.defaultParams).then((res) => {
        if (res.success) {
          this.statisticsObj.setOption({
            dataset: {
              dimensions: [
                "areaName",
                "total",
                "yesCorrection",
                "ingCorrection",
                "notCorrection",
                "rectificationRate",
              ],
              source: res.body.data,
            },
          });
        } else {
          console.error(res.message);
        }
      });
    },

    //echart 初始化
    initChart() {
      //隐患统计echart
      this.statisticsObj = this.$echarts.init(
        document.getElementsByClassName("hidden-trouble-statistics")[0]
      );
      this.statisticsObj.setOption(this.statisticsOption());
      //窗口变化，重置echart图
      window.onresize = function () {
        this.statisticsObj.resize();
      };
    },

    //隐患统计echart图options
    statisticsOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "0",
          containLabel: true,
        },
        legend: {
          data: ["隐患总数", "已整改", "整改中", "逾期未整改", "整改率"],
          itemWidth: that.$setFontSize(16),
          itemHeight: that.$setFontSize(16),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: that.$setFontSize(20),
                color: "rgb(1, 208, 226)",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "总数(万个)",
            offset: -20,
            // nameLocation: "start",
            //min: 0,
            //max: 100,
            //interval: 10,
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              formatter: "{value} ",
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: that.$setFontSize(20),
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
            nameTextStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(20),
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
          },
          {
            type: "value",
            name: "整改率（%）",
            //min: 0,
            //max: 100,
            interval: 25,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: that.$setFontSize(20),
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },

            nameTextStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(20),
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgb(43, 54, 82)",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            name: "隐患总数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(55,201,226)",
          },
          {
            name: "已整改",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(63,246,179)",
          },
          {
            name: "整改中",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(66,157,246)",
          },
          {
            name: "逾期未整改",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
          },
          {
            name: "整改率",
            type: "line",
            yAxisIndex: 1,
            color: "rgb(255,64,71)",
            symbol: "circle",
            symbolSize: 8,
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style lang='less' scoped>
@import "../index.less";
</style>