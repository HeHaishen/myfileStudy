<template>
    <div class="weather-module">
        <!-- 天气预报 -->
        <div class="w-m-w-f">
            <weather-forecast></weather-forecast>
        </div>
        <!-- 短时预报 -->
        <div class="w-m-s-f">
            <short-forecast></short-forecast>  
        </div>
        <!-- 未来雨量趋势 -->
        <div class="w-m-r-t">
            <rainfall-trend></rainfall-trend>  
        </div>
    </div>
</template>

<script>
import RainfallTrend from './components/RainfallTrend';
import ShortForecast from './components/ShortForecast';
import WeatherForecast from './components/WeatherForecast';

export default {
    name: "",
    props: {},
    components: {
        WeatherForecast,
        ShortForecast,
        RainfallTrend
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
.weather-module {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    .w-m-w-f{
        width: 100%;
        height: 30%;
    }
    .w-m-s-f{
        width: 100%;
        height: 30%;
    }
    .w-m-r-t{
        width: 100%;
        height: 30%;
    }
}
</style>