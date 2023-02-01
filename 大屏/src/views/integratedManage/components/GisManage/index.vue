<template>
    <!-- gis管理页面 -->
    <div class="gis-manage">
        <!-- 头部 -->
        <div class="title">
            <div class="title-name">{{ title }}</div>
            <div class="left-time">
                <div> {{ date }} </div>
                <div style="margin: 0 20px;"> {{ today }} </div>
                <div> {{ time }} </div>
            </div>
        </div>
        <!-- 蒙版 -->
        <div class="top-gradient"></div>
        <div class="left-gradient"></div>
        <div class="right-gradient"></div>
        <!-- 地图模块 -->
        <div class="gis">
            <gis-map></gis-map>
        </div>
        <!-- 弹窗层 -->
        <div class="layer">

        </div>
    </div>
</template>

<script>
import GisMap from './components/GisMap';

export default {
    name: "",
    props: {},
    components: {
        GisMap
    },
    data() {
        return {
            title: '应急管理综合应用平台',
            timer: null, // 计时器
            time: '', // 时间
            date: '', // 日期
            today: '', // 星期几
            dayList: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        };
    },
    watch: {},
    computed: {},
    beforeDestroy() {
        clearInterval(this.timer);
    },
    created() {
        const that = this;
        that.seTtime();
        that.timer = setInterval(that.seTtime,1000 * 1);
    },
    mounted() {},
    methods: {
        // 获取时间
        seTtime(){
            const that = this;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            that.today = that.dayList[date.getDay()];
            that.time = `${hours}:${minutes}:${seconds}`;
            that.date = `${year}-${month}-${day}`;
        },
    },
};
</script>

<style lang='less' scoped>
.gis-manage{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .title{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        background: url('./images/title.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        color: #fff;
        .title-name{
            line-height: 70px;
            text-align: center;
            font-size: var(--title-font);
            font-weight: bold;
            text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6, 0 0 20px #0071a6;
        }
        .left-time{
            position: absolute;
            bottom: 30%;
            left: 10%;
            display: flex;
        }
    }
    .top-gradient{
        position: absolute;
        top: 0;
        left: 0;
        height: 150px;
        width: 100%;
        transition: width .3s;
        background: linear-gradient(to bottom, rgba(000, 000, 000, 1), rgba(000, 000, 000, 0.4), rgba(000, 000, 000, 0));
        z-index: 1;
        pointer-events: none;
    }
    .left-gradient{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			// width: 900px;
            width :150px;
			transition: width .3s;
			background: linear-gradient(to right, rgba(14,22,77, 1), rgba(14,22,77, 0));
			z-index: 1;
            pointer-events: none;
		}
        .right-gradient{
			top: 0;
			right: 0;
			height: 100%;
			// width: 800px;
            width :150px;
			position: absolute;
			transition: width .3s;
			background: linear-gradient(to left, rgba(14,22,77, 1), rgba(14,22,77, 0));
			z-index: 1;
            pointer-events: none;
		}
    .gis{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        overflow: hidden;
        pointer-events:auto;
    }
}
</style>