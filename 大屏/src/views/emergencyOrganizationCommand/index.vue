<!--
 * @Description: 现场救援抢险组织和指挥
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-10-09 18:09:42
 * @LastEditTime: 2021-11-06 17:09:42
-->
<template>
  <div class="major-wrap">
    <div class="major-header">
      <Header />
    </div>
    <div class="major-contents">
      <div class="show-map">
        <div id="crystalContainer">
          <div id="envCenterInfo" class="status-bar" style="left: 0px; right: 0px; bottom: 0px;display:none">
            <div id="camera_alt">视点高：NaN米</div>
            <div id="env_alt">海拔：NaN米</div>
            <div id="env_lat">纬度：NaN</div>
            <div id="env_lon">经度：NaN</div>
          </div>
        </div>
      </div>
      <!-- <div class="icon_heat_map" :class="[!leftShow && 'hide', isHeatMapWid && 'active']" title="人流热力图" @click="openHeatMap">
        <svg t="1633960418690" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2261" width="100%" height="100%">
          <path d="M869.82594893 581.09090908c-132.15909112-135-118.7499999-186.36363633-99.31818164-240.22727314C790.05322197 287 742.78049433 49.84090947 567.66685801 141.99999981c-175.11363633 92.27272763-122.95454502 215.68181836-247.84090928 210.11363613-124.88636338-5.4545458-278.40909112 61.59090937-186.81818203 308.86363652 35.79545479 96.59090918 103.86363604 190.34090948 209.2045456 203.86363623 105.34090869 13.52272763 278.29545469-20.90909092 383.63636426 31.47727324 105.22727315 52.38636328 276.02272705-180.22727285 143.97727237-315.22727285zM697.32594863 834.15909131c-88.86363662-41.36363614-234.31818164-17.0454542-323.63636308-26.93181885-89.31818144-9.88636377-158.18181856-72.15909082-187.50000059-150.22727227-75.11363614-199.54545469 70.11363604-255.90909112 176.13636416-252.72727295 105.90909082 3.18181816 61.02272724-120.34090898 210.56818184-196.81818222 149.54545459-76.47727237 159.09090908 121.59090879 142.04545401 165.45454629-19.77272754 50.68181778-18.06818203 98.75000039 97.61363701 211.59090879C923.46231289 692.68181856 786.30322167 875.63636386 697.32594863 834.15909131z m1e-8 0" fill="#6E72DF" p-id="2262"></path>
          <path d="M253.12140372 535.29545498c-48.06818174 41.36363614-6.81818203 139.43181797 55.11363573 159.5454539 62.0454542 20.11363594 123.2954543-2.04545479 171.47727334-43.97727216 48.06818174-42.04545469 41.70454541-186.59090918-38.29545527-148.97727334-79.88636338 37.38636386-90.22727285-51.02272705-188.29545381 33.4090916z m-1e-8 0" fill="#FF7272" p-id="2263"></path>
          <path d="M601.98504013 257.34090869c-57.38636338 14.77272744-111.47727305 111.13636377-88.29545448 154.09090987 23.18181855 42.72727237 73.18181777 118.86363633 56.81818125 173.97727206-16.36363653 55.0000002-4.20454512 121.81818164 50.56818222 141.59090919 54.77272734 19.77272754 171.81818174 13.18181836 173.2954544-44.5454543 1.47727266-57.72727266-138.18181817-119.2045456-142.15909131-213.52272715-3.86363672-94.31818154 43.06818164-235.68181787-50.22727208-211.59090967z m0 0" fill="#F6C244" p-id="2264"></path>
        </svg>

        <div class="icon_heat_map_layer" v-if="isHeatMapWid">
          <span :title="item.label" v-for="item in heatMapList" :key="item.key" @click="openUrl(item.url)">{{ item.label }}</span>
        </div>
      </div>

      <div class="icon_heat_map gas_station" :class="[!leftShow && 'hide']" title="加油站" @click="onGasStation">
        <svg t="1634127088889" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1917" width="100%" height="100%" data-spm-anchor-id="a313x.7781069.0.i9">
          <path d="M174.545455 256m23.272727 0l465.454545 0q23.272727 0 23.272728 23.272727l0 93.090909q0 23.272727-23.272728 23.272728l-465.454545 0q-23.272727 0-23.272727-23.272728l0-93.090909q0-23.272727 23.272727-23.272727Z" fill="#d81e06" p-id="1918" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path>
          <path d="M884.363636 256m-69.818181 0a69.818182 69.818182 0 1 0 139.636363 0 69.818182 69.818182 0 1 0-139.636363 0Z" fill="#ffffff" p-id="1919"></path>
          <path d="M979.781818 372.363636l-74.472727-128a23.272727 23.272727 0 1 0-40.261818 23.272728l74.472727 128a23.272727 23.272727 0 0 1 3.025455 11.636363V768a23.272727 23.272727 0 0 1-23.272728 23.272727h-46.545454a23.272727 23.272727 0 0 1-23.272728-23.272727V395.636364a69.818182 69.818182 0 0 0-69.818181-69.818182h-46.545455V162.909091a162.909091 162.909091 0 0 0-162.909091-162.909091h-279.272727a162.909091 162.909091 0 0 0-162.909091 162.909091v814.545454h-69.818182a23.272727 23.272727 0 0 0 0 46.545455h744.727273a23.272727 23.272727 0 0 0 0-46.545455h-69.818182V372.363636h46.545455a23.272727 23.272727 0 0 1 23.272727 23.272728v372.363636a69.818182 69.818182 0 0 0 69.818182 69.818182h46.545454a69.818182 69.818182 0 0 0 69.818182-69.818182V408.203636a69.818182 69.818182 0 0 0-9.309091-35.84zM174.545455 977.454545V162.909091a116.363636 116.363636 0 0 1 116.363636-116.363636h279.272727a116.363636 116.363636 0 0 1 116.363637 116.363636v814.545454z" fill="#f4ea2a" p-id="1920" data-spm-anchor-id="a313x.7781069.0.i10" class=""></path>
          <path d="M570.181818 465.454545h-279.272727a69.818182 69.818182 0 0 1-69.818182-69.818181v-139.636364a69.818182 69.818182 0 0 1 69.818182-69.818182h279.272727a69.818182 69.818182 0 0 1 69.818182 69.818182v139.636364a69.818182 69.818182 0 0 1-69.818182 69.818181z m-279.272727-232.727272a23.272727 23.272727 0 0 0-23.272727 23.272727v139.636364a23.272727 23.272727 0 0 0 23.272727 23.272727h279.272727a23.272727 23.272727 0 0 0 23.272727-23.272727v-139.636364a23.272727 23.272727 0 0 0-23.272727-23.272727z" fill="#ffffff" p-id="1921"></path>
        </svg>
      </div>
      <div class="icon_heat_map ai_car" :class="[!leftShow && 'hide']" title="无人驾驶应急指挥车" @click="onAICar">
        <svg t="1634130019663" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3968" width="100%" height="100%">
          <path d="M487.68 866.56c193.28 0 350.08-156.8 350.08-350.08 0-193.28-156.8-350.08-350.08-350.08C294.4 166.4 137.6 323.2 137.6 516.48c0.64 193.28 157.44 350.08 350.08 350.08z m295.04-296.32c-10.88 62.72-40.96 119.04-82.56 161.92-40.32 41.6-92.16 71.04-149.76 83.84 3.2-30.08 6.4-71.68 12.16-106.88 15.36-97.92 45.44-140.16 131.2-156.8 23.68-4.48 49.28-4.48 74.24-4.48 11.52 0 18.56 5.12 14.72 22.4zM220.16 438.4c-15.36 0.64-20.48-6.4-16.64-21.76 14.72-46.08 39.68-87.04 72.32-120.96C330.88 239.36 409.6 211.2 488.32 211.2c78.72 0 157.44 28.16 211.84 84.48 32.64 33.28 57.6 74.88 72.32 120.96 3.84 15.36-1.28 23.04-16.64 21.76H220.16z m-11.52 109.44c24.96-0.64 49.92-0.64 74.24 4.48 85.12 16.64 115.84 58.88 131.2 156.8 5.76 35.2 8.96 76.8 12.16 106.88-57.6-12.8-109.44-42.24-149.76-83.84-42.24-43.52-71.68-99.2-82.56-161.92-4.48-17.28 2.56-22.4 14.72-22.4z" fill="#1297B5" p-id="3969"></path>
          <path d="M487.68 879.36c-199.68 0-362.88-162.56-362.88-362.88C124.8 316.8 287.36 153.6 487.68 153.6c199.68 0 362.88 162.56 362.88 362.88 0 200.32-162.56 362.88-362.88 362.88z m0-699.52c-185.6 0-337.28 151.04-337.28 337.28 0 185.6 151.04 337.28 337.28 337.28s337.28-151.04 337.28-337.28-151.04-337.28-337.28-337.28zM535.68 832l3.2-32.64c2.56-27.52 5.76-62.08 10.24-92.16 16.64-106.24 53.12-150.4 140.8-167.04 26.24-5.12 53.12-5.12 76.8-4.48 10.88 0 18.56 2.56 23.68 8.96 5.76 6.4 7.04 16 3.84 28.16-11.52 64-40.96 122.24-86.4 168.32-42.88 44.16-96.64 74.24-156.16 87.68l-16 3.2zM748.8 560.64c-17.28 0-35.84 0.64-53.12 4.48-76.8 14.72-105.6 50.56-120.96 145.92-4.48 28.16-7.68 61.44-10.24 88.32 47.36-13.44 90.88-39.68 126.08-76.16 41.6-42.88 69.12-96.64 79.36-155.52v-0.64c0.64-3.2 0.64-5.12 0.64-5.76h-4.48c-5.12-0.64-10.88-0.64-17.28-0.64zM440.32 832l-17.28-3.84c-58.88-12.8-113.28-42.88-156.16-87.68-44.8-46.08-74.88-104.32-86.4-168.32-2.56-12.16-1.28-21.12 3.84-28.16 5.12-6.4 13.44-9.6 23.68-8.96 23.68-0.64 50.56-0.64 76.8 4.48C372.48 556.8 409.6 600.32 426.24 706.56c4.48 30.08 7.68 64.64 10.24 92.16l3.84 33.28zM204.8 561.28c0 1.28 0 3.2 0.64 5.76v0.64c10.24 58.88 37.76 112.64 79.36 155.52 35.2 36.48 78.72 62.08 126.08 76.16-2.56-26.88-5.76-59.52-10.24-88.32-14.72-95.36-44.16-131.2-120.96-145.92-23.68-4.48-49.28-4.48-71.68-3.84h-1.28c0-0.64-1.28-0.64-1.92 0z m553.6-110.08H220.16c-11.52 0.64-19.84-2.56-25.6-8.96-5.76-7.04-7.04-16.64-3.84-28.8v-0.64c15.36-47.36 41.6-90.24 75.52-125.44C321.28 230.4 401.92 198.4 488.32 198.4c85.76 0 166.4 32 220.8 88.32 33.92 35.2 60.16 78.72 75.52 125.44v0.64c3.2 12.16 1.92 21.76-3.84 28.8-5.12 6.4-12.8 9.6-22.4 9.6z m-538.88-25.6H760.96c0-0.64 0-2.56-0.64-5.12-14.08-43.52-37.76-83.2-69.12-115.2-49.92-51.2-123.52-80.64-202.88-80.64-79.36 0-152.96 29.44-202.88 80.64-31.36 32.64-55.68 72.32-69.12 115.2-0.64 2.56-0.64 4.48-0.64 5.12h3.84z" fill="#29E0F6" p-id="3970"></path>
          <path d="M488.96 545.92m-61.44 0a61.44 61.44 0 1 0 122.88 0 61.44 61.44 0 1 0-122.88 0Z" fill="#0EAFC9" p-id="3971"></path>
          <path d="M488.96 620.16c-40.96 0-74.24-33.28-74.24-74.24S448 471.68 488.96 471.68 563.2 504.96 563.2 545.92s-33.28 74.24-74.24 74.24z m0-122.24c-26.88 0-48.64 21.76-48.64 48.64s21.76 48.64 48.64 48.64 48.64-21.76 48.64-48.64-21.76-48.64-48.64-48.64zM864 377.6c-5.76 0-11.52-3.84-12.8-10.24-14.72-68.48-88.32-132.48-88.96-133.12-5.12-4.48-5.76-12.8-1.28-17.92 4.48-5.12 12.8-5.76 17.92-1.28 3.2 2.56 80.64 70.4 97.28 147.2 1.28 7.04-3.2 13.44-9.6 15.36-0.64-0.64-1.92 0-2.56 0zM900.48 321.28c-5.76 0-11.52-3.84-12.8-10.24-8.32-40.96-53.12-84.48-53.76-84.48-5.12-5.12-5.12-12.8 0-17.92 5.12-5.12 12.8-5.12 17.92 0 1.92 1.92 50.56 49.28 60.8 97.92 1.28 7.04-3.2 13.44-9.6 15.36-1.28-0.64-1.92-0.64-2.56-0.64z" fill="#29E0F6" p-id="3972"></path>
          <path d="M238.08 845.44c-2.56 0-5.12-0.64-7.04-2.56-3.84-2.56-87.68-61.44-112-136.96-1.92-7.04 1.28-14.08 8.32-16 7.04-1.92 14.08 1.28 16 8.32 21.12 66.56 101.12 122.88 101.76 123.52 5.76 3.84 7.04 12.16 3.2 17.92-2.56 3.84-6.4 5.76-10.24 5.76z" fill="#29E0F6" p-id="3973"></path>
          <path d="M167.04 859.52c-2.56 0-5.76-0.64-7.68-2.56-2.56-1.92-55.68-44.16-70.4-90.88-1.92-7.04 1.28-14.08 8.32-16 7.04-1.92 14.08 1.28 16 8.32 12.8 39.68 61.44 78.08 62.08 78.72 5.76 4.48 6.4 12.16 1.92 17.92-2.56 2.56-6.4 4.48-10.24 4.48z" fill="#29E0F6" p-id="3974"></path>
        </svg>
      </div> -->
      <!-- 指挥中心 -->
      <!-- <div class="icon_heat_map command_center" :class="[!leftShow && 'hide']" title="指挥中心" @click="onCommandCenter">
        <svg t="1634351611898" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9655" width="100%" height="100%">
          <path d="M441.432 17.655h217.953a17.655 17.655 0 0 1 14.195 28.16l-57.45 77.7 59.004 77.807a17.655 17.655 0 0 1-14.071 28.319H448.177v69.702l258.03 0.318c17.249 0 31.25 13.983 31.25 31.25v499.924h23.304V455.539h94.756c17.249 0 31.25 13.983 31.25 31.25v344.046h31.302a31.25 31.25 0 1 1 0 62.481H711.786a31.426 31.426 0 0 1-5.58 0.495l-388.413-0.495H105.931a31.25 31.25 0 0 1 0-62.481h31.25V486.77c0-17.25 13.965-31.232 31.214-31.232h96.433v375.313h21.715V330.4c0-17.25 14.001-31.232 31.25-31.232l77.418 0.106V35.31a26.483 26.483 0 0 1 46.221-17.655z m-79.501 953.38h317.793a26.483 26.483 0 0 1 0 52.965H361.931a26.483 26.483 0 0 1 0-52.966z m164.476-396.977V425.172L405.204 616.73l58.933-7.697v159.214l141.77-209.92-79.5 15.73z" fill="#1296db" p-id="9656"></path>
        </svg>
      </div> -->

      <!-- TODO 图标 -->
      <layerIcon class="layerIcon" :class="[!leftShow && 'hide']" />

      <!-- 左 -->
      <!-- <EmergencyEvent v-show="leftShow" /> -->
      <OnDuty v-show="leftShow" />
      <DepartMent v-show="leftShow" />
      <RescueTeam v-show="leftShow" />
      <CommandAndCommunication v-show="leftShow" />
      <ReliefSupplies v-show="leftShow" />
      <!-- 右 -->
      <EmergencyEventChange @openPlan="openPlan()" v-show="rightShow" />
      <FourStatistics v-show="rightShow" />
      <AroundVideo v-show="rightShow" />
      <DisasterRisk v-show="rightShow" />
      <!-- <CommandRescueOrg v-show="rightShow" /> -->
      <!-- <ThreeDefenses v-show="rightShow" /> -->
      <!-- <FirePrevention v-show="rightShow" /> -->
      <!-- <DangerousSupervise v-show="rightShow" /> -->
      <!-- <EnterpriseRisk v-show="rightShow" /> -->
      <ContingencyPlan v-if="planShow" @doClose="planClose" />
      <!-- <LeaderGroup /> -->
      <!-- 拨打电话 -->
      <ContactPhone ref="ContactPhone" />
      <!-- 发送短信 -->
      <MessageSend class="index_message_send" ref="MessageSend" />

      <!-- 最新 -->
      
    </div>
    <!-- <div class="small-and-change" :class="[leftShow ? 'small-and-change-left' : 'small-height-change-left']" @click="hiddenShowLeftClick">
      {{ leftShow ? "《" : "》" }}
    </div>
    <div class="small-and-change" :class="[
        rightShow ? 'small-and-change-right' : 'small-height-change-right',
      ]" @click="hiddenShowRightClick">
      {{ rightShow ? "》" : "《" }}
    </div> -->
  </div>
