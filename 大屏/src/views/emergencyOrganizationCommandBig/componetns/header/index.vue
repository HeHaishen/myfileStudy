<!--
 * @Description: 头部
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-06-08 10:15:29
 * @LastEditTime: 2021-11-05 16:53:28
-->
<template>
  <!-- 头部-开始 -->
  <div class="picture-header" id="big_header_scal">
    <div class="picture-header-left">
      <ul>
        <li class="weater-li-tem">
          <div class="tem-icon">
            <img :src="weatherIconList['moreCloudy']" alt="" />
          </div>
          <div class="tem-num">
            <p class="tem-num-p">80℃<label></label><span></span></p>
            <p class="tem-num-p3">{{ curentWeaterObj.temp }}</p>
          </div>
          <div class="tem-num">
            <p class="tem-num-p2">{{ curentWeaterObj.weatherDescDay }}</p>
          </div>
        </li>
        <li class="water-type">
          <div>
            <p>
              <img
                src="~@/assets/images/majorFestivalsConductor/icon-tem.png"
                alt=""
              />
            </p>
            <p>湿度</p>
          </div>
          <div>
            <p>湿度</p>
            <p v-if="curentWeaterObj.humidityDay">
              {{ curentWeaterObj.humidityDay }}%
            </p>
          </div>
        </li>
        <li class="water-type">
          <div>
            <p>
              <img
                src="~@/assets/images/majorFestivalsConductor/icon_win.png"
                alt=""
              />
            </p>
            <p>风力风向</p>
          </div>
          <div>
            <p>{{ curentWeaterObj.windDirectionDay }}</p>
            <p v-if="curentWeaterObj.windStrengthDay">
              {{ curentWeaterObj.windStrengthDay }}级
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="picture-header-center">
      <span class="small-header">实况、实时 - </span> {{ title }}
      <span class="small-header"> - 实用、实战</span>
    </div>
    <div class="picture-header-right">
      <div class="time">
        <p>{{ DateObj["datas"] }}</p>
        <p>{{ DateObj["weeks"] }}</p>
        <p>{{ DateObj["times"] }}</p>
      </div>
    </div>
  </div>
  <!-- 头部-结束 -->
</template>

<script>
import { getSeventDayWeater } from "@/api/floodPreventionWar";
import moment from "moment";
export default {
  data() {
    return {
      weatherIconList: {
        sun: require("@/assets/images/majorFestivalsConductor/icon_sun.png"),
        moreCloudy: require("@/assets/images/majorFestivalsConductor/icon_more_cloudy.png"),
        rainy: require("@/assets/images/majorFestivalsConductor/icon_rainy.png"),
        cloudy: require("@/assets/images/majorFestivalsConductor/icon_cloudy.png"),
      },
      curentWeaterObj: {
        temp: null, // 温度
        monitorDay: null, //
        windStrengthDay: null, // 风速
        windDirectionDay: null, // 风向
        humidityDay: null, // 湿度
        currentTem: null,
        weatherDescDay: null,
        weatherIcon: null,
      },
      timeOut: null,
      DateObj: {
        datas: null,
        times: null,
        weeks: null,
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "全市森林防火一张图",
      required: false,
    },
  },
  mounted() {
    this.toTimeShow();
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const heightClint = document.documentElement.clientHeight;
      const widthClint = document.documentElement.clientWidth;
      const columnNum = heightClint / 2155; // 计算比例
      const widthScrac = widthClint / 15360; // 宽度
      const bigHeaderScal = document.getElementById("big_header_scal");
      bigHeaderScal.style.transform = `scale(${widthScrac},${columnNum})`;
      bigHeaderScal.style.transformOrigin = "top left";
    },
    moment,
    /**
     * @Autor: "hehaishen"
     * @description：头部右侧时间显示
     * @return {null}
     * @param {NULL}
     */
    toTimeShow() {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => {
        this.DateObj["datas"] = this.getDatas();
        this.DateObj["times"] = this.getTime();
        this.DateObj["weeks"] = this.getWeeks();
        clearTimeout(this.timeOut);
        this.toTimeShow();
      }, 1000);
    },
    getDatas() {
      let datas = new Date().toJSON();
      let show = datas.slice(0, 10);
      return show;
    },
    getTime() {
      let datas = new Date().toTimeString();
      let show = datas.slice(0, 9);
      return show;
    },
    getWeeks() {
      let mydate = new Date();
      let myddy = mydate.getDay(); //获取存储当前日期
      let weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      return weekday[myddy];
    },
    // 七天天气预报
    doGetSeventDayWeater() {
      let monitorTimes = moment(new Date()).format("YYYY-MM-DD");
      let monitorEndTime = moment(
        new Date().getTime() + 60 * 60 * 1000 * 24 * 7
      ).format("YYYY-MM-DD");
      let sendData = {
        monitorStartTime: monitorTimes + " 00:00:00",
        monitorEndTime: monitorEndTime + " 23:59:59",
        areaSn: "440105000000",
        source: "GZQX",
      };
      getSeventDayWeater({
        body: { ...sendData },
        sortName: "MONITOR_TIME",
        sortOrder: "asc",
      })
        .then(async (res) => {
          if (res.success) {
            let sortData = (a, b) => {
              return a.monitorDay - b.monitorDay;
            };
            if (res.body && res.body.length) {
              let weatherArr = [];
              // res.body.sort(sortData)
              console.log(9999999, res.body);

              let arr = res.body.map((e, i) => {
                let obj = {
                  monitorTime: `${e.monitorTime.slice(-2)}日`,
                  monitorTimes: e.monitorTime,
                  weatherType: `${e.weatherDescDay}`,
                  temp: `${e.tempNight}℃~${e.tempDay}℃`, // 温度
                  currentTem: e.tempDay,
                  weatherIcon: this.weatherIconList[0],
                  monitorDay: parseInt(new Date(e.monitorTime).getTime()),
                  windStrengthDay: e.windStrengthDay, // 风速
                  windDirectionDay: e.windDirectionDay, // 风向
                  humidityDay: e.humidityDay, //湿度
                  weatherDescDay: e.weatherDescDay,
                };
                weatherArr.push(obj);
              });
              let awaitArr = await arr;
              weatherArr.sort(sortData);
              this.weatherMSGList = weatherArr;
              this.curentWeaterObj = this.weatherMSGList.find((i, k) => {
                if (i.monitorTimes == monitorTimes) {
                  return i;
                }
              });
              console.log(
                "change-res.body",
                monitorTimes,
                this.curentWeaterObj
              );
            }
            console.log("7天实时数据", res);
          } else {
            console.log("7天实时数据", res);
          }
        })
        .catch((err) => {});
    },
  },
  beforeDestroy() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  },
};
</script>

