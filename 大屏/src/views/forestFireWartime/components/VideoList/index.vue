<template>
    <!-- 视频列表 -->
    <div class="video-list">
        <div v-for="(item,key) in list" class="v-l-item" :key="key">
            <div class="v-l-i-top">
                <video controls="controls" :id="videoId + item.sid" autoplay muted></video>
            </div>
            <div class="v-l-i-bottom"> {{ item.cameralocation }} </div>
        </div>
    </div>
</template>

<script>
import Hls from 'hls.js';
// import flvjs from 'flv.js';
import { getPlayVideo,getVideoList } from '@/api/monitoringVideo';

export default {
    name: "",
    props: {
        videoId:{
            type: String,
            default: Math.random().toFixed(10).split('.')[1]
        },
        page:{
            type: Number,
            default: 1
        }
    },
    components: {},
    data() {
        return {
            list: [],
            flvPlayerList: []
        };
    },
    watch: {},
    computed: {},
    beforeDestroy() {
        this.clearVideo();
    },
    created() {},
    mounted() {
        this.playVideoList();
    },
    methods: {
        playVideoList(){
            const that = this;
            getVideoList({ "body": {},"page": that.page ,"pageSize": 5 }).then(res=>{
                that.list = res.body;
                that.list.forEach((item,key)=>{
                    getPlayVideo({ sid: item.sid }).then(res=>{
                        that.hlsVideo(that.videoId + item.sid, res.body.hls_path);
                    })
                })
            })
        },
        // 关闭视频
        clearVideo(){
            this.flvPlayerList.map(item=>{ item.destroy(); });
            this.flvPlayerList.length = 0;
        },
        // hls视频播放
        hlsVideo(id,videoSrc){
            const that = this;
            // 初始化hls
            if (Hls.isSupported()) {
                let hlsjs = new Hls();
                hlsjs.loadSource(videoSrc);
                hlsjs.attachMedia(document.getElementById(id));
                that.flvPlayerList.push(hlsjs);
            }
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
.video-list{
    width: 100%;
    height: 100%;
    padding: 3% 0;
    box-sizing: border-box;
    color: #fff;
    .v-l-item{
        width: 100%;
        height: 20%;
        .v-l-i-top{
            height: calc(100% - 50px);
            video{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
        .v-l-i-bottom{
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: #000;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>