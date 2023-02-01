<template>
    <!-- 監測左侧 -->
    <div class="warning-left">
        <div class="warning-left-content">
            <div v-for="(item, key) in list" class="w-l-c-item" :key="key">
                <div class="w-l-c-i-top">
                    <video
                        controls="controls"
                        src="../media/oceans.mp4"
                        muted
                        autoplay
                        loop
                    ></video>
                </div>
                <div class="w-l-c-i-bottom">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import flvjs from "flv.js";

export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            list: [
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
                { name: "新海西路126号东涌河道" },
            ],
            flvPlayerList: [],
        };
    },
    beforeDestroy() {
        this.clearVideo();
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        // 关闭视频
        clearVideo() {
            this.flvPlayerList.map((item) => {
                item.destroy();
            });
            this.flvPlayerList.length = 0;
        },
        // 初始化视频
        initVideo() {
            this.clearVideo();
            this.videoList.forEach((item, key) => {
                if (flvjs.isSupported()) {
                    let videoElement = document.getElementById(
                        `waterlogged-video-${key}`
                    );
                    let flvPlayer = flvjs.createPlayer({
                        type: "flv",
                        url: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
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
            });
        },
    },
};
</script>
<style lang='less' scoped>
.warning-left {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 1%;
    color: #fff;

    .warning-left-content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .w-l-c-item {
            width: 50%;
            height: 25%;
            .w-l-c-i-top {
                height: calc(100% - 50px);
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                }
            }
            .w-l-c-i-bottom {
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
}
</style>