<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-08 14:14:25
-->
<template>
  <div class="city-hidden-danger-center">
    <div class="center-left">
      <div class="center-left-search" v-if="false">
        <input class="c-input" placeholder="输入关键字" type="text" />
        <img
          src="../../../assets/images/emergencyOverview/icon_search.png"
          alt=""
        />
      </div>
      <div class="center-left-select">
        <div
          class="select-item"
          v-for="(item, index) in selectThing"
          :key="index"
        >
          <p @click="openShow(item, index)">
            {{ item.dictValue }}
            <span
              @click.stop="flexClickAllItem(item, index)"
              :class="[item.active ? 'active-span' : '']"
              >{{ item.active ? "✔" : "" }}</span
            >
          </p>
          <ul v-show="item.show">
            <li v-for="(citem, cindex) in item.children" :key="cindex">
              <label>{{ citem.dictValue }}</label>
              <span
                :class="[citem.active ? 'active-span' : '']"
                @click="flexClickliItem(item, index, citem, cindex)"
                >{{ citem.active ? "✔" : "" }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center-fixed-icon" style="width: auto; display: flex">
      <div class="btn-video" @click="videoTreeClick($event)">
        <img
          src="../../../assets/images/theCityThreeProofing/icon_video.png"
          alt=""
        />
      </div>
    </div>
    <VideoTree ref="VideoTree"></VideoTree>

    <div id="crystalContainer">
      <div
        id="envCenterInfo"
        class="status-bar"
        style="left: 0px; right: 0px; bottom: 0px"
      >
        <div id="camera_alt">视点高：NaN米</div>
        <div id="env_alt">海拔：NaN米</div>
        <div id="env_lat">纬度：NaN</div>
        <div id="env_lon">经度：NaN</div>
      </div>
    </div>

    <div class="center-right">
      <div class="center-right-type">
        <div class="type-header">
          <p
            v-for="(item, index) in typeArr"
            :key="index"
            :class="[typeIndex == index ? 'btn-active-type' : '']"
            @click="typeBtn(item, index)"
          >
            {{ item.typeName }}
          </p>
        </div>
        <div class="type-all" v-show="typeIndex == 0">
          <ul>
            <li v-for="(item, index) in typeAll" :key="index">
              <div class="type-all-title">{{ item.title }}</div>
              <p
                v-for="(citem, cindex) in item.child"
                :key="cindex"
                :class="[
                  (index == 0 && cindex == 0) || (index == 1 && cindex == 0)
                    ? 'cursor-five'
                    : '',
                ]"
                @click="checkContent(item, index, citem, cindex)"
              >
                <span>{{ citem.name }}</span
                ><span class="number">{{ citem.value }}</span
                ><i>{{ citem.unit == null ? "%" : citem.unit }}</i>
              </p>
            </li>
          </ul>
        </div>
        <pop-up-layer
          v-if="toCheck"
          :show="toCheck"
          :setStyles="{ left: '68.5%', top: '40%' }"
          ref="myPopUpLayer"
          class="centerTable"
          :title="'待检查企业信息'"
          @doClose="checkClose"
        >
          <template slot="content">
            <div class="table-content">
              <div class="talbe-search">
                <div class="center-search">
                  <input
                    class="c-input"
                    placeholder="输入关键字"
                    type="text"
                    v-model="query.checkName"
                  />
                  <img
                    src="../../../assets/images/emergencyOverview/icon_search.png"
                    alt=""
                    @click="checkSearch"
                  />
                </div>
              </div>
              <div class="tables">
                <clist :columns="tableHeaderList" :listData="tabelListData">
                  <template slot="number" slot-scope="{ record, text, index }">
                    {{ index + 1 }}
                  </template>
                </clist>
              </div>
              <div class="list-change-page">
                <ChangePage
                  :total="pagination.checkTotal"
                  :currentPage="pagination.checkCurrent"
                  @changePages="checkChange"
                />
              </div>
            </div>
          </template>
        </pop-up-layer>
        <pop-up-layer
          v-if="toSurvey"
          :show="toSurvey"
          :setStyles="{ left: '68.5%', top: '40%' }"
          ref="myPopUpLayer"
          class="centerTable"
          :title="'事故报告列表'"
          @doClose="surveyClose"
        >
          <template slot="content">
            <div class="table-content">
              <div class="talbe-search">
                <div class="center-search">
                  <input
                    class="c-input"
                    placeholder="输入关键字"
                    type="text"
                    v-model="query.surveyName"
                  />
                  <img
                    src="../../../assets/images/emergencyOverview/icon_search.png"
                    alt=""
                    @click="surveySearch"
                  />
                </div>
              </div>
              <div class="tables">
                <clist :columns="tableHeaderList1" :listData="tabelListData1">
                  <template slot="number" slot-scope="{ record, text, index }">
                    {{ index + 1 }}
                  </template>
                </clist>
              </div>
              <div class="list-change-page">
                <ChangePage
                  :total="pagination.surveyTotal"
                  :currentPage="pagination.surveyCurrent"
                  @changePages="surveyChange"
                />
              </div>
            </div>
          </template>
        </pop-up-layer>
        <div class="center-right-area" v-show="typeIndex == 1">
          <div class="area-type">
            <p
              v-for="(item, index) in areaTypeArr"
              :key="item.key"
              :class="[areaTypeIndex == index ? 'area-type-active' : '']"
              @click="areaTypeBtn(item, index, typeIndex)"
            >
              {{ item.name }}
            </p>
          </div>
          <div class="area-type-chart" v-show="areaTypeIndex == 0"></div>
          <div class="area-type-chart" v-show="areaTypeIndex == 1"></div>
          <div class="area-type-chart" v-show="areaTypeIndex == 2"></div>
        </div>
        <div class="center-right-eight" v-show="typeIndex == 2">
          <div class="area-type">
            <p
              v-for="(item, index) in areaTypeArr"
              :key="item.key"
              :class="[eightTypeIndex == index ? 'area-type-active' : '']"
              @click="eightTypeBtn(item, index, typeIndex)"
            >
              {{ item.name }}
            </p>
          </div>
          <div class="eight-type-chart" v-show="eightTypeIndex == 0"></div>
          <div class="eight-type-chart" v-show="eightTypeIndex == 1"></div>
          <div class="eight-type-chart" v-show="eightTypeIndex == 2"></div>
        </div>
      </div>
      <div class="center-right-accident">
        <div class="accident-title">事故总数行业分布情况</div>
        <div class="chart-accident"></div>
      </div>
    </div>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import listData from "../utils/Datas";
