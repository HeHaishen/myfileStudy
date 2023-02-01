<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-28 19:05:32
-->
<template>
  <div class="chemicals-right-box">
    <div class="right-left">
      <div class="title">
        <div class="model-title">综合统计</div>
        <div class="update-time time-box">
          更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>
      <div class="composite-top">
        <div class="composite-top-left">
          <div class="composite-sub-title">涉危企业统计</div>
          <div class="composite-statistics-echart"></div>
        </div>
        <div class="composite-top-right">
          <div class="composite-sub-title">重点监管企业统计</div>
          <div class="supervise-statistics-echart"></div>
        </div>
      </div>
      <div class="composite-bt">
        <div class="composite-sub-title">危化品存量统计</div>
        <div class="stock-statistics">
          <div class="stock-statistics-left">
            <span class="name">危化品存量</span>
            <span class="number">{{ stockStatisticsTotal.num }}</span>
            <span class="unit">万吨</span>
          </div>
          <div class="stock-statistics-right">
            <span class="name">环比</span>
            <span class="number">
              {{ riseOrfall }}
              {{ Math.abs(stockStatisticsTotal.ringratio) }}%
            </span>
          </div>
        </div>
        <div class="stock-statistics-echart"></div>
      </div>
    </div>
    <div class="right-right">
      <enforce-the-law></enforce-the-law>
      <investigate></investigate>
    </div>
  </div>
</template>

