<template>
    <!-- 森林防火-战时 -->
   <div class="forest-fire-wartime">
        <!-- 视频列表 -->
        <div class="f-f-w-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div>
        <!-- 物资与队伍 -->
        <div class="f-f-w-m-t">
            <material-and-team></material-and-team>
        </div>
        <!-- 靶向短信和专家 -->
        <div class="f-f-w-m-e">
            <msg-and-experts></msg-and-experts>
        </div>
        <!-- gis 管理 -->
        <div class="f-f-w-g-m">
            <gis-manage></gis-manage>
        </div>
        <!-- 物资与队伍 -->
        <div class="f-f-w-s-v">
            <slopes-and-video></slopes-and-video>
        </div>
        <!-- 视频列表 -->
        <div class="f-f-w-v-l">
            <video-list :videoId="Math.random().toFixed(10).split('.')[1]"></video-list>
        </div>
   </div>
</template>

<script>
// 气象实时信息展示
// import MeteorologyModule from "./components/MeteorologyModule";
// 物资与队伍
import MaterialAndTeam from "./components/MaterialAndTeam";
// 靶向短信和专家
import MsgAndExperts from "./components/MsgAndExperts";
// gis 管理
import GisManage from "./components/GisManage";
// 坡地与视频
import SlopesAndVideo from "./components/SlopesAndVideo";
// 指令与问题反馈
// import InstructAndFeedback from "./components/InstructAndFeedback";
// 视频
import VideoList from './components/VideoList';

export default {
   name:"",
   props:{}, 
   components: {
       MaterialAndTeam,
       MsgAndExperts,
       GisManage,
       SlopesAndVideo,
       VideoList
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
.forest-fire-wartime{
    min-width: 5760px;
    min-height: 1080px;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    font-size: var(--mini-font);
    background-color: rgba(14,22,77,1);
    .f-f-w-v-l{
        width: 5%;
        height: 100%;
    }
    .f-f-w-m-t{
        width: 9%;
        margin-left: 1%;
        height: 100%;
    }
    .f-f-w-m-e{
        width: 9%;
        margin-right: 1%;
        height: 100%;
    }
    .f-f-w-g-m{
        width: 50%;
        height: 100%;
    }
    .f-f-w-s-v{
        width: 18%;
        margin: 0 1%;
        height: 100%;
    }
}
</style>