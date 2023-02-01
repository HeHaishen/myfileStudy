<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-11-04 16:14:42
-->
<template>
  <div class="emergency-resources-center">
    <!-- <VideoTree ref="VideoTree"></VideoTree> -->
    <div id="crystalContainer">
      <div id="envCenterInfo" class="status-bar" style="left: 0px; right: 0px; bottom: 0px">
        <div id="camera_alt">视点高：NaN米</div>
        <div id="env_alt">海拔：NaN米</div>
        <div id="env_lat">纬度：NaN</div>
        <div id="env_lon">经度：NaN</div>
      </div>
    </div>
    <div id="videoZM" style="
        position: absolute;
        background: rgba(10, 67, 123, 0.5);
        width: 300px;
        height: 620px;
        bottom: 15.74074074vh;
        left: 9.02777778vw;
        border-radius: 10px;
        font-size: 26px;
        color: white;
        border: 2px solid #00ffff;
        box-shadow: 0 0 0.92592593vh #00eaff inset;
        -o-box-shadow: 0 0 0.92592593vh #00eaff inset;
        -ms-box-shadow: 0 0 0.92592593vh #00eaff inset;
        -moz-box-shadow: 0 0 0.92592593vh #00eaff inset;
        display: none;
      ">
      <p @click="switchCameraInfo(i)" v-for="(i, k) in videoZMList" :key="k" :style="{ cursor: 'pointer', padding: '8px', 'margin-bottom': 0 }">
        {{ i }}
      </p>
    </div>
    <div class="center-fixed-icon" style="width: auto; display: flex">
      <!-- <div class="btn-video" @click="videoClick($event)">
        <img src="../../../assets/images/theCityThreeProofing/icon_video.png" alt="" />
      </div> -->
      <!-- <div class="btn-video" @click="videoTreeClick($event)">
        <img
          src="../../../assets/images/theCityThreeProofing/icon_video.png"
          alt=""
        />
      </div> -->
    </div>
    <!-- <div class="center-fixed-icon">
      <div class="btn-video" @click="videoTreeClick($event)">
        <img
          src="../../../assets/images/theCityThreeProofing/icon_video.png"
          alt=""
        />
      </div>
    </div> -->
    <div class="left-fixed">
      <fixed-model class="maplayer"></fixed-model>

    </div>
  </div>
</template>

<script>
import { commonApi } from "@/api/emergencyOverview";
import VideoTree from "@/components/APicture/videoTree/index.vue";
import FixedModel from '@/components/mapLayer/index.vue'
export default {
  components: {
    VideoTree, FixedModel
  },
  data() {
    return {
      videoZMList: [],
      videoClickFlag: 0,
      videoInfoClickFlag: new Array(),
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      },
    };
  },
  created() {
    this.getVideoZM();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    })
  },
  methods: {
    init() {
      const rightDiv = document.querySelector(".right");
      let rightWidth = rightDiv.getBoundingClientRect().width;
      let mainWidth = document.getElementById("crystalContainer").offsetWidth;
      let clientWidth = document.body.clientWidth;
      let tempWidth = (clientWidth - mainWidth) / 2;
      if (rightWidth > tempWidth) {
        mapToolLocation = rightWidth - tempWidth + 1433;
      }
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(17);
    },
    videoClick() {
      if (this.videoClickFlag % 2 == 0) {
        document.getElementById("videoZM").style.display = "";
      } else {
        document.getElementById("videoZM").style.display = "none";
      }
      this.videoClickFlag++;
    },
    // 获取视频分组
    getVideoZM() {
      let that = this;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      commonApi(params, "nEuS0yYD").then((res) => {
        if (res.success) {
          let bodyList = res.body.data;
          for (let i = 0; i < bodyList.length; i++) {
            that.videoZMList.push(bodyList[i].zm);
          }
          that.videoZMList.push("城管云");
          that.videoZMList.push("危化");
        }
      });
    },
    switchCameraInfo(k) {
      if (k == "危化") {
        pGzznCore.dangerousImageProvider();
      } else if (k == "城管云") {
        pGzznCore.urbanDangerousImageProvider();
      } else {
        if (this.videoInfoClickFlag[k] == undefined) {
          this.videoInfoClickFlag[k] = 0;
        }
        if (this.videoInfoClickFlag[k] % 2 == 0) {
          pGzznCore.urbanDangerousZMProvider(k);
        } else {
          pGzznCore.urbanDangerousRemoveProvider(k);
        }
        this.videoInfoClickFlag[k] = this.videoInfoClickFlag[k] + 1;
      }
    },
    initChart() { },
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event.offsetLeft)
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
#videoZM p:hover {
  background: rgba(10, 67, 123, 0.8);
}

</style>
