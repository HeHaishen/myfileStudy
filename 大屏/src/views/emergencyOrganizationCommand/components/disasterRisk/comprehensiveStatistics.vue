<!--
 * @Description: 综合统计
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-25 13:45:03
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-26 17:27:29
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
        },
        yAxis: {
          type: "value",
          name: "件",
        },
        grid: {
          top: "21%",
          left: "15%",
          height: "60%",
        },
        legend: {
          data: ["灾情接报", "灾情审批", "灾情处置"],
          left: "20%",
        },
        series: [
          {
            data: [],
            type: "line",
            name: "灾情接报",
            smooth: true,
            symbolSize: 10,
            indicatorsType: "1",
          },
          {
            data: [],
            type: "line",
            name: "灾情审批",
            smooth: true,
            symbolSize: 10,
            indicatorsType: "2",
          },
          {
            data: [],
            type: "line",
            name: "灾情处置",
            smooth: true,
            symbolSize: 10,
            indicatorsType: "3",
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
      this.eChart = this.$echarts.init(chartDom, "dark");
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
<style lang='less' scoped>
@import "../../common.less";
.manage {
  position: relative;

  #zhtj_echarts {
    width: 100%;
    height: 330vh * @h;
  }
}
</style>