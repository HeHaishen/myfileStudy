<!--
 * @Author: lx
 * @Date: 2021-06-23 17:26:17
 * @LastEditTime: 2021-08-09 09:51:29
 * @LastEditors: Aidam_Bo
 * @Description: 气象实时信息展示
 * @FilePath: \big-screen-vue\src\views\dragonBoatWartime\components\RealtimeWeather\index.vue
-->
<template>
  <!-- 气象实时信息展示 -->
  <div class="realtime-weather">
    <div class="realtime-weather-content">
      <public-title title="气象实时信息展示"></public-title>
      <!-- 左侧部分 -->
      <div class="realtime-left">
        <ul class="weather-msg-list">
          <swiper :options="swiperOption">
            <swiper-slide
              class="swiper-wrapper"
              v-for="(weather, index) in weatherMSGList"
              :key="index"
            >
              <li v-for="(item, index) in weather" :key="index">
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}℃</p>
              </li>
            </swiper-slide>
          </swiper>
        </ul>
      </div>
      <!-- 右侧部分 -->
      <div class="realtime-right">
        <div class="realtime-right-radio">
          <div
            class="radio-item"
            v-for="(item, index) in radioList"
            :key="index"
            :class="{ active: radioCurrent == index }"
            @click="radioCurrent = index"
          >
            {{ item }}
          </div>
        </div>
        <div class="realtime-right-content">
          <div v-if="radioCurrent == 0" class="rainfall-distribution"></div>
          <div v-if="radioCurrent == 1" class="water-monitoring">
            <div class="fire-list-header">
              <span class="keys">序号</span>
              <span class="type">类型</span>
              <span class="name">名称</span>
              <span class="alertValue">警界水位</span>
              <span class="value">事实水位</span>
              <span class="option">操作</span>
            </div>
            <ul class="fire-list-content" v-if="waterLevelList.length">
              <li v-for="(item, index) in waterLevelList" :key="index">
                <span class="keys">{{ item.keys ? item.keys : "" }}</span>
                <span class="type">{{ item.type ? item.type : "" }}</span>
                <span class="name">{{ item.name ? item.name : "" }}</span>
                <span class="value">{{
                  item.alertValue ? item.alertValue : ""
                }}</span>
                <span class="value">{{ item.value ? item.value : "" }}</span>
                <span class="option">
                  <span @click="waterLevelPointer(item, index)">定位</span
                  ><span @click="waterLevelDetail(item, index)">详情</span>
                </span>
              </li>
            </ul>
          </div>
          <div v-if="radioCurrent == 2" class="typhoon-track"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { areaWeather } from "@/utils/areaWeather";
