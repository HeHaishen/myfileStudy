<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 20:07:06
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-03 10:55:09
-->
<template>
  <div class="traffic">
    <search @doSearch="doSearch" placeholder="搜索" style="margin-top: 10px" />
    <div class="traffic_img">
      <ul>
        <li
          v-for="(e, i) in trafficList"
          :key="i"
          :style="{ border: `1px solid ${e.color}`, color: `${e.color}` }"
          @click="clickTraffic(e,i)"
        >
          <img :src="e.img" alt="" />
          {{ e.title }}

          <img src="@/assets/images/dragonBoat/icon/u790.svg" alt="" class="originchecked"  v-show="e.flag">


        </li>
      </ul>
    </div>
    <div class="title">视频列表</div>
  </div>
</template>

<script>
import search from "@/components/mapLayer/components/search.vue";
export default {
  components: { search },
  data() {
    return {
      trafficList: [
        {
          title: "高速公路",
          bdColor: "#1296DB",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u788.svg"),
          color: "#81D3F8",
        },
        {
          title: "国道",
          bdColor: "#F4EA2A",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u794.svg"),
          color: "#FFFF00",
        },
        {
          title: "省道",
          bdColor: "#1AFA29",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u798.svg"),
          color: "#95F204",
        },
        {
          title: "服务区",
          bdColor: "#D4237A",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u802.svg"),
          color: "#EC808D",
        },
        {
          title: "出入口",
          bdColor: "#9DD3A8",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u806.svg"),
          color: "#98CCA3",
        },
        {
          title: "出入口",
          bdColor: "#9DD3A8",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u810.svg"),
          color: "#FCE38A",
        },
        {
          title: "视频监控",
          bdColor: "#95E1D3",
          flag: false,
          img: require("@/assets/images/dragonBoat/icon/u816.svg"),
          color: "#FCE38A",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    doSearch() {},
    clickTraffic(e,i){
      e.flag=!e.flag
    },
  },
  created() {},
};
</script>
<style lang='less' scoped>
@import "../common.less";
.traffic {
  .traffic_img {
    padding: 5px;
    margin-bottom: 25px;
    box-sizing: border-box;
    .box-sizing();
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin: 5px;
        margin-top: 8px;
        width: 28%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 38px;
        cursor: pointer;
        font-size: 14px;
        padding: 0 6px;
        .box-sizing();
        position: relative;
        img{
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  .title {
    height: 40px;
    width: 100%;
    padding-left: 15px;
    background-color: #064d70;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #fff;
  }
}
.originchecked{
  width: 15px !important;
  height: 15px !important;
  position: absolute;
  top: -6px;
  right: -5px;
  margin: 0 !important;
}
</style>