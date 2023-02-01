<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-09-23 14:13:05
-->
<template>
  <div class="three-proofing-left">
    <div class="left-left">
      <div class="model-title title-position">气象信息</div>
      <div class="left-title-btn">
        <div class="model-little-title middle-title-margin">预报</div>
        <ul class="c-btn-list">
          <li
            v-for="(item, index) in btnList"
            :key="index"
            :class="[btnActive === index ? 'chose-active' : '']"
            @click="handleForecast(item, index, $event)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="left-left-weather">
        <ul class="left-weather-list" v-show="btnActive == 0">
          <li
            v-for="(i, k) in weathList"
            :key="k"
            :class="[
              (k + 1) % 3 === 0 ? 'li-pouple' : 'li-blue',
              (k + 1) % 5 === 0 ? 'no-margin' : '',
            ]"
          >
            <div>
              <p>{{ i.monitorTime }}</p>
              <p>{{ i.weatherType }}</p>
            </div>
            <div>
              <p>
                <!-- <img :src="i.icon" alt="" /> -->
              </p>
              <p>
                {{ i.temp }}
              </p>
            </div>
          </li>
        </ul>
        <div v-show="btnActive == 1" class="hydrology">
          未来三日珠江潮位低位逐日上涨，最高潮位出现在晚上，均在警戒值以下。
          具体如下：
        </div>
        <div v-show="btnActive == 2" class="ocean">
          <a-row>
            <a-col :span="7">
              <img
                class="imgArea"
                src="../../../assets/images/theCityThreeProofing/typhoon.svg"
              />
            </a-col>
            <a-col :span="17">
              <a-row>
                <a-col :span="24" class="typhoon">台风</a-col>
                <a-col :span="24" class="title"
                  >预计下周南海及西北太平洋有1~2个台风生产，其中有1个台风影响南海，我们将密切关注。</a-col
                >
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="left-title-btn">
        <div class="model-little-title middle-title-margin">实况</div>
        <ul class="c-btn-list">
          <li
            v-for="(item, index) in liveBtnList"
            :key="index"
            :class="[liveBtnActive === index ? 'chose-active' : '']"
            @click="handleLive(item, index, $event)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="left-bottom-small" v-show="liveBtnActive == 0">
        <div class="left-bottom-title">
          <div
            v-for="(i, k) in leftBottomBtnList"
            :key="k"
            :class="[leftBottomActive === k ? 'active' : '']"
            @click="leftBottomClick(i, k)"
          >
            {{ i.name }}<span v-if="k !== leftBottomBtnList.length - 1">/</span>
          </div>
        </div>
        <div class="select-times">
          <div v-if="leftBottomActive !== 1">时次：</div>
          <div v-else>类型：</div>
          <div v-for="(i, k) in timeSlectList" :key="k">
            <span> <em></em> </span><label for="">{{ i.name }}</label>
          </div>
        </div>
      </div>
      <div class="left-bottom-lists">
        <div class="left-bottom-inner">
          <clist
            v-show="liveBtnActive == 0"
            :columns="rainfallHeader"
            :listData="rainfallList"
          ></clist>
          <clist
            v-show="liveBtnActive == 1"
            :columns="seaHeader"
            :listData="seaList"
          ></clist>
          <iframe
            v-show="liveBtnActive == 2"
            src="http://sfwx.gzajj.gov.cn/gzsfWeixinQY/waterConditionSite/tidelevel.html#/sanshan"
            scrolling="auto"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </div>
    <div class="left-right">
      <div class="model-title title-position">预警信号</div>
      <div class="left-right-top">
        <div class="warning-types">
          <div
            class="type"
            v-show="false"
            v-for="(item, index) in warningTypeList"
            :key="index"
            :class="[warningType === index ? 'active' : '']"
            @click="(e) => warningChange(e, item)"
          >
            {{ item }}
          </div>
        </div>
        <div class="detail" @click="showWarning">点击查看分镇街预警</div>
      </div>
      <div class="warning-chart-warp">
        <WarningModel></WarningModel>
      </div>
      <div
        class="warning-chart-slef warning-chart"
        v-show="warningType == 0 && false"
      ></div>
      <div
        class="warning-chart-slef warning-chart"
        v-show="warningType == 1 && false"
      ></div>
      <div
        class="warning-chart-slef warning-chart"
        v-show="warningType == 2 && false"
      ></div>
      <div
        class="warning-chart-slef warning-chart"
        v-show="warningType == 3 && false"
      ></div>
      <div class="table-list">
        <clist :columns="warningHeader" :listData="warningData"></clist>
      </div>

      <pop-up-layer
        :show="warningShow"
        v-if="warningShow"
        class="warning-popup"
        :setStyles="{}"
        @doClose="close"
        :templateEvent="templateEvent"
        opsition="pageRight"
        ref="myPopUpLayer"
        title="广州市预警信号"
      >
        <template slot="content">
          <div class="content">
            <img :src="icon" alt="" class="img" />
            <div class="detail">
              广州越秀区,天河区,黄埔区,增城区,海珠区,番禺区,荔湾区,南沙区,白云区,从化区,花都区发布了森林火险预警。
            </div>
            <div class="tips">鼠标悬浮地图可显示防御指引。</div>
            <div class="region-information">
              <div class="title">分区预警信号</div>
              <div class="region-charts"></div>
            </div>
          </div>
        </template>
      </pop-up-layer>
    </div>
    <a-icon
      type="fullscreen"
      class="c-icon"
      @click="popClick"
      v-show="liveBtnActive == 2"
    />
    <tempPop
      :title="river.title"
      :show="river.show"
      :v-show="river.show"
      :setStyles="{ left: '16.3%', top: '54%' }"
      class="command-table"
      @doClose="riverClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="c-typhon">
          <iframe
            v-if="river.show"
            src="http://sfwx.gzajj.gov.cn/gzsfWeixinQY/waterConditionSite/tidelevel.html#/sanshan"
            scrolling="auto"
            style="width: 100%; height: 100%"
          ></iframe>
        </div>
      </template>
    </tempPop>
  </div>
