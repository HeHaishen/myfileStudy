<!--
 * @Description: 地图工具箱
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-11 22:57:13
-->
<template>
  <div class="all-icons-box video-box move-right-box">
    <div
      style="width: 100%; height: 100%"
      title="视频"
      @click="openVideoWall($event)"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="38px"
        height="36px"
        viewBox="0 0 38 36"
        enable-background="new 0 0 38 36"
        xml:space="preserve"
      >
        <image
          id="image0"
          width="38"
          height="36"
          x="0"
          y="0"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAQAAABP/IAuAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh4PHAXtavZzAAABxklEQVRIx6XWvUscQRjH8R933kXBl4vEwsZaToyF4h+g2IqQMkWwsLZX
sDEgWmjwTzg9TBXPQkRQEGzUJprWRlAQEhBRRIPK12LXcXRfbuZ8ppiZZ47PzjAzeyuUUro44D/r
fEr9lSlpg938JYhD2t6HvVDOnBsFcFSdc6WcOHfKgYumPidSVTk/qgrnS6Vy/lQKVwsF8CeOe270
eFEJXFB1elOxXFBt1EDFcBlJUofc40Y/NKEjSVK3ttVmjSHEtMdshhAiz0F0dkGVZdmROjaLGje5
fTL2Mh/1TWWnRRaUC1stJtevor1Mn9ktkEEUuTCZR9qjNyDLkhN3ziH3Vv97/N105eyYs89ZPZP8
ZLRGbod6GyuF6THzavSLK5YZ5kOAXYfJjRDb9F4owCUl+mS6uwgxUhMVxL86c1rq9FE5zZv+pQoe
l0yStpTwlDs6PbeiQj4Jm/Hc2Qp5FI+d0eh1UCrkg92MxgWD1jEuvRrbS6Zs7De9YWl+cyteuFla
uEuibGw38c81yyIP3DKFEGtJlBsmRCO5sPXVolZtConTcKCc/lFiShO38RQSX7gBTig6YuJXPBW8
glrppcGZEgNcsxKl0BOekoEJal2/+QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMjoy
ODowNSswMzowMNssT7EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTI6Mjg6MDUrMDM6
MDCqcfcNAAAAAElFTkSuQmCC"
        />
      </svg>
    </div>
    <div>
      <VideoTree ref="VideoTree" style="z-index: 9999"></VideoTree>
    </div>
  </div>
</template>

<script>
import VideoTree from "@/components/APicture/videoTree/index.vue";
export default {
  components: { VideoTree },
  data() {
    return {};
  },
  methods: {
    openVideoWall(e) {
      this.$refs.VideoTree.opsition = "btnBottom";
      this.$refs.VideoTree.$emit("show", { saveEvent: e });
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
.video-box {
 /*  top: 163vh * @h;
  right: 1029vw * @w; */
  top:0px;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
