<!--
 * @Description: 综合统计
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-25 13:45:03
 * @LastEditors: chenmeiqi
 * @LastEditTime: 2021-11-05 16:52:18
-->
<!-- 综合统计 -->
<template>
  <div class="manage">
    <div id="zhtj_echarts"></div>
  </div>
</template>

<script>
import { mapStatisticalThreeIndicators } from "@/api/idsm/index";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      options: {
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFF", //更改坐标轴文字颜色
              fontSize: 30, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: "value",
          name: "件",
          splitNumber: 8,
          nameTextStyle: {
            fontSize: 28,
            color: "#fff",
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFF", //更改坐标轴文字颜色
              fontSize: 30, //更改坐标轴文字大小
            },
          },
        },
        grid: {
          top: "21%",
          left: "15%",
          height: "60%",
        },
        legend: {
          data: ["灾情接报", "灾情审批", "灾情处置"],
          left: "20%",
          textStyle: {
            color: "#fff",
            fontSize: "34",
          },
          itemWidth: 40,
          itemHeight: 40,
        },
        series: [
          {
            data: [],
            type: "line",
            name: "灾情接报",
            smooth: true,
            symbolSize: 20,
          },
          {
            data: [],
            type: "line",
            name: "灾情审批",
            smooth: true,
            symbolSize: 20,
          },
          {
            data: [],
            type: "line",
            name: "灾情处置",
            smooth: true,
            symbolSize: 20,
          },
        ],
      },
      eChart: null,
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  //挂载完成 访问DOM元素
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  //方法集合
  methods: {
    doQuery() {
      mapStatisticalThreeIndicators({}).then((res) => {
        if (res.success) {
          let xAxis = [];
          if (res.body.length > 0) {
            res.body[0].dateArr.map((v) => {
              xAxis.push(moment(v).format("MM.DD"));
            });

            res.body.map((v, i) => {
              let data = [0, 0, 0, 0, 0];
              v.indicatorsValueArr.map((v) => {
                let index = xAxis.findIndex(
                  (e) => e == moment(v.dates).format("MM.DD")
                );
                if (index > -1) {
                  data[index] = v.indicatorsValue;
                }
              });
              this.options.series[i].data = data;
            });
          }
          this.options.xAxis.data = xAxis;
          this.$nextTick(() => {
            this.eChart.setOption(this.options);
            this.eChart.resize();
          });
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    init() {
      let chartDom = document.getElementById("zhtj_echarts");
      if (!chartDom) {
        return;
      }
      // this.eChart = this.$echarts.init(chartDom, "dark");
      this.eChart = this.$echarts.init(chartDom);
      this.eChart.setOption(this.options);

      this.eChart.on("click", (params) => {
        this.$emit("echartsClick", params);
        console.groupEnd("echarts点击事件");
      });

      this.eChart.resize();
      window.onresize = () => {
        this.eChart.resize();
      };
    },
  },
};
</script>
<style lang="less" scoped>
.manage {
  position: relative;

  #zhtj_echarts {
    width: 100%;
    height: 730px;
  }
}
</style>
