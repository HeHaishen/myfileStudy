<!--
 * @Description: 三防首页-雨量数据
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-09-17 11:01:15
 * @LastEditTime: 2021-09-22 19:51:34
-->
<template>
  <div class="threeproofing-home-pages">
    <Header title="广州市雨量数据表" />
    <div class="threeproofing-content">
      <div class="threeproofing-content-menus" v-if='false'>
        <Menus />
      </div>
      <div class="threeproofing-content-things">
        <div class="content-things-inner">
          <div class="c-wind">
            <div class="c-search">
              <div class="c-left">
                <label for="c-select">区域：</label>
                <a-select id="c-select" class="c-select" v-model="sendForm.obtname" @change="handleChange" dropdownClassName="c-popuper-style" @dropdownVisibleChange="timeDateInputFocus">
                  <a-select-option :value="item.key" v-for="item in regionList" :key="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <label for="c-time">时间：</label>
                <ul class="c-time-list">
                  <li class="c-time-child" v-for="(item, index) in timeList" :key="item.key" :class="timeActive == index ? 'active' : ''" @click="timeTab(item, index)">
                    {{ item.value }}
                  </li>
                </ul>
              </div>
              <div class="c-right">
                <a-button type="primary" icon="redo" size="small" class="c-query" @click="reset">重置</a-button>
              </div>
            </div>

            <div class="c-content">
              <div class="c-title" v-if="dataList.length > 0">
                {{ sendForm.obtname }}自动实况
                <span class="c-begin">{{ sendForm.beginTime }}</span>至<span class="c-end">{{ sendForm.endTime }}</span>
              </div>
              <div class="c-title" v-else>
                {{ sendForm.obtname }}自动实况<span class="c-begin"> -- </span>至<span class="c-end"> -- </span>
              </div>
              <div class="c-header">
                <div class="c-rank">排名</div>
                <div class="c-station">站名</div>
                <div class="c-rain">{{ timeNameActive }}雨量</div>
              </div>
              <ul class="c-body">
                <li class="c-td" v-for="(item, index) in dataList" :key="index">
                  <!-- <div class="c-triangle"></div> -->
                  <div class="c-transform">
                    <div class="c-rank">
                      <!-- <div class="c-linear">{{ index + 1 }}</div> -->

                      <!-- <img :src='rangkImg[index].icon' alt=""> -->
                      <p> {{'NO.'+(index+1)}}</p>
                      <img :src="rangkImg[index].icon" alt="">
                    </div>
                    <div class="c-station" :title='item.obtname'>{{ item.obtname }}</div>
                    <div class="c-rain">
                      <!-- 123{{timeActive}} 321{{typeof item.dayrain}} -->
                      <span v-if="timeActive === 1">{{ item.hourrf }}mm</span>
                      <span v-else-if="timeActive === 2">{{ item.r03h }}mm</span>
                      <span v-else-if="timeActive === 3">{{ item.dayrain }}mm</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGZRainApi } from "@/api/threeProoingRainfallDatas/index";
