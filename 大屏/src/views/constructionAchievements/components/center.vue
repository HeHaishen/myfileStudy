<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-08-28 16:16:46
-->
<template>
  <div class="construction-achievement-center">
    <div id="crystalContainer">
      <div
        id="envCenterInfo"
        class="status-bar"
        style="left: 0px; right: 0px; bottom: 0px"
      >
        <div id="camera_alt">视点高：NaN米</div>
        <div id="env_alt">海拔：NaN米</div>
        <div id="env_lat">纬度：NaN</div>
        <div id="env_lon">经度：NaN</div>
      </div>
    </div>
    <div class="center-fixed-icon" style="width: auto; display: flex">
      <div class="btn-video" @click="videoTreeClick($event)">
        <img
          src="../../../assets/images/theCityThreeProofing/icon_video.png"
          alt=""
        />
      </div>
    </div>
    <VideoTree ref="VideoTree"></VideoTree>
    <!-- <div class="time">
      <ul class="time-list">
        <li v-for="(item, index) in yearList" :key="index">
          <div class="year">{{ item }}</div>
          <div
            class="out"
            @click="changeYearFn(index)"
            :class="yearIndex == index ? 'active-out' : ''"
          >
            <div class="inner"></div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import VideoTree from "@/components/APicture/videoTree/index.vue";
export default {
  data() {
    return {
      yearIndex: 3,
      yearList: ["2018", "2019", "2020", "2021"],
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  components: {
    VideoTree,
  },
  methods: {
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event.offsetLeft);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },
    changeYearFn(index) {
      this.yearIndex = index;
    },
    init() {
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(19);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
