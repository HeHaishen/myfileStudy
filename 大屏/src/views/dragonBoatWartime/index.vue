<template>
    <!-- 龙舟水-战时 -->
   <div class="dragon-boat-wartime">
        <!-- 视频列表 -->
        <div class="d-b-w-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div>
        <!-- 指挥调度 -->
        <div class="d-b-w-c-d">
            <command-dispatch></command-dispatch>
        </div>
        <!-- gis 地图 -->
        <div class="d-b-w-g-m">
            <gis-manage></gis-manage>
        </div>
        <!-- 事件与会商 -->
        <div class="d-b-w-e-c">
            <event-consultation></event-consultation>
        </div>
        <!-- 视频列表 -->
        <div class="d-b-w-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div>
   </div>
</template>

<script>
// 视频列表
import VideoList from './components/VideoList';
// gis 地图
import GisManage from './components/GisManage';
// 指挥调度
import CommandDispatch from './components/CommandDispatch';
// 事件与会商
import EventConsultation from './components/EventConsultation';

export default {
   name:"",
   props:{}, 
   components: {
       VideoList,
       GisManage,
       CommandDispatch,
       EventConsultation
   },
   data () {
       return {};
   },
   watch: {}, 
   computed: {}, 
   created(){}, 
   mounted(){}, 
   methods: {}, 
}
</script>
<style lang='less' scoped>
.dragon-boat-wartime{
    min-width: 5760px;
    min-height: 1080px;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    font-size: var(--mini-font);
    background-color: rgba(14,22,77,1);
    .d-b-w-v-l{
        width: 5%;
        height: 100%;
    }
    .d-b-w-c-d{
        width: 18%;
        margin: 0 1%;
        height: 100%;
    }
    .d-b-w-g-m{
        width: 50%;
        height: 100%;
    }
    .d-b-w-e-c{
        width: 18%;
        margin: 0 1%;
        height: 100%;
    }
}
</style>