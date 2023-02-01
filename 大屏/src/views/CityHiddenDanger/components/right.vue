<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-07 21:17:19
-->
<template>
  <div class="city-hidden-danger-right">
    <div class="shine-model-title">企业事故风险情况</div>
    <div class="right-top">
      <div class="right-top-type">
        <p
          v-for="(item, index) in industryType"
          :key="item.key"
          @click="selectType(item, index)"
          :class="[industryTypeIndex == index ? 'btn-active-type' : '']"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="risk-condition">
        <div class="accident-ranked btn-active-type">
          <div class="condition-title">事故总数各等级分布</div>
          <div
            class="ranked-content"
            :class="[industryTypeIndex == 0 ? 'cursor-five' : '']"
          >
            <div
              v-for="(item, index) in typeDatasList"
              :key="index"
              @click="rankedBtn(item)"
            >
              <i>{{ item.count }}</i
              ><span>{{ item.accidentLevel }}</span>
            </div>
          </div>
        </div>
        <div class="accident-analyse btn-active-type">
          <div class="condition-title">行业事故统计</div>
          <!-- <div class="analyse-title">
            <div v-for="(item,index) in analyseArr" :key='index'
              :class="[analyseIndex==index? 'risk-showBtn-active':'']" @click="anlyseBtn(item,index)">{{item.name}}
            </div>
          </div> -->
          <div class="analyse-chart" v-show="analyseIndex == 0"></div>
        </div>
        <div class="enterprise-distribution btn-active-type">
          <div class="condition-title">区域事故统计</div>
          <div class="enterprise-chart"></div>
        </div>
      </div>
    </div>
    <div class="right-bottom">
      <div class="show-type">
        <p
          v-for="(item, index) in showType"
          :key="index"
          :class="[showTypeIndex == index ? 'showBtn-active' : '']"
          @click="showTypeBtn(item, index)"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="show-total" v-show="showTypeIndex == 0"></div>
      <div class="show-total" v-show="showTypeIndex == 1"></div>
    </div>
    <pop-up-layer
      v-if="tableShow"
      :show="tableShow"
      :setStyles="{ left: '88.4%', top: '50%' }"
      @doClose="tableClose"
      ref="myPopUpLayer"
      opsition="btnRight"
      class="rightTable"
      :title="' 事故报告列表'"
    >
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input
                class="c-input"
                placeholder="输入关键字"
                type="text"
                v-model="accidentName"
              />
              <img
                src="../../../assets/images/emergencyOverview/icon_search.png"
                alt=""
                @click="accidentSearch"
              />
            </div>
          </div>
          <div class="tables">
            <clist
              :columns="tableHeaderList"
              :listData="tabelListData"
              @tableTdClick="tableTdClick"
            >
              <template slot="number" slot-scope="{ record, text, index }">
                {{ index + 1 }}
              </template>
            </clist>
          </div>

          <div class="list-change-page">
            <ChangePage
              :total="pagination.total"
              :currentPage="pagination.current"
              @changePages="pagesChange"
            />
          </div>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import ChangePage from "@/components/APicture/changePage";

