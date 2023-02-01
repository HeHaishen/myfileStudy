<!--
 * @Description: 三防首页
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-09-17 11:01:15
 * @LastEditTime: 2021-09-22 19:52:32
-->
<template>
  <div class="threeproofing-home-pages">
    <Header title="全市自动站风速实况前10位站点" />
    <div class="threeproofing-content">
      <div class="threeproofing-content-menus" v-if='false'>
        <Menus />
      </div>
      <div class="threeproofing-content-things">
        <div class="content-things-inner">
          <div class="c-wind">
            <div class="c-search">
              <div class="c-left">
                <label for="c-select">地域：</label>
                <a-select id="c-select" class="c-select" v-model="sendForm.obtname" @change="handleChange" dropdownClassName="c-popuper-style" @dropdownVisibleChange="timeDateInputFocus">
                  <a-select-option :value="item.key" v-for="item in regionList" :key="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <label for="c-time">风速：</label>
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
                <div class="c-wind-direction">{{ timeNameActive }}风向</div>
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
                    <div class="c-station" :title="item.obtname">{{ item.obtname }}</div>
                    <div class="c-wind">
                      <div class="c-speed">
                        {{ timeActive === 0 ? item.wdidf : item.wd3smaxdf }}m/s
                      </div>
                      <div class="c-direction">
                        {{ item.windDirection }}
                      </div>
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
import { getGZWindApi } from "@/api/threeProoingWindDatas/index";
import moment from "moment";
import Header from "@/components/APicture/threeProofingComponents/header/index.vue";
import Menus from "@/components/APicture/threeProofingComponents/menus/index.vue";
export default {
  components: { Header, Menus },
  data() {
    return {
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
      timeActive: 0,
      sendForm: {
        obtname: "全市",
        beginTime: "",
        endTime: "",
      },

      current: {
        dataList: [],
        beginTime: "",
        endTime: "",
      },
      day: {
        dataList: [],
        beginTime: "",
        endTime: "",
      },

      timeNameActive: "风速",
      timeList: [
        { key: 1, value: "风速" },
        { key: 2, value: "日极大风速" },
      ],
      dataList: [],
      defaultParams: {
        body: {
          obtname: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
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
    // this.getGZWindData("INAOuewO");
    this.doQuery(() => {
      this.initData();
    });
  },

  methods: {
    initData() {
      this.dataList = this.current.dataList.filter((item) => {
        if (this.defaultParams.body.obtname === "全市") {
          return true;
        } else if (
          item.obtname.indexOf(this.defaultParams.body.obtname) != -1
        ) {
          return true;
        }
      });
      this.sendForm.beginTime = this.current.beginTime;
      this.sendForm.endTime = this.current.endTime;
    },

    dayData() {
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
      this.timeActive = 0;
      this.sendForm.obtname = "全市";
      this.defaultParams.body.obtname = "全市";
      // this.getGZWindData("INAOuewO");
      this.initData();
      // this.handleChange("全市");
    },

    timeTab(item, index) {
      this.timeActive = index;
      if (item.value === "日极大风速") {
        this.timeNameActive = "极大风速";
      } else if (item.value === "风速") {
        this.timeNameActive = "当前风速";
      }

      if (index === 0) {
        this.initData();
        // this.getGZWindData("INAOuewO");
      } else if (index === 1) {
        // this.getGZWindData("BIWrab7u");
        this.dayData();
      }
    },

    handleChange(data) {
      console.log("data", data);
      console.log("this.sendForm.obtname", this.sendForm.obtname);
      this.defaultParams.body.obtname = data;
      if (this.timeActive === 0) {
        // this.getGZWindData("INAOuewO");
        this.initData();
      } else if (this.timeActive === 1) {
        // this.getGZWindData("BIWrab7u");
        this.dayData();
      }
    },

    doQuery(callback = () => { }) {
      getGZWindApi(this.defaultParams, "INAOuewO").then((res) => {
        if (res.success) {
          res.body.data.map((item) => {
            // 日极大风速
            if (item.wdidd) {
              item.windDirection = this.$getWindString(item.wdidd);
            }
            if (item.wd3smaxdd) {
              item.windDirection = this.$getWindString(item.wd3smaxdd);
            }
          });
          this.current.dataList = res.body.data;
          const dataList = this.current.dataList.map((item) => {
            return item.ddate;
          });
          if (dataList && dataList.length > 0) {
            const MaxTime = Math.max(...dataList);
            this.current.endTime = moment(MaxTime).format("YYYY-MM-DD HH:mm");
            this.current.beginTime = moment(MaxTime)
              .subtract(1, "days")
              .format("YYYY-MM-DD 20:00");
            callback();
          } else {
            this.current.beginTime = "";
            this.current.endTime = "";
          }
          // this.dataList = JSON.parse(JSON.stringify(res.body.data));
          // console.log("获取广州风速风向的数据", res);
        }
      });

      getGZWindApi(this.defaultParams, "BIWrab7u").then((res) => {
        if (res.success) {
          res.body.data.map((item) => {
            if (item.wdidd) {
              item.windDirection = this.$getWindString(item.wdidd);
            }
            if (item.wd3smaxdd) {
              item.windDirection = this.$getWindString(item.wd3smaxdd);
            }
          });
          this.day.dataList = res.body.data;
          const dataList = this.day.dataList.map((item) => {
            return item.wd3smaxtime;
          });
          if (dataList && dataList.length > 0) {
            const MaxTime = Math.max(...dataList);
            this.day.endTime = moment(MaxTime).format("YYYY-MM-DD HH:mm");
            this.day.beginTime = moment(MaxTime)
              .subtract(1, "days")
              .format("YYYY-MM-DD 20:00");
            callback();
          } else {
            this.day.beginTime = "";
            this.day.endTime = "";
          }
          // this.dataList = JSON.parse(JSON.stringify(res.body.data));
          // console.log("获取广州风速风向的数据", res);
        }
      });
    },

    // 获取广州风速风向的数据
    getGZWindData(code) {
      // this.defaultParams.body.beginTime = moment(
      //   moment().format("YYYY-MM-DD HH:00:00")
      // ).valueOf();
      // this.defaultParams.body.endTime = moment().valueOf();

      getGZWindApi(this.defaultParams, code).then((res) => {
        if (res.success) {
          res.body.data.map((item) => {
            if (item.wd3smaxdd) {
              item.windDirection = this.$getWindString(item.wd3smaxdd);
            }
            if (item.wdidd) {
              item.windDirection = this.$getWindString(item.wdidd);
            }
          });
          this.dataList = JSON.parse(JSON.stringify(res.body.data));
          console.log("获取广州风速风向的数据", res);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less" >
</style>