import ChangePage from "@/components/APicture/changePage";
import {
  getAllDatas,
  getExamineDatas,
  getAccidentTotal,
  getCheckData,
  getCheckArea,
  commonApi,
} from "@/api/cityHiddenDanger/index";
import Clist from "@/components/APicture/c-table";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import VideoTree from "@/components/APicture/videoTree/index.vue";
export default {
  components: {
    Clist,
    ContactPhone,
    MessageSend,
    ChangePage,
    VideoTree,
  },
  data() {
    return {
      listData,
      // 左侧选项
      selectThing: [
        {
          key: 0,
          name: "全市隐患企业分布",
          active: false,
          children: [],
        },
        {
          key: 1,
          name: "八大行业企业",
          active: false,
          show: true,
          children: [
            {
              childName: "冶金行业",
              active: false,
            },
            {
              childName: "有色行业",
              active: false,
            },
            {
              childName: "建材行业",
              active: false,
            },
            {
              childName: "机械行业",
              active: false,
            },
            {
              childName: "商贸行业",
              active: false,
            },
            {
              childName: "纺织行业",
              active: false,
            },
            {
              childName: "非煤行业",
              active: false,
            },
            {
              childName: "烟草",
              active: false,
            },
          ],
        },
        {
          key: 2,
          name: "四大专项",
          active: false,
          show: true,
          children: [
            {
              childName: "粉尘涉爆",
              active: false,
            },
            {
              childName: "有限空间",
              active: false,
            },
            {
              childName: "涉氨制冷",
              active: false,
            },
            {
              childName: "钢铁煤气",
              active: false,
            },
          ],
        },
        {
          key: 3,
          name: "隐患等级",
          active: false,
          show: true,
          children: [
            {
              childName: "一般隐患",
              active: false,
            },
            {
              childName: "重大隐患",
              active: false,
            },
            {
              childName: "逾期未整改隐患",
              active: false,
            },
            {
              childName: "逾期未整改企业",
              active: false,
            },
          ],
        },
        {
          key: 4,
          name: "隐患分布",
          active: false,
          show: true,
          children: [
            {
              childName: "粉尘涉爆",
              active: false,
            },
            {
              childName: "有限空间",
              active: false,
            },
            {
              childName: "涉氨制冷",
              active: false,
            },
            {
              childName: "钢铁煤气",
              active: false,
            },
          ],
        },
      ],
      defaultParams: {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      //右侧类型
      typeArr: [
        { typeName: "全部", key: 1 },
        { typeName: "按区域", key: 2 },
        { typeName: "按八大行业", key: 3 },
      ],
      typeIndex: "0",
      //全部数据
      typeAll: [
        {
          title: "检查",
          child: [],
        },
        {
          title: "处罚",
          child: [],
        },
        {
          title: "文书",
          child: [],
        },
      ],
      // 按区域
      areaTypeArr: [
        {
          name: "检查",
          key: 1,
        },
        {
          name: "处罚",
          key: 2,
        },
        {
          name: "文书",
          key: 3,
        },
      ],
      areaTypeIndex: "0",
      eightTypeIndex: "0",
      accidentItem: {
        nameArr: [],
        industrytotal: [],
        industryInspect: [],
        industryNumber: [],
        industryName: [],
      },
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "number", width: "15%" },
        { title: "企业名称", index: 1, textIndex: "companyName", width: "20%" },
        { title: "事故等级", index: 2, textIndex: "popedom", width: "20%" },
        { title: "事故类型", index: 3, textIndex: "address", width: "15%" },
        {
          title: "发生时间",
          index: 4,
          textIndex: "industryClasses",
          width: "15%",
        },
        {
          title: "发生时间",
          index: 5,
          textIndex: "industryType",
          width: "15%",
        },
      ],
      tabelListData: [],
      tableHeaderList1: [
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
      tabelListData1: [],
      // 八大行业图表
      eightInspectDiv: null,
      eightPunishDiv: null,
      eightBookDiv: null,
      // 区域图表
      areaInspectDiv: null,
      areaPunishDiv: null,
      areaBookDiv: null,
      accidentChart: {},
      toCheck: false,
      toSurvey: false,
      // 搜索参数
      query: {
        checkName: undefined,
        surveyName: undefined,
      },
      // 分页
      pagination: {
        checkCurrent: 1,
        checkTotal: undefined,
        surveyCurrent: 1,
        surveyTotal: undefined,
      },
    };
  },
  created() {
    this.init();
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
              this.checkDatas();
              break;
            default:
              break;
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
  },
  methods: {
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event.offsetLeft);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },

    // 区域树选中
    areaCheckClick(keys, e, checkKeys) {},
    // 标签树选中
    taskCheckClick(keys, e, checkKeys) {},
    // 视频搜索点击
    videoSearchClick(i) {
      console.log(i);
    },

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

    formatDataListType(arr, type = "name") {
      let arrData = [];
      let returnList = arr.map((item, key) => {
        if (item.name == type) {
          arrData.push(item.value);
        }
      });
      return arrData;
    },

    init() {
      this.checkDatas();
      this.getSidebarDatas();
      this.$nextTick(() => {
        this.initMap();
        this.initChart();
      });
    },
    initMap() {
      mapToolLocation = $(".center-right").width() + 1320;
      mapOffsetPixel = $(".center").width() - $("#crystalContainer").width();
      mapOffsetPixel = mapOffsetPixel / 2;
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(11);
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
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

    // 初始化图表
    initChart() {
      this.AccidentTotal().then(() => {
        let accidentDiv = this.$echarts.init(
          document.getElementsByClassName("chart-accident")[0]
        );
        accidentDiv.setOption(this.accidentChartOption(this.accidentChart));
      });
      this.areaChart();
      this.eightChart();
      let that = this;
      window.onresize = function () {
        accidentDiv.resize();
      };
    },

    getSidebarDatas() {
      let code = "9GO8HDzz";
      let data = {
        body: {
          dictName: "YH_LAYER",
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          let data = [];
          for (let item of res.body.data) {
            let newItem = {
              ...item,
              active: false,
              show: false,
              children: [],
            };
            data = [...data, newItem];
          }
          this.selectThing = data;
          console.log(this.selectThing, "123sad1s");
        } else {
          console.error(res.message);
        }
      });
    },

    getSidebarChildren(parent) {
      let code = "9GO8HDzz";
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      data.body.parentId = parent.sid;
      commonApi(code, data).then((res) => {
        if (res.success) {
          let data = JSON.parse(JSON.stringify(res.body.data));
          for (let item of data) {
            item.active = false;
          }
          parent.children = data;
        } else {
          console.error(res.message);
        }
      });
    },

    // 获取检查 - 处罚 -文书
    checkDatas() {
      let data = {
        body: {},
        page: 1,
        pageSize: 12,
        sortName: "sid",
        sortOrder: "desc",
      };
      console.log("触发更新数据");
      getCheckData(data).then((res) => {
        if (res.success) {
          if (res.body.data != null && res.body.data.length > 0) {
            this.typeAll[0].child = res.body.data.slice(0, 4);
            this.typeAll[1].child = res.body.data.slice(4, 8);
            this.typeAll[2].child = res.body.data.slice(8, 12);
          }
        }
      });
    },

    //按区域echart
    checkArea(item) {
      let code = "ye7Hp0gL";
      let data = {
        body: {
          type: item,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          if (this.areaTypeIndex == 0) {
            let obj = {
              stayCheck: this.formatDataListType(res.body.data, "待检查企业"),
              notCheck: this.formatDataListType(res.body.data, "到期未复查"),
            };
            this.areaInspectDiv.setOption(this.areaInspectOption(obj));
            this.areaInspectDiv.resize();
          } else if (this.areaTypeIndex == 1) {
            let obj = {
              punishNum: this.formatDataListType(res.body.data, "行政处罚"),
              punishMoney: this.formatDataListType(
                res.body.data,
                "经济行政处罚"
              ),
            };
            this.areaPunishDiv.setOption(this.areaPunishOption(obj));
            this.areaPunishDiv.resize();
          } else if (this.areaTypeIndex == 2) {
            let obj = {
              scene: this.formatDataListType(res.body.data, "现场检查"),
              modification: this.formatDataListType(res.body.data, "责令整改"),
              review: this.formatDataListType(res.body.data, "整改复查"),
            };
            this.areaBookDiv.setOption(this.areaBookOption(obj));
            this.areaBookDiv.resize();
          }
        }
      });
    },

    //按八大行业echart
    eightIndustry(item) {
      let code = "BGfPB8QL";
      let data = {
        body: {
          type: item,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          if (this.eightTypeIndex == 0) {
            let obj = {
              stayCheck: this.formatDataListType(res.body.data, "待检查企业"),
              notCheck: this.formatDataListType(res.body.data, "到期未复查"),
            };
            this.eightInspectDiv.setOption(this.eightInspectOption(obj));
            this.eightInspectDiv.resize();
          } else if (this.eightTypeIndex == 1) {
            let obj = {
              punishNum: this.formatDataListType(res.body.data, "行政处罚"),
              punishMoney: this.formatDataListType(
                res.body.data,
                "经济行政处罚"
              ),
            };
            this.eightPunishDiv.setOption(this.eightPunishOption(obj));
            this.eightPunishDiv.resize();
          } else if (this.eightTypeIndex == 2) {
            let obj = {
              scene: this.formatDataListType(res.body.data, "现场检查"),
              modification: this.formatDataListType(res.body.data, "责令整改"),
              review: this.formatDataListType(res.body.data, "整改复查"),
            };
            this.eightBookDiv.setOption(this.eightBookOption(obj));
            this.eightBookDiv.resize();
          }
        }
      });
    },

    //事故总数行业分布情况
    AccidentTotal() {
      return new Promise((resolve, reject) => {
        let data = {
          body: {},
          page: 1,
          pageSize: 10,
          sortName: "sid",
          sortOrder: "desc",
        };
        getAccidentTotal(data).then((res) => {
          if (res.success) {
            resolve(res);
            let obj = {
              a: this.formatDataListNew(res.body.data, "industryName"),
              b: this.formatDataListNew(res.body.data, "checkCompanyCount"),
              c: this.formatDataListNew(res.body.data, "checkCount"),
              d: this.formatDataListNew(res.body.data, "allCount"),
            };
            this.accidentChart = JSON.parse(JSON.stringify(obj));
          }
        });
      }).catch((err) => {
        if (err) {
          reject(err);
        }
      });
    },

    //获取按区域Echart
    areaChart() {
      this.areaInspectDiv = this.$echarts.init(
        document.getElementsByClassName("area-type-chart")[0]
      );
      this.areaPunishDiv = this.$echarts.init(
        document.getElementsByClassName("area-type-chart")[1]
      );
      this.areaBookDiv = this.$echarts.init(
        document.getElementsByClassName("area-type-chart")[2]
      );
    },

    //获取八大行业Echart
    eightChart() {
      this.eightInspectDiv = this.$echarts.init(
        document.getElementsByClassName("eight-type-chart")[0]
      );
      this.eightPunishDiv = this.$echarts.init(
        document.getElementsByClassName("eight-type-chart")[1]
      );
      this.eightBookDiv = this.$echarts.init(
        document.getElementsByClassName("eight-type-chart")[2]
      );
    },

    //获取待检查弹窗列表
    getStayCheck() {
      let code = "HetglXUr";
      let data = {
        body: {
          companyName: this.query.checkName,
        },
        page: this.pagination.checkCurrent,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          if (res.body) {
            this.tabelListData = res.body.data;
            this.pagination.checkTotal = +res.total;
          }
        }
      });
    },

    //获取事故调查弹窗列表
    getToSurvey() {
      let code = "nghCasjJ";
      let data = {
        body: {
          accidentTitle: this.query.surveyName,
        },
        page: this.pagination.surveyCurrent,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(code, data).then((res) => {
        if (res.success) {
          if (res.body) {
            this.tabelListData1 = res.body.data;
            this.pagination.surveyTotal = +res.total;
          }
        }
      });
    },

    // 按区域图表切换
    areaTypeBtn(item, index, typeIndex) {
      this.areaTypeIndex = index;
      if (typeIndex == 1 && index == 1) {
        this.checkArea(item.name);
      } else if (typeIndex == 1 && index == 2) {
        this.checkArea(item.name);
      }
    },

    // 按八大行业图表切换
    eightTypeBtn(item, index, typeIndex) {
      this.eightTypeIndex = index;
      if (typeIndex == 2 && index == 1) {
        this.eightIndustry(item.name);
      } else if (typeIndex == 2 && index == 2) {
        this.eightIndustry(item.name);
      }
    },

    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.selectThing[index].active = JSON.parse(JSON.stringify(!item.active));
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
      console.log(this.selectThing);
      if (this.selectThing[index].active) {
        //遍历获取子级的所有详情数据
        this.selectThing[index].children.forEach((option) => {
          this.getSidebarDetail(option);
        });
        is_Bool = true;
        this.selectThing[index].show = true;
        this.selectThing[index].children.map((citem, cindex) => {
          this.selectThing[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.selectThing[index].children, false);
        this.selectThing[index].children.forEach((option) => {
          pGzznCore.addPromiseHazardousQYRemove(option.dictValue);
        });
      }
    },

    flexClickliItem(item, index, citem, cindex) {
      this.selectThing[index].children[cindex].active = !citem.active;
      if (this.selectThing[index].children[cindex].active) {
        //获取该项的详情
        this.getSidebarDetail(citem);
        let childrenLength = this.selectThing[index].children.length;
        let currentArr = this.selectThing[index].children.filter((i, k) => {
          if (i.active) {
            return i;
          }
        });
        if (currentArr.length === childrenLength) {
          this.selectThing[index].active = true;
        }
      } else {
        this.selectThing[index].active = false;
        pGzznCore.addPromiseHazardousQYRemove(citem.dictValue);
      }
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
    },
    //获取侧边栏二级数据项的具体详情
    getSidebarDetail(item) {
      let code = item.interfaceCode;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = item.condition ? JSON.parse(item.condition) : {};
      commonApi(code, params).then((res) => {
        if (res.success) {
          console.log(res);
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 2);
        } else {
          console.error(res.message);
        }
      });
    },
    // 展示
    openShow(item, index) {
      this.selectThing[index].show = !this.selectThing[index].show;
      // 如果是展开 且 子级没有数据，则请求接口获取子级
      if (item.show && item.children.length == 0) {
        this.getSidebarChildren(item);
      }
    },

    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },

    //选择类型
    typeBtn(item, index) {
      this.typeIndex = index;
      this.areaTypeIndex = 0;
      this.eightTypeIndex = 0;
      if (index == 1) {
        this.checkArea("检查");
      } else if (index == 2) {
        this.eightIndustry("检查");
      }
    },

    //待检查与事故调查弹窗
    checkContent(item, index, citem, cindex) {
      if (index == 0) {
        this.toCheck = true;
        //获取待检查弹窗列表
        this.getStayCheck();
      } else if (index == 1) {
        this.toSurvey = true;
        //获取事故调查
        this.getToSurvey();
      }
    },

    //待检查弹窗关闭
    checkClose() {
      this.query.checkName = undefined;
      this.toCheck = false;
      this.pagination.checkCurrent = 1;
    },

    //事故调查弹窗关闭
    surveyClose() {
      this.query.surveyName = undefined;
      this.toSurvey = false;
      this.pagination.surveyCurrent = 1;
    },

    // 检查搜索
    checkSearch() {
      this.pagination.checkCurrent = 1;
      this.getStayCheck();
    },
    checkChange(pages, pageSize) {
      this.pagination.checkCurrent = +pages.pages;
      this.getStayCheck();
    },
    // 处罚搜索
    surveySearch() {
      this.pagination.surveyCurrent = 1;
      this.getToSurvey();
    },
    surveyChange(pages, pageSize) {
      this.pagination.surveyCurrent = +pages.pages;
      this.getToSurvey();
    },
    // 区域检查图表配置
    areaInspectOption(obj = null) {
      let that = this;
      let option = {
        title: {
          text: "各区检查企业情况统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        lengend: {
          show: true,
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#ffffff",
            fontSize: that.$setFontSize(14),
          },
        },
        xAxis: {
          type: "category",
          data: [
            "越秀区",
            "海珠区",
            "荔湾区",
            "天河区",
            "白云区",
            "黄浦区",
            "花都区",
            "番禺区",
            "南沙区",
            "从化区",
            "增城区",
          ],
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#e4e4e4",
              width: 2,
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        yAxis: {
          type: "value",
          name: "间",
          nameTextStyle: {
            color: "#fff",
          },
          axisLine: {
            show: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#e4e4e4",
              width: 2,
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        series: [
          {
            name: "到期检查企业",
            data: obj.stayCheck,
            type: "bar",
            color: "rgb(255,127,80)",
          },
          {
            name: "到期未复查企业",
            data: obj.notCheck,
            type: "bar",
            color: ["rgb(135,206,250)"],
          },
        ],
      };
      return option;
    },

    // 区域处罚图表配置
    areaPunishOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        title: {
          text: "各区行政处罚情况统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        legend: {
          bottom: "bottom",
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },
        color: ["rgb(255,127,80)", "rgb(74,116,158)"],
        xAxis: [
          {
            type: "category",
            data: [
              "越秀区",
              "海珠区",
              "荔湾区",
              "天河区",
              "白云区",
              "黄浦区",
              "花都区",
              "番禺区",
              "南沙区",
              "从化区",
              "增城区",
            ],
            axisPointer: {
              type: "shadow",
            },
            splitLine: {
              show: true,
            },
            axisLabel: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "件",
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
          {
            type: "value",
            name: "万",
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        ],
        series: [
          {
            name: "行政处罚案件数",
            type: "bar",
            data: obj.punishNum,
          },
          {
            name: "处罚总金额",
            type: "line",
            symbolSize: 6,
            yAxisIndex: 1,
            symbol: "circle",
            data: obj.punishMoney,
          },
        ],
      };
      return option;
    },

    //区域文书图表配置
    areaBookOption(obj = null) {
      let that = this;
      let option = {
        title: {
          text: "各区文书开具情况统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        legend: {
          bottom: "bottom",
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },
        tooltip: {
          trigger: "axis",
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "越秀区",
            "海珠区",
            "荔湾区",
            "天河区",
            "白云区",
            "黄浦区",
            "花都区",
            "番禺区",
            "南沙区",
            "从化区",
            "增城区",
          ],
          axisLine: {
            lineStyle: {
              // color: "red",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              //   color: "#fff",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        yAxis: {
          boundaryGap: false,
          type: "value",
          name: "份",
          axisLine: {
            show: true,
            lineStyle: {
              //   color: "red",
            },
          },
          nameTextStyle: {
            color: "#fff",
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              //   color: "#fff",
            },
          },
        },
        series: [
          {
            name: "现场检查",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            data: obj.scene,
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
            name: "责令整改",
            symbolSize: 6, //设定实心点的大小
            symbol: "square",
            type: "line",
            data: obj.modification,
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
            name: "复查意见",
            symbolSize: 6, //设定实心点的大小
            symbol: "triangle",
            type: "line",
            data: obj.review,
            itemStyle: {
              normal: {
                color: "#fa7c4f", //折点颜色
                lineStyle: {
                  color: "#fa7c4f", //折线颜色
                },
              },
            },
          },
        ],
      };
      return option;
    },

    //八大行业检查图表配置
    eightInspectOption(obj = null) {
      let that = this;
      let option = {
        title: {
          text: "八大行业检查企业情况统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        legend: {
          data: ["待检查企业", "到期未复查企业"],
          bottom: "bottom",
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },

        xAxis: {
          type: "category",
          data: [
            "冶金",
            "有色",
            "建材",
            "机械",
            "轻工",
            "纺织",
            "烟草",
            "商贸",
          ],
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#e4e4e4",
              width: 2,
            },
          },
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgb(57,114,162)",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "间",
          nameTextStyle: {
            color: "#fff",
          },
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgb(57,114,162)",
            },
          },
        },
        series: [
          {
            name: "待检查企业",
            data: obj.stayCheck,
            type: "bar",
            color: "rgb(29,187,55)",
          },
          {
            name: "到期未复查企业",
            data: obj.notCheck,
            type: "bar",
            color: ["rgb(255,255,0)"],
          },
        ],
      };
      return option;
    },

    //八大行业处罚图表配置
    eightPunishOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        title: {
          text: "八大行业行政处罚情况统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        legend: {
          data: ["蒸发量", "平均温度"],
          bottom: "bottom",
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },
        color: ["red", "rgb(151,62,175)"],
        xAxis: [
          {
            type: "category",
            data: [
              "冶金",
              "有色",
              "建材",
              "机械",
              "轻工",
              "纺织",
              "烟草",
              "商贸",
            ],
            axisPointer: {
              type: "shadow",
            },
            splitLine: {
              show: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "件",
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          {
            type: "value",
            name: "万",
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
        ],
        series: [
          {
            name: "行政处罚案件数",
            type: "bar",
            data: obj.punishNum,
          },
          {
            name: "处罚总金额",
            type: "line",
            symbolSize: 6,
            yAxisIndex: 1,
            symbol: "circle",
            data: obj.punishMoney,
          },
        ],
      };
      return option;
    },

    //八大行业文书图表配置
    eightBookOption(obj = null) {
      let that = this;
      let option = {
        legend: {
          bottom: "bottom",
          data: ["现场检查", "责令整改", "复查意见"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: "#ffffff",
            fontSize: that.$setFontSize(16),
          },
        },
        title: {
          text: "八大行业文书开具情况具体统计",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "冶金",
            "有色",
            "建材",
            "机械",
            "轻工",
            "纺织",
            "烟草",
            "商贸",
          ],
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },

          axisLine: {
            textStyle: "#fff",
            lineStyle: {
              color: "rgb(91,128,163)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
            },
          },
        },
        yAxis: {
          boundaryGap: false,
          type: "value",
          name: "份",
          axisLabel: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          nameTextStyle: {
            color: "#fff",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(91,128,163)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
            },
          },
        },
        series: [
          {
            name: "现场检查",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            data: obj.scene,
            itemStyle: {
              normal: {
                color: "rgb(246,123,79)", //折点颜色
                lineStyle: {
                  color: "rgb(246,123,79)", //折线颜色
                },
              },
            },
          },
          {
            name: "责令整改",
            symbolSize: 6, //设定实心点的大小
            symbol: "circle",
            type: "line",
            data: obj.modification,
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
            name: "复查意见",
            symbolSize: 8, //设定实心点的大小
            symbol: "circle",
            type: "line",
            data: obj.review,
            itemStyle: {
              normal: {
                color: "rgb(209,108,208)", //折点颜色
                lineStyle: {
                  color: "rgb(209,108,208)", //折线颜色
                },
              },
            },
          },
        ],
      };
      return option;
    },

    // 事故图表配置项
    accidentChartOption(obj) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          orient: "horizontal",
          data: ["检查次数", "检查企业数", "企业总数"],
          right: "3%",
          itemWidth: that.$setFontSize(14),
          itemHeight: that.$setFontSize(14),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
        },
        grid: {
          left: "0",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: obj.a,
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgb(43, 54, 82)",
            },
          },
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "检查次数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              fontSize: that.$setFontSize(16),
            },
            emphasis: {
              focus: "series",
            },
            color: "rgb(36,116,239)",
            data: obj.c,
          },
          {
            name: "检查企业数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              fontSize: that.$setFontSize(16),
            },
            emphasis: {
              focus: "series",
            },
            color: "rgb(48,93,160)",
            data: obj.b,
          },
          {
            name: "企业总数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              fontSize: that.$setFontSize(16),
            },
            emphasis: {
              focus: "series",
            },
            color: "rgb(58,81,112)",
            data: obj.d,
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