import {
  AllEnterpriseAccident,
  OtherEnterpriseAccident,
  getOccupationChart,
  getAllaccidentChart,
  getAllAreaChart,
  getOtherAreaChart,
  getEightTotal,
  getFourTotal,
  commonApi,
} from "../../../api/cityHiddenDanger/index";
import Clist from "@/components/APicture/c-table";
import listData from "../utils/Datas";
export default {
  components: {
    Clist,
    ChangePage,
  },
  data() {
    return {
      listData,
      // 行业类型
      industryType: [
        {
          name: "全部",
          key: 1,
        },
        {
          name: "冶金",
          key: 2,
        },
        {
          name: "有色",
          key: 3,
        },
        {
          name: "建材",
          key: 4,
        },
        {
          name: "机械",
          key: 5,
        },
        {
          name: "轻工",
          key: 6,
        },
        {
          name: "纺织",
          key: 7,
        },
        {
          name: "烟草",
          key: 8,
        },
        {
          name: "商贸",
          key: 9,
        },
      ],
      industryTypeIndex: "0",
      // 展示类型
      showType: [
        {
          name: "八大行业统计展现总数",
          key: 1,
        },
        {
          name: "四个专项统计展现总数",
          key: 2,
        },
      ],
      showTypeIndex: "0",
      accidentTotal: [
        {
          name: "一般事故",
          accidentNum: "2175",
          key: 1,
        },
        {
          name: "较大事故",
          accidentNum: "445",
          key: 2,
        },
        {
          name: "重大事故",
          accidentNum: "12",
          key: 3,
        },
        {
          name: "特大事故",
          accidentNum: "5",
          key: 4,
        },
      ],
      // 展示类型
      analyseArr: [
        {
          name: "按行业事故统计",
          key: 1,
        },
        {
          name: "按区域统计",
          key: 2,
        },
      ],
      analyseIndex: "0",
      typeDatasList: undefined,
      fourDiv: null,
      analyseAccidentDivTwo: null,
      analyseAccidentDivOne: null,
      tableShow: false,
      // 弹框表格数据
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "number", width: "15%" },
        {
          title: "事故标题",
          index: 2,
          textIndex: "accidentTitle",
          width: "40%",
        },
        {
          title: "事故等级",
          index: 3,
          textIndex: "accidentLevel",
          width: "15%",
        },
        {
          title: "事故类型",
          index: 4,
          textIndex: "accidentType",
          width: "15%",
        },
        { title: "发生时间", index: 5, textIndex: "happenTime", width: "15%" },
      ],
      tabelListData: [
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
        {
          accidentTitle:
            "广州市白云区樟树市永盛汽车运输服务有限公司“12.30”一般道路运输事故",
          accidentLevel: "1",
          accidentType: "道路运输",
          time: "2020-12-30 00:00:00",
        },
      ],
      // 八大行业
      totalDiv: null,
      // 弹窗搜索名称
      accidentName: undefined,
      pagination: {
        total: undefined,
        current: 1,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.EightOccupation();
      this.EnterpriseAccident();
      this.$nextTick(() => {
        this.initChart();
      });
    },
    //echart 数据处理
    formatDataList(arr, values = "name", otherpush = 0) {
      let returnList = arr.map((item, key) => {
        return item[values];
      });
      return returnList;
    },
    // echart初始化
    initChart() {
      this.totalDiv = this.$echarts.init(
        document.getElementsByClassName("show-total")[0]
      );
      this.fourDiv = this.$echarts.init(
        document.getElementsByClassName("show-total")[1]
      );
      this.totalDiv.setOption(this.totalStatisticsOption());
      this.changeAnalyseChart();
      this.AllAccidentChart();
      this.AllAreaAccidentChart();
      let that = this;
      window.onresize = function () {
        that.totalDiv.resize();
        that.fourDiv.resize();
      };
    },

    changeAnalyseChart() {
      this.analyseAccidentDivOne = this.$echarts.init(
        document.getElementsByClassName("analyse-chart")[0]
      );
      this.analyseAccidentDivTwo = this.$echarts.init(
        document.getElementsByClassName("enterprise-chart")[0]
      );
      window.onresize = function () {
        this.analyseAccidentDivOne.resize();
        this.analyseAccidentDivTwo.resize();
      };
    },

    //类别切换
    selectType(item, index) {
      this.industryTypeIndex = index;
      this.analyseIndex = 0;
      if (index != 0) {
        this.getOtherEnterpriseAccident("冶金");
        this.OccupationChart("冶金");
        this.OtherArearAccident("冶金");
      } else {
        this.EnterpriseAccident();
        this.AllAccidentChart();
        this.AllAreaAccidentChart();
      }
      this.analyseAccidentDivOne.resize();
      this.analyseAccidentDivTwo.resize();

      // this.analyseAccidentDivOne.setOption(this.analyseAccidentOption())
    },

    // 获取按行业事故统计
    OccupationChart(item) {
      let data = {
        body: {
          industryName: item,
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getOccupationChart(data).then((res) => {
        if (res.success) {
          let arr = [];
          arr = res.body.data.map((e) => {
            (e.name = e.industryTwoName), (e.value = e.count);
            return e;
          });
          this.analyseAccidentDivOne.setOption(this.analyseAccidentOption(arr));
        }
      });
    },

    //获取按全部事故统计
    AllAccidentChart() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getAllaccidentChart(data).then((res) => {
        if (res.success) {
          let arr = [];
          arr = res.body.data.map((e) => {
            (e.name = e.industryTwoName), (e.value = e.count);
            return e;
          });
          console.log(arr, "全部");

          this.analyseAccidentDivOne.setOption(this.analyseAccidentOption(arr));
        }
      });
    },

    //全部-获取按区域事故统计
    AllAreaAccidentChart() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getAllAreaChart(data).then((res) => {
        if (res.success) {
          let arr = [];
          arr = res.body.data.map((e) => {
            (e.name = e.areaName), (e.value = e.count);
            return e;
          });
          this.analyseAccidentDivTwo.setOption(this.analyseAreaOption(arr));
        }
      });
    },

    //切换-获取按区域事故统计
    OtherArearAccident(item) {
      let data = {
        body: {
          industryName: item,
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getOtherAreaChart(data).then((res) => {
        if (res.success) {
          let arr = [];
          arr = res.body.data.map((e) => {
            (e.name = e.areaName), (e.value = e.count);
            return e;
          });
          this.analyseAccidentDivTwo.setOption(this.analyseAreaOption(arr));
        }
      });
    },

    //八大行业统计展现
    EightOccupation() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEightTotal(data).then((res) => {
        if (res.success) {
          let obj = {
            areaName: this.formatDataList(res.body.data, "areaName"),
            allCount: this.formatDataList(res.body.data, "allCount"),
            alteredCount: this.formatDataList(res.body.data, "alteredCount"),
            alteringCount: this.formatDataList(res.body.data, "alteringCount"),
            noAlterCount: this.formatDataList(res.body.data, "noAlterCount"),
            alterRate: this.formatDataList(res.body.data, "alterRate"),
          };

          //this.totalDiv.setOption(this.totalStatisticsOption(obj))
          this.totalDiv.setOption({
            dataset: {
              dimensions: [
                "areaName",
                "allCount",
                "alteredCount",
                "alteringCount",
                "noAlterCount",
                "alterRate",
              ],
              source: res.body.data,
            },
          });
        }
      });
    },

    //四个专项统计展现总数
    FourTotalChart() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getFourTotal(data).then((res) => {
        if (res.success) {
          let obj = {
            alterRate: this.formatDataList(res.body.data, "alterRate"),
            noAlterCount: this.formatDataList(res.body.data, "noAlterCount"),
            name: this.formatDataList(res.body.data, "name"),
            alteringCount: this.formatDataList(res.body.data, "alteringCount"),
            allCount: this.formatDataList(res.body.data, "allCount"),
            alteredCount: this.formatDataList(res.body.data, "alteredCount"),
          };
          this.fourDiv.setOption(this.fourDataOption(obj));
        }
      });
    },

    // 八大行业与四个专项切换
    showTypeBtn(item, index) {
      this.showTypeIndex = index;
      if ((index = 1)) {
        this.FourTotalChart();
      } else {
        this.EightOccupation();
      }
      this.$nextTick(() => {
        this.fourDiv.resize();
        this.totalDiv.resize();
      });
    },
    // anlyseBtn(item, index) {
    //   this.analyseIndex = index
    //   this.changeAnalyseChart()
    //   this.$nextTick(() => {
    //     this.analyseAccidentDivTwo.resize();
    //   })
    // },

    // 事故等级分布 - 弹框展示
    rankedBtn(item) {
      if (this.industryTypeIndex != 0) return;

      // this.tabelListData = listData.tabale1
      this.getToSurvey();
      this.tableShow = true;
    },

    //获取事故调查弹窗列表
    getToSurvey() {
      let code = "nghCasjJ";
      let data = {
        body: {
          accidentTitle: this.accidentName,
        },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          if (res.body) {
            this.tabelListData = res.body.data;
            this.pagination.total = +res.total;
          }
        }
      });
    },

    // 处罚搜索
    accidentSearch() {
      this.pagination.current = 1;
      this.getToSurvey();
    },
    pagesChange(pages, pageSize) {
      this.pagination.current = +pages.pages;
      this.getToSurvey();
    },

    // 弹框关闭
    tableClose() {
      this.accidentName = undefined;
      this.tableShow = false;
    },

    // 点击弹框表格项
    tableTdClick(obj) {},

    // 企业事故风险情况-全部
    EnterpriseAccident() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      AllEnterpriseAccident(data).then((res) => {
        if (res.success) {
          this.typeDatasList = JSON.parse(JSON.stringify(res.body.data));
        }
      });
    },

    //企业风险情况-切换
    getOtherEnterpriseAccident(item) {
      let data = {
        body: {
          industryName: item,
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      OtherEnterpriseAccident(data).then((res) => {
        if (res.success) {
          this.typeDatasList = JSON.parse(JSON.stringify(res.body.data));
          console.log(this.typeDatasList);
        }
      });
    },

    //八大行业统计
    totalStatisticsOption(obj = null) {
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
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        legend: {
          data: ["隐患总数", "已整改", "整改中", "逾期未整改"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          itemWidth: that.$setFontSize(14),
          itemHeight: that.$setFontSize(14),
          itemGap: that.$setFontSize(24),
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
            name: "总数（个）",
            offset: -20,
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
        ],
      };
      return option;
    },
    //四大项图表
    fourDataOption(obj = null) {
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
          left: "0",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          data: ["隐患总数", "已整改", "整改中", "逾期未整改", "整改率"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          itemWidth: that.$setFontSize(14),
          itemHeight: that.$setFontSize(14),
          itemGap: that.$setFontSize(24),
        },
        xAxis: [
          {
            type: "category",
            data: obj.name,
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
            name: "总数（个）",

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
            name: "整改率",

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
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
          },
        ],
        series: [
          {
            name: "隐患总数",
            type: "bar",
            data: obj.allCount,
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
            data: obj.alteredCount,
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
            data: obj.alteringCount,
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
            data: obj.noAlterCount,
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
            data: obj.alterRate,
            color: "rgb(255,64,71)",
            symbol: "circle",
            symbolSize: 8,
          },
        ],
      };
      return option;
    },
    //行业事故统计
    analyseAccidentOption(arr) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemGap: that.$setFontSize(20),
          left: "center",
          bottom: "bottom",
        },
        color: [
          "rgb(255,219,76)",
          "rgb(11,195,255)",
          "rgb(171,154,255)",
          "rgb(79,255,128)",
          "rgb(78,161,255)",
        ],
        series: [
          {
            type: "pie",
            radius: ["30%", "60%"],
            itemStyle: {
              borderColor: "rgb(9,27,64)",
              borderWidth: 2,
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: that.$setFontSize(16),
                  color: "#FFFFFF",
                },
                formatter: "{b} : {d}%",
              },
            },
            startAngle: 140,
            data: arr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      return option;
    },
    //区域事统计
    analyseAreaOption(arr = null) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          // show: false,
          orient: "vertical",
          left: "left",
          top: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(12),
          },
        },
        series: [
          {
            name: "按区域统计",
            type: "pie",
            radius: ["40%", "70%"],
            label: {
              show: false,
            },
            data: arr,
          },
          {
            name: "内边框",
            type: "pie",
            clockWise: false,
            radius: ["34%", "34%"], //边框大小
            center: ["50%", "50%"], //边框位置
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  normal: {
                    borderWidth: 2, //设置边框粗细
                    borderColor: "rgb(92,101,125)", //边框颜色
                  },
                },
              },
            ],
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