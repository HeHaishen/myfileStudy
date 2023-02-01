<template>
    <!-- 易涝区域视频 -->
    <div class="waterlogged-video">
        <div class="w-v-content">
            <info-title title="易涝区域视频轮播"></info-title>
            <div class="video-lists">
                <div class="video-list" v-for="(item,key) in videoList" :key="key">
                    <video controls="controls" src="./media/oceans.mp4" muted autoplay loop :id="`waterlogged-video-${key}`"></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import flvjs from 'flv.js';
import InfoTitle from './components/infoTitle.vue';


export default {
    name: "",
    props: {},
    components: {
        InfoTitle
    },
    data() {
        return {
            videoList:[
                {},
                {},
                {},
                {},
                {},
                {},
            ],
            flvPlayerList: []
        };
    },
    watch: {},
    computed: {},
    created() {},
    beforeDestroy() {
        this.clearVideo();
    },
    mounted() {
        // this.initVideo()
    },
    methods: {
        // 关闭视频
        clearVideo(){
            this.flvPlayerList.map(item=>{ item.destroy(); });
            this.flvPlayerList.length = 0;
        },
        // 初始化视频
        initVideo(){
            this.clearVideo();
            this.videoList.forEach((item,key)=>{
                if (flvjs.isSupported()) {
                    let videoElement = document.getElementById(`waterlogged-video-${key}`);
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
            })
        },
    },
};
</script>
<style lang='less' scoped>
.waterlogged-video{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    .w-v-content{
        width: 100%;
        height: 90%;
        padding: 5%;
        box-sizing: border-box;
        background: url('./images/bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        .video-lists{
            width: 100%;
            height: 100%;
            display: grid;
            grid-column-gap: 2%;
            grid-row-gap: 1%;
            grid-template-columns: repeat(2, 49%);
            .video-list{
                width: 100%;
                height: 100%;
                video{
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                }
            }
        }
    }
}
</style>