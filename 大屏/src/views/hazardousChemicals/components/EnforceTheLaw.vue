<template>
  <div class="enforce-the-law">
    <div class="title">
      <div class="model-title">本年危化品企业执法情况统计</div>
      <div class="update-time time-box">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <div class="tab-box">
      <div
        class="tab-bt"
        v-for="(item, i) in DataList"
        :key="i"
        :class="[['tab-bt-blue', 'tab-bt-blue2', 'tab-bt-green'][i]]"
      >
        <div class="tab-bt-title">{{ item.title }}</div>
        <div class="list-box">
          <div class="list" v-for="(option, k) in item.list" :key="k">
            <div class="number">{{ option.num }}</div>
            <div class="name">{{ option.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-title">执法文书统计</div>
    <div class="enforcement-documents-chart"></div>
  </div>
</template>
<script>
import moment from "moment";
import * as api from "@/api/hazardousChemicals";
export default {
  data() {
    return {
      DataList: [
        {
          title: "检查",
          list: [],
        },
        {
          title: "隐患",
          list: [],
        },
        {
          title: "文书",
          list: [],
        },
      ],
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      },
      enforcementObj: null,
    };
  },
  created() {
    this.init();
    this.getCompanyExamine();
    this.getCompanyHiddenDanger();
    this.getCompanyWrit();
    this.getEnforceTheLaw();
  },
  methods: {
    moment,
    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },

    // 危险化学品-检查
    getCompanyExamine() {
      api.getCompanyExamine(this.defaultParams).then((res) => {
        if (res.success) {
          this.DataList[0].list = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },
    // 危险化学品-隐患
    getCompanyHiddenDanger() {
      api.getCompanyHiddenDanger(this.defaultParams).then((res) => {
        if (res.success) {
          this.DataList[1].list = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },
    // 危险化学品-文书
    getCompanyWrit() {
      api.getCompanyWrit(this.defaultParams).then((res) => {
        if (res.success) {
          this.DataList[2].list = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },

    // 执法文书统计
    getEnforceTheLaw() {
      api.getEnforceTheLaw(this.defaultParams).then((res) => {
        if (res.success) {
          this.enforcementObj.setOption({
            dataset: {
              dimensions: [
                "dimension",
                "inspectionRecord",
                "rectificationNotice",
                "reviewOpinion",
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
      //执法文书统计echart
      this.enforcementObj = this.$echarts.init(
        document.getElementsByClassName("enforcement-documents-chart")[0]
      );
      this.enforcementObj.setOption(this.statisticsOption());
      //窗口变化，重置echart图
      window.onresize = function () {
        this.enforcementObj.resize();
      };
    },

    //执法文书统计echart图options
    statisticsOption(obj = null) {
      let that = this;
      let option = {
        legend: {
          data: ["现场检查记录", "责令整改通知书", "整改复查意见树"],
          itemWidth: that.$setFontSize(16),
          itemHeight: that.$setFontSize(16),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        grid: {
          //top:'4%',
          left: "0",
          right: "0",
          bottom: "-2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(20),
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          // interval: 0,
          boundaryGap: false,
          type: "value",

          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(20),
            interval: 0,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(43, 54, 82)",
              // width: 1,
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "现场检查记录",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                // color: "#007aff", //折点颜色
                color: "#676fff",
                lineStyle: {
                  // color: "#007aff", //折线颜色
                  color: "#676fff",
                },
              },
            },
          },
          {
            name: "责令整改通知书",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                color: "#00c800", //折点颜色
                lineStyle: {
                  color: "#00c800", //折线颜色
                },
              },
            },
          },

          {
            name: "整改复查意见树",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                color: "#dd5145", //折点颜色
                lineStyle: {
                  color: "#dd5145", //折线颜色
                },
              },
            },
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
