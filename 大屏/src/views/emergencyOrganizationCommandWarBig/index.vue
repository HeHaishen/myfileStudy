<!--
 * @Description: 现场应急和指挥-战时
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-11-01 11:56:13
 * @LastEditTime: 2021-11-11 23:38:25
-->
<template>
  <div class="big-wrap">
    <Header title="现场救援抢险组织和指挥系统" />
    <div class="big-content">
      <div class="left">
        <incident-and-monitoring
          :eventData="saveQuery"
        ></incident-and-monitoring>
        <emergency-and-equipment></emergency-and-equipment>
      </div>
      <div class="center">
        <div class="show-map">
          <div id="crystalContainer">
            <div
              id="envCenterInfo"
              class="status-bar"
              style="left: 0px; right: 0px; bottom: 0px; display: none"
            >
              <div id="camera_alt">视点高：NaN米</div>
              <div id="env_alt">海拔：NaN米</div>
              <div id="env_lat">纬度：NaN</div>
              <div id="env_lon">经度：NaN</div>
            </div>
          </div>
        </div>

        <!-- 拨打电话 -->
        <ContactPhone ref="ContactPhone" />
        <!-- 发送短信 -->
        <MessageSend class="index_message_send" ref="MessageSend" />
      </div>
      <div class="home_icons" id="home_icons">
        <!-- 清除标志点 -->
        <ClearMap @doClearMap="doClearMap" />
        <!-- 控制地图试图 -->
        <Zoom />
        <!-- 地图绘制 -->
        <DrawMap />
        <!-- 预警信号 -->
        <Warning />
        <!-- 更换地图图层 -->
        <ChangeMapLayer />
        <!-- 地图工具 -->
        <TestBox />
        <!-- 视频 -->
        <VideoBox />
        <!-- 多人会议 -->
        <MeetingIcon ref="MeetingIcon" />
        <!-- 通讯录 -->
        <ContactsIcon />
        <!-- 无人机 -->
        <DroneIcon />
        <!--计划案 -->
        <PlanIcon ref="PlanIcon" />
        <!-- 事件 -->
        <EventIcon />
      </div>
      <div class="right">
        <DisasterAnalysis class="disaster_analysis" :eventData="saveQuery" />
        <disaster-and-instruction
          :eventData="saveQuery"
        ></disaster-and-instruction>
        <event-trace :eventData="saveQuery"></event-trace>
      </div>
      <!-- 图层 -->
      <mapLayer class="mapLayer" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.prototype.$EventBus = new Vue();

// import Header from "@/components/APicture/header";
import Header from "./componetns/header/index.vue";
import DisasterAndInstruction from "./componetns/disasterAndInstruction/index.vue";
import EventTrace from "./componetns/eventTrace/index.vue";
// 左侧
import IncidentAndMonitoring from "./componetns/incidentAndMonitoring/index.vue"; //事件概览与监控视频
import EmergencyAndEquipment from "./componetns/emergencyAndEquipment"; //突发事件与应急设备
/* 混入 */
import { scaleMinix, lowLayer } from "@/utils/scalMinix";

import ContactPhone from "@/components/APicture/contactPhone/index.vue"; // 拨打电话
import MessageSend from "@/components/APicture/messageSend/index.vue"; // 发送短信
import mapLayer from "@/components/mapLayer/index.vue"; // 图层
import DisasterAnalysis from "./componetns/disasterAnalysis/index.vue"; // 右下角三按钮
import { beginIntoEvent } from "@/api/emergencyOrganizationCommandWar/index";

import ClearMap from "./componetns/fixedIcon/clearMap/index.vue"; //点击清除地图打点
import Zoom from "./componetns/fixedIcon/zoom/index.vue"; //控制地图试图
import DrawMap from "./componetns/fixedIcon/drawMap/index.vue"; //地图绘制
import Warning from "./componetns/fixedIcon/warning/index.vue"; //预警信号
import ChangeMapLayer from "./componetns/fixedIcon/changeMapLayer/index.vue"; //切换地图图层
import TestBox from "./componetns/fixedIcon/testBox/index.vue"; // 地图工具箱
import VideoBox from "./componetns/fixedIcon/videoBox/index.vue"; // 地图工具箱
import MeetingIcon from "./componetns/fixedIcon/meetingIcon/index.vue"; // 多人会议
import ContactsIcon from "./componetns/fixedIcon/contactIcon/index.vue"; // 通讯录
import DroneIcon from "./componetns/fixedIcon/droneIcon/index.vue"; // 通讯录
import PlanIcon from "./componetns/fixedIcon/planIcon/index.vue"; // 预案
import EventIcon from "./componetns/fixedIcon/eventIcon/index.vue"; //

