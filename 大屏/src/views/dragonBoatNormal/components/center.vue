<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-23 17:17:04
-->
<template>
  <div class="emergency-overview-center">
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
    <div class="icon-camera" @click="openVedio($event)">
      <img :src="iconSearch" alt="" />
    </div>
    <VideoTree ref="VideoTree" class="video-tree"></VideoTree>
  </div>
</template>

<script>
import VideoTree from "@/components/APicture/videoTree/index.vue";
import { getAllCityInfo } from "@/api/emergencyOverview";
export default {
  data() {
    return {
      iconSearch: require("../../../assets/images/dustExplosion/icon_camera.png"),
      iconSelectOneActive: null,
      iconSelectTwoActive: null,
      iconSelectOneObj: [
        {
          typeName: "水利",
          children: [
            {
              active: false,
              typeName: "水库",
            },
            {
              active: false,
              typeName: "堤防",
            },
            {
              active: false,
              typeName: "闸坝",
            },
          ],
        },

        {
          typeName: "易涝点",
          children: [
            {
              active: false,
              typeName: "水浸点",
            },
            {
              active: false,
              typeName: "涵洞",
            },
            {
              active: false,
              typeName: "隧道",
            },
          ],
        },
        {
          typeName: "监测占点",
          children: [
            {
              active: false,
              typeName: "雨量站",
            },
            {
              active: false,
              typeName: "水位站",
            },
          ],
        },
      ],
      sign: false,
      signArr: [
        {
          sign: require("@/assets/images/dragonBoatNormal/icon_1.png"),
          flag: false,
        },
        {
          sign: require("@/assets/images/dragonBoatNormal/icon_2.png"),
          flag: false,
        },
        {
          sign: require("@/assets/images/dragonBoatNormal/icon_3.png"),
          flag: false,
        },
        {
          sign: require("@/assets/images/dragonBoatNormal/icon_4.png"),
          flag: false,
        },
        {
          sign: require("@/assets/images/dragonBoatNormal/icon_5.png"),
          flag: false,
        },
      ],
    };
  },
  created() {},
  components: {
    VideoTree,
  },
  mounted() {
    this.init();
  },
  methods: {
    openVedio($event) {
      // this.isShowCamera = !this.isShowCamera;
      console.log($event.offsetLeft);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },
    init() {
      mapToolLocation = $(".watchover").width() + 1288;
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(13);
      EventWartimeState = false;
      pGzznCore.addPromiseEventList(false);
      pGzznCore.addPromiseTunnel(true, false);
      pGzznCore.addPromiseWaterloggingPoint(true, false);
      pGzznCore.addPromiseWaterLevel(true, false);
    },
    selectDivShow(type) {
      let typeObj = {
        iconSelectOneActive: "iconSelectOneActive",
        iconSelectTwoActive: "iconSelectTwoActive",
      };
      for (let key in typeObj) {
        this[typeObj[key]] = false;
      }
      // console.log(type,this.oldSelectActive,this.oldSelectActive === type)
      if (this.oldSelectActive === type) {
        this[type] = false;
        this.oldSelectActive = "";
      } else {
        this[type] = !this[type];
        this.oldSelectActive = type;
      }
    },
    flexClickliItem(a, b, item, d) {
      item.active = !item.active;
    },
    clickSignshow() {
      console.log(1111);
      this.sign = !this.sign;
      this.transformScaleMap(0.7);
    },
    //对页面进行等比缩放变换后，对地图进行重新初始化，适配像素的变化，一种方案。
    transformScaleMap(value) {
      document.body.style.transform = "scale(" + value + ")"; //这里是一个例子
      pGzznCore.removeTickEventListener();
      pGzznCore = null;
      $("#crystalContainer").empty();
      $("#crystalContainer").html(
        '<iframe src="indexMap.html?strJson=13" style="height: 100%; width: 100%;overflow: hidden;"></iframe>'
      );
    },

    clickSign(e, i) {
      this.signArr[i].flag = !this.signArr[i].flag;
    },
    cancelFn() {
      this.sign = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
