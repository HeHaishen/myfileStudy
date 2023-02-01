/*
 * @Description: 路由-修改格式vb
 * @Version: 1.0
 * @Autor: sude
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-11-01 14:44:31
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/floodPreventionWar",
    name: "floodPreventionWar",
    meta: {
      title: "森林火灾-战时",
    },
    component: () => import("../views/floodPreventionWar"),
  },
  {
    path: "/floodPreventionWarNew",
    name: "floodPreventionWarNew",
    meta: {
      title: "森林火灾-战时36比9",
    },
    component: () => import("../views/floodPreventionWar/newIndex"),
  },
  {
    path: "/forestFire",
    name: "forestFire",
    meta: {
      title: "森林火灾-平时",
    },
    component: () => import("../views/forestFire"),
  },
  {
    path: "/dragonBoat",
    name: "dragonBoat",
    meta: {
      title: "龙舟水",
    },
    component: () => import("../views/dragonBoat"),
  },
  {
    path: "/enterpriseRisk",
    name: "EnterpriseRisk",
    meta: {
      title: "企业风险情况",
    },
    component: () => import("../views/components/enterprise/enterpriseRisk"),
  },
  {
    path: "/dangerStatistics",
    name: "DangerStatistics",
    meta: {
      title: "行业统计",
    },
    component: () => import("../views/components/enterprise/dangerStatistics"),
  },
  {
    path: "/detonation",
    name: "Detonation",
    meta: {
      title: "粉尘涉爆",
    },
    component: () => import("../views/components/enterprise/detonation"),
  },
  {
    path: "/warnScreen",
    name: "WarnScreen",
    meta: {
      title: "监测预警",
    },
    component: () =>
      import(
        "../views/autoScreen/conductScreen/ordinaryTime/monitorInfor/warnScreen"
      ),
  },
  {
    path: "/eventList",
    name: "EventList",
    meta: {
      title: "事件信息",
    },
    component: () =>
      import("../views/autoScreen/conductScreen/ordinaryTime/eventList"),
  },
  {
    path: "/integratedManage",
    name: "IntegratedManage",
    meta: { title: "综合管理平台-中" },
    component: () => import("../views/integratedManage/index.vue"),
  },
  {
    path: "/integratedManageLeft",
    name: "IntegratedManageLeft",
    meta: { title: "综合管理平台-左" },
    component: () => import("../views/integratedManage/left.vue"),
  },
  {
    path: "/integratedManageRight",
    name: "IntegratedManageRight",
    meta: { title: "综合管理平台-右" },
    component: () => import("../views/integratedManage/right.vue"),
  },
  {
    path: "/rainstorm",
    name: "Rainstorm",
    meta: {
      title: "防暴雨-中",
    },
    component: () => import("../views/rainstorm"),
  },
  {
    path: "/rainstormLeft",
    name: "RainstormLeft",
    meta: {
      title: "防暴雨-左",
    },
    component: () => import("../views/rainstorm/left.vue"),
  },
  {
    path: "/rainstormRight",
    name: "RainstormRight",
    meta: {
      title: "防暴雨-右",
    },
    component: () => import("../views/rainstorm/right.vue"),
  },
  {
    path: "/typhoon",
    name: "Typhoon",
    meta: {
      title: "防风-中",
    },
    component: () => import("../views/typhoon"),
  },
  {
    path: "/typhoonLeft",
    name: "TyphoonLeft",
    meta: {
      title: "防风-左",
    },
    component: () => import("../views/typhoon/left.vue"),
  },
  {
    path: "/typhoonRight",
    name: "TyphoonRight",
    meta: {
      title: "防风-右",
    },
    component: () => import("../views/typhoon/right.vue"),
  },
  {
    path: "/floodDedense",
    name: "FloodDedense",
    meta: {
      title: "防汛",
    },
    component: () => import("../views/floodDedense"),
  },
  {
    path: "/holidayManage",
    name: "HolidayManage",
    meta: {
      title: "节假日-中",
    },
    component: () => import("../views/holidayManage"),
  },
  {
    path: "/holidayManageLeft",
    name: "HolidayManageLeft",
    meta: {
      title: "节假日-左",
    },
    component: () => import("../views/holidayManage/left.vue"),
  },
  {
    path: "/holidayManageRight",
    name: "HolidayManageRight",
    meta: {
      title: "节假日-右",
    },
    component: () => import("../views/holidayManage/right.vue"),
  },
  {
    path: "/forestFireWartime",
    name: "ForestFireWartime",
    meta: {
      title: "森林防火-战时-中",
    },
    component: () => import("../views/forestFireWartime"),
  },
  {
    path: "/forestFireWartimeLeft",
    name: "ForestFireWartimeLeft",
    meta: {
      title: "森林防火-战时-左",
    },
    component: () => import("../views/forestFireWartime/left.vue"),
  },
  {
    path: "/forestFireWartimeRight",
    name: "ForestFireWartimeRight",
    meta: {
      title: "森林防火-战时-右",
    },
    component: () => import("../views/forestFireWartime/right.vue"),
  },
  {
    path: "/dragonBoatWartime",
    name: "DragonBoatWartime",
    meta: {
      title: "水龙舟-战时-中",
    },
    component: () => import("../views/dragonBoatWartime"),
  },
  {
    path: "/dragonBoatWartimeLeft",
    name: "DragonBoatWartimeLeft",
    meta: {
      title: "水龙舟-战时-左",
    },
    component: () => import("../views/dragonBoatWartime/left.vue"),
  },
  {
    path: "/dragonBoatWartimeRight",
    name: "DragonBoatWartimeRight",
    meta: {
      title: "水龙舟-战时-右",
    },
    component: () => import("../views/dragonBoatWartime/right.vue"),
  },
  {
    path: "/bigScreenHome",
    name: "BigScreenHome",
    meta: {
      title: "大屏首页",
    },
    component: () => import("../views/bigScreenHome/index.vue"),
  },
  {
    path: "/dataConstruction",
    name: "DataConstruction",
    meta: {
      title: "数据建设",
    },
    component: () => import("../views/dataConstruction"),
  },
  {
    path: "/emergencyOverview",
    name: "emergencyOverview",
    meta: {
      title: "应急概览一张图",
    },
    component: () => import("../views/emergencyOverview"),
  },
  {
    path: "/emergencyResources",
    name: "emergencyResources",
    meta: {
      title: "应急资源一张图",
    },
    component: () => import("../views/emergencyResources"),
  },
  {
    path: "/theCitysDanger",
    name: "theCitysDanger",
    meta: {
      title: "全市重大危险源一张图",
    },
    component: () => import("../views/theCitysDanger"),
  },
  {
    path: "/dustAndExplosion",
    name: "DustAndExplosion",
    meta: {
      title: "涉尘涉爆",
    },
    component: () => import("../views/dustAndExplosion/index.vue"),
  },
  {
    path: "/dustAndExplosionNew",
    name: "DustAndExplosionNew",
    meta: {
      title: "涉尘涉爆-新",
    },
    component: () => import("../views/dustAndExplosionNew/index.vue"),
  },
  {
    path: "/constructionAchievement",
    name: "ConstructionAchievement",
    meta: {
      title: "建设成果展示",
    },
    component: () => import("../views/constructionAchievements/index.vue"),
  },
  {
    path: "/cityPrevention",
    name: "CityPrevention",
    meta: {
      title: "全市三防",
    },
    component: () => import("../views/cityPrevention/index.vue"),
  },
  {
    path: "/hazardousChemicals",
    name: "HazardousChemicals",
    meta: {
      title: "危险化学品",
    },
    component: () => import("../views/hazardousChemicals/index.vue"),
  },
  {
    path: "/achievements",
    name: "Achievements",
    meta: {
      title: "建设成果展示",
    },
    component: () => import("../views/achievements/index.vue"),
  },
  {
    path: "/cityHiddenDangerFirm",
    name: "CityHiddenDangerFirm",
    meta: {
      title: "全市隐患",
    },
    component: () => import("../views/CityHiddenDanger/index.vue"),
  },
  {
    path: "/holidayPatternNew",
    name: "holidayPatternNew",
    meta: {
      title: "应急管理综应用-节假日模式",
    },
    component: () => import("../views/holidayPatternNew/index.vue"),
  },
  {
    path: "/normalcyPattern",
    name: "normalcyPattern",
    meta: {
      title: "应急管理综应用-常态模式",
    },
    component: () => import("../views/normalcyPattern/index.vue"),
  },
  {
    path: "/dragonBoatNormal",
    name: "dragonBoatNormal",
    meta: {
      title: "龙舟水平时",
    },
    component: () => import("../views/dragonBoatNormal/index.vue"),
  },
  {
    path: "/theCityThreeProofing",
    name: "theCityThreeProofing",
    meta: {
      title: "全市三防一张图",
    },
    component: () => import("../views/theCityThreeProofing/index.vue"),
  },
  {
    path: "/integratedEmergency",
    name: "integratedEmergency",
    meta: {
      title: "应急综合管理应用平台",
    },
    component: () => import("../views/integratedEmergency/index.vue"),
  },
  {
    path: "/threeProoingHomePages",
    name: "threeProoingHomePages",
    meta: {
      title: "广州市应急管理应用平台",
    },
    component: () => import("../views/threeProoingHomePages/index.vue"),
  },
  {
    path: "/threeProoingRainfallColor",
    name: "threeProoingRainfallColor",
    meta: {
      title: "雨量色斑图",
    },
    component: () => import("../views/threeProoingRainfallColor/index.vue"),
  },
  {
    path: "/threeProoingRainfallDatas",
    name: "threeProoingRainfallDatas",
    meta: {
      title: "雨量数据表",
    },
    component: () => import("../views/threeProoingRainfallDatas/index.vue"),
  },
  {
    path: "/threeProoingWindDatas",
    name: "threeProoingWindDatas",
    meta: {
      title: "风情数据表",
    },
    component: () => import("../views/threeProoingWindDatas/index.vue"),
  },
  {
    path: "/majorFestivalsConductor",
    name: "majorFestivalsConductor",
    meta: {
      title: "重大节日指挥",
    },
    component: () => import("../views/majorFestivalsConductor/index.vue"),
  },
  {
    path: "/wrapLinkCalling",
    name: "wrapLinkCalling",
    meta: {
      title: "外部融合通信",
    },
    component: () => import("../views/wrapLinkCalling/index.vue"),
  },
  {
    path: "/moreVideos",
    name: "moreVideos",
    meta: {
      title: "16路视频监控",
    },
    component: () => import("../views/moreVideos/index.vue"),
  },
  // 现场救援抢险组织和指挥
  {
    path: "/emergencyOrganizationCommand",
    name: "emergencyOrganizationCommand",
    meta: {
      title: "",
    },
    component: () => import("../views/emergencyOrganizationCommand/index.vue"),
  },
  // 现场救援抢险组织和指挥战时
  {
    path: "/emergencyOrganizationCommandWar",
    name: "emergencyOrganizationCommandWar",
    meta: {
      title: "",
    },
    component: () => import("../views/emergencyOrganizationCommandWar/index.vue"),
  },
  {
    path: "/maptest",
    name: "maptest",
    meta: {
      title: "地图测试",
    },
    component: () => import("../views/maptest/index.vue"),
  },
  // emergencyOrganizationCommandBig
  {
    path: "/emergencyOrganizationCommandBig",
    name: "emergencyOrganizationCommandBig",
    meta: {
      title: "应急指挥大屏-平时",
    },
    component: () => import("../views/emergencyOrganizationCommandBig/index.vue"),
  },
  {
    path: "/emergencyOrganizationCommandWarBig",
    name: "emergencyOrganizationCommandWarBig",
    meta: {
      title: "应急指挥大屏-平时",
    },
    component: () => import("../views/emergencyOrganizationCommandWarBig/index.vue"),
  },
];
const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
