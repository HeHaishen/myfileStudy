<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-07 20:34:24
-->
<template>
  <div class="dust-explosion-right">
    <div class="right-left">
      <div class="model-title">粉尘涉爆企业隐患自查信息</div>
      <div class="update-time position-update-time">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="major-thing">
        <div class="major-tabs">
          <div
            class="major-hidden-danger"
            :class="[majorType == 1 ? 'active' : '']"
            @click="majorHiddenFn"
          >
            重大隐患统计
          </div>
          <div
            class="major-accident"
            @click="majorAccidentFn"
            :class="[majorType == 2 ? 'active' : '']"
          >
            重大事故统计
          </div>
        </div>
        <div class="major-hidden-charts" v-show="majorType == 1"></div>
        <div class="major-accident-charts" v-show="majorType == 2"></div>
      </div>
      <div class="general-thing">
        <div class="general-tabs">
          <div
            class="general-hidden-danger"
            :class="[generalType == 1 ? 'active' : '']"
            @click="generalHiddenFn"
          >
            一般隐患统计
          </div>
          <div
            class="general-accident"
            @click="generalAccidentFn"
            :class="[generalType == 2 ? 'active' : '']"
          >
            一般事故统计
          </div>
        </div>
        <div class="general-hidden-charts" v-show="generalType == 1"></div>
        <div class="general-accident-charts" v-show="generalType == 2"></div>
      </div>
    </div>
    <div class="right-right">
      <div class="right-right-left">
        <div class="model-title">粉尘涉爆企业执法检查信息</div>
        <div class="update-time position-update-time">
          更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <ul class="check-information-list">
          <li
            class="check-information-item"
            v-for="(item, index) in checkInformationList"
            :key="index"
          >
            <div class="type">{{ item.name }}</div>
            <div class="desc">
              <div
                class="desc-item"
                v-for="(citem, index) in item.child"
                :key="index"
              >
                <div class="number">
                  {{ citem.number }}&nbsp;&nbsp;{{ citem.unit }}
                </div>
                <div class="title">{{ citem.name }}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="check-situation">
          <div class="model-little-title">各区检查企业情况</div>
          <div class="check-situation-chart"></div>
        </div>
        <div class="enforcement-documents">
          <div class="model-little-title">执法文书统计</div>
          <div class="enforcement-documents-chart"></div>
        </div>
      </div>
      <div class="right-right-side"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import listData from "../index.js";
