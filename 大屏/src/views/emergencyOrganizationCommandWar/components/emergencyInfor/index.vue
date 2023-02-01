<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: chenmeiqi
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-11-06 14:41:39
-->
<template>
  <div>
    <ModelBox :title="title" class="c-mybox-position" style="z-index: 8100">
      <template slot="content">
        <div class="content-all">
          <div class="main">
            <div class="title">基础信息</div>
            <ul class="basics-info">
              <li v-for="item in basics" :key="item.id" @click="typeClick(item)">
                <div class="img">
                  <img :src="icon[item.type]" alt="" />
                </div>
                <div class="text-info">
                  <p>{{ item.name }}</p>
                  <p>
                    <span>{{ item.num }}</span>{{ item.unit }}
                  </p>
                </div>
                <div class="selected" v-if="
                    openWindowList.findIndex((e) => e.type == item.type) > -1
                  ">
                  <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
                </div>
              </li>
            </ul>
          </div>
          <div class="other">
            <div v-for="(item, index) in other" :key="item.id">
              <p @click="isSelect(item, index, item.type)" class="small-title">
                {{ item.name }}
                <a-icon type="down" class="icon" v-if="!item.isShow" />
                <a-icon type="up" class="icon" v-if="item.isShow" />
              </p>
              <ul class="basics-info" v-show="item.isShow">
                <li v-for="i in item.children" :key="i.id" @click="typeClick(i)">
                  <div class="img">
                    <img :src="icon[i.type]" alt="" />
                  </div>
                  <div class="text-info">
                    <p>{{ i.name }}</p>
                    <p>
                      <span>{{ i.num }}</span>{{ i.unit }}
                    </p>
                  </div>
                  <div class="selected" v-if="
                      openWindowList.findIndex((e) => e.type == i.type) > -1
                    ">
                    <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="other">
            <div v-for="(item, index) in hiddent" :key="item.id">
              <p @click="isSelectHiddent(item, index, item.type)" class="small-title">
                {{ item.name }}
                <a-icon type="down" class="icon" v-if="!item.isShow" />
                <a-icon type="up" class="icon" v-if="item.isShow" />
              </p>
              <ul class="basics-info" v-show="item.isShow">
                <!-- <HiddenDanger :eventData="eventData" /> -->
                <li v-for="i in item.children" :key="i.id" @click="hiddentClick(i)">
                  <div class="img">
                    <img :src="icon[i.type]" alt="" />
                  </div>
                  <div class="text-info">
                    <p>{{ i.name }}</p>
                    <p>
                      <span>{{ i.num }}</span>{{ i.unit }}
                    </p>
                  </div>
                  <div class="selected" v-if='hiddentImg'>
                    <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="circle" @click="drawCircle" v-show="!isDraw">
          <img src="../../../../assets/images/emergencyOrganizationCommandWar/brush_icon.png" alt="" />
        </div>
        <div class="circle" @click="cancleDraw" v-show="isDraw">
          <img src="../../../../assets/images/emergencyOrganizationCommandWar/noBrush_icon.png" alt="" />
        </div>
      </template>
    </ModelBox>
    <template v-for="item in openWindowList.filter((e) => e.show)">
      <table-pop :key="item.type" @tableClose="tableClose(item)" :tableHeader="tableHeader[item.type]" :tableType="item.type" :siteArr="query" :title="item.name"></table-pop>
    </template>
    <pop-up-layer v-if="hiddentShow" :show="hiddentShow" @doClose="hiddentClose" opsition="pageCenter" title="灾害风险实时监测情况" ref="myPopUpLayer" class="hiddent-pop">
      <div slot="content" class="upLayer_content">
        <UpView :eventData='eventData' />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";
import {
  getStudyList,
  findTypeDetail,
  findTypeDetailSite,
  getIdsmApi,
  yjzhPreventionDangerFindNew
} from "@/api/idsm/index.js";
import UpView from "./UpView.vue";

import { mapDrawTool } from "../../../../../public/gzznGIS/Content/drawTool";
import TablePop from "./tablePop/index.vue";
import { tableHeader } from "./utils/data.js";
import HiddenDanger from "../progressOf/hiddenDanger/index.vue";

