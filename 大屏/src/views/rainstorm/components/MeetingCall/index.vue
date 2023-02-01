<template>
    <!-- 会议通话 -->
    <div class="meeting-call">
        <div class="meeting-call-title">
            <div class="title-name">{{ title }}</div>
            <div class="left-time">
                <div> {{ date }} </div>
                <div style="margin: 0 20px;"> {{ today }} </div>
                <div> {{ time }} </div>
            </div>
            <div class="right-btns">
                <div class="l-b-type" @click="specialFlag = !specialFlag;">
                    三防场景
                    <div class="l-b-t-special" v-show="specialFlag">
                        <div @click="onChangeSpecial('平时应用')">平时应用</div>
                        <div @click="onChangeSpecial('台风战时')">台风战时</div>
                        <div @click="onChangeSpecial('暴雨战时')">暴雨战时</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="meeting-call-content">
            <slot>
                <div class="meeting-call-top">
                    <div class="m-c-t-l">
                        <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-1"></video>
                    </div>
                    <div class="m-c-t-r">
                        <div class="m-c-t-r-item">
                            <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-2"></video>
                        </div>
                        <div class="m-c-t-r-item">
                            <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-3"></video>
                        </div>
                        <div class="m-c-t-r-item">
                            <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-4"></video>
                        </div>
                        <div class="m-c-t-r-item">
                            <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-5"></video>
                        </div>
                    </div>
                </div>
                <div class="meeting-call-bottom">
                    <div class="m-c-b-item">
                        <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-6"></video>
                    </div>
                    <div class="m-c-b-item">
                        <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-7"></video>
                    </div>
                    <div class="m-c-b-item">
                        <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-8"></video>
                    </div>
                    <div class="m-c-b-item">
                        <video controls="controls" src="./media/oceans.mp4" muted autoplay loop id="meeting-call-9"></video>
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import flvjs from 'flv.js';

export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            title: '应急管理综合应用平台',
            timer: null, // 计时器
            time: '', // 时间
            date: '', // 日期
            today: '', // 星期几
            dayList: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            flvPlayerList: [], // 播放列表
            specialFlag: false
        };
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.clearVideo();
    },
    created() {
        const that = this;
        that.seTtime();
        that.timer = setInterval(that.seTtime,1000 * 1);
    },
    mounted() {
        // this.initVideo()
    },
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
        // 关闭视频
        clearVideo(){
            this.flvPlayerList.map(item=>{ item.destroy(); });
            this.flvPlayerList.length = 0;
        },
        // 初始化视频
        initVideo(){
            this.clearVideo();
            for(let i=1;i<10;i++){
                if (flvjs.isSupported()) {
                    let videoElement = document.getElementById(`meeting-call-${i}`);
                    let flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv',
                        hasAudio: false,
                        hasVideo: true,
                        isLive: true,
                        withCredentials: false,
                        cors: true, 
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                    this.flvPlayerList.push(flvPlayer);
                }
            }
        },
        // 切换专题
        onChangeSpecial(type){
            console.log(type);
        }
    },
};
</script>
<style lang='less' scoped>
.meeting-call{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .meeting-call-title{
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        background: url('./images/title.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        color: #fff;
        position: relative;
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
        .right-btns{
            position: absolute;
            bottom: 30%;
            right: 15%;
            display: flex;
            background: url('./images/btn1.png') no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            pointer-events: auto;
            .l-b-type{
                width: 150px;
                padding: 5px 0px;
                text-align: center;
                color: #fff;
                position: relative;
                .l-b-t-special{
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    // border: 2px solid rgba(79, 158, 253, 1);
                    // background: rgba(0, 44, 103, 0.6);
                    pointer-events: auto;
                    border-radius: 8px;
                    width: 160px;
                    text-align: center;
                    z-index: 3;
                    .l-b-t-s-top{
                        position: absolute;
                        top: -30px;
                        left: 50%;
                        color: rgba(79, 158, 253, 1);
                        transform: translateX(-50%);
                    }
                    div{
                        padding: 10px 30px;
                        background: url('./images/btn2.png') no-repeat;
                        background-size: 100% 100%;
                        &:hover{
                            background-color: rgba(0, 233, 234, 0.3);
                        }
                    }
                }
            }
        }
    }
    .meeting-call-content{
        width: 100%;
        height: calc(100% - 150px);
        video{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
        .meeting-call-top{
            width: 100%;
            height: 66.66%;
            display: flex;
            .m-c-t-l{
                width: 50%;
                height: 100%;
            }
            .m-c-t-r{
                width: 50%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                .m-c-t-r-item{
                    width: 50%;
                    height: 50%;
                }
            }
        }
        .meeting-call-bottom{
            width: 100%;
            height: 33.33%;
            display: flex;
            .m-c-b-item{
                width: 25%;
                height: 100%;
            }
        }
    }
    
}
</style>