<script>
import EnforceTheLaw from "./EnforceTheLaw";
import Investigate from "./investigate";
import moment from "moment";
import * as api from "@/api/hazardousChemicals";
export default {
  components: { EnforceTheLaw, Investigate },
  data() {
    return {
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      },
      compositeObj: null,
      superviseObj: null,
      stockObj: null,
      stockStatisticsTotal: {
        num: "",
        ringratio: null,
      },
    };
  },
  created() {
    this.init();
    this.getDangerousCompany();
    this.getRegulatoryFocus();
    this.getStockStatisticsTotal();
    this.getStockStatisticsClassify();
  },
  computed: {
    riseOrfall: function () {
      if (this.stockStatisticsTotal.ringratio > 0) {
        return "△";
      } else if (this.stockStatisticsTotal.ringratio < 0) {
        return "▽";
      } else {
        return "";
      }
    },
  },
  methods: {
    moment,
    // 涉危企业统计
    getDangerousCompany() {
      api.getDangerousCompany(this.defaultParams).then((res) => {
        if (res.success) {
          this.compositeObj.setOption({
            dataset: {
              dimensions: ["name", "num"],
              source: res.body.data.reverse(),
            },
          });
        } else {
          console.error(res.message);
        }
      });
    },

    // 重点监管企业统计
    getRegulatoryFocus() {
      api.getRegulatoryFocus(this.defaultParams).then((res) => {
        if (res.success) {
          let data = res.body.data.map((item) => {
            item.value = item.num;
            return item;
          });
          this.superviseObj.setOption({
            series: [
              {
                data: data,
              },
            ],
          });
        } else {
          console.error(res.message);
        }
      });
    },

    // 危化品存量统计- 总量
    getStockStatisticsTotal() {
      api.getStockStatisticsTotal(this.defaultParams).then((res) => {
        if (res.success) {
          this.stockStatisticsTotal =
            res.body.data.length > 0 ? res.body.data[0] : null;
        } else {
          console.error(res.message);
        }
      });
    },

    //接口数据整理
    dataHanding(data) {
      //数据归类
      let map = {};
      let newDataArr = [];
      for (let item of data) {
        if (map[item.areaCode]) {
          map[item.areaCode][item.type] = item.num;
        } else {
          map[item.areaCode] = [item.areaName, "", "", ""];
          map[item.areaCode][item.type] = item.num;
        }
      }
      //将对象的值转换为数组
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          newDataArr = [...newDataArr, map[key]];
        }
      }
      return newDataArr;
    },

    // 危化品存量统计 - 各区分类统计
    getStockStatisticsClassify() {
      api.getStockStatisticsClassify(this.defaultParams).then((res) => {
        if (res.success) {
          this.stockObj.setOption({
            dataset: {
              dimensions: ["areaName", "inflowNum", "outflowNum", "stockNum"],
              source: res.body.data,
            },
          });
        } else {
          console.error(res.message);
        }
      });
    },

    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },
    //echart 初始化
    initChart() {
      //重点监管企业统计echart
      this.superviseObj = this.$echarts.init(
        document.getElementsByClassName("supervise-statistics-echart")[0]
      );
      this.superviseObj.setOption(this.superviseOption());
      this.compositeObj = this.$echarts.init(
        document.getElementsByClassName("composite-statistics-echart")[0]
      );
      this.compositeObj.setOption(this.compositeOption());
      //危化品存量统计echart
      this.stockObj = this.$echarts.init(
        document.getElementsByClassName("stock-statistics-echart")[0]
      );
      this.stockObj.setOption(this.stockOption());
      //窗口变化，重置echart图
      window.onresize = function () {
        this.superviseObj.resize();
        this.stockObj.resize();
        this.compositeOption.resize();
      };
    },
    compositeOption() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(12),
          },
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          top: "1%",
          left: "3%",
          right: "4%",
          bottom: "0",
          containLabel: true,
        },
        dataset: {
          dimensions: [],
          source: [],
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              fontSize: that.$setFontSize(16),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              // textShadowColor: "transparent",
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
            color: "#CC1BAA",
          },
        ],
      };
      return option;
    },

    superviseOption() {
      let that = this;
      let option = {
        tooltip: {
          //   show: false,
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        legend: {
          show: false,
          // data: ["专项一", "专项二", "专项三", "专项四", "专项五"],
          // show: true,
          right: "0",
          top: "center",
          icon: "circle", //正方形图例  square
          textStyle: {
            color: "#fff",
          },
          orient: "vertical",
        },
        grid: {
          top: "1%",
          // left: '-10%',
          // x: -10,
          // y: 0,
          // x1: 0,
          // y1: 0,
        },
        series: [
          {
            // top: 'center',
            // left: '-40%',
            // zoom: 2,
            // name: "专项一",
            type: "pie",
            radius: ["20%", "55%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //   borderRadius: 10,
              borderColor: "#091d43",
              borderWidth: 3,
              //   color:'#000'
            },
            label: {
              show: true,
              position: "outside", //inside与outside 搭配labelLine一起使用
              formatter: "{b} {c}",
              // formatter: function (name) {
              //   // if (!name) return ''
              //   // console.log(name)
              //   if (name.length > 4) {
              //     name = name.slice(0, 4) + "...";
              //   }
              //   return name;
              // },

              textStyle: {
                fontWeight: "100",
                fontFamily: "Microsoft YaHei",
                color: "#fff",
                fontSize: that.$setFontSize(16),

                // fontSize: 8
              },
            },

            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              // length：10,
              length: 4,
            },
            data: [],
          },
        ],
      };
      return option;
    },

    stockOption(obj = null) {
      let that = this;
      const color = ["#A35AE0", "#66FF66", "#0CEBEA", "#1fa9e3"];
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          data: ["流入", "流出", "存量"],
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          right: "0",
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
                fontSize: that.$setFontSize(16),
                color: "rgb(1, 208, 226)",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位（万吨）",
            min: 0,
            //max: 200,
            //interval: 50000,
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              formatter: "{value} ",
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: that.$setFontSize(16),
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgb(43, 54, 82)",
                width: 1,
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
          },
        ],
        series: [
          {
            name: "流入",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            // color: "rgb(0,123,255)",
            color: color[0],
          },
          {
            name: "流出",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            // color: "rgb(0,201,1)",
            color: color[1],
          },
          {
            name: "存量",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            // color: "rgb(0,255,255)",
            color: color[2],
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