export default {
  components: { ModelBox, TablePop, HiddenDanger, UpView },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => { },
    },


  },
  data() {
    return {
      title: "分析研判",
      basics: [

      ],
      other: [
        {
          id: 1,
          name: "脆弱目标",
          code: "xx",
          isShow: false,
          type: ["analysisSchool", "analysisGasStation", "analysisBeadhouse"],
          children: [],
        },
        {
          id: 2,
          name: "应急力量",
          code: "xx",
          isShow: false,
          type: "analysisRanks",
          children: [],
        },
        {
          id: 3,
          name: "应急物资",
          code: "xx",
          isShow: false,
          type: "analysisMaterialWarehouse",
          children: [],
        },
        {
          id: 4,
          name: "应急资源",
          code: "xx",
          isShow: false,
          type: "analysisExpert",
          children: [],
        },
        {
          id: 5,
          name: "避难场所",
          code: "xx",
          isShow: false,
          type: "analysisPlaceRefuge",
          children: [],
        },
        {
          id: 6,
          name: "重要设施",
          code: "xx",
          isShow: false,
          type: [
            "analysisSfSluiceDetails",
            "analysisBaseRainfallStation",
            "analysisBaseLargeBillboard",
            "analysisBaseMaterialReserve",

          ],
          children: [],
        },

      ],
      /** 激活窗口的集合 */
      openWindowList: [],
      params: {
        body: {
          str: [
            "analysisWaterPoint",
            "analysisGasStation",
            "analysisMaterialWarehouse",
            "analysisPlaceRefuge",
            "analysisRanks",
            "analysisRiskEnterprise",
            "analysisExpert",
            "analysisSchool",
          ],
          latArr: [],
          lonArr: [],
        },
      },
      query: {
        lonArr: [],
        latArr: [],
      },
      isDraw: false,
      // icon,
      icon: {
        analysisGasStation: require("@/assets/images/emergencyOrganizationCommandWar/analysisGasStation_icon.png"),
        analysisMaterialWarehouse: require("@/assets/images/emergencyOrganizationCommandWar/analysisMaterialWarehouse_icon.png"),
        analysisPlaceRefuge: require("@/assets/images/emergencyOrganizationCommandWar/analysisPlaceRefuge_icon.png"),
        analysisRanks: require("@/assets/images/emergencyOrganizationCommandWar/analysisRanks_icon.png"),
        analysisRiskEnterprise: require("@/assets/images/emergencyOrganizationCommandWar/analysisRiskEnterprise_icon.png"),
        analysisWaterPoint: require("@/assets/images/emergencyOrganizationCommandWar/analysisWaterPoint_icon.png"),
        analysisExpert: require("@/assets/images/emergencyOrganizationCommandWar/analysisExpert_icon.png"),
        analysisSchool: require("@/assets/images/emergencyOrganizationCommandWar/analysisSchool_icon.png"),
        analysisImportantFacilities: require("@/assets/images/emergencyOrganizationCommandWar/analysisImportantFacilities_icon.png"),
        analysisSfSluiceDetails: require("@/assets/images/emergencyOrganizationCommandWar/analysisSfSluiceDetails_icon.png"),
        analysisBaseRainfallStation: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseRainfallStation_icon.png"),
        analysisBeadhouse: require("@/assets/images/emergencyOrganizationCommandWar/analysisBeadhouse_icon.png"),
        analysisBaseLargeBillboard: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseLargeBillboard_icon.png"),
        analysisBaseMaterialReserve: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseMaterialReserve_icon.png"),
        hiddent: require("@/assets/images/emergencyOrganizationCommandWar/hiddent_icon.png"),

      },
      tableHeader,
      initDataArr: [
        "analysisWaterPoint",
        "analysisGasStation",
        "analysisMaterialWarehouse",
        "analysisPlaceRefuge",
        "analysisRanks",
        "analysisRiskEnterprise",
        "analysisExpert",
        "analysisSchool",
      ],
      hiddent: [
        {
          id: 6,
          name: "风险隐患",
          code: "xx",
          isShow: false,
          type:
            "hiddent"
          ,
          children: [
            {
              name: '风险隐患',
              num: 'xx',
              unit: '个',
              type: 'hiddent'
            }
          ],
        },],
      hiddentShow: false,
      hiddentImg: true,
      contentObj: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.$EventBus.$on("statisticsMapClear", () => {
        this.clearAll();
      });
    });
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        if (newValue) {
          let query = newValue.query
          // this.getHiddent(query)
          this.doQuery(query.jbbh)
        }
      },
      deep: true,
      immediate: true
    },

  },
  methods: {
    init() {
      this.doQuery();
      // this.getEventDetail(this.eventData.jbbh)
      //根据事件坐标获取最近一公里的风险隐患
      this.getHiddent(this.eventData)
    },
    // getEventDetail(sid) {
    //   let code = "8qddPGf8";
    //   let data = {
    //     body: {
    //       jbbh: sid,
    //     },
    //     page: 1,
    //     pageSize: 10,
    //     sortName: "sid",
    //     sortOrder: "desc",
    //   };
    //   getIdsmApi(code, data)
    //     .then((res) => {
    //       if (res.success) {
    //         this.contentObj = res.body.data[0];
    //       }
    //     })
    //     .catch((error) => {
    //       if (error) {
    //         this.$MyMessage.error(error + "获取事件详情失败");
    //       }
    //     });
    // },
    isSelect(item, index, strType) {
      this.other[index].isShow = !this.other[index].isShow;
      if (this.other[index].isShow) {
        let data = this.params;
        data.body.str = typeof strType == "string" ? [strType] : [...strType];
        this.doQueryType(index, data);
      }
    },

    isSelectHiddent(item, index) {
      this.hiddent[index].isShow = !this.hiddent[index].isShow;
      console.log(this.eventData, 'eventData');

    },
    // 查询所有数据
    doQuery() {
      getStudyList(this.params).then((res) => {
        this.basics = res.body;
      });
    },
    // 查询分类数据
    doQueryType(index = null, data) {
      // 使用type定义为总类还是分类
      // 无值为总类 有值为分类
      // index - 分类的索引

      getStudyList(data).then((res) => {
        this.other[index].children = res.body;
      });
    },
    //查询列表-无坐标筛选
    getTable(record) {
      let data = {
        body: {
          str: [record.type],
          name: "",
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      findTypeDetail(data).then((res) => {
        if (res.success) {
          let pointLayer = pGzznCore.findArray(
            this.openWindowList,
            "type",
            record.type
          );
          if (!pointLayer) {
            this.openWindowList.unshift({
              ...record,
              show: true,
            });
          }

          let lists = res.body[record.type].body;
          this.setPointLayerToMap(lists, record.type);
        }
      });
    },
    //查询列表-坐标筛选
    getTableSite(record) {
      let data = {
        body: {
          str: [record.type],
          name: "",
          latArr: this.query.latArr,
          lonArr: this.query.lonArr,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      findTypeDetailSite(data).then((res) => {
        if (res.success) {
          if (
            res.body[record.type].body != null &&
            res.body[record.type].body.length
          ) {
            let pointLayer = pGzznCore.findArray(
              this.openWindowList,
              "type",
              record.type
            );
            if (!pointLayer) {
              this.openWindowList.push({
                ...record,
                show: true,
              });
            }
            let lists = res.body[record.type].body;
            this.setPointLayerToMap(lists, record.type);
          } else {
            this.$MyMessage.error("暂无数据");
          }
        }
      });
    },
    getHiddent(query) {
      // let { jd, wd } = query
      // console.log(query);
      let body = {
        body: {
          latitude: query.wd,
          longitude: query.jd,
          distance: 1,
        },
      };
      let infos = [
        { title: "事件名称", textIndex: "name", },
        { title: "描述", textIndex: "detail", },
        { title: "时间", textIndex: "occurrenceTime" },
      ]
      yjzhPreventionDangerFindNew(body).then((res) => {
        if (res.success) {
          if (res.body) {
            this.hiddent[0].children[0].num = +res.total
            let items = pGzznCore.deepClone(res.body);
            pGzznCore.pointLayerRemove({ type: `defaultTypeEvent` });
            let objs = {
              imgUrl: `gzznGIS/Image/gjh/qyyh1红.png`,
              imgSize: { width: 32, height: 32 },
              type: `defaultTypeEvent`,
              layerName: '风险隐患',
              info: infos,
              lonLat: { lon: "longitude", lat: "latitude" },
            };
            pGzznCore.setPointLayerToMap(items, objs);
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    //点击类型
    typeClick(record) {
      let index = this.openWindowList.findIndex((e) => e.type == record.type);

      if (index > -1) {
        this.openWindowList.splice(index, 1);
        pGzznCore.pointLayerRemove({ type: `defaultType${record.type}` });
      } else {
        if (this.query.lonArr.length && this.query.latArr.length) {
          // 有坐标时
          this.getTableSite(record);
        } else {
          // 无坐标时

          this.getTable(record);
        }
        // this.getTable(record.type)
      }
    },
    drawCircle() {
      this.isDraw = true;
      let objs = { type: "Polygon", strType: "2", showDrawTooltip: true };
      objs.pointLayerType = this.openWindowList;
      //将下拉框全部收起
      // this.other.map((e) => {
      //   e.isShow = false;
      // });

      //清除上次绘制多边形
      mapDrawTool.clear(1, "2", () => {
        this.query.lonArr = [];
        this.query.latArr = [];

        //清除画圈 获取默认全部数据
        this.params.body.str = this.initDataArr;
        this.params.body.lonArr = [];
        this.params.body.latArr = [];
        this.doQuery();
        this.other.map((e, i) => {
          if (this.other[i].isShow) {
            let data = this.params;
            data.body.str = typeof e.type == "string" ? [e.type] : [...e.type];
            this.doQueryType(i, data);
          }
        });
      });

      this.openWindowList.forEach((items) => {
        pGzznCore.pointLayerRemove({ type: `defaultType${items.type}` });
      });

      mapDrawTool.selectDrawTool(objs, (res) => {
        this.isDraw = false;
        // this.other.map((e) => {
        //   e.isShow = false;
        // });
        this.query.lonArr = res.geometry.lon;
        this.query.latArr = res.geometry.lat;
        this.params.body.str = this.initDataArr;
        this.params.body.lonArr = this.query.lonArr;
        this.params.body.latArr = this.query.latArr;
        this.doQuery();

        this.other.map((e, i) => {
          if (this.other[i].isShow) {
            let data = this.params;
            data.body.str = typeof e.type == "string" ? [e.type] : [...e.type];
            this.doQueryType(i, data);
          }
        });

        if (this.openWindowList.length && this.openWindowList.length > 0) {
          //this.queryPoint(res);
          this.openWindowList.forEach((items) => {
            this.getTableSite(items);
          });
        } else {
          //mapDrawTool.selectDrawTool(objs);
        }
      });
    },
    cancleDraw() {
      this.isDraw = false;
      //清除地图画笔
      mapDrawTool.clearDrawTool(mapDrawTool.handler, [
        "MOUSE_MOVE",
        "LEFT_CLICK",
        "RIGHT_CLICK",
      ]);
      this.openWindowList.forEach((items) => {
        this.getTable(items);
      });
    },
    tableClose(item) {
      Object.assign(item, {
        show: false,
      });
    },
    setPointLayerToMap(lists, type) {
      let items = pGzznCore.deepClone(lists);
      pGzznCore.pointLayerRemove({ type: `defaultType${type}` });
      let objs = {
        imgUrl: `gzznGIS/Image/fxyp/${type}_icon.png`,
        imgSize: { width: 32, height: 32 },
        type: `defaultType${type}`,
        layerName: type,
        info: this.tableHeader[type].filter((e) => e.textIndex != "position"),
        lonLat: { lon: "jd", lat: "wd" },
      };
      pGzznCore.setPointLayerToMap(items, objs);
    },
    clearAll() {
      this.isDraw = false;
      //清除地图画笔
      mapDrawTool.clearDrawTool(mapDrawTool.handler, [
        "MOUSE_MOVE",
        "LEFT_CLICK",
        "RIGHT_CLICK",
      ]);
      mapDrawTool.clear(1, "2");
      this.params.body.str = this.initDataArr;
      this.params.body.lonArr = [];
      this.params.body.latArr = [];
      this.query.lonArr = []
      this.query.latArr = []
      this.openWindowList.forEach((item) => {
        pGzznCore.pointLayerRemove({ type: `defaultType${item.type}` });
      });
      this.openWindowList = [];
      this.doQuery();
    },
    hiddentClose() {
      this.hiddentShow = false;
    },
    hiddentClick() {
      this.hiddentImg = !this.hiddentImg
      if (this.hiddentImg) {
        this.hiddentShow = true
        this.getHiddent(this.eventData)
      } else {
        pGzznCore.pointLayerRemove({ type: `defaultTypeHiddentEvent` });
        this.hiddentShow = false;
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