</template>

<script>
import Header from "./components/header/index.vue"; // 头部
import ModelBox from "./components/modelBox/index.vue"; // 公共组件
import DangerousSupervise from "./components/dangerousSupervise/index.vue"; //危险化学品
import EnterpriseRisk from "./components/enterpriseRisk/index.vue"; //企业隐患
import ContingencyPlan from "./components/contingencyPlan/index.vue"; // 应急预案
import RescueTeam from "./components/rescueTeam/index.vue"; // 应急救援队伍
import CommandRescueOrg from "./components/commandRescueOrg/index.vue"; // 指挥救援组织
import FirePrevention from "./components/firePrevention/index.vue"; // 防火
import ThreeDefenses from "./components/threeDefenses/index.vue"; // 三防
import ReliefSupplies from "./components/reliefSupplies/index.vue"; // 救援物资
import EmergencyEvent from "./components/emergencyEvent/index.vue"; // 应急事件
import CommandAndCommunication from "./components/commandAndCommunication/index.vue"; // 应急指挥及通信
import AroundVideo from "./components/aroundVideo/index.vue"; // 应急事件
import FourStatistics from "./components/FourStatistics/index.vue"; //四馆统计
import layerIcon from "./components/layerIcon/index.vue"; // 小图标
import ContactPhone from "@/components/APicture/contactPhone/index.vue"; // 拨打电话
import MessageSend from "@/components/APicture/messageSend/index.vue"; // 发送短信
import OnDuty from "./components/onDuty/index.vue"; // 应急值守
import DepartMent from "./components/departMent/index.vue"; // 应急管理局


