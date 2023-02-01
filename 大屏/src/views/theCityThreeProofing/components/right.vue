<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-29 10:32:07
-->
<template>
  <div class="three-proofing-right">
    <div class="right-left">
      <div class="model-title title-position">三防应急指挥</div>
      <div class="command-authority">
        <p class="command-authority-title">指挥机构</p>
        <ul>
          <li
            class="mouse-hover"
            @click="
              popType = 1;
              riskTitle = '指挥机构';
            "
          >
            <span>市</span><span>市级指挥机构</span><span></span>
          </li>
          <li
            class="mouse-hover"
            @click="
              popType = 1;
              riskTitle = '指挥机构';
            "
          >
            <span>区</span><span>区级指挥机构</span><span></span>
          </li>
          <li
            class="mouse-hover"
            @click="
              popType = 1;
              riskTitle = '指挥机构';
            "
          >
            <span>镇</span><span>镇街指挥机构</span><span></span>
          </li>
        </ul>
      </div>
      <div class="command-authority">
        <p class="command-authority-title duty-officer">三防责任人台账</p>
        <ul>
          <li
            class="mouse-hover"
            @click="
              popType = 2;
              riskTitle = '防汛责任人';
            "
          >
            <span>责</span><span>防汛责任人</span><span></span>
          </li>
          <li
            class="mouse-hover"
            @click="
              popType = 3;
              riskTitle = '危险区域人群';
            "
          >
            <span>责</span><span>危险区域人群</span><span></span>
          </li>
          <li
            class="mouse-hover"
            @click="
              popType = 4;
              riskTitle = '广州市水务设施“三个责任人”台账清单';
            "
          >
            <span>责</span><span>三本台账</span><span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-right">
      <div class="model-title title-position">三防主要风险隐患</div>
      <div class="update-time">更新:2020年02月11日09:13</div>
      <div class="main-risk">
        主要风险隐患处<span>{{ riskNum }}</span
        >处
      </div>
      <div class="main-risk-content">
        <div class="main-risk-tab">
          <p
            v-for="(item, index) in riskTab"
            :key="item.key"
            :class="[riskTabIndex == index ? 'btn-active-type' : '']"
            @click="riskBtn(item, index)"
          >
            <span>{{ item.name }}</span
            ><span>{{ item.num }}</span>
          </p>
        </div>
        <div class="mian-risk-title">
          <div class="risk-small-tab">
            <div
              v-for="(item, index) in tabBtn"
              :key="index"
              :class="[tabBtnIndex == index ? 'chose-btn-active' : '']"
              @click="tabBtnClick(item, index)"
              v-show="riskTabIndex != 2"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="center-left-search"
            v-show="tabBtnIndex != 0 || riskTabIndex == 2"
          >
            <input
              class="c-input"
              placeholder="输入关键字"
              type="text"
              v-model="listKey"
            />
            <img
              src="../../../assets/images/emergencyOverview/icon_search.png"
              alt=""
              @click="searchList"
            />
          </div>
        </div>
        <div class="content-div">
          <div
            class="ponding-chart"
            v-show="riskTabIndex == 0 && tabBtnIndex == 0"
          ></div>
          <div
            class="geology-chart"
            v-show="riskTabIndex == 1 && tabBtnIndex == 0"
          ></div>
          <div
            class="content-list"
            v-show="tabBtnIndex == 1 || riskTabIndex == 2"
          >
            <clist
              v-show="riskTabIndex == 0 && tabBtnIndex == 1"
              :columns="pondingHeaderList"
              :listData="tabelListData"
              @tableTdClick="tableTdClick"
            >
              <template slot="index" slot-scope="{ record, text, index }">{{
                index + 1
              }}</template>
              <template
                slot="administrationPhone"
                slot-scope="{ record, text, index }"
              >
                {{ record.administrationName }}{{ text ? "--" + text : "" }}
                <div class="wrap-center">
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="riskPointsMobilePhone(record, $event, text)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="riskPointsMessage(record, $event, text)"
                    v-show="text"
                  />
                </div>
              </template>
              <template
                slot="technologyPhone"
                slot-scope="{ record, text, index }"
              >
                {{ record.technologyName }}-{{ text ? "-" + text : "" }}
                <div class="wrap-center">
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="riskPointsOneMobilePhone(record, $event, text)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="riskPointsOneMessage(record, $event, text)"
                    v-show="text"
                  />
                </div>
              </template>
              <template slot="patrolPhone" slot-scope="{ record, text, index }">
                {{ record.patrolName }}{{ text ? "--" + text : "" }}
                <div class="wrap-center">
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="riskPointsTwoMobilePhone(record, $event, text)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="riskPointsTwoMessage(record, $event, text)"
                    v-show="text"
                  />
                </div>
              </template>
            </clist>
            <clist
              v-show="riskTabIndex == 1 && tabBtnIndex == 1"
              :columns="geologyHeaderList"
              :listData="tabelListData"
              @tableTdClick="tableTdClick"
            >
              <template slot="index" slot-scope="{ record, text, index }">{{
                index + 1
              }}</template>

              <template slot="position" slot-scope="{ record, text, index }">
                <span class="location" @click="emergencyTeamLocation(record)"
                  >定位</span
                ></template
              >

              <template slot="responsible" slot-scope="{ record, text, index }">
                {{ text }}
                <div class="wrap-center">
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="hiddenDangerMobilePhone(record, $event, text)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="hiddenDangerMessage(record, $event, text)"
                    v-show="text"
                  />
                </div>
              </template>
            </clist>
            <clist
              v-show="riskTabIndex == 2"
              :columns="tableHeaderList"
              :listData="tabelListData"
              @tableTdClick="tableTdClick"
            >
            </clist>
          </div>
        </div>
      </div>
    </div>
    <right-pop
      :popType="popType"
      @clickClose="popType = 0"
      :riskTitle="riskTitle"
    ></right-pop>
  </div>
