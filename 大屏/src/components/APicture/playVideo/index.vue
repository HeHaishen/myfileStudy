<!--
 * @Description: 视频播放组件
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-24 21:06:51
 * @LastEditTime: 2021-10-08 15:36:11
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="videoClickClose"
    opsition="btnTop"
    ref="videoPlayerPop"
    title="视频播放"
    class="video-player-pop"
  >
    <template slot="content">
      <div class="center-play-video">
        <video
          id="videoElement"
          ref="videoElement"
          controlslist="nodownload noremoteplayback"
          disablePictureInPicture
          controls
          autoplay
          muted
        ></video>
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
import flvjs from "flv.js";
// import flvjs from "flv.js/dist/flv.min.js";
import {
  beginVideoStream,
  videoStreamActive,
  stopVideoStream,
} from "@/api/common";
export default {
  data() {
    return {
      title: "视频播放",
      show: false,
      parentData: {},
      warpChangUrl: "",
      videoLink: "http://flv.drag.test.com/live/livestream.flv",
      //   viedoUrl: "",
      flvPlayer: null,
      // settimeout
      timeOut: null,
    };
  },
  mounted() {
    this.$on("show", (data) => {
      // this.warpChangUrl = data.viedoUrl;
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.$refs.videoPlayerPop.saveEvent = null;
      this.warpChangUrl = this.videoLink;
      this.show = !this.show;
      this.parentData = data;
      this.$refs.videoPlayerPop.saveEvent = data.saveEvent;
      // this.beginPlayer();
      let { deviceId, id } = this.parentData;
      let beginSend = [{ deviceId, id }];
      this.doBeginVideoStream(beginSend); // 获取flv链接
    });
  },
  props: {
    viedoUrl: {
      default: "",
      type: String,
      require: true,
    },
  },
  methods: {
    beginPlayer() {
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: true,
          url: this.viedoUrl ? this.viedoUrl : this.warpChangUrl,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },
    videoClickClose() {
      let { deviceId, id } = this.parentData;
      let beginSend = [{ deviceId, id }];
      this.stopVideoStream(beginSend);
      this.show = false;
    },
    //开始直播
    doBeginVideoStream(arr) {
      beginVideoStream(arr)
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              this.viedoUrl = res.body[0]["playUrlMap"]["FLV"];
              this.beginPlayer();
              this.videoStreamActive(arr);
            } else {
              console.log('无法使用！')
            }
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    // 保持存活
    videoStreamActive(arr) {
      videoStreamActive(arr).then((res) => {
        if (res.success) {
          if (this.timeOut) {
            clearTimeout(this.timeOut);
          }
          this.timeOut = setTimeout(() => {
            this.videoStreamActive(arr);
          }, 10000);
        }
      });
    },
    // 停止流
    stopVideoStream(arr) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      stopVideoStream(arr).then((res) => {
        if (res.success) {
          console.log(res);
        }
      });
    },
  },
  beforeDestroy() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  },
};
</script>
<style lang="less">
@import "./index";
</style>