// 最新引入
import EmergencyEventChange from "./components/emergencyEventChange/index.vue"; // 应急事件
import DisasterRisk from './components/disasterRisk/index.vue' // 灾害风险实时检查情况

import LeaderGroup from "./components/contingencyPlan/leaderGroup"; //领导小组
import Cookies from "js-cookie";

import Vue from "vue";
Vue.prototype.$EventBus = new Vue();

import { getIdsmApi } from "@/api/idsm/index";
import TreeItemVue from "@/components/VueTree/TreeItem.vue";

// socket.io 监听
import { MessagePush } from "@/utils/pushMinix";

export default {
  mixins:[MessagePush],
  components: {
    Header,
    ModelBox,
    RescueTeam,
    DangerousSupervise,
    CommandRescueOrg,
    EnterpriseRisk,
    ContingencyPlan,
    EmergencyEvent,
    ReliefSupplies,
    CommandAndCommunication,
    AroundVideo,
    FourStatistics,
    ContactPhone,
    MessageSend,
    layerIcon,
    FirePrevention,
    FirePrevention,
    ThreeDefenses,
    // 最新
    EmergencyEventChange,
    LeaderGroup,
    OnDuty,
    DepartMent,
    DisasterRisk
  },
  data() {
    return {
      leftShow: true,
      rightShow: true,
      planShow: false,
      /** 是否标记加油站 用于取消打点使用！ */
      isMarkGasStation: false,
      /** 是否标记指挥中心 用于取消打点使用！ */
      isMarkCommandCenter: false,
      heatMapList: [
        { label: "中国移动", key: "1", url: "https://heatmap.hivedata.com.cn" },
        {
          label: "中国联通",
          key: "2",
          url: "http://122.13.0.169:10001/anov/canton-fair/#/ssjc",
        },
        {
          label: "中国电信",
          key: "3",
          url: "http://122.13.0.169:10001/anov/canton-fair/#/ssjc",
        },
      ],
      /** 人流热力图视窗 */
      isHeatMapWid: false,
    };
  },
  methods: {
    mapInit() {
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.gzLineightColour = true;
      pGzznCore.FlyTo(1);
      document.getElementById("envCenterInfo").style.right = "0";
      setTimeout(() => {
        var objs = {
          // imgUrl: "gzznGIS/Image/mid.png",
          type: "pointImg",
          layerName: "救火队伍",
          zbtype: "baidu",
          isFlagRange: false,
          RangeNum: 3000,
        };

        let lists = [
          {
            //name: "琶洲国际会展中心",
            lat: 23.103804,
            lon: 113.370424,
            sid: "1",
          },
        ];

        //this.drawCircle();
      }, 3000);
    },
    drawCircle() {
      pGzznCore.drawCircleOutline(
        [
          113.35037, 23.10702, 113.36348, 23.10659, 113.36326, 23.1009,
          113.35039, 23.10112, 113.35041, 23.10135,
        ],
        null,
        "red",
        "line",
        {
          lon: 113.350345,
          lat: 23.103693,
          text: "核心区", //：\n 0.93251平方千米
        }
      ); //AB

      pGzznCore.drawCircleOutline(
        [
          113.35532, 23.10109, 113.35906, 23.10102, 113.35905, 23.09931,
          113.35531, 23.09929, 113.35531, 23.09933,
        ],
        null,
        "red",
        "line"
      ); //c

      // pGzznCore.drawCircleOutline(
      //   [
      //     113.350746, 23.106615, 113.368095, 23.106564, 113.367839, 23.097075,
      //     113.360647, 23.097839, 113.358821, 23.097943, 113.353753, 23.099023,
      //     113.350696, 23.099622,
      //   ],
      //   null,
      //   "YELLOW",
      //   "line",
      //   { lon: 113.389674, lat: 23.0998443, text: "疏导区" }
      // );

      pGzznCore.drawCircleOutline(
        [
          113.3461, 23.10811, 113.35041, 23.10764, 113.35702, 23.1073, 113.3632,
          23.1074, 113.36406, 23.10736, 113.36522, 23.10727, 113.36612,
          23.10732, 113.36818, 23.1074, 113.36786, 23.10073, 113.36788,
          23.09706, 113.36545, 23.09725, 113.36346, 23.09736, 113.36013,
          23.09742, 113.34934, 23.09936, 113.34869, 23.09951, 113.34773,
          23.09948, 113.34702, 23.09938, 113.34608, 23.09927, 113.34599,
          23.09895, 113.34593, 23.10088, 113.34588, 23.10223, 113.34593,
          23.10504, 113.34605, 23.1077,
        ],
        null,
        "YELLOW",
        "line",
        { lon: 113.366757, lat: 23.101511, text: "管控区" }
      );
      // pGzznCore.drawCircleOutline({ y: 23.103804, x: 113.370424 }, 3000, "BLUE", null, { lon: 113.386196, lat: 23.101243, text: "引导区" });
      // pGzznCore.drawCircleOutline({ y: 23.103804, x: 113.370424 }, 5000, "YELLOW", null, { lon: 113.405205, lat: 23.102037, text: "管控区" });
      pGzznCore.drawCircleOutline(
        [
          113.346061, 23.127668, 113.346678, 23.119961, 113.34611, 23.113349,
          113.335569, 23.114714, 113.328278, 23.115589, 113.328538, 23.109272,
          113.328868, 23.104324, 113.329158, 23.102486, 113.328619, 23.100562,
          113.327374, 23.097154, 113.326856, 23.095537, 113.327631, 23.092783,
          113.326576, 23.087891, 113.32657, 23.080412, 113.329598, 23.08037,
          113.336783, 23.081731, 113.345048, 23.083435, 113.347837, 23.084221,
          113.361367, 23.08815, 113.361549, 23.08828, 113.368642, 23.089989,
          113.368362, 23.099004, 113.370537, 23.100448, 113.383217, 23.099879,
          113.388936, 23.097822, 113.398133, 23.111395, 113.392667, 23.11383,
          113.390194, 23.116117, 113.384658, 23.118653, 113.375893, 23.121139,
          113.356754, 23.126012, 113.353927, 23.126784, 113.346214, 23.127967,
        ],
        null,
        "orange",
        "line",
        { lon: 113.389674, lat: 23.0998443, text: "引导区" } //
      );
      //pGzznCore.setPointLayerToMap(lists, objs);
      var defaultCoordAchievement = {
        x: 113.35686,
        y: 23.103543,
        //z: 12699.54,
        z: 13673,
      };
      pGzznCore.flyToPoint(defaultCoordAchievement);
    },

    exampleMapPointLayer() {
      setTimeout(function () {
        /********** 单纯点定位start **********/
        var defaultCoordAchievement = {
          x: 113.3379488464316,
          y: 21.21344096920578,
          z: 277703.8215040384,
          heading: 0.10863987028017341,
          pitch: -0.9254958723551856,
          roll: 6.283168798475424,
        };
        pGzznCore.flyToPoint(defaultCoordAchievement);
        /********** 单纯点定位end **********/

        /********** 点上图start **********/
        $.ajax({
          type: "GET",
          contentType: "application/json;charset-UTF-8",
          url: webFirefightingTeamUrl,
          cache: false,
          async: true,
          success: function (pData) {
            var objs = {
              imgUrl: "gzznGIS/Image/forTeam.svg",
              type: "FirefightingTeam",
              layerName: "救火队伍",
            };
            pGzznCore.setPointLayerToMap(pData.body, objs);
          },
        });
        /********** 点上图end **********/

        /********** 移除点 start **********/
        // setTimeout(() => {
        //   pGzznCore.pointLayerRemove({type:"FirefightingTeam"})
        // }, 10000);

        /********** 移除点 end **********/
      }, 3000);
    },
    // 添加蒙层
    addGrayLayer() {
      this.$nextTick(() => {
        const headerDiv = document.querySelector(".major-header"); // 头部
        const innerDiv = document.querySelector(".major-contents");
        const cModelBoxWidth =
          document.querySelector(".c-model-box").clientWidth;
        const cModelBoxHeight =
          document.querySelector(".major-contents").clientHeight;
        let headerLayerObj = {
          width: headerDiv.clientWidth + "px",
          height: headerDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          "background-image":
            "linear-gradient(to bottom, rgba(20, 27, 53, 1), rgba(20, 27, 53, 1), rgba(20, 27, 53, 0.9),rgba(20, 27, 53, 0.8),rgba(20, 27, 53, 0.7), rgba(20, 27, 53, 0.7))",
          // "background-image":
          //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          "z-index": 1000,
        };
        let leftLayerObj = {
          width: cModelBoxWidth + "px",
          height: cModelBoxHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          "background-image":
            "linear-gradient(to right, rgba(20, 27, 53, 0.5), rgba(20, 27, 53, 0.4), rgba(20, 27, 53, 0.3),rgba(20, 27, 53, 0.2),rgba(20, 27, 53, 0.1), rgba(20, 27, 53, 0.1))",
          // "background-image":
          //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 0.1)",
          "z-index": 1,
        };
        let rightLayerObj = {
          width: cModelBoxWidth + "px",
          height: cModelBoxHeight + "px",
          position: "absolute",
          right: 0,
          top: 0,
          "background-image":
            "linear-gradient(to left, rgba(20, 27, 53, 0.5), rgba(20, 27, 53, 0.4), rgba(20, 27, 53, 0.3),rgba(20, 27, 53, 0.2),rgba(20, 27, 53, 0.1), rgba(20, 27, 53, 0.1))",
          // "background-image":
          //   "linear-gradient(to bottom, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 0.1)",
          "z-index": 0,
        };
        let headerLayerDiv = document.createElement("div");
        let leftLayerDiv = document.createElement("div");
        let rightLayerDiv = document.createElement("div");
        for (let k in headerLayerObj) {
          headerLayerDiv.style[k] = headerLayerObj[k];
          leftLayerDiv.style[k] = leftLayerObj[k];
          rightLayerDiv.style[k] = rightLayerObj[k];
          if (k === "z-index") {
            console.log(k);
            innerDiv.appendChild(headerLayerDiv);
            innerDiv.appendChild(leftLayerDiv);
            rightLayerDiv.style.right = 0;
            innerDiv.appendChild(rightLayerDiv);
          }
        }
        /* const leftDiv = document.querySelector(".left"); // 获取左部元素
        const rightDiv = document.querySelector(".right"); // 获取右部元素
        let wrapDiv = document.querySelector(".c-city-danger"); // 最外层
        let innerDiv = document.querySelector(".city-danger-content"); // 中间内容 */
        /* 左侧 */
        /* let styleObj = {
          width: leftDiv.clientWidth + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          "background-image":
            "linear-gradient(to right, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          'z-index':7773
        };
        let leftDivs = document.createElement("div");
        for (let k in styleObj) {
          leftDivs.style[k] = styleObj[k];
        } */
        /* 右侧边 */
        /*   let styleObjRight = {
          width: rightDiv.clientWidth + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          right: 0,
          "background-image":
            "linear-gradient(to left, #182734, #182734, #182734, #182734,#182734,rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
          'z-index':7773
        };
        let cRightDivs = document.createElement("div");
        for (let k in styleObjRight) {
          cRightDivs.style[k] = styleObjRight[k];
        }
        innerDiv.appendChild(leftDivs);
        innerDiv.appendChild(cRightDivs); */
      });
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
    doGeteQuipment() { },
    doGetFacilities() { },
    doGetTeamPerson() { },
    doGetIotDevice() { },
    remoteDatas() { },
    hiddenShowLeftClick() {
      this.leftShow = !this.leftShow;
    },
    hiddenShowRightClick() {
      this.rightShow = !this.rightShow;
    },

    /** 打开热力图 */
    openHeatMap() {
      this.isHeatMapWid = !this.isHeatMapWid;
    },

    /** 打开视图 */
    openUrl(url) {
      window.open(url);
    },

    /** 无人驾驶应急指挥车 */
    onAICar() {
      window.open("https://robotaxi.baidu.com/inspection/#/monitor/inspection");
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

    /** 关闭预案**/
    planClose() {
      this.planShow = false;
    },
    /** 打开预案**/
    openPlan() {
      this.planShow = true;
    },
    addPromiseVideo(url) {
      let token = Cookies.get("token");
      // let currentUrl = process.env.NODE_ENV === "production"?`/big-screen${url}&token=${token}`:`${url}&token=${token}`
      window.open(`${url}&token=${token}`);
      // window.open(currentUrl)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addGrayLayer();
      window.addPromiseVideo = this.addPromiseVideo;
      window.mapClickTeamMessage = this.clickTeamMessage;
      window.mapClickTeamPhone = this.clickTeamPhone;
      window.remoteIotDeviceDatas = this.doGetIotDevice;
      window.remoteTeamInfoDatas = this.remoteDatas;
      window.remoteQuipmentDatas = this.doGeteQuipment;
      window.remoteFacilitieDatas = this.doGetFacilities;
      window.remoteTeamPersonDatas = this.doGetTeamPerson;

      // // console.log(1);
      this.mapInit();
      pGzznCore.mapClickTeamPhoneMessage = true;
      // this.exampleMapPointLayer();

      this.$EventBus.$on("communicationUpView", () => {
        this.drawCircle();
      });
    });
    // this.mapInit();
    // this.exampleMapPointLayer();
  },
  beforeDestroy() {
    pGzznCore = null;
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
.show-map {
  width: 100%;
  height: 100%;
}
.small-and-change {
  width: auto;
  height: auto;
  font-size: 60vh * @h;
  color: #00ffff;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9000;
  cursor: pointer;
  text-align: center;
}
.small-and-change-left {
  left: 986vw * @w;
}
.small-and-change-right {
  right: 986vw * @w;
}
.small-height-change-left {
  left: 60vw * @w;
}
.small-height-change-right {
  right: 60vw * @w;
}

.icon_heat_map {
  cursor: pointer;
  position: fixed;
  left: 1024vw * @w;
  bottom: 80vh * @h;
  width: 75vw * @w;
  height: 75vh * @h;
  z-index: 9999;
  background: rgba(22, 51, 55, 0.5);
  border: 1px #00ffff solid;
  transition: all 0.5s;

  &.hide {
    left: 50vw * @w;
  }

  &.gas_station {
    bottom: 170vh * @h;
    padding: 10vh * @h 10vw * @w;
  }

  &.ai_car {
    bottom: 260vh * @h;
  }

  &.command_center {
    bottom: 350vh * @h;
  }

  &.active {
    background: #dfebf5;
  }

  .icon_heat_map_layer {
    position: absolute;
    width: 600vw * @w;
    height: auto;
    background: rgba(15, 22, 24, 0.7);
    bottom: 0;
    left: 80vw * @w;
    z-index: 9999;
    padding: 15vh * @h 20vw * @w;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    span {
      color: white;
      padding: 20vh * @h 20vw * @w;
      &:hover {
        color: #1fb9d2;
      }
    }
  }
}
.layerIcon {
  transition: all 0.5s;
  &.hide {
    left: 50vw * @w;
  }
}
</style>
