<template>
    <!-- 防汛指挥屏 -->
    <div class="flood-dedense">
        <div class="flood-dedense-content">
            <!-- 指挥流程 -->
            <div class="f-d-c-l-c">
                <command-process></command-process>
            </div>
            <!-- 气象模块 -->
            <div class="f-d-c-q-x">
                <meteorology-module></meteorology-module>
            </div>
            <!-- 天气预报模块 -->
            <div class="f-d-c-t-q">
                <weather-module></weather-module>
            </div>
            <!-- 中间指挥模块 -->
            <div class="f-d-c-z-h">
                <center-manger></center-manger>
            </div>
            <!-- 卫星模块 -->
            <div class="f-d-c-w-x">
                <satellite-module></satellite-module>
            </div>
            <!-- 雷达模块 -->
            <div class="f-d-c-l-d">
                <radar-module></radar-module>
            </div>
            <!-- 应急预案 -->
            <div class="f-d-c-r-p">
                <reserve-plan></reserve-plan>
            </div>
        </div>
    </div>
</template>

<script>
// 指挥流程模块
import CommandProcess from './components/CommandProcess';
// 气象模块
import MeteorologyModule from './components/MeteorologyModule';
// 天气预报模块
import WeatherModule from './components/WeatherModule';
// 中间指挥模块
import CenterManger from './components/CenterManger';
// 卫星模块
import SatelliteModule from './components/SatelliteModule';
// 雷达模块
import RadarModule from './components/RadarModule';
// 应急预案
import ReservePlan from './components/ReservePlan';

export default {
    name: "",
    props: {},
    components: {
        CommandProcess,
        MeteorologyModule,
        WeatherModule,
        CenterManger,
        SatelliteModule,
        RadarModule,
        ReservePlan
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
.flood-dedense{
    min-width: 5760px;
    min-height: 1080px;
    width: 100vw;
    height: 100vh;
    font-size: var(--mini-font);
    background-color: rgba(14,22,77,1);
    .flood-dedense-content{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        .f-d-c-l-c{
            width: 40%;
            height: 100%;
        }
        .f-d-c-q-x{
            width: 20%;
            height: 100%;
        }
        .f-d-c-t-q{
            width: 20%;
            height: 100%;
        }
        .f-d-c-z-h{
            width: 40%;
            height: 100%;
        }
        .f-d-c-w-x{
            width: 20%;
            height: 100%;
        }
        .f-d-c-l-d{
            width: 20%;
            height: 100%;
        }
        .f-d-c-r-p{
            width: 40%;
            height: 100%;
        }
    }
}
</style>