</template>

<script>
import ChangePage from "@/components/APicture/changePage";
import Clist from "@/components/APicture/c-table";

import RightPop from "@/views/theCityThreeProofing/components/RightPop";
import {
  getHiddenDangerTotal,
  getPondingDatas,
  getGeologyDatas,
  getPondingListDatas,
  getGeologyListDatas,
  getProjectListDatas,
} from "../../../api/theCityThreeProofing/index.js";
export default {
  components: {
    Clist,
    RightPop,
    ChangePage,
  },
  data() {
    return {
      // 水利工程隐患
      hydraulic: {
        total: 0,
        currentPage: 1,
      },
      // 地质灾害隐患
      hiddenDanger: {
        total: 0,
        currentPage: 1,
      },
      // 积水内涝风险点
      riskPoints: {
        total: 0,
        currentPage: 1,
      },
      // 主要风险隐患处
      riskNum: 428,
      riskTab: [
        { name: "积水内涝风险点", num: "36", key: 0 },
        { name: "地质灾害隐患", num: "377", key: 1 },
        { name: "水利工程隐患", num: "14", key: 2 },
      ],
      riskTabIndex: "0",
      // 积水echart
      pondingDiv: null,
      popType: 0, // 弹窗类型
      riskTitle: "", //弹窗标题
      tabBtn: [
        { key: "0", name: "图表" },
        { key: "1", name: "列表" },
      ],
      tabBtnIndex: "0",
      // 地质echart
      geologyDiv: null,
      pondingHeaderList: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "属地", index: 1, textIndex: "territory", width: "10%" },
        {
          title: "积水、内涝点名称",
          index: 2,
          textIndex: "name",
          width: "15%",
        },
        { title: "积水、内涝等级", index: 3, textIndex: "level", width: "10%" },
        {
          title: "责任单位",
          index: 4,
          textIndex: "responsibleUnit",
          width: "15%",
        },
        {
          title: "行政责任人及联系电话",
          index: 5,
          textIndex: "administrationPhone",
          width: "20%",
        },
        {
          title: "技术责任人及联系电话",
          index: 6,
          textIndex: "technologyPhone",
          width: "20%",
        },
        {
          title: "日常管养责任人及联系电话",
          index: 7,
          textIndex: "patrolPhone",
          width: "20%",
        },
        {
          title: "治理进展情况",
          index: 8,
          textIndex: "governanceProgress",
          width: "20%",
        },
      ],
      geologyHeaderList: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "隐患点名称", index: 1, textIndex: "name", width: "10%" },
        {
          title: "风险源隐患点面临主要灾害类型",
          index: 2,
          textIndex: "type",
          width: "15%",
        },
        {
          title: "管理单位",
          index: 3,
          textIndex: "managementUnit",
          width: "25%",
        },
        { title: "负责人", index: 4, textIndex: "responsible", width: "30%" },
        { title: "定位", index: 5, textIndex: "position", width: "10%" },
      ],
      tableHeaderList: [
        { title: "类型", index: 0, textIndex: "typeName", width: "15%" },
        { title: "全市总量", index: 1, textIndex: "total", width: "20%" },
        { title: "隐患数量", index: 2, textIndex: "hiddenNum", width: "15%" },
        {
          title: "隐患说明",
          index: 3,
          textIndex: "hiddenExplain",
          width: "50%",
        },
      ],
      tabelListData: [],
      listKey: undefined,
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
      // 获取隐患总数
      this.hiddenDangerTotal();
    },
    initChart() {
      this.pondingDiv = this.$echarts.init(
        document.getElementsByClassName("ponding-chart")[0]
      );
      this.pondingDiv.setOption(this.pondingChartOption());
      this.PodingEchart();
      this.geologyDiv = this.$echarts.init(
        document.getElementsByClassName("geology-chart")[0]
      );
      this.geologyDiv.setOption(this.geologyChartOption());
      let that = this;
      window.onresize = function () {
        that.geologyDiv.resize();
        that.pondingDiv.resize();
      };
    },

    // 积水内涝分页器
    clickRiskPointsPlanChangePages(pages, pageSize) {
      this.riskPoints.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.PondingList();
    },
    // 地质灾害隐患的分页器
    clickHiddenDangerPlanChangePages(pages, pageSize) {
      this.hiddenDanger.currentPage = parseInt(pages.pages);
      this.defaultParams.page = pages.pages;
      this.geologyList();
    },

    // 水利工程隐患的分页器
    clickHydraulicPlanChangePages(pages, pageSize) {
      this.hydraulic.currentPage = parseInt(pages.pages);
      this.defaultParams.page = pages.pages;
      // this.geologyList();
      this.ProjectListDatas();
    },
    // 地质隐患
    hiddenDangerMobilePhone(item, e, text) {
      let { responsible } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: responsible.split("1")[0],
        phone: responsible.substring(responsible.length - 11),
      });
    },

    hiddenDangerMessage(item, e, text) {
      let { responsible } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: responsible.split("1")[0],
        phone: responsible.substring(responsible.length - 11),
      });
    },

    // 积水内涝
    riskPointsTwoMobilePhone(item, e, text) {
      let { patrolName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: text,
      });
    },
    riskPointsTwoMessage(item, e, text) {
      let { patrolName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: text,
      });
    },
    riskPointsOneMobilePhone(item, e, text) {
      let { technologyName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: text,
      });
    },
    riskPointsOneMessage(item, e, text) {
      let { technologyName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: text,
      });
    },
    riskPointsMobilePhone(item, e, text) {
      let { administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: text,
      });
    },
    riskPointsMessage(item, e, text) {
      let { administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: text,
      });
    },

    // tab切换按钮
    riskBtn(item, index) {
      this.riskTabIndex = index;
      this.tabBtnIndex = 0;

      if (this.riskTabIndex == 0 && this.tabBtnIndex == 0) {
        this.pondingDiv.resize();
      } else if (this.riskTabIndex == 1 && this.tabBtnIndex == 0) {
        this.geologyEchart();
        this.geologyDiv.resize();
      } else if (this.riskTabIndex == 2) {
        this.listKey = "";
        this.ProjectListDatas();
      }
    },
    //图表，列表切换
    tabBtnClick(item, index) {
      this.tabBtnIndex = index;
      this.listKey = "";
      if (this.riskTabIndex == 0 && this.tabBtnIndex == 1) {
        this.PondingList();
        this.pondingDiv.resize();
      } else if (this.riskTabIndex == 1 && this.tabBtnIndex == 1) {
        this.geologyList();
      }
    },
    //获取隐患总数
    hiddenDangerTotal() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getHiddenDangerTotal(data).then((res) => {
        if (res.success) {
          let obj = res.body.data[0];
          this.riskNum =
            parseFloat(obj.hazard) +
            parseFloat(obj.waterlogging) +
            parseFloat(obj.project);
          this.riskTab[0].num = obj.waterlogging;
          this.riskTab[1].num = obj.hazard;
          this.riskTab[2].num = obj.project;
        }
      });
    },

    //获取积水echart数据
    PodingEchart() {
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getPondingDatas(data).then((res) => {
        if (res.success) {
          this.pondingDiv.setOption({
            dataset: {
              dimensions: ["areaName", "total", "noComplete"],
              source: res.body.data,
            },
          });
        }
      });
    },
    PondingList() {
      let data = {
        body: {
          name: this.listKey,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getPondingListDatas(data).then((res) => {
        if (res.success) {
          console.log(res, "11111111111111");

          if (res.body.data.length > 0 && res.body.data != null) {
            this.tabelListData = res.body.data;
          } else {
            this.tabelListData = [];
          }
        }
      });
    },
    //获取地质灾害echart
    geologyEchart() {
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getGeologyDatas(data).then((res) => {
        if (res.success) {
          this.geologyDiv.setOption({
            dataset: {
              dimensions: ["areaName", "geologicHazard", "largeHidden"],
              source: res.body.data,
            },
          });
        }
      });
    },
    //获取地质灾害echart
    geologyList() {
      let data = {
        body: {
          name: this.listKey,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getGeologyListDatas(data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            this.tabelListData = res.body.data;
          } else {
            this.tabelListData = [];
          }
        }
      });
    },
    ProjectListDatas() {
      let data = {
        body: {
          name: this.listKey,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getProjectListDatas(data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            this.tabelListData = res.body.data;
            console.log(this.tabelListData);
          }
        }
      });
    },

    // 搜索数据
    searchList() {
      if (this.riskTabIndex == 0) {
        this.PondingList();
      } else if (this.riskTabIndex == 1) {
        this.geologyList();
      } else if (this.riskTabIndex == 2) {
        this.ProjectListDatas();
      }
    },

    tableTdClick() {},

    // 积水内涝风险点
    pondingChartOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          textStyle: {
            fontSize: that.$setFontSize(20),
          },
        },
        legend: {
          show: true,
          orient: "horizontal",
          left: "right",
          top: "1%",
          itemWidth: that.$setFontSize(18),
          itemHeight: that.$setFontSize(18),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(18),
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "4%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(24),
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          name: "总数(个)",
          nameTextStyle: {
            fontSize: that.$setFontSize(18),
            padding: [0, 0, 15, 20],
            color: "#fff",
          },
          type: "value",
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(18),
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "内涝黑点",
            type: "bar",
          },
          {
            name: "正施工整治点",
            type: "bar",
            color: "rgb(1,255,255)",
          },
        ],
      };
      return option;
    },

    // 地质灾害
    geologyChartOption() {
      let that = this;
      let option = {
        legend: {
          itemWidth: that.$setFontSize(18),
          itemHeight: that.$setFontSize(18),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(18),
          },
          left: "right",
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "4%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(24),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(18),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "地质灾害隐患点数量",
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: that.$setFontSize(18),
                  },
                },
              },
            },

            color: "rgb(91,155,213)",
          },
          {
            name: "大型隐患点",
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 12,
                  },
                },
              },
            },
            color: "rgb(192,0,0)",
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

