<!--
 * @Description: 现场应急和指挥-平时
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-11-01 11:56:13
 * @LastEditTime: 2021-11-11 19:13:12
-->
<template>
  <div class="big-wrap">
    <Header title="现场救援抢险组织和指挥系统" />
    <div class="big-content">
      <div class="left" ref="left">
        <EmergencyAndComAndBurst />
        <TeamAndSuppliesAndDevice />
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
      <div class="right">
        <DisasterRisk />
        <PlanAndVideo />
      </div>
    </div>
      <!-- 图层 -->
    <div class="mapLayer"><mapLayer /></div>
  </div>
</template>

<script>
// import Header from "@/components/APicture/header";
import Header from "./componetns/header/index.vue";
/** 左侧 */
import EmergencyAndComAndBurst from "./componetns/emergencyAndComAndBurst/index.vue";
import TeamAndSuppliesAndDevice from "./componetns/teamAndSuppliesAndDevice/index.vue";

/** 右侧 */
import DisasterRisk from "./componetns/disasterRisk/index.vue";
import PlanAndVideo from "./componetns/planAndVideo/index.vue";
/* 混入 */
import { scaleMinix,lowLayer } from "@/utils/scalMinix";

import ContactPhone from "@/components/APicture/contactPhone/index.vue"; // 拨打电话
import MessageSend from "@/components/APicture/messageSend/index.vue"; // 发送短信
import mapLayer from "@/components/mapLayer/index.vue"; // 图层
// socket.io 监听
import { MessagePush } from "@/utils/pushMinix";

export default {
  mixins: [scaleMinix, MessagePush,lowLayer],
  components: {
    Header,
    EmergencyAndComAndBurst,
    TeamAndSuppliesAndDevice,
    DisasterRisk,
    PlanAndVideo,
    ContactPhone,
    MessageSend,
    mapLayer,
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initScale(()=>{
        this.setLowLayer(()=>{
          this.mapInit();
        });
      });
    });
    setTimeout(() => {
      this.setMapLayerStyle();
    }, 0);
  },
  methods: {
    setMapLayerStyle() {
      console.log(this.widthScrac, "widthScracwidthScrac");
      let left = document.querySelector(".left").clientWidth;
      console.log(left);
      let afterLeft = left * this.widthScrac + 20;
      document.querySelector(".mapLayer").style.left = afterLeft + "px";
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
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.show-map {
  width: 100%;
  height: 100%;
}
.mapLayer {
  position: absolute;
  left: 0;
  top: 8vh;
  z-index: 999999;
}
</style>