</template>

<script>
import moment from "moment";
import Clist from "@/components/APicture/c-table";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import GZMapJson from "../../../utils/GuangZhou";
import { getWeatherSeven } from "@/api/common";
import { getzjcwt } from "../../../api/theCityThreeProofing";
import { getNowWeater, getSeventDayWeater } from "@/api/floodPreventionWar";
import WarningModel from "./warning";
export default {
  components: { Clist, WarningModel, tempPop },
  data() {
    return {
      river: {
        title: "珠江潮位图",
        show: false,
      },
      icon: require("../../../assets/images/theCityThreeProofing/icon_3.png"),
      warningShow: false,
      btnActive: 0,
      btnList: [
        { key: "0", name: "气象" },
        { key: "1", name: "水文" },
        { key: "2", name: "海洋" },
      ],
      liveBtnActive: 0,
      liveBtnList: [
        { key: "0", name: "气象" },
        { key: "1", name: "水文" },
        { key: "2", name: "珠江潮位图" },
      ],
      leftBottomActive: 0,
      leftBottomBtnList: [
        { name: "降雨", type: 0 },
        { name: "温度", type: 1 },
        { name: "风速", type: 2 },
      ],
      // 时次
      timeSlectList: [
        { name: "24小时", type: 0 },
        { name: "1小时", type: 1 },
        { name: "0.5小时", type: 2 },
      ],

      // 温度类型
      typeList: [
        { name: "日最高温", type: 0 },
        { name: "日最低温", type: 1 },
        { name: "气温", type: 2 },
      ],

      windTimeList: [{ name: "24小时", type: 0 }],

      // 天气
      weathList: [
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_1.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_2.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_3.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_4.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_1.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_2.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_3.png"),
          temp: "10~20℃",
        },
        {
          key: "0",
          date: "20日",
          type: "中到大雨",
          icon: require("../../../assets/images/theCityThreeProofing/icon_4.png"),
          temp: "10~20℃",
        },
      ],
      // 降雨
      rainfallList: [
        {
          area: "海珠区",
          address: "广州市海珠区瑞康路389至395号（单号）",
          rainfall: 8,
          intensity: "小雨",
          index: 0,
        },
        {
          area: "天河区",
          address: "广州市天河区中海康城花园紫罗兰街11号10房",
          rainfall: 15,
          intensity: "中雨",
          index: 0,
        },
        {
          area: "南沙区",
          address: "广州市南沙区大岗镇大南路31号",
          rainfall: 20,
          intensity: "中雨",
          index: 0,
        },
        {
          area: "白云区",
          address: "广州市白云区棠景街三元里大道益寿街2号203",
          rainfall: 6,
          intensity: "小雨",
          index: 0,
        },
      ],
      rainfallHeader: [
        { title: "区域", index: 0, textIndex: "area", width: "15%" },
        { title: "地址", index: 1, textIndex: "address", width: "40%" },
        { title: "雨量(mm)", index: 2, textIndex: "rainfall", width: "15%" },
        { title: "降雨强度", index: 3, textIndex: "intensity", width: "30%" },
      ],
      // 温度
      temList: [
        {
          area: "越秀区",
          address: "广州市越秀区大新西路连元街29号101房",
          temperature: 30.5,
        },
        {
          area: "白云区",
          address: "广州市白云区均禾街均禾一巷42号",
          temperature: 27.1,
        },
        {
          area: "南沙区",
          address: "广州市南沙区大岗镇大南路31号",
          temperature: 30,
        },
        {
          area: "番禺区",
          address: "广州市番禺区洛浦街沙溪村幸福南路三村东南街17号",
          temperature: 30,
        },
        {
          area: "天河区",
          address: "广州市天河区中海康城花园紫罗兰街",
          temperature: 31,
        },
      ],
      temHeader: [
        { title: "区域", index: 0, textIndex: "area", width: "15%" },
        { title: "站址", index: 1, textIndex: "address", width: "70%" },
        {
          title: "温度(度)",
          index: 2,
          textIndex: "temperature",
          width: "15%",
        },
      ],

      // 风速
      windList: [
        {
          area: "白云区",
          address: "广州市越秀区大新西路连元街29号101房",
          speed: 12.9,
          level: 6,
        },
        {
          area: "越秀区",
          address: "广州市白云区均禾街均禾一巷42号",
          speed: 10.5,
          level: 5,
        },
        {
          area: "南沙区",
          address: "广州市南沙区大岗镇大南路31号",
          speed: 12.7,
          level: 6,
        },
        {
          area: "番禺区",
          address: "广州市番禺区洛浦街沙溪村幸福南路三村东南街17号",
          speed: 12.9,
          level: 6,
        },
        {
          area: "天河区",
          address: "广州市天河区车陂东街8号3楼",
          speed: 12.9,
          level: 6,
        },
      ],
      windHeader: [
        { title: "区域", index: 0, textIndex: "area", width: "15%" },
        { title: "站址", index: 1, textIndex: "address", width: "55%" },
        { title: "风速(m/s)", index: 2, textIndex: "speed", width: "15%" },
        { title: "风级", index: 3, textIndex: "level", width: "15%" },
      ],

      warningTypeList: ["暴雨", "台风", "水文", "海洋"],
      // warningTypeList: ["暴雨"],
      warningType: 0,
      warningEcharts: null,
      // 降雨
      warningData: [
        {
          date: "2021-05-13",
          town: "广州市越秀区人民北路921号康乐大厦三楼",
          level: 1,
          area: "海珠区",
          index: 0,
        },
        {
          date: "2021-06-16",
          town: "广州市番禺区洛浦街沙溪村幸福南路三村东南街17号",
          level: 2,
          area: "番禺区",
          index: 0,
        },
        {
          date: "2021-07-20",
          town: "广州经济技术开发区锦绣路100号之综合楼A座三楼A307室",
          level: 3,
          area: "越秀区",
          index: 0,
        },
        {
          date: "2021-07-28",
          town: "广州市越秀区大新西路连元街29号101房",
          level: 3,
          area: "天河区",
          index: 0,
        },
      ],
      warningHeader: [
        { title: "区域", index: 0, textIndex: "area", width: "15%" },
        { title: "镇街", index: 1, textIndex: "town", width: "50%" },
        { title: "发布日期", index: 2, textIndex: "date", width: "20%" },
        { title: "级别", index: 3, textIndex: "level", width: "15%" },
      ],
      seaHeader: [
        { title: "站名", index: 0, textIndex: "address" },
        { title: "水位（m）", index: 1, textIndex: "value" },
        { title: "汛限水位（m）", index: 2, textIndex: "alertValue" },
      ],
      seaList: [],
      // 弹框地图
      regionEcharts: null,
    };
  },
  created() {
    this.init();
    this.initDatas();
    this.doGetSeventDayWeater();
  },
  mounted() {
    this.$nextTick(() => {
      // this.initChart();
    });
  },
  computed: {},
  methods: {
    moment,
    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },

    popClick() {
      this.river.show = true;
    },

    riverClose() {
      this.river.show = false;
    },

    initChart() {
      // this.totalChartDiv = this.$echarts.init(
      //   document.querySelector(".chart-event-total")
      // );
      // let totalChartDataObj = {
      //   xAxisList: this.formatDataList(listDatas.listData4),
      //   listDatas: this.formatDataList(listDatas.listData4, "value"),
      // };
      // this.totalChartDiv.setOption(this.totalChartBar(totalChartDataObj));

      this.warningEcharts = this.$echarts.init(
        document.getElementsByClassName("warning-chart-slef")[0]
      );
      this.$echarts.registerMap("Guangzhou", GZMapJson.GuangZhouJson);
      this.warningEcharts.setOption(this.warningEchartFn());

      const that = this;
      window.onresize = function () {
        that.eventDeathDiv.resize();
        that.warningEcharts.resize();
      };
    },
    initDatas() {
      getWeatherSeven().then((res) => {
        console.log("天气", res);
        if (res.success) {
        }
      });
    },
    warningEchartFn() {
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
        },

        visualMap: {
          type: "piecewise", //定义为分段型
          min: 0,
          max: 1000,
          right: "10%",
          bottom: 0,
          align: "left", //指定组件中手柄和文字的摆放位置 手柄（右）和文字（左）
          //   borderWidth: 1,
          itemHeight: 16, // 图形高度
          // itemSymbol: 'rect', //视觉组件的图形形状
          itemWidth: 26, // 图形宽度
          textStyle: {
            color: "#fff",
          },

          pieces: [
            { min: 0, max: 50, color: "#f4e829", label: "黄色暴雨" },
            { min: 50, max: 100, color: "#f3a625", label: "橙色暴雨" },
            { min: 100, color: "#cb0a1e", label: "红色暴雨" },
          ],
          // text: ['高', '低'], //两端的文本  需要配合showLabel一起使用
          showLabel: true,
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "Guangzhou", // 自定义扩展图表类型
            // 悬浮样式
            layoutCenter: ["50%", "60%"],
            // layoutSize:320,
            zoom: 1.2,
            aspectScale: 1.5, //长宽比
            // showLabel: false,
            label: {
              //显示名称
              show: true,
              color: "white",
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              {
                name: "白云区",
                value: 34,
              },
              {
                name: "天河区",
                value: 340,
              },
              {
                name: "增城区",
                value: 35,
              },
              {
                name: "荔湾区",
                value: 340,
              },
              {
                name: "越秀区",
                value: 78,
              },
              {
                name: "海珠区",
                value: 34,
              },
              {
                name: "黄埔区",
                value: 20,
              },
              {
                name: "番禺区",
                value: 90,
              },
              {
                name: "花都区",
                value: 120,
              },
              {
                name: "南沙区",
                value: 80,
              },
              {
                name: "从化区",
                value: 34,
              },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
        ],
      };
      return option;
    },

    regionEchartFn() {
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
          formatter:
            "地点：{b0}<br />预警：森林火险黄色<br />防御指引: <br />【森林火险黄色】<br />1、进入森林防火防御状态，有关单位应当加强森林防火宣传教育，普及用火安全指引。<br />2、进入森林防火防御状态，有关单位应当加强森林防火宣传教育，普及用火安全指引。", //悬浮展示格式
        },

        visualMap: {
          type: "piecewise", //定义为分段型
          min: 0,
          max: 1000,
          right: "10%",
          bottom: 0,
          align: "left", //指定组件中手柄和文字的摆放位置 手柄（右）和文字（左）
          //   borderWidth: 1,
          itemHeight: 16, // 图形高度
          // itemSymbol: 'rect', //视觉组件的图形形状
          itemWidth: 26, // 图形宽度
          textStyle: {
            color: "#000",
          },

          pieces: [
            { min: 0, max: 500, color: "#559def", label: "1-500" },
            { min: 500, max: 999, color: "#ff8e28", label: "500-999" },
            { min: 999, color: "#e94544", label: ">1000" },
          ],
          // text: ['高', '低'], //两端的文本  需要配合showLabel一起使用
          showLabel: true,
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "Guangzhou", // 自定义扩展图表类型
            // 悬浮样式
            layoutCenter: ["50%", "60%"],
            // layoutSize:320,
            zoom: 1.2,
            aspectScale: 1.5, //长宽比
            // showLabel: false,
            label: {
              //显示名称
              show: true,
              color: "white",
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              {
                name: "白云区",
                value: 34,
              },
              {
                name: "天河区",
                value: 348,
              },
              {
                name: "增城区",
                value: 356,
              },
              {
                name: "荔湾区",
                value: 34,
              },
              {
                name: "越秀区",
                value: 3477,
              },
              {
                name: "海珠区",
                value: 34,
              },
              {
                name: "黄埔区",
                value: 600,
              },
              {
                name: "番禺区",
                value: 34,
              },
              {
                name: "花都区",
                value: 34,
              },
              {
                name: "南沙区",
                value: 34,
              },
              {
                name: "从化区",
                value: 34,
              },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
        ],
      };
      return option;
    },

    // 台风
    typhoonEchartsFn() {
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
        },

        visualMap: {
          type: "piecewise", //定义为分段型
          min: 0,
          max: 1000,
          right: "10%",
          bottom: 0,
          align: "left", //指定组件中手柄和文字的摆放位置 手柄（右）和文字（左）
          //   borderWidth: 1,
          itemHeight: 16, // 图形高度
          // itemSymbol: 'rect', //视觉组件的图形形状
          itemWidth: 26, // 图形宽度
          textStyle: {
            color: "#fff",
          },

          pieces: [
            { min: 0, max: 6, color: "#f0f0f0", label: "白色台风" },
            { min: 6, max: 8, color: "#0f0feb", label: "蓝色台风" },
            { min: 8, max: 9, color: "#f4e829", label: "黄色台风" },
            { min: 9, max: 10, color: "#fbaa23", label: "橙色台风" },
            { min: 10, color: "#c30e21", label: "红色台风" },
          ],
          // text: ['高', '低'], //两端的文本  需要配合showLabel一起使用
          showLabel: true,
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "Guangzhou", // 自定义扩展图表类型
            // 悬浮样式
            layoutCenter: ["50%", "60%"],
            // layoutSize:320,
            zoom: 1.2,
            aspectScale: 1.5, //长宽比
            // showLabel: false,
            label: {
              //显示名称
              show: true,
              color: "white",
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              {
                name: "白云区",
                value: 2,
              },
              {
                name: "天河区",
                value: 5,
              },
              {
                name: "增城区",
                value: 8,
              },
              {
                name: "荔湾区",
                value: 4,
              },
              {
                name: "越秀区",
                value: 2,
              },
              {
                name: "海珠区",
                value: 4,
              },
              {
                name: "黄埔区",
                value: 5,
              },
              {
                name: "番禺区",
                value: 5,
              },
              {
                name: "花都区",
                value: 7,
              },
              {
                name: "南沙区",
                value: 9,
              },
              {
                name: "从化区",
                value: 10,
              },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
        ],
      };
      return option;
    },

    // 水文
    hydrologynEchartsFn() {
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
        },

        visualMap: {
          type: "piecewise", //定义为分段型
          min: 0,
          max: 1000,
          right: "10%",
          bottom: 0,
          align: "left", //指定组件中手柄和文字的摆放位置 手柄（右）和文字（左）
          //   borderWidth: 1,
          itemHeight: 16, // 图形高度
          // itemSymbol: 'rect', //视觉组件的图形形状
          itemWidth: 26, // 图形宽度
          textStyle: {
            color: "#fff",
          },

          pieces: [
            { min: 0, max: 10, color: "#559def", label: "一级" },
            { min: 10, max: 20, color: "#ff8e28", label: "二级" },
            { min: 20, color: "#e94544", label: "三级" },
          ],
          // text: ['高', '低'], //两端的文本  需要配合showLabel一起使用
          showLabel: true,
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "Guangzhou", // 自定义扩展图表类型
            // 悬浮样式
            layoutCenter: ["50%", "60%"],
            // layoutSize:320,
            zoom: 1.2,
            aspectScale: 1.5, //长宽比
            // showLabel: false,
            label: {
              //显示名称
              show: true,
              color: "white",
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              {
                name: "白云区",
                value: 2,
              },
              {
                name: "天河区",
                value: 5,
              },
              {
                name: "增城区",
                value: 8,
              },
              {
                name: "荔湾区",
                value: 4,
              },
              {
                name: "越秀区",
                value: 20,
              },
              {
                name: "海珠区",
                value: 4,
              },
              {
                name: "黄埔区",
                value: 12,
              },
              {
                name: "番禺区",
                value: 5,
              },
              {
                name: "花都区",
                value: 26,
              },
              {
                name: "南沙区",
                value: 9,
              },
              {
                name: "从化区",
                value: 34,
              },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
        ],
      };
      return option;
    },

    // 海洋
    oceanEchartsFn() {
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
        },

        visualMap: {
          type: "piecewise", //定义为分段型
          min: 0,
          max: 1000,
          right: "10%",
          bottom: 0,
          align: "left", //指定组件中手柄和文字的摆放位置 手柄（右）和文字（左）
          //   borderWidth: 1,
          itemHeight: 16, // 图形高度
          // itemSymbol: 'rect', //视觉组件的图形形状
          itemWidth: 26, // 图形宽度
          textStyle: {
            color: "#fff",
          },

          pieces: [
            { min: 0, max: 3, color: "#559def", label: "一级" },
            { min: 3, max: 6, color: "#ff8e28", label: "二级" },
            { min: 6, color: "#e94544", label: "三级" },
          ],
          // text: ['高', '低'], //两端的文本  需要配合showLabel一起使用
          showLabel: true,
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "Guangzhou", // 自定义扩展图表类型
            // 悬浮样式
            layoutCenter: ["50%", "60%"],
            // layoutSize:320,
            zoom: 1.2,
            aspectScale: 1.5, //长宽比
            // showLabel: false,
            label: {
              //显示名称
              show: true,
              color: "white",
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              {
                name: "白云区",
                value: 2,
              },
              {
                name: "天河区",
                value: 5,
              },
              {
                name: "增城区",
                value: 8,
              },
              {
                name: "荔湾区",
                value: 4,
              },
              {
                name: "越秀区",
                value: 2,
              },
              {
                name: "海珠区",
                value: 4,
              },
              {
                name: "黄埔区",
                value: 5,
              },
              {
                name: "番禺区",
                value: 5,
              },
              {
                name: "花都区",
                value: 7,
              },
              {
                name: "南沙区",
                value: 9,
              },
              {
                name: "从化区",
                value: 34,
              },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
        ],
      };
      return option;
    },

    formatDataList(arr, values = "name", otherpush = 0) {
      let returnList = arr.map((item, key) => {
        if (otherpush) {
          return item[values] + otherpush;
        } else {
          return item[values];
        }
      });
      return returnList;
    },

    // 实况点击
    leftBottomClick(i, k) {
      this.leftBottomActive = k;
      if (i.name == "降雨") {
        console.log("降雨");
        this.rainfallList = [
          {
            area: "白云区",
            address: "广州市白云区棠景街三元里大道益寿街2号203",
            rainfall: 10,
            intensity: "中雨",
            index: 0,
          },
          {
            area: "越秀区",
            address: "广州市越秀区大新西路连元街",
            rainfall: 2,
            intensity: "小雨",
            index: 0,
          },
          {
            area: "天河区",
            address: "广州市天河区中海康城花园紫罗兰街",
            rainfall: 20,
            intensity: "中雨",
            index: 0,
          },
          {
            area: "海珠区",
            address: "广州市海珠区瑞康路389至395号",
            rainfall: 25,
            intensity: "大雨",
            index: 0,
          },
        ];

        this.rainfallHeader = [
          { title: "区域", index: 0, textIndex: "area", width: "15%" },
          { title: "地址", index: 1, textIndex: "address", width: "40%" },
          { title: "雨量(mm)", index: 2, textIndex: "rainfall", width: "15%" },
          { title: "降雨强度", index: 3, textIndex: "intensity", width: "30%" },
        ];

        this.timeSlectList = [
          { name: "24小时", type: 0 },
          { name: "1小时", type: 1 },
          { name: "0.5小时", type: 2 },
        ];
      } else if (i.name == "温度") {
        console.log("温度");
        this.rainfallHeader = this.temHeader;
        this.rainfallList = this.temList;
        this.timeSlectList = this.typeList;
      } else {
        console.log("风速");
        this.rainfallList = this.windList;

        this.rainfallHeader = this.windHeader;
        this.timeSlectList = this.windTimeList;
      }
    },

    // 预警信息切换
    warningChange(e, name) {
      console.log("预警信息切换", e, name);
      if (name == "暴雨") {
        console.log(1);
        this.warningType = 0;
      } else if (name == "台风") {
        this.warningType = 1;
        this.$nextTick(() => {
          this.warningEcharts = this.$echarts.init(
            document.getElementsByClassName("warning-chart")[1]
          );
          this.$echarts.registerMap("Guangzhou", GZMapJson.GuangZhouJson);
          this.warningEcharts.setOption(this.typhoonEchartsFn());
        });
      } else if (name == "水文") {
        this.warningType = 2;
        this.$nextTick(() => {
          this.warningEcharts = this.$echarts.init(
            document.getElementsByClassName("warning-chart")[2]
          );
          this.$echarts.registerMap("Guangzhou", GZMapJson.GuangZhouJson);
          this.warningEcharts.setOption(this.hydrologynEchartsFn());
        });
      } else if (name == "海洋") {
        this.warningType = 3;
        this.$nextTick(() => {
          this.warningEcharts = this.$echarts.init(
            document.getElementsByClassName("warning-chart")[3]
          );
          this.$echarts.registerMap("Guangzhou", GZMapJson.GuangZhouJson);
          this.warningEcharts.setOption(this.oceanEchartsFn());
        });
      }
    },
    //气象信息 - 预报 切换
    handleForecast(i, k, $event) {
      this.btnActive = k;
      console.log(k);
    },
    // 气象信息 - 实况 切换
    handleLive(i, k, $event) {
      this.liveBtnActive = k;
      if (k == 1) {
        this.getzjcwtList();
      }
    },
    getzjcwtList() {
      getzjcwt({ body: { codes: "Or6gPb5G" } }).then((res) => {
        if (res.success) {
          this.seaList = res.body.data;
        }
        // console.log('ccccc',res)
      });
    },

    // 展示预警
    showWarning() {
      this.warningShow = true;
      this.$nextTick(() => {
        this.regionEcharts = this.$echarts.init(
          document.getElementsByClassName("region-charts")[0]
        );
        this.$echarts.registerMap("Guangzhou", GZMapJson.GuangZhouJson);
        this.regionEcharts.setOption(this.regionEchartFn());
      });
    },

    // 关闭预警
    close() {
      this.warningShow = false;
    },
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
                  temp: `${e.temp}℃`,
                  // weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
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
        sortName: "MONITOR_TIME",
        sortOrder: "asc",
      })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let weatherArr = [];
              res.body.forEach((e, i) => {
                let obj = {
                  monitorTime: `${e.monitorTime.slice(-2)}日`,
                  weatherType: `${e.weatherDescDay}`,
                  temp: `${e.tempNight}℃~${e.tempDay}℃`,
                  monitorDay: parseInt(new Date(e.monitorTime).getTime()),
                  // weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
                };
                weatherArr.push(obj);
              });
              let sortData = (a, b) => {
                return a.monitorDay - b.monitorDay;
              };
              weatherArr.sort(sortData);
              this.weathList = weatherArr;
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
@import "../index.less";
.command-table {
  width: 1880vw * @w;
  height: 700vh * @h;
}
</style>
