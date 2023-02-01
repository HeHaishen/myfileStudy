<template>
    <!-- 节假日 -->
    <div class="holiday-manage">
        <!-- 部门到岗和值班值守 -->
        <!-- <div class="h-m-o-d">
            <on-duty></on-duty>
        </div> -->
        <!-- 视频列表 -->
        <!-- <div class="h-m-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div> -->
        <!-- 应急响应和企业隐患 -->
        <div class="h-m-r-m">
            <response-module></response-module>
        </div>
        <!-- gis -->
        <div class="h-m-g-m">
            <gis-manage></gis-manage>
        </div>
        <!-- 预警信息和突发事件 -->
        <div class="h-m-e-i">
            <event-info></event-info>
        </div>
        <!-- 视频列表 -->
        <!-- <div class="h-m-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div> -->
        <!-- 各系统运行专题 -->
        <!-- <div class="h-m-s-m">
            <sys-module></sys-module>
        </div> -->

    </div>
</template>

<script>
import OnDuty from './components/OnDuty';
// import VideoList from './components/VideoList';
import ResponseModule from './components/ResponseModule';
import GisManage from './components/GisManage';
import EventInfo from './components/EventInfo';
import SysModule from './components/SysModule';

export default {
    name: "",
    props: {},
    components: {
        OnDuty,
        // VideoList,
        ResponseModule,
        GisManage,
        EventInfo,
        SysModule
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='less' scoped>
.holiday-manage{
    min-width: 5760px;
    min-height: 1080px;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    font-size: var(--mini-font);
    background-color: rgba(14,22,77,1);
    // .h-m-o-d{
    //     width: 20%;
    //     height: 100%;
    // }
    // .h-m-v-l{
    //     width: 10%;
    //     height: 100%;
    // }
    .h-m-r-m{
        width: 18%;
        margin: 0 1%;
        height: 100%;
    }
    .h-m-g-m{
        width: 60%;
        height: 100%;
    }
    .h-m-e-i{
        width: 18%;
        margin: 0 1%;
        height: 100%;
    }
    // .h-m-s-m{
    //     width: 20%;
    //     height: 100%;
    // }
}
</style>