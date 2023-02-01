<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-08-25 16:44:47
-->
<template>
  <div class="construction-achievement-left">
    <div class="left-left">
      <div class="model-title">基础设施建设情况</div>
      <div class="time">
        <ul class="time-list">
          <li v-for="(item, index) in yearList" :key="index">
            <div class="year">{{ item }}</div>
            <div
              class="out"
              @click="changeYearFn(index, item)"
              :class="yearIndex == index ? 'active-out' : ''"
            >
              <div class="inner"></div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="infrastructure">
        <li
          class="infrastructure-child"
          v-for="(item, index) in infrastructureList"
          :key="index"
        >
          <div class="infrastructure-top">
            <div class="title">{{ item.name }}</div>
            <div class="number">
              {{ item.num }} <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="infrastructure-bottom">
            <div class="text" v-show="item.lastType === '1'">较去年增加</div>
            <div class="text" v-show="item.lastType === '2'">较去年减少</div>

            <div class="percentage">
              <div class="icon"></div>
              <div class="rate">{{ item.lastPercentage }}%</div>
            </div>
            <div class="create-num">
              {{ item.lastNum }}<span class="unit">{{ item.lastUnit }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="left-right">
      <div class="model-title">软件设施建设情况</div>
      <div class="information">
        <div class="model-little-title">信息系统使用情况</div>
        <ul class="inform-list">
          <li
            class="inform-child"
            v-for="(item, index) in informList"
            :key="index"
          >
            <div class="inform-bg">
              <div class="number">
                {{ item.num }}<span class="unit">{{ item.unit }}</span>
              </div>
              <div class="system">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="network">
        <div class="model-little-title">网络安全建设情况</div>
        <ul class="network-list">
          <li
            class="network-child"
            v-for="(item, index) in networkList"
            :key="index"
          >
            <div class="title">{{ item.name }}</div>
            <div class="number">
              <div class="num">
                {{ item.num }}<span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="symbol">
        <div class="model-little-title">标准规范建设情况</div>
        <ul class="symbol-list">
          <li
            class="symbol-child"
            v-for="(item, index) in standardList"
            :key="index"
          >
            <div class="title">{{ item.name }}</div>
            <div class="number">
              <div class="num">
                {{ item.num }}<span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </li>
          <!-- <li class="symbol-child">
            <div class="title">制度类规范</div>
            <div class="number">
              <div class="num">136<span class="unit">次</span></div>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { indicatorCodes } from "@/api/constructionAchievements/index";
export default {
  data() {
    return {
      yearIndex: 3,
      infrastructureList: [
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
        {
          title: "服务器数量",
          number: "12345",
          text: "较去年增加",
          percentage: "5%",
          createNum: 618,
        },
      ],
      networkList: [
        {
          title: "网络加固次数",
          num: 1320,
        },
        {
          title: "安全补丁次数",
          num: 1010,
        },
        {
          title: "符合等保三级系统个数",
          num: 520,
        },
        {
          title: "符合等二级系统个数",
          num: 689,
        },
      ],

      informList: [
        { system: "在建系统", number: 38 },
        { system: "已建系统", number: 138 },
        { system: "市局系统", number: 26 },
        { system: "省厅系统", number: 32 },
        { system: "应急部系统", number: 26 },
        { system: "其他系统", number: 26 },
      ],

      // 标砖规范建设情况
      standardList: [],

      yearList: ["2018", "2019", "2020", "2021"],
    };
  },
  created() {
    this.init();
  },
  components: {},
  mounted() {},
  computed: {},
  methods: {
    init() {
      this.getInfrastructureConstructionData("2021");
      this.getInformationSystemUsageData();
      this.getNetworkSecurityConstructionData();
      this.getConstructionOfStandardsData();
    },
    initChart() {},
    changeYearFn(index, year) {
      this.yearIndex = index;
      this.getInfrastructureConstructionData(year);
    },

    // 建设成功展示-基础设施建设情况
    getInfrastructureConstructionData(year) {
      indicatorCodes("dreiXaZs", {
        body: {
          dimensionYear: year,
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成功展示-基础设施建设情况", res);
          this.infrastructureList = res.body.data;
          // infrastructureList;
        }
      });
    },

    // 建设成功展示-信息系统使用情况
    getInformationSystemUsageData() {
      indicatorCodes("aghfsOze", {
        body: {
          dimensionYear: "2021",
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成功展示-信息系统使用情况", res);
          this.informList = res.body.data;
          // infrastructureList;
        }
      });
    },

    // 建设成功展示-网络安全建设情况
    getNetworkSecurityConstructionData() {
      indicatorCodes("quJpUtqE", {
        body: {
          dimensionYear: "2021",
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成功展示-网络安全建设情况", res);
          this.networkList = res.body.data;
          // infrastructureList;
        }
      });
    },

    // 建设成功展示-标准规范建设情况
    getConstructionOfStandardsData() {
      indicatorCodes("NUDNt1l8", {
        body: {
          dimensionYear: "2021",
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成功展示-标准规范建设情况", res);
          this.standardList = res.body.data;
          // infrastructureList;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