<style lang="less" scoped>
/* 顶部 */
.picture-header {
  width: 15360px;
  height: 160px;
  // width: 100%;
  // height: 6vh;
  background: url("~@/assets/images/majorFestivalsConductor/bg_header.png")
    no-repeat no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  // box-shadow: 0 10px 220px rgba(0, 0, 0, 0.2) inset;
  .picture-header-left {
    width: calc((100% - 5580px) / 2);
    height: 95px;

    ul {
      width: 100%;
      height: 100%;
      padding-left: 74px;
      li {
        min-width: 223px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
      }
      .weater-li-tem {
        width: 260px;
        padding-left: 24px;
        .tem-icon {
          flex-shrink: 0;
          width: 70px;
          height: 70px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .tem-num {
          min-width: 74px;
          width: auto;
          min-height: 50px;
          height: auto;
          margin-left: 10px;
          .tem-num-p {
            width: 90px;
            height: 70px;
            font-size: 43px;
            font-weight: bold;
            color: #4e99ff;
            position: relative;
            line-height: 82px;
            label {
              font-size: 12px;
              position: absolute;
              top: 2px;
              right: 26px;
            }
            span {
              font-size: 14px;
              position: absolute;
              top: 10px;
              right: 0px;
            }
          }
          .tem-num-p2 {
            width: 100%;
            height: 24px;
            line-height: 32px;
            color: white;
            font-size: 24px;
            padding: 0 12px;
            color: #4e99ff;
          }
          .tem-num-p3 {
            width: 100%;
            height: 28px;
            line-height: 28px;
            color: white;
            font-size: 28px;
          }
        }
      }
      .water-type {
        width: 260px;
        div:nth-child(1) {
          width: auto;
          height: 65px;
          p:nth-child(1) {
            width: 100%;
            display: flex;
            justify-content: center;
            img {
              display: block;
              width: 42px;
              height: 42px;
            }
          }
          p:nth-child(2) {
            height: 25px;
            font-size: 25px;
            color: white;
            text-align: center;
            width: auto;
            white-space: nowrap;
          }
        }
        div:nth-child(2) {
          margin-left: 14px;
          width: auto;
          height: 52px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          p:nth-child(1) {
            height: 32px;
            width: 100%;
            color: #488fe9;
            line-height: 32px;
            font-size: 32px;
          }
          p:nth-child(2) {
            width: 100%;
            height: 32px;
            width: 100%;
            color: #488fe9;
            line-height: 32px;
            font-size: 32px;
          }
        }
      }
    }
  }
  .picture-header-center {
    width: 5580px;
    font-size: 70px;
    line-height: 140px;
    text-align: center;
    color: white;
    .small-header {
      color: red;
      font-weight: bolder;
      font-size: 42px;
    }
  }
  .picture-header-right {
    // width: 782px;
    width: calc((100% - 5580px) / 2);
    height: 95px;
    // display: flex;
    // justify-content: flex-end;
    // align-items: stretch;
    text-align: right;
    line-height: 95px;
    position: relative;

    .time {
      position: absolute;
      line-height: 95px;
      width: 780px;
      height: 95px;
      top: 0;
      right: 50px;

      p {
        width: auto;
        padding: 0 22px 0 22px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        color: white;
        font-size: 49px;
        font-weight: bold;
        display: inline-block;
      }
    }
  }
}
</style>
