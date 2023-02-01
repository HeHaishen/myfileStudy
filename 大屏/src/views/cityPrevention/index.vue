<!--
 * @Author: SuDe
 * @Date: 2021-07-13 17:50:33
 * @LastEditors: SuDe
 * @LastEditTime: 2021-07-14 16:29:00
 * @Description: 全市三防
-->
<template>
    <div class="city-prevention">
        <!-- 头部 -->
        <div class="title">
            <div class="title-left"></div>
            <div class="title-name">{{ title }}</div>
            <div class="title-right">
                <div class="t-l-time">
                    <div>{{ date }}</div>
                    <div>{{ today }}</div>
                    <div>{{ time }}</div>
                </div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <div class="content-left"><my-left></my-left></div>
            <div class="content-center"><my-center></my-center></div>
            <div class="content-right"><my-right></my-right></div>
        </div>
    </div>
</template>

<script>
import MyCenter from './components/center';
import MyLeft from './components/left';
import MyRight from './components/right';

export default {
    name: "",
    props: {},
    components: {
        MyLeft,
        MyCenter,
        MyRight
    },
    data() {
        return {
            title: "全 市 三 防 一 张 图",
            timer: null, // 计时器
            time: "", // 时间
            date: "", // 日期
            today: "", // 星期几
            dayList: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        };
    },
    watch: {},
    computed: {},
    created() {
        const that = this;
        that.seTtime();
        that.timer = setInterval(that.seTtime, 1000 * 60);
    },
    mounted() {},
    methods: {
        // 获取时间
        seTtime() {
            const that = this;
            let date = new Date();
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            that.today = that.dayList[date.getDay()];
            that.time = `${hours}:${minutes}`;
            that.date = `${year}-${month}-${day}`;
        },
    },
};
</script>
<style lang="less" scoped>
.city-prevention {
    min-width: 5760px;
    min-height: 1080px;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    font-size: var(--mini-font);
    background-color: rgba(14, 22, 77, 1);
    .title {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 125px;
        box-sizing: border-box;
        background: url("~@/assets/images/bg_header.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: auto;
        color: #fff;
        .title-left {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            height: 70%;
            align-items: center;
        }
        .title-right {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            height: 70%;
            align-items: center;
            .t-l-time {
                display: flex;
                margin-left: 30px;
                align-items: center;
                font-size: var(--small-font);
                div {
                    margin-right: 20px;
                    &:nth-child(odd) {
                        font-size: var(--mini-number-font);
                    }
                }
            }
        }
        .title-name {
            color: #fff;
            line-height: 120px;
            text-align: center;
            font-size: 70px;
            font-weight: bold;
        }
    }
    .content{
        width: 100%;
        height: calc(100% - 125px);
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        .content-left{
            width: 25%;
            height: 100%;
        }
        .content-center{
            width: 50%;
            height: 100%;
        }
        .content-right{
            width: 25%;
            height: 100%;
        }
    }
}
</style>
