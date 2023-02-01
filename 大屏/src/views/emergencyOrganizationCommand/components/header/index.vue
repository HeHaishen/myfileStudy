<!--
 * @Description:广交会应急指挥
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-10 10:16:45
 * @LastEditTime: 2021-10-22 14:09:15
-->
<template>
  <div class="header">
    <div class="header-right">
      <ul>
        <li class="weater-li-tem">
          <div class="tem-icon">
            <img :src="weatherIconList['moreCloudy']" alt="" />
          </div>
          <div class="tem-num">
            <p class="tem-num-p">
              {{ curentWeaterObj.currentTem }}℃<label></label><span></span>
            </p>
            <p class="tem-num-p3">{{ curentWeaterObj.temp }}</p>
            <!-- <p class="tem-num-p2"></p> -->
          </div>
          <div  class="tem-num">
            <p class="tem-num-p2">{{curentWeaterObj.weatherDescDay}}</p>
          </div>
        </li>
        <li class="water-type">
          <div>
            <p>
              <img
                src="../../../../assets/images/majorFestivalsConductor/icon-tem.png"
                alt=""
              />
            </p>
            <p>湿度</p>
          </div>
          <div>
            <p>湿度</p>
            <p>{{ curentWeaterObj.humidityDay }}%</p>
          </div>
        </li>
        <li class="water-type">
          <div>
            <p>
              <img
                src="../../../../assets/images/majorFestivalsConductor/icon_win.png"
                alt=""
              />
            </p>
            <p>风力风向</p>
          </div>
          <div>
            <p>{{ curentWeaterObj.windDirectionDay }}</p>
            <p>{{ curentWeaterObj.windStrengthDay }}级</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="header-center">
      <span class="small-header">实况、实时 - </span> 现场救援抢险组织和指挥
      <span class="small-header"> - 实用、实战</span>
    </div>
    <div class="header-left">
      <p>{{ DateObj["datas"] }}</p>
      <p>{{ DateObj["weeks"] }}</p>
      <p>{{ DateObj["times"] }}</p>
    </div>
  </div>
</template>

<script>
import { getNowWeater, getSeventDayWeater } from "@/api/floodPreventionWar";
import moment from "moment";
export default {
  data() {
    return {
      timeOut: null,
      weatherIconList: {
        sun: require("../../../../assets/images/majorFestivalsConductor/icon_sun.png"),
        moreCloudy: require("../../../../assets/images/majorFestivalsConductor/icon_more_cloudy.png"),
        rainy: require("../../../../assets/images/majorFestivalsConductor/icon_rainy.png"),
        cloudy: require("../../../../assets/images/majorFestivalsConductor/icon_cloudy.png"),
      },
      curentWeaterObj: {
        temp: null, // 温度
        monitorDay: null, //
        windStrengthDay: null, // 风速
        windDirectionDay: null, // 风向
        humidityDay: null, // 湿度
        currentTem: null,
        weatherDescDay:null,
        weatherIcon:null
      },
      DateObj: {
        datas: null,
        times: null,
        weeks: null,
      },
    };
  },
  mounted() {
    this.toTimeShow();
    this.doGetSeventDayWeater();
  },
  methods: {
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
                  weatherDescDay:e.weatherDescDay
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
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
