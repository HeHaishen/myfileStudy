<!--
 * @Description: 各区灾害风险检查情况
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-25 15:27:35
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-27 14:12:27
-->
<!-- 各区灾害风险检查情况 -->
<template>
  <div class="manage">
    <div id="gqzhfxtj_echarts"></div>
  </div>
</template>

<script>
import { mapStatisticalThreeIndicators } from "@/api/idsm/index";
import moment from "moment";

const labelOption = {
  show: true,
  position: "insideBottom",
  distance: 10,
  align: "center",
  verticalAlign: "middle",
  rotate: 0,
  formatter: "{c}",
  rich: {
    name: {
      color: "#fff",
    },
  },
};

export default {
  components: {},
  props: {
    formData: {
      type: Object,
    },
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        if (!val) {
          return false;
        }
        this.doQuery();
      },
    },
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          top: "21%",
          left: "13%",
          height: "60%",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: {
          type: "bar",
          data: [],
          label: labelOption,
        },
      },
      eChart: null,
    };
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  //方法集合
  methods: {
    /** 数据查询 */
    doQuery() {
      mapStatisticalThreeIndicators({
        indicatorsType: parseInt(this.formData.seriesIndex) + 1,
        queryDate: `${moment().format("YYYY")}-${moment(
          this.formData.name
        ).format("MM-DD")}`,
        queryGroupByArea: 1,
      }).then((res) => {
        if (res.success) {
          let xAxis = [];
          let data = [];
          if (res.body.length > 0) {
            res.body[0].dateArr.map((v) => {
              xAxis.unshift(v);

              let index = res.body[0].indicatorsValueArr.findIndex(
                (e) => e.dates == v
              );
              if (index > -1) {
                data.unshift(res.body[0].indicatorsValueArr[index].indicatorsValue);
              } else {
                data.unshift(0);
              }
            });
          }
          this.$nextTick(() => {
            this.options.series.data = data;
            this.options.xAxis.data = xAxis;
            this.eChart.setOption(this.options);
            this.eChart.resize();
          });
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    init() {
      let chartDom = document.getElementById("gqzhfxtj_echarts");
      if (!chartDom) {
        return;
      }
      this.eChart = this.$echarts.init(chartDom, "dark");
      this.eChart.setOption(this.options);

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

  #gqzhfxtj_echarts {
    width: 100%;
    height: 330vh * @h;
  }
}
</style>