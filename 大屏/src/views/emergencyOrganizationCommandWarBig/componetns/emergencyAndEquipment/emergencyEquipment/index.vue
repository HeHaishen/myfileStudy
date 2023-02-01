<!--
 * @Description: 应急设备
 * @Author: liuxin
 * @Date: 2021-11-01 15:30:48
 * @LastEditTime: 2021-11-05 16:27:54
 * @LastEditors: chenmeiqi
-->
<template>
  <div class="emergency-equipment">
    <div class="public-head">
      {{ title }}
    </div>
    <div class="public-content">
      <ul class="nav">
        <!-- <li> -->
        <img
          :src="icon['leftBtn']"
          alt=""
          @click="subscript--"
          v-if="subscript > 0"
        />
        <!-- </li> -->
        <li
          :class="{ active: ulIndex == i.id }"
          v-for="(i, index) in other.slice(subscript, 5 + subscript)"
          :key="i.id"
          @click="isSelect(i, index, i.type)"
        >
          {{ i.name }}
        </li>
        <!-- <li> -->
        <img
          :src="icon['rightBtn']"
          alt=""
          @click="subscript++"
          v-if="subscript < other.length - 5"
        />
        <!-- </li> -->
      </ul>
      <ul class="basics-info">
        <li v-for="item in basics" :key="item.id" @click="typeClick(item)">
          <div class="img">
            <img :src="icon[item.type]" alt="" />
          </div>
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p>
              <span class="number">{{ item.num }}</span
              >{{ item.unit }}
            </p>
          </div>
          <div
            class="selected"
            v-if="openWindowList.findIndex((e) => e.type == item.type) > -1"
          >
            <img
              src="~@/assets/images/majorFestivalsConductor/selected.png"
              alt=""
              srcset=""
            />
          </div>
        </li>
      </ul>

      <div class="circle" @click="drawCircle" v-show="!isDraw">
        <img
          src="../../../../../assets/images/emergencyOrganizationCommandWar/brush_icon.png"
          alt=""
        />
      </div>
      <div class="circle" @click="cancleDraw" v-show="isDraw">
        <img
          src="../../../../../assets/images/emergencyOrganizationCommandWar/noBrush_icon.png"
          alt=""
        />
      </div>
    </div>
    <template v-for="item in openWindowList.filter((e) => e.show)">
      <table-pop
        :key="item.type"
        @tableClose="tableClose(item)"
        :tableHeader="tableHeader[item.type]"
        :tableType="item.type"
        :siteArr="query"
        :title="item.name"
      ></table-pop>
    </template>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import {
  getStudyList,
  findTypeDetail,
  findTypeDetailSite,
} from "@/api/idsm/index.js";
import { mapDrawTool } from "../../../../../../public/gzznGIS/Content/drawTool";
import TablePop from "./tablePop/index.vue";
import { tableHeader } from "./utils/data.js";
export default {
  name: "",
  props: {},
  components: { TablePop },
  data() {
    return {
      title: "分析研判",
      ulIndex: 0,
      subscript: 0,
      other: [
        {
          id: 0,
          name: "基础信息",
          code: "xx",
          isShow: false,

          children: [
            {
              id: 1,
              name: "人口",
              num: 21,
              unit: "万人",
              code: "xxxx",
              type: "people",
            },
            {
              id: 2,
              name: "人口密度",
              num: 21,
              unit: "人/km^2",
              code: "1",
              type: "peopleMore",
            },
            {
              id: 3,
              name: "取水点",
              num: 21,
              unit: "人/km^2",
              code: "1",
              type: "analysisWaterPoint",
            },
            {
              id: 4,
              name: "专家",
              num: 21,
              unit: "万人",
              code: "1",
              type: "analysisExpert",
            },
            {
              id: 5,
              name: "人员密集",
              num: 21,
              unit: "万人",
              code: "1",
              type: "denselyPopulated",
            },
            {
              id: 6,
              name: "高危企业",
              num: 21,
              unit: "万/km^2",
              code: "1",
              type: "analysisRiskEnterprise",
            },
            {
              id: 7,
              name: "重要设施",
              num: 21,
              unit: "人/km^2",
              code: "1",
              type: "analysisImportantFacilities",
            },
            {
              id: 8,
              name: "避难场所",
              num: 21,
              unit: "万",
              code: "1",
              type: "analysisPlaceRefuge",
            },
            {
              id: 9,
              name: "加油站",
              num: 21,
              unit: "人/km^2",
              code: "1",
              type: "analysisGasStation",
            },
            {
              id: 10,
              name: "队伍",
              num: 21,
              unit: "万人",
              code: "1",
              type: "analysisRanks",
            },
            {
              id: 11,
              name: "物资仓库",
              num: 21,
              unit: "人/km^2",
              code: "1",
              type: "analysisMaterialWarehouse",
            },
          ],
        },
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
          type: "analysisGasStation",

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
      basics: [],
      icon: {
        leftBtn: require("@/assets/images/emergencyOrganizationCommandWar/bg_left_btn.png"),
        rightBtn: require("@/assets/images/emergencyOrganizationCommandWar/bg_right_btn.png"),
        people: require("@/assets/images/emergencyOrganizationCommandWar/icon_people.png"),
        peopleMore: require("@/assets/images/emergencyOrganizationCommandWar/icon_people_more.png"),
        analysisWaterPoint: require("@/assets/images/emergencyOrganizationCommandWar/analysisWaterPoint_icon.png"),
        analysisExpert: require("@/assets/images/emergencyOrganizationCommandWar/analysisExpert_icon.png"),
        denselyPopulated: require("@/assets/images/emergencyOrganizationCommandWar/densely_populated.png"),
        analysisRiskEnterprise: require("@/assets/images/emergencyOrganizationCommandWar/analysisRiskEnterprise_icon.png"),
        analysisImportantFacilities: require("@/assets/images/emergencyOrganizationCommandWar/analysisImportantFacilities_icon.png"),
        analysisPlaceRefuge: require("@/assets/images/emergencyOrganizationCommandWar/analysisPlaceRefuge_icon.png"),
        analysisGasStation: require("@/assets/images/emergencyOrganizationCommandWar/analysisGasStation_icon.png"),
        analysisRanks: require("@/assets/images/emergencyOrganizationCommandWar/analysisRanks_icon.png"),
        analysisMaterialWarehouse: require("@/assets/images/emergencyOrganizationCommandWar/analysisMaterialWarehouse_icon.png"),
        analysisSchool: require("@/assets/images/emergencyOrganizationCommandWar/analysisSchool_icon.png"),
        analysisSfSluiceDetails: require("@/assets/images/emergencyOrganizationCommandWar/analysisSfSluiceDetails_icon.png"),
        analysisBaseRainfallStation: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseRainfallStation_icon.png"),
        analysisBeadhouse: require("@/assets/images/emergencyOrganizationCommandWar/analysisBeadhouse_icon.png"),
        analysisBaseLargeBillboard: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseLargeBillboard_icon.png"),
        analysisBaseMaterialReserve: require("@/assets/images/emergencyOrganizationCommandWar/analysisBaseMaterialReserve_icon.png"),
      },
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
  methods: {
    init() {
      this.doQuery();
    },
    isSelect(item, index, strType) {
      if (index == 0) {
        this.params = {
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
        };
        this.doQuery();
        return;
      }
      // this.other[index].isShow = !this.other[index].isShow;
      // if (this.other[index].isShow) {
      let data = this.params;
      data.body.str = typeof strType == "string" ? [strType] : [...strType];
      this.doQueryType(index, data, item.id);
      // }
    },
    // 查询所有数据
    doQuery(ulIndex = 0) {
      getStudyList(this.params).then((res) => {
        this.basics = res.body;
        this.ulIndex = ulIndex;
      });
    },
    // 查询分类数据
    doQueryType(index = null, data, ulIndex) {
      // 使用type定义为总类还是分类
      // 无值为总类 有值为分类
      // index - 分类的索引

      getStudyList(data).then((res) => {
        this.other[index].children = res.body;
        this.basics = this.other[index].children;
        this.ulIndex = ulIndex;
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
      this.openWindowList.forEach((item) => {
        pGzznCore.pointLayerRemove({ type: `defaultType${item.type}` });
      });
      this.openWindowList = [];
      this.doQuery();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../common.less";
@import "./index.less";
.emergency-equipment {
  border: 2px solid #015ebd;
  width: 100%;
  height: 1040px;
  position: relative;
  color: #fff;
  background-color: #001941;
}
.public-content {
  padding-left: 40px;
  padding-right: 40px;
}
.nav {
  font-size: 34px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 17px;
  background-color: #0b388b;
  > img {
    width: 25px;
    height: 41px;
    cursor: pointer;
    // margin: 0 15px;
  }
  > li {
    width: 226px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    margin-left: -17px;
    cursor: pointer;
    background: url("~@/assets/images/emergencyOrganizationCommandWar/nav_unactive.png")
      no-repeat;
    background-size: 100% 100%;
    &:nth-of-type(1) {
      margin: 0;
    }
  }
  .active {
    background: url("~@/assets/images/emergencyOrganizationCommandWar/nav_active.png")
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>
