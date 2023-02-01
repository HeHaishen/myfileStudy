<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-10 16:59:31
-->
<template>
  <div class="city-danger-right">
    <div class="right-top">
      <div class="model-title">风险信息统计</div>
      <div class="right-top-content"></div>
      <div class="type-btn btn-position" @click="checkRisk" v-if="false">
        查看历史
      </div>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-left">
        <div class="model-title self-title">隐患点统计</div>
        <div class="bottom-left-content"></div>
        <div class="type-btn btn-position" @click="checkDanger" v-if="false">
          查看历史
        </div>
        <div class="bottom-left-detail">
          <div class="danger-total">
            <div class="number">
              {{ bottomLeftDetail.hiddentotal }}
              <span class="unit">件</span>
            </div>
            <div class="title">隐患总数</div>
          </div>
          <div class="rectified">
            <div class="number">
              {{ bottomLeftDetail.rectified }}
              <span class="unit">件</span>
            </div>
            <div class="title">已整改</div>
          </div>
        </div>
      </div>
      <div class="right-bottom-right">
        <div class="model-title self-title">应急预案</div>
        <div class="bottom-right-content">
          <clist :columns="tableHeaderList" :listData="tabelListData">
            <template slot="djdm" slot-scope="{ record, text }">
              <p class="leve-btn" :class="[leveBtnTypeObj[text]]">
                {{ leveList[text] }}
              </p>
            </template>

            <template slot="zjgxsj" slot-scope="{ record, text }">
              {{ text.split(" ")[0] }}
            </template>

            <template slot="resource" slot-scope="{ record, text }">
              <p
                class="leve-btn"
                style="color: #01ffff; cursor: pointer"
                @click="showDetail(record, text)"
              >
                查看
              </p>
            </template>
          </clist>
        </div>
      </div>
    </div>
    <!-- <pop-up-layer :show="show" v-if="show" :setStyles="{}" title="粉尘涉爆企业" @doClose="close" opsition="btnBottom" ref="myPopUpLayer">
      <template slot="content"> </template>
    </pop-up-layer> -->
    <pop-up-layer
      v-if="pdfShow"
      :show="pdfShow"
      :setStyles="{}"
      @doClose="close"
      opsition="pageRight"
      :title="title"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="pdf-vue-view">
          <PdfView
            :pdfUrl="`/doc/api/store/preview/${this.formData.fileId}`"
            :recordData="this.formData"
          >
          </PdfView>
        </div>
      </template>
    </pop-up-layer>

    <!-- <pdf v-if="embedContent" :src="embedContent" type="" style="margin:0 auto;"> -->
    <!-- </pdf> -->
  </div>
</template>