import moment from "moment";
import Header from "@/components/APicture/threeProofingComponents/header/index.vue";
import Menus from "@/components/APicture/threeProofingComponents/menus/index.vue";
export default {
  components: { Header, Menus },
  data() {
    return {
      timeActive: 1,
      timeNameActive: "1小时",
      sendForm: {
        obtname: "全市",
        beginTime: "",
        endTime: "",
      },
      regionList: [
        { key: "全市", name: "全市" },
        { key: "增城区", name: "增城区" },
        { key: "从化区", name: "从化区" },
        { key: "南沙区", name: "南沙区" },
        { key: "花都区", name: "花都区" },
        { key: "番禺区", name: "番禺区" },
        { key: "黄埔区", name: "黄埔区" },
        { key: "白云区", name: "白云区" },
        { key: "天河区", name: "天河区" },
        { key: "海珠区", name: "海珠区" },
        { key: "越秀区", name: "越秀区" },
      ],
      dataList: [],
      timeList: [
        { key: 1, value: "五分钟" },
        { key: 2, value: "1小时" }, //jbv3vyrP
        { key: 3, value: "3小时" }, //GxAOO2Ch
        { key: 4, value: "日雨量" }, //3o1mOeVc
      ],
      defaultParams: {
        body: {
          obtname: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      oneHour: {
        beginTime: "",
        endTime: "",
        dataList: [],
      },
      threeHour: {
        beginTime: "",
        endTime: "",
        dataList: [],
      },
      day: {
        beginTime: "",
        endTime: "",
        dataList: [],
      },
      rangkImg: [
        { icon: require("../../assets/images/threeProofingHomePages/no1bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no2bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no3bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no4bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no5bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no6bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no7bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no8bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no9bg.png") },
        { icon: require("../../assets/images/threeProofingHomePages/no10bg.png") },
      ]
    };
  },
  mounted() {
    // this.getGZRainData("jbv3vyrP");
    this.doQuery(() => {
      this.initData();
    });
  },

  methods: {
    initData() {
      this.dataList = this.oneHour.dataList.filter((item) => {
        if (this.defaultParams.body.obtname === "全市") {
          return true;
        } else if (
          item.obtname.indexOf(this.defaultParams.body.obtname) != -1
        ) {
          return true;
        }
      });
      this.sendForm.beginTime = this.oneHour.beginTime;
      this.sendForm.endTime = this.oneHour.endTime;
    },

    timeDateInputFocus(status) {
      console.log(status);
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      const columnNum = parseFloat((heightClint / 1080).toFixed(2)); // 计算比例
      const widthScrac = parseFloat((widthClint / 1920).toFixed(2)); // 宽度
      if (this.timeOuts) {
        clearTimeout(this.timeOuts);
      }
      this.$nextTick(() => {
        this.timeOuts = setTimeout(() => {
          let popuperData = document.querySelector(".c-popuper-style");
          popuperData.style.transform = `scale(${widthScrac},${columnNum})`;
          popuperData.style.transformOrigin = "0 0";
          clearTimeout(this.timeOuts);
        }, 0);
      });
    },
    reset() {
      this.timeActive = 1;
      this.sendForm.obtname = "全市";
      this.defaultParams.body.obtname = "全市";
      this.initData();
    },
    // GxAOO2Ch
    timeTab(item, index) {
      this.timeActive = index;
      this.timeNameActive = item.value;
      if (item.value === "日雨量") {
        this.timeNameActive = "日";
      }

      if (this.timeActive === 1) {
        // this.getGZRainData("jbv3vyrP");
        this.dataList = this.oneHour.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.oneHour.beginTime;
        this.sendForm.endTime = this.oneHour.endTime;
      } else if (this.timeActive === 2) {
        // this.getGZRainData("GxAOO2Ch");
        this.dataList = this.threeHour.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.threeHour.beginTime;
        this.sendForm.endTime = this.threeHour.endTime;
      } else if (this.timeActive == 3) {
        // this.getGZRainData("3o1mOeVc");
        this.dataList = this.day.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.day.beginTime;
        this.sendForm.endTime = this.day.endTime;
      } else if (this.timeActive === 0) {
        // this.getGZRainData("");
        this.dataList = [];
        this.sendForm.beginTime = "";
        this.sendForm.endTime = "";
      }
    },

    handleChange(item) {
      this.defaultParams.body.obtname = item;
      if (this.timeActive === 1) {
        // this.getGZRainData("jbv3vyrP");
        this.dataList = this.oneHour.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.oneHour.beginTime;
        this.sendForm.endTime = this.oneHour.endTime;
      } else if (this.timeActive === 2) {
        // this.getGZRainData("GxAOO2Ch");
        this.dataList = this.threeHour.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.threeHour.beginTime;
        this.sendForm.endTime = this.threeHour.endTime;
      } else if (this.timeActive == 3) {
        // this.getGZRainData("3o1mOeVc");
        this.dataList = this.day.dataList.filter((item) => {
          if (this.defaultParams.body.obtname === "全市") {
            return true;
          } else if (
            item.obtname.indexOf(this.defaultParams.body.obtname) != -1
          ) {
            return true;
          }
        });
        this.sendForm.beginTime = this.day.beginTime;
        this.sendForm.endTime = this.day.endTime;
      } else if (this.timeActive === 0) {
        this.dataList = [];
        this.sendForm.beginTime = "";
        this.sendForm.endTime = "";
      }
    },

    // changeTab() {
    //   this.dataList = [];
    //   switch()
    // },

    doQuery(callback = () => { }) {
      // 一小时
      getGZRainApi(this.defaultParams, "jbv3vyrP").then((res) => {
        if (res.success) {
          // console.log("获取雨量表", res.body.data);
          // this.dataList = res.body.data;
          this.oneHour.dataList = res.body.data;
          const dataList = this.oneHour.dataList.map((item) => {
            return item.ddatetimemax;
          });

          if (dataList && dataList.length > 0) {
            const MaxTime = Math.max(...dataList);
            this.oneHour.endTime = moment(MaxTime).format("YYYY-MM-DD HH:mm");
            if (moment(MaxTime).get("minutes") > 0) {
              this.oneHour.beginTime =
                moment(MaxTime).format("YYYY-MM-DD HH:00");
            } else {
              this.oneHour.beginTime = moment(MaxTime)
                .subtract(1, "hours")
                .format("YYYY-MM-DD HH:00");
            }
            callback();
          } else {
            this.oneHour.beginTime = "";
            this.oneHour.endTime = "";
          }
        }
      });

      getGZRainApi(this.defaultParams, "GxAOO2Ch").then((res) => {
        if (res.success) {
          // console.log("获取雨量表", res.body.data);
          // this.dataList = res.body.data;
          this.threeHour.dataList = res.body.data;
          const dataList = this.threeHour.dataList.map((item) => {
            return item.ddatetimemax;
          });

          if (dataList && dataList.length > 0) {
            const MaxTime = Math.max(...dataList);
            this.threeHour.endTime = moment(MaxTime).format("YYYY-MM-DD HH:00");

            this.threeHour.beginTime = moment(MaxTime)
              .subtract(3, "hours")
              .format("YYYY-MM-DD HH:00");
          } else {
            this.threeHour.beginTime = "";
            this.threeHour.endTime = "";
          }
        }
      });

      getGZRainApi(this.defaultParams, "3o1mOeVc").then((res) => {
        if (res.success) {
          // console.log("获取雨量表", res.body.data);
          // this.dataList = res.body.data;
          this.day.dataList = res.body.data;
          const dataList = this.day.dataList.map((item) => {
            return item.latestrdtime;
          });

          if (dataList && dataList.length > 0) {
            const MaxTime = Math.max(...dataList);
            this.day.endTime = moment(MaxTime).format("YYYY-MM-DD HH:mm");
            this.day.beginTime = moment(MaxTime)
              .subtract(1, "days")
              .format("YYYY-MM-DD 20:00");
          } else {
            this.day.beginTime = "";
            this.day.endTime = "";
          }
        }
      });
    },

    // 获取雨量表
    getGZRainData(code) {
      // if (this.timeActive === 0) {
      //   //一小时内
      //   this.defaultParams.body.beginTime = moment(
      //     moment().format("YYYY-MM-DD HH:00:00")
      //   ).valueOf();
      //   this.defaultParams.body.endTime = moment().valueOf();
      // } else if (this.timeActive === 1) {
      //   // 三个小时内
      //   this.defaultParams.body.beginTime = moment(
      //     moment().subtract(3, "hours").format("YYYY-MM-DD HH:00:00")
      //   ).valueOf();
      //   this.defaultParams.body.endTime = moment(
      //     moment().format("YYYY-MM-DD HH:00:00")
      //   ).valueOf();
      // } else if (this.timeActive == 2) {
      //   this.defaultParams.body.beginTime = moment(
      //     moment().subtract(1, "days").format("YYYY-MM-DD 20:00:00")
      //   ).valueOf();
      //   this.defaultParams.body.endTime = moment().valueOf();
      // }

      getGZRainApi(this.defaultParams, code).then((res) => {
        if (res.success) {
          console.log("获取雨量表", res.body.data);
          this.dataList = res.body.data;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
