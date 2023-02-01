<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-09-03 14:27:45
 * @LastEditTime: 2021-08-24 15:53:52
-->
<template>
  <div class="emergency-overview-left">
    <div class="left_box">
      <div class="left_top">
        <div class="model_box">
          <div class="model-title">天气预报</div>
        </div>
        <div class="left-left-date">
          <ul class="weather-btn-list">
            <li
              v-for="(item, index) in weatherTypeList"
              :class="[
                index === weatherData.weatherIndex ? 'weather-active' : '',
              ]"
              :key="index"
              @click="onWeather(item, index)"
            >
              {{ item }}
            </li>
          </ul>

          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 0">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in sixHourList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}</p>
              </li>
            </a-carousel>
          </ul>

          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 1">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in oneDayList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}</p>
              </li>
            </a-carousel>
          </ul>
          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 2">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in weatherMSGList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}℃</p>
              </li>
            </a-carousel>

          </ul>
        </div>
      </div>
      <div class="left_bottom">
        <div class="model_box">
          <div class="model-title">降雨量</div>
        </div>
        <div class="meteorology-chart">
          <div class="meteorology-chart-line" id="echarts"></div>
        </div>
      </div>
    </div>

    <div class="left-right">
      <ul class="weather-btn-list">
        <li
          v-for="(item, index) in weatherContent"
          :class="[
            index === weatherContent1.weatherIndex ? 'weather-active' : '',
          ]"
          :key="index"
          @click="onWeatherTitle(item, index)"
        >
          {{ item }}
        </li>
      </ul>
      <!-- <p class="weather_warning" v-show="weatherContent1.weatherIndex == 0">
        当前我市共有15测站水们超警戒线
      </p> -->
      <div class="water_title">
        <div class="left-map-path" v-show="weatherContent1.weatherIndex == 0">
          <span
            :class="mapPathActive === '1' ? 'active-span' : ''"
            @click="mapPathClick('', '1')"
            >全部</span
          >
          <span>/</span>
          <span
            :class="mapPathActive === '2' ? 'active-span' : ''"
            @click="mapPathClick('珠江潮位', '2')"
            >珠江潮位</span
          >
          <span>/</span>
          <span
            :class="mapPathActive === '3' ? 'active-span' : ''"
            @click="mapPathClick('水位站', '3')"
            >水位站</span
          >
        </div>
        <div class="left-map-path" v-show="weatherContent1.weatherIndex == 1">
          <span
            :class="pointActive === '1' ? 'active-span' : ''"
            @click="pointClick('', '1')"
            >全部</span
          >
          <span>/</span>
          <span
            :class="pointActive === '3' ? 'active-span' : ''"
            @click="pointClick(1, '3')"
            >涵隧</span
          >
          <span>/</span>
          <span
            :class="pointActive === '2' ? 'active-span' : ''"
            @click="pointClick(2, '2')"
            >水浸点</span
          >
        </div>
        <div v-show="weatherContent1.weatherIndex == 2"></div>
        <div class="water_search">
          <a-input-search
            placeholder="输入关键字"
            v-model="keywords"
            @search="searchClick"
          />
        </div>
      </div>

      <div class="left-bottom-content file-model-all">
        <Ctable :columns="industryColumns" :listData="waterLevelList">
          <template slot="value" slot-scope="{ record, text }">
            <span style="color: red">{{ text }}</span>
            <span v-if="transtionIndex == 2"
              >{{ eventSourceType[record.eventSource] }}
            </span>
          </template>
          <template slot="position" slot-scope="{ record, text }">
            <div class="border" @click="waterLevelPointer(record)">定位</div>
          </template>
          <!-- eventLevel -->
          <template slot="eventLevel" slot-scope="{ record, text }">
            <div>{{ eventLevelType[text] }}</div>
          </template>

          <!-- <template slot="eventArea" slot-scope="{ record, text }">
            <div>{{ getEventArea(text) }}</div>
          </template> -->
        </Ctable>
      </div>
    </div>
    <div class="left-right_box">
      <div
        class="map-flex-icon icon-one"
        style="position: fixed; top: 12vh; margin-left: 10px"
      >
        <div
          class="flex-icon-img"
          @click="selectDivShow('iconSelectOneActive')"
        >
          <img
            src="@/assets/images/dragonBoatNormal/icon_hydraulic.png"
            alt=""
          />
        </div>
        <div class="map-flex-content" v-if="iconSelectOneActive">
          <div
            style="width: 100%; height: auto"
            v-for="(item, index) in iconSelectOneObj"
            :key="index"
          >
            <p>
              <span class="type"></span>
              <label>{{ item.typeName }}</label>
            </p>
            <ul>
              <li v-for="(citem, cindex) in item.children" :key="cindex">
                <span
                  @click="flexClickliItem(item, index, citem, cindex)"
                  :class="[citem.active ? 'active-span' : '', 'active-sure']"
                  >{{ citem.active ? "✔" : "" }}</span
                ><label>{{ citem.typeName }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex-icon-img">
          <img src="@/assets/images/dragonBoatNormal/icon_weather.png" alt="" />
          <div class="map-flex-sign"></div>
        </div>
        <div class="flex-icon-sign">
          <img
            src="@/assets/images/dragonBoatNormal/icon_sign.png"
            alt=""
            @click="clickSignshow('iconSelectOneActive')"
          />
          <div class="map-flex-sign" v-if="false">
            <p>
              <span class="type"></span>
              <label>绘标</label>
            </p>
            <div>
              <ul>
                <li
                  v-for="(e, i) in signArr"
                  :key="i"
                  :class="e.flag ? 'bd_style' : ''"
                  @click="clickSign(e, i)"
                >
                  <img :src="e.sign" alt="" />
                </li>
              </ul>
            </div>
            <div class="make_sure">
              <span> 确定 </span>

              <span @click="cancelFn"> 取消 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ctable from "@/components/APicture/c-table.vue";
import moment from "moment";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue";
import Bus from "@/utils/Bus.js";
import listDatas from "../utils/datas";
import Header from "@/components/APicture/header";
import Menu from "@/components/APicture/menu";
import { getNowWeater, getSeventDayWeater } from "@/api/floodPreventionWar";

import {
  getTeamInfo,
  choseTeamGetDatas,
  searchWaterlogging,
  leftEventList,
  leftEventDetail,
  fileTypeLon,
  getWeather,
  getWeatherSeven,
  getWaterLevel,
  getEmergencyPlan,
} from "@/api/dragonBoat";
import vueSeamlessScroll from "vue-seamless-scroll";
import {
  transactionList,
  indicatorCodes,
  findKeyReservoir,
} from "@/api/dragonBoatNormal";
import * as echarts from "echarts";
import { MessagePush } from "@/utils/pushMinix"; //混入
export default {
  components: { LayerConsulting, Ctable },
   mixins: [MessagePush],
  data() {
    return {
      keywords: "",
      defaultParams: {
        body: {
          type: "",
          name: "",
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      waterLevelList: [],
      weatherTypeList: ["6h", "24h", "7天"],
      weatherContent: ["三防水情", "内涝点", "事件列表"],
      sixHourList: [],
      oneDayList: [],
      weatherMSGList: [
        // {
        //   dates: "24日",
        //   weatherType: "晴天",
        //   temp: "28~35",
        //   weatherIcon: require("../../../assets/images/dragonBoat/icon_sun.png"),
        // },
        // {
        //   dates: "25日",
        //   weatherType: "晴天",
        //   temp: "28~35",
        //   weatherIcon: require("../../../assets/images/dragonBoat/icon_sun.png"),
        // },
        // {
        //   dates: "26日",
        //   weatherType: "晴天",
        //   temp: "28~35",
        //   weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_sun.png"),
        // },
        // {
        //   dates: "27日",
        //   weatherType: "晴天",
        //   temp: "28~35",
        //   weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_sun.png"),
        // },
        // {
        //   dates: "28日",
        //   weatherType: "晴天",
        //   temp: "28~35",
        //   weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_sun.png"),
        // },
      ],
      option: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      },
      weatherData: {
        weatherIndex: 0,
        weatherTime: "6H",
      },
      weatherContent1: {
        weatherIndex: 0,
        weatherTime: "三防水情",
      },
      temperatureOneDiv: null,
      temperatureTwoDiv: null,
      slopeChartDiv: null,
      mapPathActive: "1",
      pointActive: "1",
      obj: {
        titleName: "水位：m",
        seriesName: "水位：m",
        xDabaList: ["4月24日", "4月25日", "4月26日", "4月27日", "4月28日"],
        seriesDataList: ["100", "200", "300", "400", "500"],
        xDabaListWater: [
          "20:00",
          "21:00",
          "22:00",
          "23:00",
          "00:00",
          "01:00",
          "02:00",
        ],
        seriesDatWateraList: ["99", "99", "99", "99", "99", "99", "99"],
      },
      industryColumns: [],
      inonSelect: [
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
      eventSourceType: {
        0: "pc",
        1: "移动终端",
        2: "邮件",
        3: "短信",
        4: "电话",
        5: "其他",
      },
      eventLevelType: {
        1: "特别重大事故",
        2: "重大事故",
        3: "较大事故",
        4: "一般事故",
        60: "其他事件",
      },

      iconSelectOneActive: null,
      iconSelectTwoActive: null,
      transtionIndex: 0,
      temperature: null,
      waterDate: [],
      iconSelectOneObj: [],
      clickFlag: 0,
    };
  },
  created() {
    // 应急资源总览
    this.doReservoir();
    // this.getEventArea();
  },
  mounted() {
    window.changeIconState = this.changeIconState;
    this.doWeatherSeven("440100000000");
    this.getFileTypeLon();
    this.$nextTick(() => {
      this.initChart();
    });
    this.doGetWaterLevel();
    this.doGetNowWeater();
  },
  computed: {
    beginYearList() {
      let date = new Date().getFullYear();
      let list = [];
      for (let i = 0; i <= 10; i++) {
        list.push(date - i);
      }
      console.log(list);
      return list;
    },
    endYearList() {},
    // 消息推送
    pushData(){
      return this.$store.getters.responeData
    }
  },
  watch: {
    pushData: {
      handler(newVal, oldVal) {
        //console.log('testssss',newVal)
        if(newVal.cmd) {
          let cmdCode = newVal.cmd
          switch(cmdCode){
            case 'event':
              this.getEventData();
              break;
            default:
              break;
          }

        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    this.temperatureOneDiv && this.temperatureOneDiv.dispose();
    this.temperatureTwoDiv && this.temperatureTwoDiv.dispose();
  },
  methods: {
    // 获取区域 Z67lpx15 sn
    // getEventArea(sn) {

    // },
    searchClick() {
      console.log("搜索到的数据", this.keywords);
      console.log("当前的tab", this.weatherContent1.weatherIndex);
      this.defaultParams.body.name = this.keywords;
      if (this.weatherContent1.weatherIndex == 0) {
        this.doGetWaterLevel();
      } else if (this.weatherContent1.weatherIndex == 1) {
        this.getWaterloggingPointData();
      } else if (this.weatherContent1.weatherIndex == 1) {
        this.getEventData();
      }
    },
    // 查询重点水库
    doReservoir() {
      const data = {
        body: {},
        sortName: "sid",
        sortOrder: "desc",
      };
      findKeyReservoir(data).then((res) => {
        console.log(res);
        if (res.success) {
          let keyArr = JSON.parse(JSON.stringify(res.body));
          keyArr.forEach((e, i) => {
            e.number = i + 1;
          });
          this.inonSelect = keyArr;
          let arr = JSON.parse(JSON.stringify(keyArr));
          this.waterData = arr.splice(0, 5);
        } else {
        }
      });
    },
    flexClickliItem(item, index, citem, cindex) {
      this.iconSelectOneObj[index].children[cindex].active = !citem.active;
      if (this.iconSelectOneObj[index].children[cindex].active) {
        let childrenLength = this.iconSelectOneObj[index].children.length;
        let currentArr = this.iconSelectOneObj[index].children.filter(
          (i, k) => {
            if (i.active) {
              return i;
            }
          }
        );
        if (currentArr.length === childrenLength) {
          this.iconSelectOneObj[index].active = true;
        }
      } else {
        this.iconSelectOneObj[index].active = false;
      }
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (citem.type == "5") {
        //水位站
        pGzznCore.addPromiseWaterLevel(citem.active);
        WaterStationState = citem.active;
      } else if (citem.type == "4") {
        //隧道
        pGzznCore.addPromiseTunnel(citem.active);
      } else if (citem.type == "3") {
        //水浸点
        pGzznCore.addPromiseWaterloggingPoint(citem.active);
        WaterloggingPointState = citem.active;
      } else if (citem.type == "2") {
        //堤防
        pGzznCore.addPromiseBeware(citem.active);
      } else if (citem.type == "1") {
        //水库
        pGzznCore.addPromiseReservoirs(citem.active);
      } else if (citem.type == "6") {
        //雨量站
        pGzznCore.addPromiseRainfallStation(citem.active);
      } else if (
        citem.type == "440103" ||
        citem.type == "440104" ||
        citem.type == "440105" ||
        citem.type == "440106" ||
        citem.type == "440111" ||
        citem.type == "440112" ||
        citem.type == "440113" ||
        citem.type == "440114" ||
        citem.type == "440115" ||
        citem.type == "440183" ||
        citem.type == "440184"
      ) {
        //避难场所
        pGzznCore.addPromiseShelterArea(citem.type, citem.active);
      }
    },
    clickSignshow() {
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
    initChart() {
      // 温度统计1
      const that = this;
      this.temperature = this.$echarts.init(document.getElementById("echarts"));
      let resDatas = {
        titleName: "水位：m",
        seriesName: "水位：m",
        ...this.obj,
      };
      this.temperature.setOption(this.temperatureOneChart(resDatas));
      window.onresize = function () {
        that.temperature.resize();
      };
    },
    temperatureOneChart(obj) {
      let option = {
        title: {
          text: obj.titleName,
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: "35vh" * 10.8,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "10%",
          top: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xDabaList,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "30vh" * 10.8,
              },
            },
            offset: 10,
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "27vh" * 10.8,
              },
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: [10, 10],
                dashOffset: 5,
                //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
                color: "#ffffff",
              },
              show: true, //隐藏或显示
            },
          },
        ],
        series: [
          {
            name: obj.seriesName,
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: obj.seriesDataList,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#12486a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#112b4c", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              color: "#00feff",
            },
          },
        ],
      };
      return option;
    },
    init() {
      //pGzznCore = new gzznCore("crystalContainer");
      //pGzznCore.FlyTo(1);
      //pGzznCore.addPromiseNephogram();
      //pGzznCore.addPromiseEventList();
      //pGzznCore.addPromiseTunnel(true, false);
      //pGzznCore.addPromiseWaterloggingPoint(true, false);
      //pGzznCore.addPromiseWaterLevel(true, false);
    },

    // 选中-应急队伍-获取数据
    doChoseTeamGetDatas(sid) {
      choseTeamGetDatas(sid).then((res) => {
        if (res.success) {
          console.log(89898989, res);
        }
      });
    },

    // 获取远程数据
    remoteDatas(res) {
      // 应急队伍，修改成按范围注入
      /**
      getTeamInfo().then((res) => {
        if (res.success) {
          this.thingList[0].listData = []; 
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body))
            saveList.map((i, k) => {
              i.active = false
              this.thingList[0].listData.push(i)
            });
          }
        } else {
        }
      }); */
      this.thingList[0].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = true;
          this.thingList[0].listData.push(i);
        });
      }
    },

    // 查询内涝点
    doSearchWaterlogging() {
      searchWaterlogging({ body: {}, page: 1, pageSize: 1000 }).then((res) => {
        console.log("内涝点", res);
        if (res.success) {
        }
      });
    },
    // 查询龙舟水左侧事件列表
    getLeftEventList() {
      leftEventList({ body: {} })
        .then((res) => {
          if (res.success) {
            this.leftRightEventDatatList = [];
            if (res.body && res.body.length) {
              this.leftRightEventDatatList = res.body;
              this.getLeftEventDetail(this.leftRightEventDatatList[0]);
              this.doGetEmergencyPlan(this.leftRightEventDatatList[0]); //应急预案
            }
          } else {
            this.leftRightEventDatatList = [];
          }
        })
        .catch((error) => {
          if (error) {
          }
        });
    },
    /*
     *天气预报第一版
     */
    //获取天气预报
    doWeather() {
      getWeather("440100000000").then((res) => {
        if (res.success) {
          let weatherArr = [];
          res.body.forEach((e, i) => {
            let obj = {
              monitorTime: e.monitorTime.slice(-5),
              weatherType: e.weatherDesc,
              temp: e.temp,
              weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_thrun.png"),
            };
            weatherArr.push(obj);
          });
          if (this.weatherData.weatherTime === "6H") {
            this.weatherMSGList = weatherArr.splice(0, 6);
          } else if (this.weatherData.weatherTime === "24H") {
            this.weatherMSGList = weatherArr;
          }
        } else {
        }
      });
    },
    //获取天气预报
    doWeatherSeven() {
      getWeatherSeven("440100000000").then((res) => {
        if (res.success) {
          let weatherArr = [];
          res.body.forEach((e, i) => {
            let obj = {
              monitorTime: `${e.monitorTime.slice(-2)}日`,
              weatherType: `${e.weatherDescDay}`,
              temp: `${e.tempNight}~${e.tempDay}`,
              weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_thrun.png"),
            };
            weatherArr.push(obj);
          });

          this.weatherMSGList = weatherArr;
        } else {
        }
      });
    },

    // 事件切换
    leftEventChange(item, index) {
      console.log(index);
      this.leftRightEventIndex = index;
    },
    // 右侧导航切换
    radioTabsChange(item, index) {
      this.radioTabsActive = item.key;
      // console.log(index);
    },
    // 点击定位
    toPointerHanderl(item) {
      this.radioTabsActiveObj = item;
      this.toInitTimeLineList(item.created, () => {});
      this.getLeftEventDetail(item);
      this.doGetEmergencyPlan(item);
      pGzznCore.addPromiseEventInfo(item);
    },
    // 事件跟踪记录
    getLeftEventDetail(item) {
      let send = { eventId: item.sid };
      if (item && item.sendTime) {
        send.startTime = moment(item.sendTime).format("YYYY-MM-DD HH:mm:ss");
      }
      leftEventDetail({ body: { ...send } }).then((res) => {
        if (res.success) {
          try {
            if (res.body && this.eventDataList.length > res.body.length) {
              this.$nextTick(() => {
                const eventDiv = document.querySelector(".first-msg-li");
                eventDiv.classList.add("new-message");
                eventDiv.addEventListener("webkitAnimationEnd", function () {
                  eventDiv.classList.remove("new-message");
                });
              });
            }
            this.eventDataList = JSON.parse(JSON.stringify(res.body));
          } catch {}
        } else {
        }
      });
    },
    //
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
      // if(this.iconSelectActive !== null && index === this.iconSelectActive){
      //   this.iconSelectActive = null
      // } else {
      //   this.iconSelectActive = index
      // }
    },
    changeIconState(type) {
      for (let i = 0; i < this.iconSelectOneObj.length; i++) {
        for (let j = 0; j < this.iconSelectOneObj[i].children.length; j++) {
          let pType = this.iconSelectOneObj[i].children[j].type;
          if (pType == type) {
            this.iconSelectOneObj[i].children[j].active = true;
            if (type == "5") {
              WaterStationState = true;
            } else if (type == "3") {
              WaterloggingPointState = true;
            }
          }
        }
      }
    },
    getFileTypeLon() {
      fileTypeLon().then((res) => {
        if (res.success) {
          this.iconSelectOneObj = JSON.parse(JSON.stringify(res.body));
          this.iconSelectOneObj.map((item, index) => {
            this.iconSelectOneObj[index].active =
              item.typeName === "易涝点" ? true : false;
            if (item.children && item.children.length) {
              this.iconSelectOneObj[index].children.map((i, k) => {
                this.iconSelectOneObj[index].children[k] = {
                  ...i,
                  active:
                    item.typeName === "易涝点" || i.typeName === "水位站"
                      ? true
                      : false,
                };
                //this.iconSelectOneObj[index].children[i].active = true;
              });
            }
          });
        }
      });
    },
    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },

    onWeather(item, index) {
      console.log(item, index);
      //当前按钮样式
      this.weatherData.weatherIndex = index;
      //当前时间
      this.weatherData.weatherTime = item;
      // 点击对象为7天时
      if (item === "7天") {
        // this.doWeatherSeven();
        this.doGetSeventDayWeater();
      } else {
        // this.doWeather();
      }
    },

    /*
     *天气预报第二版
     */
    // 实时天气预报
    doGetNowWeater() {
      let monitorStartTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let monitorEndTimes = moment(
        new Date().getTime() + 1000 * 60 * 60 * 24
      ).format("YYYY-MM-DD HH:mm:ss");
      // let monitorTimes = moment(new Date()).format("YYYY-MM-DD");
      let sendData = {
        // monitorStartTime: monitorTimes + " 00:00:00",
        // monitorEndTime: monitorTimes + " 23:59:59",
        monitorStartTime,
        monitorEndTimes,
        areaSn: "440111000000",
        source: "GZQX",
      };
      /*    console.log("获取当前天气实况",sendData)
      return false */
      getNowWeater({ body: { ...sendData } })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let arrList = res.body;
              arrList.sort((a, b) => {
                new Date(a.monitorTime).getTime() -
                  new Date(b.monitorTime).getTime();
              });
              /*   console.log('数组排序1',arrList)
               arrList.sort((a,b)=>{new Date(b.monitorTime).getTime() - new Date(a.monitorTime).getTime()})
               console.log('数组排序2',arrList) */
              let weatherArr = [];
              arrList.forEach((e, i) => {
                let obj = {
                  monitorTime: `${e.monitorTime.split(" ")[1].slice(0, 5)}`,
                  weatherType: `${e.weatherDesc}`,
                  temp: `${e.temp/10}℃`,
                  weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_thrun.png"),
                };
                weatherArr.push(obj);
              });
              // this.weatherMSGList = weatherArr;
              this.sixHourList = weatherArr.slice(0, 6);
              this.oneDayList = weatherArr;
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
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
        areaSn: "440111000000",
        source: "GZQX",
      };

      getSeventDayWeater({ 
        body: { ...sendData }, 
        "sortName": "MONITOR_TIME",
          "sortOrder": "asc"
      })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let weatherArr = [];
              let  sortData = (a, b) =>{
                return  a.monitorDay - b.monitorDay
              }
              res.body.forEach((e, i) => {
                let obj = {
                  monitorTime: `${e.monitorTime.slice(-2)}日`,
                  weatherType: `${e.weatherDescDay}`,
                  temp: `${e.tempNight}~${e.tempDay}`,
                  weatherIcon: require("../../../assets/images/dragonBoatNormal/icon_thrun.png"),
                  monitorDay:parseInt(new Date(e.monitorTime).getTime())
                };
                weatherArr.push(obj);
              });
              weatherArr.sort(sortData)
              this.weatherMSGList = weatherArr;
            }
            console.log("7天实时数据", res);
          } else {
            console.log("7天实时数据", res);
          }
        })
        .catch((err) => {});
    },

    scopeHandelActive(item, index) {
      this.scopeActive = index;
      pGzznCore.addPromiseEventRange(item.key);
    },

    //
    mapPathClick(type, num) {
      this.defaultParams.body.type = type;
      this.doGetWaterLevel();
      this.mapPathActive = num;
      // this.mapPathActive = type;
      // console.log(type);
      // if (type == "3") {
      //   indicatorCodes("mKET7pZ0", { body: {} }).then((res) => {
      //     if (res.success) {
      //       this.industryColumns = [
      //         { textIndex: "rownum", title: "序号" },
      //         { textIndex: "type", title: "类型" },
      //         { textIndex: "name", title: "名称" },
      //         { textIndex: "address", title: "区域" },
      //         { textIndex: "operation", title: "操作" },
      //       ];
      //       this.waterLevelList = res.body.data;
      //     }
      //   });
      // }
    },

    pointClick(type, num) {
      this.pointActive = num;
      this.defaultParams.body.type = type;
      this.getWaterloggingPointData();
    },

    // 三防水情
    doGetWaterLevel() {
      indicatorCodes("mKET7pZ0", this.defaultParams).then((res) => {
        console.log(res);
        if (res.success) {
          this.industryColumns = [
            { textIndex: "type", title: "类型", width: "20%" },
            { textIndex: "name", title: "名称", width: "20%" },
            { textIndex: "address", title: "地址", width: "50%" },
            { textIndex: "position", title: "定位", width: "10%" },
          ];
          this.waterLevelList = res.body.data;
        }
      });
      // getWaterLevel({ body: {} }).then((res) => {
      //   if (res.success) {
      //     this.industryColumns = [
      //       { textIndex: "keys", title: "序号", width: "10%" },
      //       { textIndex: "type", title: "类型", width: "15%" },
      //       { textIndex: "name", title: "名称", width: "15%" },
      //       { textIndex: "alertValue", title: "警界水位", width: "20%" },
      //       { textIndex: "value", title: "事实水位", width: "20%" },
      //       { textIndex: "operation", title: "操作", width: "20%" },
      //     ];
      //     this.waterLevelList = [];
      //     if (res.body && res.body.length) {
      //       this.waterLevelList = res.body;
      //       this.waterLevelList.map((i, k) => {
      //         i.keys = k + 1;
      //         // i.showValue = i.value?i.value:''
      //       });
      //     }
      //   }
      // });
    },

    // 内涝点
    getWaterloggingPointData() {
      indicatorCodes("Oee55QFO", this.defaultParams).then((res) => {
        console.log(res);
        if (res.success) {
          this.industryColumns = [
            { textIndex: "degree", title: "类型", width: "10%" },
            { textIndex: "name", title: "名称", width: "25%" },
            { textIndex: "condition", title: "内容", width: "30%" },
            { textIndex: "address", title: "地址", width: "25%" },
            { textIndex: "position", title: "定位", width: "10%" },
          ];
          this.waterLevelList = res.body.data;
        }
      });
    },

    // 事件列表
    getEventData() {
      transactionList({ body: { eventType: "10008" } }).then((res) => {
        if (res.success) {
          this.industryColumns = [
            { textIndex: "created", title: "发生时间", width: "20%" },
            { textIndex: "eventName", title: "内容", width: "30%" },
            { textIndex: "eventArea", title: "区域", width: "15%" },
            { textIndex: "eventLevel", title: "事件等级", width: "15%" },
            { textIndex: "value", title: "来源", width: "10%" },
            { textIndex: "position", title: "定位", width: "10%" },
          ];
          res.body.map((item) => {
            indicatorCodes("Z67lpx15", {
              body: {
                sn: item.eventArea,
              },
              page: 1,
              pageSize: -1,
              sortName: "sid",
              sortOrder: "desc",
            }).then((res) => {
              item.eventArea = res.body.data[0].name;
            });
          });
          this.waterLevelList = res.body;
          console.log(this.waterLevelList);
        }
      });
    },

    // 监测水位-定位位
    waterLevelPointer(item, index) {
      if (this.transtionIndex == 0) {
        pGzznCore.addPromiseWaterStationLocation(item.sid);
      } else if (this.transtionIndex == 1) {
        pGzznCore.addPromiseWaterloggingPointLocation(item);
      } else if (this.transtionIndex == 2) {
        pGzznCore.addPromiseEventInfo(item, false);
      }
    },
    // 监测水位-详情
    waterLevelDetail(item, index) {},
    // 应急预案-获取
    doGetEmergencyPlan(item) {
      getEmergencyPlan({ body: { eventId: item.sid } }).then((res) => {
        if (res.success) {
          this.emergencyPlanList = res.body;
          // console.log('应急预案',res)
        }
      });
    },
    // 靶向范围选择
    doChoseTarget(key) {
      this.targetingChose = key;
    },
    emergencyDetail(item) {
      this.$refs.CModel.$emit("show", { ...item, pageType: "detail" });
    },

    initDateGreenLine() {
      let defaultPx = 130;
      let pxOne = this.timmerLineObj.onePxSecond;
      const greenLine = document.querySelector(".time-line-green");
      let currentTime = new Date().getTime();
      let beginNum = this.beginTime.getTime();
      // console.log("=============>>99",defaultPx + (( currentTime - beginNum )/pxOne))
      greenLine.style.width =
        defaultPx + (currentTime - beginNum) / pxOne + "px";
      return false;

      // let oneSecondPx =  1/second
    },
    // 时间轴-时间自动滑动
    timeLineTimoutOut() {
      let second = this.timmerLineObj.onePxSecond;
      let oneSecondPx = 1 / second;
      const greenLine = document.querySelector(".time-line-green");
      const moveModel = document.querySelector(".time-modle");
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => {
        console.log(
          "greenLine",
          parseFloat(greenLine.style.width),
          greenLine.offsetWidth,
          oneSecondPx
        );
        pGzznCore.addPromiseUpdateTeamPath();
        greenLine.style.width =
          parseInt(greenLine.style.width.replace("px", "")) + 1 + "px";
        this.saveTimeLong =
          (parseInt(greenLine.style.width.replace("px", "")) - 130) * second +
          new Date(this.beginTime).getTime();
        if (this.msgSendType) {
          this.sendOneK =
            this.sendOneK === 0
              ? 0
              : this.sendOneK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendOneK - parseInt(Math.random() * 10);
          this.sendTwoK =
            this.sendTwoK === 0
              ? 0
              : this.sendTwoK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendTwoK - parseInt(Math.random() * 10);
          this.sendThreeK =
            this.sendTwoK === 0
              ? 0
              : this.sendThreeK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendThreeK - parseInt(Math.random() * 10);
        }
        clearTimeout(this.timeOut);
        // console.log('istimeout3',6666,this.timeOut)
        this.timeLineTimoutOut();
        this.getLeftEventDetail({
          ...this.radioTabsActiveObj,
          sendTime: new Date(),
        });
      }, second);
      this.isCurrentWidth();
    },

    isSendMsg() {
      this.msgSendType = true;
    },

    onWeather(item, index) {
      //当前按钮样式
      this.weatherData.weatherIndex = index;
      //当前时间
      this.weatherData.weatherTime = item;
      // 点击对象为7天时
    },

    //事件切换
    onWeatherTitle(item, index) {
      this.industryColumns = [];
      console.log(item, index);
      this.transtionIndex = index;
      this.defaultParams.body.name = "";
      this.defaultParams.body.type = "";
      this.keywords = "";
      // this.
      if (index == 2) {
        this.getEventData();
      } else if (index == 0) {
        this.doGetWaterLevel();
      } else if (index == 1) {
        this.getWaterloggingPointData();
      }

      this.weatherContent1.weatherIndex = index;
      //当前时间
      this.weatherContent1.weatherTime = item;
    },
  },
};
</script>

<style lang="less" scoped>
@w:100 /5760;
// @h:100 /1079;
@h:100 /1080;
.operation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 86vw * @w;
    height: 44vh * @h;
    line-height: 44vh * @h;
    display: block;
    border: 1vh * @h #00fffe solid;
    cursor: pointer;
  }
}
@import "../index.less";
</style>