<script>
import Pdf from "vue-pdf";
import Clist from "@/components/APicture/c-table";
import PdfView from "@/components/pdf/pdf-view";
import {
  getRadarChartApi,
  getRiskInformationApi,
  getEmergencyPlanApi,
  getDangerRightApi,
  getFile,
} from "@/api/theCitysDanger";
export default {
  components: { Clist, PdfView, Pdf },
  data() {
    return {
      show: false,
      tableHeaderList: [
        { title: "创建时间", index: 0, textIndex: "zjgxsj", width: "20%" },
        { title: "监测内容", index: 1, textIndex: "yamc", width: "40%" },
        { title: "级别", index: 2, textIndex: "djdm", width: "25%" },
        { title: "操作", index: 3, textIndex: "resource", width: "15%" },
      ],
      leveList: {
        1: "低风险级别",
        2: "中风险级别",
        3: "高风险级别",
      },
      leveBtnTypeObj: {
        1: "leve-btn-blue",
        2: "leve-btn-yellow",
        3: "leve-btn-red",
      },
      tabelListData: [
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 1,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 2,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 1,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 2,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 0,
        // },
      ],
      //  echart部分
      riskDiv: null,
      hiddenTroubleDiv: null,

      //  重大危险源-隐患点统计 - 雷达图数据
      hiddenTroubleChart: null,
      // 全市各区重大危险源统计数据
      districtsDanger: [],

      bottomLeftDetail: [],
      formData: {},
      pdfShow: false,
      embedContent: null,
      title: undefined,
    };
  },
  created() {},
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    init() {
      this.getRiskInformationData();
      this.getEmergencyPlanData();
      this.getDangerRightData();
      this.getEmergencyPlanData();
    },
    initChart() {
      this.riskDiv = this.$echarts.init(
        document.querySelector(".right-top-content")
      );
      this.riskDiv.setOption(this.riskChart());

      this.getRadarChartData().then(() => {
        this.hiddenTroubleDiv = this.$echarts.init(
          document.querySelector(".bottom-left-content")
        );
        this.hiddenTroubleDiv.setOption(
          this.hiddenTroubleChartFn(this.hiddenTroubleChart)
        );
      });

      const that = this;
      window.onresize = function () {
        that.riskDiv.resize();
        that.hiddenTroubleDiv.resize();
      };
    },
    riskChart() {
      // 设置渐变颜色
      function colorsFun(begincolor, endColors) {
        let itemStyle = {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: begincolor, // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: endColors, // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        };
        return itemStyle;
      }
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(22),
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "white",
            },
          },
        },
        grid: {
          left: 50,
          right: 60,
          y: 50,
          bottom: 60,
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["隐患总数", "已整改", "整改中", "逾期未整改", "整改率"],
          itemWidth: that.$setFontSize(18),
          itemHeight: that.$setFontSize(18),
          itemGap: that.$setFontSize(30),
          textStyle: {
            fontSize: that.$setFontSize(20),
            fontFamily: "MicrosoftYaHeiUI",
            color: "#FFFFFF",
          },
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              show: false,
              type: "shadow",
            },
            axisLabel: {
              interval: 0,
              color: "#00e9ff",
              fontSize: that.$setFontSize(22),
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: "水量",
            // min: 0,
            // max: 250,
            // interval: 50,
            axisTick: {
              show: false,
            },
            axisLabel: {
              // formatter: "{value} ml",
              color: "white",
              fontSize: that.$setFontSize(22),
            },
          },
          {
            axisTick: {
              show: false,
            },
            type: "value",
            // name: "温度",
            min: 0,
            max: 100,
            interval: 5,
            axisLabel: {
              // formatter: "{value} °C",
              color: "white",
              fontSize: that.$setFontSize(22),
            },
          },
        ],
        series: [
          {
            name: "隐患总数",
            type: "bar",
            itemStyle: colorsFun("#298fa5", "#47def3"),
          },
          {
            name: "已整改",
            type: "bar",
            itemStyle: colorsFun("#36a988", "#22ffb2"),
          },
          {
            name: "整改中",
            type: "bar",
            itemStyle: colorsFun("#306eab", "#0b81fd"),
          },
          {
            name: "逾期未整改",
            type: "bar",
            itemStyle: colorsFun("#a65280", "#e53395"),
            // color: "#e53395",
          },
          {
            name: "整改率",
            type: "line",
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: colorsFun("#a65280", "#e53395"),
          },
        ],
      };
      return option;
    },

    
    hiddenTroubleChartFn(obj) {
      let dataname = obj.typeName;
      let datamax = [250, 250, 250, 250, 250, 250];
      let datavaule = obj.num;
      var indicator = [];
      for (var i = 0; i < dataname.length; i++) {
        indicator.push({
          name: dataname[i],
          max: datamax[i],
        });
      }
      function contains(arrays, obj) {
        var i = arrays.length;
        while (i--) {
          if (arrays[i] === obj) {
            return i;
          }
        }
        return false;
      }
      let that = this;
      let option = {
        tooltip: {
          show: false,
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(18),
          },
        },
        radar: {
          center: ["50%", "50%"],
          radius: "65%",
          startAngle: 90,
          splitNumber: 5,
          splitArea: {
            areaStyle: {
              color: [
                "rgba(26,45,59,0.8)",
                "rgba(49,98,138,0.8)",
                "rgba(26,45,59,0.8)",
                "#6C7AAB",
                "rgba(73,92,151, 1)",
              ].reverse(),
            },
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "transparent",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#697b89",
            },
          },
          name: {
            formatter: function (value) {
              var i = contains(dataname, value);
              var percent = datavaule[i];
              var name = dataname[i];
              var text = "";
              /*  if (name == "幼龄林") {
                text = "{a1|" + name + "}" + "\n" + "{a2|" + percent + "亩}";
              } else if (name == "中龄林") {
                text = "{b1|" + name + "}" + "\n" + "{b2|" + percent + "亩}";
              } else if (name == "近熟林") {
                text = "{c1|" + name + "}" + "\n" + "{c2|" + percent + "亩}";
              } else if (name == "成熟林") {
                text = "{d1|" + name + "}" + "\n" + "{d2|" + percent + "亩}";
              } else {
                text = "{e1|" + name + "}" + "\n" + "{e2|" + percent + "亩}";
              } */
              if (name == "幼龄林") {
                text = "{a1|" + name + "}";
              } else if (name == "中龄林") {
                text = "{b1|" + name + "}";
              } else if (name == "近熟林") {
                text = "{c1|" + name + "}";
              } else if (name == "成熟林") {
                text = "{d1|" + name + "}";
              } else {
                text = "{e1|" + name + "}";
              }
              return text;
            },
            textStyle: {
              rich: {
                //幼龄林
                a1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                },
                a2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 2,
                },
                //中龄林
                b1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                },
                b2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 2,
                },
                //近熟林
                c1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                },
                c2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 4,
                },
                //成熟林
                d1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                },
                d2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 4,
                },
                //过熟林
                e1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                  padding: 4,
                },
                e2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 4,
                },
                //过熟林
                f1: {
                  fontSize: that.$setFontSize(18),
                  color: "#fff",
                  align: "center",
                  padding: 4,
                },
                f2: {
                  fontSize: that.$setFontSize(18),
                  align: "center",
                  color: "#fff",
                  padding: 4,
                },
              },
            },
          },
          indicator: indicator,
        },

        series: [
          {
            type: "radar",
            symbol: "circle",
            symbolSize: 7,
            areaStyle: {
              normal: {
                color: "#1273e2",
              },
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#00A7FE",
              borderWidth: 1,
            },
            lineStyle: {
              normal: {
                color: "#018de5",
                width: 2,
              },
            },
            data: [datavaule],
          },
        ],
      };
      return option;
    },
    // 应急预案列表-查看点击
    showDetail(obj) {
      console.log("应急预案列表-查看点击",obj)
      this.pdfShow = true;
      this.formData = obj;
      this.title = obj.yamc;
    },
    close() {
      this.show = false;
    },

    // echart数据处理
    formatDataListNew(arr, values = "name", otherpush = 0) {
      let returnList = arr.map((item, key) => {
        if (otherpush) {
          return item[values] + otherpush;
        } else {
          return item[values];
        }
      });
      return returnList;
    },

    // 重大危险源-隐患点统计 - 雷达图
    getRadarChartData() {
      return new Promise((resolve, reject) => {
        getRadarChartApi({ body: { codes: "D0Ok2enz" } }).then((res) => {
          console.log("重大危险源-隐患点统计 - 雷达图", res);
          if (res.body.data.length && res.success) {
            this.hiddenTroubleChart = res.body.data;
            this.hiddenTroubleChart.typeName = this.formatDataListNew(
              res.body.data,
              "typeName"
            );
            this.hiddenTroubleChart.num = this.formatDataListNew(
              res.body.data,
              "num"
            );
            resolve(res);
          }
        });
      });
    },

    // 重大危险源-隐患点统计 - 右侧
    getDangerRightData() {
      getDangerRightApi({ body: { codes: "5EFeDuvl" } }).then((res) => {
        if (res.body && res.body.data && res.body.data.length && res.success) {
          console.log("重大危险源-隐患点统计 - 右侧", res);
          this.bottomLeftDetail = res.body.data[0];
        }
      });
    },

    //  重大危险源-风险信息统计
    getRiskInformationData() {
      getRiskInformationApi({ body: { codes: "hOTkyBYW" } }).then((res) => {
        if (res.body.data.length && res.success) {
          console.log("重大危险源-风险信息统计", res);
          this.riskDiv.setOption({
            dataset: {
              dimensions: [
                "areaName",
                "hiddenTotal",
                "rectified",
                "underRectification",
                "overdueRectification",
                "rectificationRate",
              ],
              source: res.body.data,
            },
          });
        }
      });
    },

    // 全市重大危险源一张图-公共 - 应急预案
    getEmergencyPlanData() {
      getEmergencyPlanApi({ body: { codes: "INGmWT9L" } }).then((res) => {
        if (res.body.data.length && res.success) {
          console.log("全市重大危险源一张图-公共 - 应急预案", res);
          this.tabelListData = res.body.data;
        }
      });
    },
    // 查看风险点
    checkRisk() {
      this.show = true;
    },
    // 查看隐患点
    checkDanger() {
      this.show = true;
    },
    close() {
      this.pdfShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