// socket.io 监听
import { MessagePush } from "@/utils/pushMinix";
import { getIdsmApi } from "@/api/idsm/index";

import { mapDrawTool } from "../../../public/gzznGIS/Content/drawTool";

export default {
  mixins: [scaleMinix, MessagePush, lowLayer],
  components: {
    Header,
    DisasterAndInstruction,
    EventTrace,
    IncidentAndMonitoring,
    EmergencyAndEquipment,
    ContactPhone,
    MessageSend,
    mapLayer,
    DisasterAnalysis,
    ClearMap,
    Zoom,
    DrawMap,
    Warning,
    ChangeMapLayer,
    TestBox,
    VideoBox,
    MeetingIcon,
    ContactsIcon,
    DroneIcon,
    PlanIcon,
    EventIcon,
  },
  data() {
    return {
      /** 是否标记加油站 用于取消打点使用！ */
      isMarkGasStation: false,
      /** 是否标记指挥中心 用于取消打点使用！ */
      isMarkCommandCenter: false,
      saveQuery: {},
      contentObj:{}
    };
  },
  created() {
    this.saveQuery = this.$route.query;
    this.doBeginIntoEvent(this.saveQuery);
  },
  methods: {
    setMapLayerStyle() {
      console.log(this.widthScrac, "widthScracwidthScrac");
      let left = document.querySelector(".left").clientWidth;
      let afterLeft = left * this.widthScrac + 20;
      document.querySelector(".mapLayer").style.left = afterLeft + "px";
    },
    // 查询事件概览
    getEventDetail(sid) {
      let code = "8qddPGf8";
      let data = {
        body: {
          jbbh: sid,
        },
        page: 1,
        pageSize: 10,
        sotName: "sid",
        sortOrde: "desc",
      };
      getIdsmApi(code, data)
        .then((res) => {
          if (res.success) {
            this.eventDetail = JSON.parse(JSON.stringify(res.body.data[0]));
            this.eventDetail.sjLevel = null;
            this.eventDetail.sjType = null;
            let datas = pGzznCore.deepClone(res.body.data[0]);
            let infos = [
              {
                title: "事件",
                textIndex: "xxbt",
              },
            ];
            var objs = {
              imgUrl: "gzznGIS/Image/fxyp/event_icon.png",
              imgSize: { width: 60, height: 60 },
              type: "defultTypesgEvent",
              info: infos,
              layerName: "事件",
              lonLat: { lon: "jd", lat: "wd" },
              isFlagPopule: true,
            };

            pGzznCore.setPointLayerToMap([datas], objs, () => {
              objs.data = [datas];
              pGzznCore.flyToPoint(
                { x: datas.jd, y: datas.wd, z: 13673 },
                objs
              );
            });

            //渲染1公里圈
            mapDrawTool.viewer = pGzznCore.viewer;
            mapDrawTool.clear(1, "circleEvent");
            mapDrawTool.drawCircleOutline(
              { y: datas.wd, x: datas.jd },
              1000,
              "red",
              "circle",
              { width: 5, isbd09towgs84: true, strType: "circleEvent" },
              (res) => {
                console.log(res, "1公里圈坐标");
              }
            );
             this.$nextTick(() => {
              this.$refs.PlanIcon.parentDatas = JSON.parse(
                JSON.stringify(this.eventDetail)
              );
              // this.$refs.aroundVideo.parentDatas = JSON.parse(
              //   JSON.stringify(this.eventDetail)
              // );
              this.$refs.MeetingIcon.parentDatas = JSON.parse(
                JSON.stringify(this.eventDetail)
              );
              // console.log(this.eventDetail);
              //this.$refs.aroundVideo.doGetIdsmApi();
            });
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error(error + "获取事件详情失败");
          }
        });
    },
    /* 进入指挥 */
    doBeginIntoEvent(obj) {
      /* 事件ID,事件名称，事件等级 */
      let sendObj = {
        eventId: obj.jbbh,
        eventName: obj.xxbt,
        eventLevel: obj.sjdjdm,
      };
      beginIntoEvent(sendObj).then((res) => {
        if (res.success) {
          console.log("进入指挥", res);
          this.$MyMessage.success("开始进入指挥");
        } else {
          this.$MyMessage.Warning("进入指挥失败！");
        }
      });
    },
    mapInit() {
      window.addPromiseVideo = this.addPromiseVideo;
      window.mapClickTeamMessage = this.clickTeamMessage;
      window.mapClickTeamPhone = this.clickTeamPhone;
      window.remoteIotDeviceDatas = this.doGetIotDevice;
      window.remoteTeamInfoDatas = this.remoteDatas;
      window.remoteQuipmentDatas = this.doGeteQuipment;
      window.remoteFacilitieDatas = this.doGetFacilities;
      window.remoteTeamPersonDatas = this.doGetTeamPerson;
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.gzLineightColour = true;
      pGzznCore.FlyTo(1);
      document.getElementById("envCenterInfo").style.right = "0";
      pGzznCore.mapClickTeamPhoneMessage = true;
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
    doGeteQuipment() {},
    doGetFacilities() {},
    doGetTeamPerson() {},
    doGetIotDevice() {},
    remoteDatas() {},
    doClearMap(clickNum) {
      this.$EventBus.$emit("mapClearAll");
      this.$EventBus.$emit("statisticsMapClear");
      this.isMarkGasStation = true;
      this.isMarkCommandCenter = true;
      this.onCommandCenter();
      this.onGasStation();
    },
    /** 指挥中心 */
    onCommandCenter() {
      let list = [
        {
          name: "广州市应急管理局指挥中心",
          address: "广州市越秀区吉祥路46号",
          lon: "113.260519996145",
          lat: "23.1303255055884",
          devInfo: "数量（1）、联系人（王玺/18588926317）",
          devInfoTo: "数量（1）、联系人（王玺/18588926317）",
        },
      ];
      let items = pGzznCore.deepClone(list);
      let columns = [
        { title: "名称", textIndex: "name" },
        { title: "地址", textIndex: "address" },
        { title: "小鱼易联", textIndex: "devInfo" },
        { title: "布控球", textIndex: "devInfoTo" },
      ];
      if (this.isMarkCommandCenter) {
        this.isMarkCommandCenter = false;
        pGzznCore.pointLayerRemove({
          type: "commandcenterdefaultType",
          isFlag: true,
        });
        return;
      }
      this.isMarkCommandCenter = true;
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/command_center.png",
        imgSize: { width: 30, height: 26 },
        type: "commandcenterdefaultType",
        layerName: "指挥中心",
        info: columns,
        phoneInfo: { phone: "devOnePhone", name: "devOneFzr" },
        lonLat: { lon: "lon", lat: "lat" },
      };

      pGzznCore.setPointLayerToMap(items, objs);
    },

    /** 加油站点击事件 */
    onGasStation() {
      getIdsmApi("CDubQsGk", {
        body: {
          type: 1,
        },
      }).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.setLayerToMap(res.body.data, "defaultTypegasstation", true);
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },

    setLayerToMap(list, typeStr, isFlag = false) {
      let items = pGzznCore.deepClone(list);
      let columns = [
        { title: "名称", textIndex: "name" },
        { title: "地址", textIndex: "address" },
        { title: "联系电话", textIndex: "phone" },
      ];
      if (this.isMarkGasStation) {
        this.isMarkGasStation = false;
        pGzznCore.pointLayerRemove({ type: typeStr, isFlag: isFlag });
        return;
      }
      this.isMarkGasStation = true;
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/gas_station.svg",
        imgSize: { width: 32, height: 32 },
        type: typeStr,
        layerName: "加油站",
        info: columns,
        phoneInfo: { phone: "phone", name: "name" },
        lonLat: { lon: "lon", lat: "lat" },
      };

      pGzznCore.setPointLayerToMap(items, objs);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initScale(() => {
        this.setLowLayer(() => {
          this.mapInit();
        });
      });
      // this.mapInit();
      this.getEventDetail(this.saveQuery.jbbh);
    });
    setTimeout(() => {
      this.setMapLayerStyle();
    }, 0);
  },
  beforeDestroy() {
    pGzznCore = null;
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.show-map {
  width: 100%;
  height: 100%;
}

.disaster_analysis {
  position: fixed;
  right: 2950px;
  bottom: 0;
  width: 135px;
  height: 410px;
  z-index: 9999;
  // background: rgba(22, 51, 55, 0.5);
  // border: 1px #00ffff solid;
  transition: all 0.5s;
  color: white;
  font-size: 26px;
}
.mapLayer {
  position: absolute;
  left: 0;
  top: 8vh;
  z-index: 999999;
}
</style>
