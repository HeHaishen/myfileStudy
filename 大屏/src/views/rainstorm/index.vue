<template>
    <div class="rainstorm">
        <!-- 气象雷达 -->
        <!-- <div class="r-w-r">
            <weather-radar></weather-radar>  
        </div> -->
        <!-- 实时降雨 -->
        <div class="r-r-r">
            <realtime-rainfall></realtime-rainfall>  
        </div>
        <!-- 短临降雨 -->
        <div class="r-s-r">
            <short-rainfall></short-rainfall>  
        </div>
        <!-- 会议通话 -->
        <div class="r-m-c">
            <meeting-call></meeting-call>  
        </div>
        <!-- 易涝区域视频 -->
        <div class="r-w-v">
            <waterlogged-video></waterlogged-video>  
        </div>
        <!-- 防暴雨内涝 -->
        <!-- <div class="r-w-g">
            <waterlogging></waterlogging>  
        </div> -->
    </div>
</template>

<script>
// 气象雷达
import WeatherRadar from './components/WeatherRadar';
// 实时降雨
import RealtimeRainfall from './components/RealtimeRainfall';
// 短临降雨
import ShortRainfall from './components/ShortRainfall';
// 会议通话
import MeetingCall from './components/MeetingCall';
// 易涝区域视频
import WaterloggedVideo from './components/WaterloggedVideo';
// 防暴雨内涝
import Waterlogging from './components/Waterlogging';

export default {
    props:{},
    components:{
        WeatherRadar,
        RealtimeRainfall,
        ShortRainfall,
        MeetingCall,
        WaterloggedVideo,
        Waterlogging
    }
}
</script>

<style lang="less" scope>
    .rainstorm{
        min-width: 5760px;
        min-height: 1080px;
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        font-size: var(--mini-font);
        background-color: rgba(14,22,77,1);
        padding-bottom: 1%;
        // .r-w-r{
        //     width: 30%;
        //     height: 100%;
        // }
        .r-r-r{
            width: 10%;
            height: 100%;
            margin-left: 0.4%;
        }
        .r-s-r{
            width: 10%;
            margin-right: 0.4%;
            height: 100%;
        }
        .r-m-c{
            width: 58%;
            height: 100%;
        }
        .r-w-v{
            width: 20%;
            margin: 0 0.4%;
            height: 100%;
        }
        // .r-w-g{
        //     width: 30%;
        //     height: 100%;
        // }
    }
</style>  