import PublicTitle from "../../public/components/publicTitle.vue";
import { getWeatherSeven, getWaterLevel } from "@/api/dragonBoat";
export default {
  name: "",
  props: {},
  components: { PublicTitle },
  data() {
    return {
      radioList: ["降雨量分布", "水位监测", "台风路径"],
      radioCurrent: 0,
      //当前天气预报
      weatherMSGList: [],
      waterLevelList: [],
      //swiper
      swiperOption: {
        direction: "vertical", //轮播方向
        mousewheel: true, //支持滚轮
        initialSlide: 1, //默认页数
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false, // 手动切换之后继续自动轮播
        // },
        loop: true,
      },
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    // 获取天气
    this.doWeatherSeven(areaWeather);
    this.doGetWaterLevel();
  },
  methods: {
    //获取天气预报
    doWeatherSeven(areaWeather) {
      getWeatherSeven(areaWeather).then((res) => {
        if (res.success) {
          let weatherArr = [];
          res.body.forEach((e, i) => {
            let obj = {
              monitorTime: `${e.monitorTime.slice(-2)}日`,
              weatherType: `${e.weatherDescDay}`,
              temp: `${e.tempNight}~${e.tempDay}`,
              weatherIcon: require("@/assets/images/dragonBoat/icon_thrun.png"),
            };
            weatherArr.push(obj);
          });
          // 每6个分一组
          let _weatherArr = [];
          for (let i = 0; i < weatherArr.length; ) {
            _weatherArr.push(weatherArr.slice(i, (i += 6)));
          }
          this.weatherMSGList = _weatherArr;
        } else {
        }
      });
    },
    // 获取监测水位
    doGetWaterLevel() {
      getWaterLevel({ body: {} }).then((res) => {
        if (res.success) {
          this.waterLevelList = [];
          if (res.body && res.body.length) {
            this.waterLevelList = res.body;
            this.waterLevelList.map((i, k) => {
              i.keys = k + 1;
            });
          }
        }
      });
    },
    // 监测水位-定位位
    waterLevelPointer(item, index) {},
    // 监测水位-详情
    waterLevelDetail(item, index) {},
  },
  beforeDestroy() {
    pGzznCore = null;
  },
};
</script>
<style lang='less' scoped>
.realtime-weather {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3% 2%;
  .realtime-weather-content {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("./images/bg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 5% 3%;
    // 左侧
    .realtime-left {
      width: 50%;
      height: 100%;
      .weather-msg-list {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        .swiper-container {
          width: 100%;
          height: 100%;
        }
        .swiper-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          & > li:nth-of-type(3n + 2) {
            border-left: 1px solid;
            border-right: 1px solid;
            border-width: 80%;
            border-image: linear-gradient(
                transparent,
                transparent,
                #00ffff,
                transparent,
                transparent
              )
              60;
          }
          & > li:nth-of-type(n + 4):nth-of-type(-n + 6) {
            align-self: flex-end;
          }
        }
        li {
          height: 40%;
          width: 30%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 5%;
          p {
            text-align: center;
            color: white;
          }
          p:nth-child(1) {
            text-align: center;
            padding: 5px 0;
            background: #2fadfc;
          }
          p:nth-child(2) {
            width: 100%;
            height: auto;
            img {
              display: block;
              width: 60px;
              margin: 20% auto;
            }
          }
        }
      }
    }
    // 右侧
    .realtime-right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .realtime-right-radio {
        display: flex;
        margin-bottom: 5%;
        cursor: pointer;
        .radio-item {
          color: #fff;
          & + .radio-item::before {
            color: #fff;
            padding: 0 20px;
            content: "/";
            display: inline-block;
          }
          &:hover {
            opacity: 0.9;
          }
          &.active {
            color: #00ffff;
          }
        }
      }
      .realtime-right-content {
        height: calc(95% - var(--mini-font));
        width: 100%;
        // 降雨量分布
        .rainfall-distribution {
          width: 100%;
          height: 100%;
          background: url("./images/map.png") no-repeat;
          background-size: 100% 100%;
        }
        // 水位监测
        .water-monitoring {
          width: 100%;
          height: 100%;

          .fire-list-header {
            width: 100%;
            background: #113953;
            color: #feffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            padding: 2% 0;
            span {
              text-align: center;
            }
          }
          .fire-list-content {
            width: 100%;
            height: calc(96% - var(--mini-font));
            overflow-y: auto;
            &::-webkit-scrollbar {
              display: none;
            }
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #feffff;
              padding: 2% 0;

              span {
                text-align: center;
              }
            }
            li + li {
              border-top: 1px #314c53 solid;
            }
            .option {
              display: flex;
              justify-content: space-around;
              span {
                padding: 4px 4px;
                border: 1px #00fffe solid;
                cursor: pointer;
                & + span {
                  margin-left: 5px;
                }
              }
            }
          }
          .keys {
            width: 10%;
          }
          .type {
            width: 15%;
          }
          .name {
            width: 20%;
          }
          .alertValue {
            width: 15%;
          }
          .value {
            width: 15%;
          }
          .option {
            width: 140px;
          }
        }
        // 台风路径
        .typhoon-track {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>