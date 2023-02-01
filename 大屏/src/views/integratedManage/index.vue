<template>
  <div class="integrate-manage">
    <!-- 监测预警 -->
    <!-- <div class="i-m-w-m">
      <warning-monitoring></warning-monitoring>
    </div> -->
    <!-- 视频列表 -->
    <!-- <div class="i-m-l-v-l">
      <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
    </div> -->
    <!-- 企业隐患 -->
    <div class="i-m-e-d">
      <enterprise-danger></enterprise-danger>
    </div>
    <!-- gis 管理 -->
    <div class="i-m-g-m">
      <gis-manage></gis-manage>
    </div>
    <!-- 事件列表 -->
    <div class="i-m-e-l">
      <event-list></event-list>
    </div>
    <!-- 视频列表 -->
    <!-- <div class="i-m-r-v-l">
      <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
    </div> -->
    <!-- 水位预警 -->
    <!-- <div class="i-m-w-w">
      <water-warning></water-warning>
    </div> -->
  </div>
</template>

<script>
// 监测预警
import WarningMonitoring from "./components/WarningMonitoring";
// 视频列表
// import VideoList from "./components/VideoList";
// 企业隐患
import EnterpriseDanger from "./components/EnterpriseDanger";
// gis 管理
import GisManage from "./components/GisManage";
// 事件列表
import EventList from "./components/EventList";
// 水位预警
import WaterWarning from "./components/WaterWarning";

export default {
  props: {},
  components: {
    WarningMonitoring,
    // VideoList,
    EnterpriseDanger,
    GisManage,
    EventList,
    WaterWarning,
  },
};
</script>

<style lang="less" scope>
    .integrate-manage{
        min-width: 5760px;
        min-height: 1080px;
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        font-size: var(--mini-font);
        background-color: rgba(14,22,77,1);
        // .i-m-w-m{
        //     width: 60%;
        //     height: 100%;
        // }
        // .i-m-l-v-l{
        //     width: 10%;
        //     height: 100%;
        // }
        // .i-m-r-v-l{
        //     width: 10%;
        //     height: 100%;
        // }
        .i-m-e-d{
            width: 15%;
            margin: 0 50px;
            height: 100%;
        }
        .i-m-g-m{
            width: 70%;
            height: 100%;
        }
        .i-m-e-l{
            width: 15%;
            margin: 0 50px;
            height: 100%;
        }
        // .i-m-w-w{
        //     width: 60%;
        //     height: 100%;
        // }
    }
</style>  