.right-left {
  position: relative;

  .command-authority {
    .command-authority-title {
      font-size: 20vh * @h;
    }

    .duty-officer {
      margin-top: 64vh * @h;
    }

    ul li {
      display: flex;
      align-items: center;
      margin-top: 30vh * @h;
      font-size: 16vh * @h;
      height: 50vh * @h;
      padding: 0 13vw * @w;

      > span:nth-child(1) {
        border-radius: 50%;
        padding: 7vh * @h;
        margin-right: 28vw * @w;
        font-size: 12vh * @h;
      }

      > span:nth-child(2) {
        flex: 1;
      }

      > span:nth-child(3) {
        height: 17vh * @h;
        width: 17vh * @h;
        margin-right: 20vw * @w;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(45deg);
      }

      &:nth-child(1) {
        border: 1px solid #007aff;
        box-shadow: 0 0 40vw * @w #007aff inset;

        > span:nth-child(1) {
          border: 1px solid #007aff;
          box-shadow: 0 0 20vw * @w #007aff inset;
        }
      }

      &:nth-child(2) {
        border: 1px solid #00d7e9;
        box-shadow: 0 0 40vw * @w #00d7e9 inset;

        > span:nth-child(1) {
          border: 1px solid #00d7e9;
          box-shadow: 0 0 20vw * @w #00d7e9 inset;
        }
      }

      &:nth-child(3) {
        border: 1px solid #00c901;
        box-shadow: 0 0 40vw * @w #00c901 inset;

        > span:nth-child(1) {
          border: 1px solid #00c901;
          box-shadow: 0 0 20vw * @w #00c901 inset;
        }
      }
    }
  }
}

