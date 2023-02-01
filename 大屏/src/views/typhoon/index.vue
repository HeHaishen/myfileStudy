<template>
    <div class="rainstorm" id="typhoon">
        <!-- 实时降雨 -->
        <div class="r-r-r">
            <realtime-rainfall>
                <div class="realtime-typhoon" slot="rainBottom">
                    <info-title title='全市自动站风速实况'></info-title>
                    <realtime-typhoon></realtime-typhoon>
                </div>
            </realtime-rainfall>  
        </div>
        <!-- 短临降雨 -->
        <div class="r-s-r">
            <short-rainfall></short-rainfall>  
        </div>
        <!-- 台风地图 -->
        <div class="map">
            <img src="./components/images/typhoon.png" alt="">
        </div>
        <!-- 会议通话 -->
        <div class="r-m-c" >
            <meeting-call>
                <!-- 利用插槽，自定义布局 -->
                <div class="meeting-call-top">
                    <div class="m-c-t-l">
                        <video controls="controls" src="../rainstorm/components/MeetingCall/media/oceans.mp4" muted autoplay loop id="meeting-call-1"></video>
                    </div>
                    <div class="m-c-t-r">
                        <div class="m-c-t-r-item" v-for="(item,index) in rightCall" :key="index">
                            <video controls="controls" src="../rainstorm/components/MeetingCall/media/oceans.mp4" muted autoplay loop></video>
                        </div>
                    </div>
                </div>
                <div class="meeting-call-bottom">
                    <div class="m-c-b-item" v-for="(item,index) in bottomCall" :key="index">
                        <video controls="controls" src="../rainstorm/components/MeetingCall/media/oceans.mp4" muted autoplay loop></video>
                    </div>
                </div>
            </meeting-call>  
        </div>
        <!-- 易涝区域视频 -->
        <div class="r-w-v">
            <waterlogged-video></waterlogged-video>  
        </div>

    </div>
</template>

<script>
// 气象雷达
import WeatherRadar from '../rainstorm/components/WeatherRadar';
// 实时降雨
import RealtimeRainfall from '../rainstorm/components/RealtimeRainfall';
// 短临降雨
import ShortRainfall from '../rainstorm/components/ShortRainfall';
// 会议通话 部分自定义
import MeetingCall from '../rainstorm/components/MeetingCall';
// 易涝区域视频
import WaterloggedVideo from '../rainstorm/components/WaterloggedVideo';
// 防暴雨内涝
import Waterlogging from '../rainstorm/components/Waterlogging';
import InfoTitle from '../rainstorm/components/RealtimeRainfall/components/infoTitle.vue';
import RealtimeTyphoon from './components/RealtimeTyphoon.vue';

export default {
    props:{},
    components:{
        WeatherRadar,
        RealtimeRainfall,
        ShortRainfall,
        MeetingCall,
        WaterloggedVideo,
        Waterlogging,
        InfoTitle,
        RealtimeTyphoon
    },
    data() {
        return {
            bottomCall:[],
            rightCall:[],
        }
    },
    created() {
        this.rightCall.length = 4;
        this.bottomCall.length = 10;
    }
}
</script>

<style lang="less" scope>
    #typhoon{
        min-width: 5760px;
        min-height: 1080px;
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        font-size: var(--mini-font);
        background-color: rgba(14,22,77,1);
        .r-w-r{
            width: 30%;
            height: 100%;
            
            /* .weather-radar {
                align-items: flex-start;
                margin-top: 21%;
                .weather-radar-content {
                    height: 50%;
                    span {
                        font-size: var(--super-mini-font);
                    }
                }
            } */
        }
        .r-r-r{
            width: 15%;
            height: 100%;
            .rainfall-bottom {
                .realtime-typhoon {
                    height: 100%;
                    overflow: hidden;
                    .date {
                        width: 40%;
                    }
                }
            }
        }
        .r-s-r{
            width: 15%;
            height: 100%;
            /* .rainfall-bottom {
                .five-minutes {
                    justify-content: space-around;
                }
            } */
        }
        .map {
            width: 15%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            img {
                display: inline-block;
                width: 100%;
                height: 90%;
            }
        }
        .r-m-c{
            width: 60%;
            margin: 0 50px;
            height: 100%;
            .meeting-call-top{
                width: 100%;
                height: 66.66%;
                display: flex;
                .m-c-t-l{
                    width: 80%;
                    height: 100%;
                }
                .m-c-t-r{
                    width: 20%;
                    height: 100%;
                    display: block;
                    grid-template-columns: unset;
                    .m-c-t-r-item{
                        height: 25%;
                        width: 100%;
                    }
                }
            }
            .meeting-call-bottom{
                width: 100%;
                height: 33.33%;
                display: grid;
                grid-template-columns: repeat(5, 20%);
                .m-c-b-item {
                    width: 100% ;
                }
            }
        }
        .r-w-v{
            width: 20%;
            height: 100%;
        }
        .r-w-g{
            width: 30%;
            height: 100%;
            /* .waterlogging {
                height: 50%;
                margin-top: 7%;
            } */
        }
        
    }
        
    
</style>  