import {
  getCheckInformationApi,
  getMajorHazard,
  getGeneralHazard,
  getMajorAccident,
  getOrdinaryAccident,
  getSituationEnterprise,
  getEnforcementDocument,
} from "@/api/dustAndExplosionNew/index";
export default {
  data() {
    return {
      majorType: 1,
      majorHiddenCharts: null,
      majorAccidentCharts: null,
      generalType: 1,

      generalHiddenCharts: null,
      generalAccidentCharts: null,

      checkInformationList: [
        {
          key: 0,
          type: "检查",
          child: [
            { key: "01", title: "文书数", value: 87052 },
            { key: "02", title: "已检查企业数", value: 81052 },
            { key: "03", title: "覆盖率", value: 94.4 },
            { key: "04", title: "到期末复查", value: 1050 },
          ],
        },
        {
          key: 1,
          type: "隐患",
          child: [
            { key: "01", title: "检查企业数", value: 87052 },
            { key: "02", title: "已检查企业数", value: 81052 },
            { key: "03", title: "覆盖率", value: 94.4 },
            { key: "04", title: "到期末复查", value: 1050 },
          ],
        },
        {
          key: 2,
          type: "文书",
          child: [
            { key: "01", title: "文书总数", value: 87052 },
            { key: "02", title: "责令整改", value: 81052 },
            { key: "03", title: "现场检查", value: 94.4 },
            { key: "04", title: "整改复查", value: 1050 },
          ],
        },
      ],

      // 各区检查企业情况
      checkSituationChart: null,
      // 执法文书统计
      enforcementDocumentsChart: null,

      // 重大隐患统计
      majorHiddenList: {
        nameArr: [],
        datas: {
          regionArr: [],
          values: {
            totalArr: [],
            rectifiedArr: [],
            rectifyingArr: [],
            notRectifiedArr: [],
            rectificationRateArr: [],
          },
        },
      },
      // 重大事故统计
      majorAccidentList: {
        nameArr: [],
        datas: {
          regionArr: [],
          values: {
            totalArr: [],
            deathArr: [],
            injuredArr: [],
            economicArr: [],
          },
        },
      },
      // 一般隐患统计
      generalHiddenList: {
        nameArr: [],
        datas: {
          regionArr: [],
          values: {
            totalArr: [],
            rectifiedArr: [],
            rectifyingArr: [],
            notRectifiedArr: [],
            rectificationRateArr: [],
          },
        },
      },
      //一般事故统计
      generalAccidentList: {
        nameArr: [],
        datas: {
          regionArr: [],
          values: {
            totalArr: [],
            deathArr: [],
            injuredArr: [],
            economicArr: [],
          },
        },
      },

      // 各区检查企业情况
      checkSituationList: {
        nameArr: [],
        datas: {
          regionArr: [],
          values: {
            totalArr: [],
            checkArr: [],
            timesArr: [],
          },
        },
      },

      // 执法文书统计
      enforcementDocumentsList: {
        nameArr: [],
        datas: {
          monthArr: [],
          values: {
            seventeentArr: [],
            eighteentArr: [],
            nintheenArr: [],
          },
        },
      },
      data: {
        body: {},
        page: 1,
        pageSize: 100,
        sortName: "sid",
        sortOrder: "desc",
      },
      // CheckInformationList
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    moment,
    init() {
      // this.getMajorHiddenList(listData.listData4);
      // this.getGeneralHiddenList();
      // this.getMajorAccidentList();
      // this.getGeneralAccidentList();
      // this.getCheckSituationList();
      // this.getEnforcementDocumentsList();
      this.getCheckInformationList();

      //获取重大隐患
      this.majorHazard();
      //获取一般隐患
      this.generalHazard();
      // 获取重大事故统计数据
      this.majorAccident();
      // 获取一般事故统计数据
      this.ordinaryAccident();

      // 获取各区检查企业情况
      this.situationEnterprise();
      // 获取执法文书统计
      this.enforcementDocument();
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      // 粉尘涉爆 重大隐患统计
      this.majorHiddenCharts = this.$echarts.init(
        document.getElementsByClassName("major-hidden-charts")[0]
      );
      this.majorHiddenCharts.setOption(this.majorHiddenBar());

      // 粉尘涉爆 重大事故统计
      this.majorAccidentCharts = this.$echarts.init(
        document.getElementsByClassName("major-accident-charts")[0]
      );
      this.majorAccidentCharts.setOption(this.majorAccidentBar());

      // 粉尘涉爆 一般隐患统计
      this.generalHiddenCharts = this.$echarts.init(
        document.getElementsByClassName("general-hidden-charts")[0]
      );
      this.generalHiddenCharts.setOption(this.generalHiddenBar());

      // 粉尘涉爆 一般事故统计
      this.generalAccidentCharts = this.$echarts.init(
        document.getElementsByClassName("general-accident-charts")[0]
      );
      this.generalAccidentCharts.setOption(this.generalAccidentBar());

      // 各区检查企业情况
      this.checkSituationChart = this.$echarts.init(
        document.getElementsByClassName("check-situation-chart")[0]
      );
      this.checkSituationChart.setOption(this.checkSituationBar());

      // 执法文书统计
      this.enforcementDocumentsChart = this.$echarts.init(
        document.getElementsByClassName("enforcement-documents-chart")[0]
      );
      this.enforcementDocumentsChart.setOption(this.checkSituationLine());

      let that = this;
      window.onresize = function () {
        that.majorHiddenCharts.resize();
        that.majorAccidentCharts.resize();
        that.generalHiddenCharts.resize();
        that.generalAccidentCharts.resize();
        that.checkSituationChart.resize();
        that.enforcementDocumentsChart.resize();
      };
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

    // echart数据处理
    formatDataList(arr, type, value, name, typeName) {
      let Arr = [];
      let tyoeArr = [];
      for (const key in type) {
        arr.map((item) => {
          if (item.type == key) {
            Arr.push({
              value: item[value] + "",
              name: name === "dimension" ? item[name] + "月" : item[name],
              typeName: item[typeName],
            });
          }
        });
        tyoeArr.push({ name: type[key], data: [] });
      }
      tyoeArr.map((val, index) => {
        Arr.map((val1) => {
          if (val.name === val1.typeName) {
            val.data.push(val1);
          }
        });
      });
      return tyoeArr;
    },

    // 获取重大隐患统计数据
    majorHazard() {
      getMajorHazard(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取重大隐患统计数据", res.body);
            this.majorHiddenCharts.setOption({
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
          }
        }
      });
    },

    // 获取一般隐患统计数据
    generalHazard() {
      getGeneralHazard(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取一般隐患统计数据", res.body);
            this.generalHiddenCharts.setOption({
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
          }
        }
      });
    },

    // 获取重大事故统计数据
    majorAccident() {
      getMajorAccident(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取重大事故统计数据", res.body);
            this.majorAccidentCharts.setOption({
              dataset: {
                dimensions: [
                  "areaName",
                  "total",
                  "deathNum",
                  "injuredNum",
                  "economicLoss",
                ],
                source: res.body.data,
              },
            });
          }
        }
      });
    },

    // 获取各区检查企业情况
    situationEnterprise() {
      getSituationEnterprise(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取各区检查企业情况11111111111111111", res.body);
            this.checkSituationChart.setOption({
              dataset: {
                dimensions: [
                  "areaName",
                  "total",
                  "inspectNum",
                  "inspectSecond",
                ],
                source: res.body.data,
              },
            });
            // this.checkSituationList = {
            //   datas: {
            //     regionArr: this.formatDataListNew(res.body.data, "areaName"),
            //     values: {
            //       totalArr: this.formatDataListNew(res.body.data, "total"),
            //       checkArr: this.formatDataListNew(res.body.data, "inspectNum"),
            //       timesArr: this.formatDataListNew(
            //         res.body.data,
            //         "inspectSecond"
            //       ),
            //     },
            //   },
            // };
          }
        }
      });
    },

    // 获取执法文书统计
    enforcementDocument() {
      getEnforcementDocument(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取执法文书统计", res.body);
            this.enforcementDocumentsChart.setOption({
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
          }
        }
      });
    },

    // 获取一般事故统计数据
    ordinaryAccident() {
      getOrdinaryAccident(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("一般事故统计数据", res.body);
            this.generalAccidentCharts.setOption({
              dataset: {
                dimensions: [
                  "areaName",
                  "total",
                  "deathNum",
                  "injuredNum",
                  "economicLoss",
                ],
                source: res.body.data,
              },
            });
          }
        }
      });
    },

    // 重大隐患统计的配置项
    majorHiddenBar() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle:{
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
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          // data: ["隐患总数", "已整改", "整改中", "逾期未整改", "整改率"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          // icon: "square", //正方形图例  square
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
            name: "总数（万个）",
            // min: 0,
            // max: 20,
            // interval: 5,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
          },
          {
            type: "value",
            name: "整改率",
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "right",
              fontSize: that.$setFontSize(16),
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
            color: "#00ffff",
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
            color: "#00c800",
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
            color: "#007aff",
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

    // 重大事故统计的配置项
    majorAccidentBar() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle:{
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
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          // data: ["事故起数", "死亡人数", "受伤人数", "经济损失"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          // icon: "square", //正方形图例  square
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
            name: "单位：件数/人数",
            // min: 0,
            // max: 25,
            // interval: 5,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
          },
          {
            type: "value",
            name: "单位：万元",
            min: 0,
            max: 8000,
            interval: 1000,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "right",
              fontSize: that.$setFontSize(16),
            },
          },
        ],
        series: [
          {
            name: "事故起数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#5096d6",
          },
          {
            name: "死亡人数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#f17623",
          },
          {
            name: "受伤人数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#a8a8a8",
          },
          {
            name: "经济损失",
            type: "line",
            color: "#ffc000",
          },
        ],
      };
      return option;
    },

    // 重大隐患统计的tab
    majorHiddenFn() {
      this.majorType = 1;
      this.$nextTick(() => {
        console.log(this.majorType);
        this.majorHiddenCharts.resize();
        /* this.majorAccidentCharts = this.$echarts.init(
            document.getElementsByClassName("major-accident-charts")[0]
          );
          this.majorAccidentCharts.setOption(this.majorAccidentBar()); */
      });
    },

    // 重大事故统计的tab
    majorAccidentFn() {
      console.log("重大事故统计的tab");
      this.majorType = 2;
      this.$nextTick(() => {
        console.log(this.majorType);
        this.majorAccidentCharts.resize();
        /* this.majorAccidentCharts = this.$echarts.init(
            document.getElementsByClassName("major-accident-charts")[0]
          );
          this.majorAccidentCharts.setOption(this.majorAccidentBar()); */
      });
    },

    // 一般隐患统计的配置项
    generalHiddenBar() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle:{
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
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          // data: ["隐患总数", "已整改", "整改中", "逾期未整改", "整改率"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          // icon: "square", //正方形图例  square
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
            name: "总数（个）",
            // min: 0,
            // max: 20,
            // interval: 5,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
          },
          {
            type: "value",
            name: "整改率",
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "right",
              fontSize: that.$setFontSize(16),
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

    // 一般事故统计的配置项
    generalAccidentBar() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle:{
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
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          // data: ["事故起数", "死亡人数", "受伤人数", "经济损失"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
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
            name: "单位：件数/人数",
            // min: 0,
            // max: 25,
            // interval: 5,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
          },
          {
            type: "value",
            name: "单位：万元",
            min: 0,
            max: 8000,
            interval: 1000,
            axisLabel: {
              formatter: "{value}",
              // 控制显示隐藏
              //   show:false,
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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "right",
              fontSize: that.$setFontSize(16),
            },
          },
        ],
        series: [
          {
            name: "事故起数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#5096d6",
          },
          {
            name: "死亡人数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#f17623",
          },
          {
            name: "受伤人数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                // barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#a8a8a8",
          },
          {
            name: "经济损失",
            type: "line",
            color: "#ffc000",
          },
        ],
      };
      return option;
    },

    // 一般隐患统计的tab
    generalHiddenFn() {
      this.generalType = 1;
      this.$nextTick(() => {
        console.log(this.generalType);
        this.generalHiddenCharts.resize();
        /* this.generalAccidentCharts = this.$echarts.init(
            document.getElementsByClassName("general-accident-charts")[0]
          );
          this.generalAccidentCharts.setOption(this.generalAccidentBar()); */
      });
    },

    // 一般事故统计的tab
    generalAccidentFn() {
      console.log("重大事故统计的tab");
      this.generalType = 2;
      this.$nextTick(() => {
        console.log(this.generalType);
        this.generalAccidentCharts.resize();
        /* this.generalAccidentCharts = this.$echarts.init(
            document.getElementsByClassName("general-accident-charts")[0]
          );
          this.generalAccidentCharts.setOption(this.generalAccidentBar()); */
      });
    },

    // 各区检查企业情况
    checkSituationBar() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle:{
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
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          // data: ["企业总数", "检查企业数", "检查次数"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
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
            name: "总数（个）",
            // min: 0,
            // max: 20,
            // interval: 5,
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
                width: 1,
                color: "rgb(43, 54, 82)",
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
            name: "企业总数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#007aff",
          },
          {
            name: "检查企业数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#00c800",
          },
          {
            name: "检查次数",
            type: "bar",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "#00ffff",
          },
        ],
      };
      return option;
    },

    // 执法文书统计
    checkSituationLine() {
      let that = this;
      let option = {
        legend: {
          data: [
            { name: "现场检查记录", icon: "circle" },
            { name: "责令整改通知书", icon: "circle" },
            { name: "整改复查意见书", icon: "circle" },
          ],
          // icon: "circle", //正方形图例
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
        },
        tooltip: {
          trigger: "axis",
          textStyle:{
            fontSize: that.$setFontSize(16),
          },
        },
        grid: {
          x: 60,
          y: 30,
          x2: 10,
          y2: 50,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          boundaryGap: false,
          type: "value",
          // min: 0,
          // max: 25000,
          // interval: 5000,
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
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
            symbolSize: that.$setFontSize(6), //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                color: "#007aff", //折点颜色
                lineStyle: {
                  color: "#007aff", //折线颜色
                },
              },
            },
          },
          {
            name: "责令整改通知书",
            symbolSize: that.$setFontSize(6), //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                color: "#e6395d", //折点颜色
                lineStyle: {
                  color: "#e6395d", //折线颜色
                },
              },
            },
          },
          {
            name: "整改复查意见书",
            symbolSize: that.$setFontSize(6), //设定实心点的大小
            symbol: "circle",
            type: "line",
            itemStyle: {
              normal: {
                color: "#00edf0", //折点颜色
                lineStyle: {
                  color: "#00edf0", //折线颜色
                },
              },
            },
          },
        ],
      };
      return option;
    },

    // 获取重大隐患统计
    getMajorHiddenList(obj) {
      console.log(obj);
      obj.map((item) => {
        this.majorHiddenList.nameArr.push(item.name);
        if (item.name == "隐患总数") {
          item.data.map((citem) => {
            this.majorHiddenList.datas.regionArr.push(citem.name);
            this.majorHiddenList.datas.values.totalArr.push(citem.value);
          });
        } else if (item.name == "隐患已整改") {
          item.data.map((citem) => {
            this.majorHiddenList.datas.values.rectifiedArr.push(citem.value);
          });
        } else if (item.name == "整改中") {
          item.data.map((citem) => {
            this.majorHiddenList.datas.values.rectifyingArr.push(citem.value);
          });
        } else if (item.name == "逾期未整改") {
          item.data.map((citem) => {
            this.majorHiddenList.datas.values.notRectifiedArr.push(citem.value);
          });
        } else if (item.name == "整改率") {
          item.data.map((citem) => {
            this.majorHiddenList.datas.values.rectificationRateArr.push(
              citem.value
            );
          });
        }
      });
      this.initChart();
    },

    // 获取一般隐患统计
    getGeneralHiddenList(obj) {
      obj.map((item) => {
        this.generalHiddenList.nameArr.push(item.name);
        if (item.name == "隐患总数") {
          item.data.map((citem) => {
            this.generalHiddenList.datas.regionArr.push(citem.name);
            this.generalHiddenList.datas.values.totalArr.push(citem.value);
          });
        } else if (item.name == "隐患已整改") {
          item.data.map((citem) => {
            this.generalHiddenList.datas.values.rectifiedArr.push(citem.value);
          });
        } else if (item.name == "整改中") {
          item.data.map((citem) => {
            this.generalHiddenList.datas.values.rectifyingArr.push(citem.value);
          });
        } else if (item.name == "逾期未整改") {
          item.data.map((citem) => {
            this.generalHiddenList.datas.values.notRectifiedArr.push(
              citem.value
            );
          });
        } else if (item.name == "整改率") {
          item.data.map((citem) => {
            this.generalHiddenList.datas.values.rectificationRateArr.push(
              citem.value
            );
          });
        }
      });
      this.initChart();
    },

    // 获取重大事故统计
    getMajorAccidentList(obj) {
      obj.map((item) => {
        this.majorAccidentList.nameArr.push(item.name);
        if (item.name == "事故总数") {
          item.data.map((citem) => {
            this.majorAccidentList.datas.regionArr.push(citem.name);
            this.majorAccidentList.datas.values.totalArr.push(citem.value);
          });
        } else if (item.name == "死亡人数") {
          item.data.map((citem) => {
            this.majorAccidentList.datas.values.deathArr.push(citem.value);
          });
        } else if (item.name == "受伤人数") {
          item.data.map((citem) => {
            this.majorAccidentList.datas.values.injuredArr.push(citem.value);
          });
        } else if (item.name == "经济损失") {
          item.data.map((citem) => {
            this.majorAccidentList.datas.values.economicArr.push(citem.value);
          });
        }
      });
      this.initChart();
    },

    // 获取一般事故统计
    getGeneralAccidentList(obj) {
      obj.map((item) => {
        this.generalAccidentList.nameArr.push(item.name);
        if (item.name == "事故总数") {
          item.data.map((citem) => {
            this.generalAccidentList.datas.regionArr.push(citem.name);
            this.generalAccidentList.datas.values.totalArr.push(citem.value);
          });
        } else if (item.name == "死亡人数") {
          item.data.map((citem) => {
            this.generalAccidentList.datas.values.deathArr.push(citem.value);
          });
        } else if (item.name == "受伤人数") {
          item.data.map((citem) => {
            this.generalAccidentList.datas.values.injuredArr.push(citem.value);
          });
        } else if (item.name == "经济损失") {
          item.data.map((citem) => {
            this.generalAccidentList.datas.values.economicArr.push(citem.value);
          });
        }
      });
      this.initChart();
    },

    // 各区检查企业情况
    getCheckSituationList(obj) {
      obj.map((item) => {
        this.checkSituationList.nameArr.push(item.name);
        if (item.name == "企业总数") {
          item.data.map((citem) => {
            this.checkSituationList.datas.regionArr.push(citem.name);
            this.checkSituationList.datas.values.totalArr.push(citem.value);
          });
        } else if (item.name == "检查企业数") {
          item.data.map((citem) => {
            this.checkSituationList.datas.values.checkArr.push(citem.value);
          });
        } else if (item.name == "检查次数") {
          item.data.map((citem) => {
            this.checkSituationList.datas.values.timesArr.push(citem.value);
          });
        }
      });
      this.initChart();
    },

    // 获取执法文书统计
    getEnforcementDocumentsList(obj) {
      console.log(1111, obj);
      obj.map((item) => {
        this.enforcementDocumentsList.nameArr.push(item.name);
        if (item.name == "现场检查记录") {
          item.data.map((citem) => {
            this.enforcementDocumentsList.datas.monthArr.push(citem.name);
            this.enforcementDocumentsList.datas.values.seventeentArr.push(
              citem.value
            );
          });
        } else if (item.name == "责令整改通知书") {
          item.data.map((citem) => {
            this.enforcementDocumentsList.datas.values.eighteentArr.push(
              citem.value
            );
          });
        } else if (item.name == "整改复查意见书") {
          item.data.map((citem) => {
            this.enforcementDocumentsList.datas.values.nintheenArr.push(
              citem.value
            );
          });
        }
      });
      this.initChart();
    },

    // 获取粉尘涉爆企业执法检查信息
    getCheckInformationList() {
      getCheckInformationApi().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.checkInformationList = res.body;
          }
          console.log(res, "获取粉尘涉爆企业执法检查信息");
        }
      });
    },
  },
  computed: {
    pushData() {
      return this.$store.getters.responeData;
    },
  },
  watch: {
    pushData: {
      handler(newVal, oldVal) {
        console.log("testssss", newVal);
        if (newVal.cmd) {
          let cmdCode = newVal.cmd;
          switch (cmdCode) {
            case "YQRdxqlA":
              this.getCheckInformationList();
              break;
            default:
              break;
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>