.right-right {
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  .update-time {
    position: absolute;
    top: 33vh * @h;
    right: 26vw * @w;
    font-size: 12vh * @h;
  }

  .main-risk {
    width: 100%;
    height: 68vh * @h;
    border: 1vh * @h solid rgb(225, 57, 92);
    background-color: rgb(31, 31, 69);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14vh * @h;
    margin-bottom: 49vh * @h;

    span {
      padding: 0 14vw * @w;
      color: rgb(225, 57, 92);
      font-size: 20vh * @h;
      font-weight: blod;
    }
  }

  .main-risk-content {
    width: 100%;
    height: 565vh * @h;

    .mian-risk-title {
      width: 100%;
      height: 50vh * @h;
      display: flex;
      justify-content: space-between;

      .risk-small-tab {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;

        div {
          width: auto;
          height: auto;
          font-size: 14vh * @h;
          padding: 6vh * @h 12vw * @w;
          border: 1vh * @h solid rgb(0, 102, 204);
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 10vw * @w;
          .box-sizing();
        }

        .chose-btn-active {
          background-color: rgb(0, 102, 204);
          width: auto;
          height: auto;
          font-size: 14vh * @h;
          cursor: pointer;
          display: flex;
          align-items: center;
          .box-sizing();
          border: 1vh * @h solid rgb(0, 102, 204);
        }
      }

      .center-left-search {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .c-input {
          width: 266vw * @w;
          height: 36vh * @h;
          border: 1px rgb(1, 210, 233) solid;
          background-color: rgb(20, 38, 78);

          font-size: 16vh * @h;
          display: flex;
          align-items: center;
          padding-left: 10vw * @w;
          .box-sizing();
        }

        img {
          display: block;
          width: 23vh * @h;
          height: 23vh * @h;
          position: absolute;
          right: 1%;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
    }

    .main-risk-tab {
      height: 44vh * @h;
      width: 100%;
      display: flex;
      justify-content: flex-start;

      p {
        width: auto;
        height: 100%;
        border: 1vh * @h solid rgb(1, 255, 255);
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 20vw * @w;
        margin-right: 10vw * @w;
        justify-content: center;

        span {
          font-size: 14vh * @h;
        }

        span:last-child {
          padding-left: 10vw * @w;
          font-weight: blod;
          font-size: 14vh * @h;
        }
      }
    }

    .content-div {
      width: calc(1122vw * @w - 100vw * @w);
      height: calc(565vh * @h - 50vh * @h - 44vh * @h);

      .content-list {
        width: 100%;
        height: 100%;

        /deep/.c-tables {
          height: 100%;
          overflow: hidden;

          .list-body {
            background-color: transparent;

            .location {
              padding: 6vh * @h 10vw * @w;
              display: inline-block;
              border: 1vh * @h solid rgb(1, 255, 255);
              cursor: pointer;
            }
          }
        }
        .wrap-center {
          display: block;
        }

        /deep/.list-body li div {
          flex-direction: column;
        }

        .icon {
          color: #00ccff;
          margin-right: 6vh * @h;
        }
      }
    }

    .ponding-chart,
    .geology-chart {
      width: calc(1122vw * @w - 100vw * @w);
      height: calc(565vh * @h - 50vh * @h - 44vh * @h);
    }
  }
}
</style>
