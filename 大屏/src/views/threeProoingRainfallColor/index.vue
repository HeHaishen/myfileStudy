<!--
 * @Description: 三防首页
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-17 11:01:15
 * @LastEditTime: 2021-09-28 08:50:55
-->
<template>
  <div class="threeproofing-home-pages">
    <Header title="广州市雨量分布图" />
    <div class="threeproofing-content">
      <div class="threeproofing-content-menus" v-if="false">
        <Menus />
      </div>
      <div class="threeproofing-content-things">
        <div class="content-things-inner">
          <div class="content-form">
            <div class="form-item">
              <label for="">时间周期:&nbsp;&nbsp;</label>
              <p
                class="p-btn"
                :class="[activeBtn === '1小时' ? 'select-p-btn' : '']"
                @click="selectTimeBtn('1小时')"
              >
                1小时
              </p>
              <p
                class="p-btn"
                :class="[activeBtn === '3小时' ? 'select-p-btn' : '']"
                @click="selectTimeBtn('3小时')"
              >
                3小时
              </p>
              <p
                class="p-btn"
                :class="[activeBtn === '实时' ? 'select-p-btn' : '']"
                @click="selectTimeBtn('实时')"
              >
                实时
              </p>
            </div>
            <div class="form-item">
              <label for="">时间周期:</label>
              <a-range-picker
                :local="{ locale }"
                :placeholder="['开始日期时间', '结束日期时间']"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                dropdownClassName="c-popuper-style"
                class="c-rang-picker"
                @openChange="timeDateInputFocus"
                v-model="sendForm.rangDate"
                @ok="rangTimeOk"
                @change="rangTimeChange"
              >
              </a-range-picker>
              <p
                class="p-btn p-btn-search"
                style="background: #003c8c; border-color: #003c8c"
                v-if="false"
              >
                查询
              </p>
              <p class="p-btn p-btn-search" @click="doReset">重置</p>
            </div>
          </div>
          <div class="content-datas">
            <div class="content-datas-left" v-html="domsDatas"></div>
            <div class="content-datas-right" v-html="domsDatas"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/APicture/threeProofingComponents/header/index.vue";
import Menus from "@/components/APicture/threeProofingComponents/menus/index.vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { getGZRainfall } from "@/api/threeProoingRainfallColor";
import moment from "moment";

export default {
  components: { Header, Menus },
  data() {
    return {
      locale,
      timeOuts: null,
      activeBtn: "1小时",
      sendForm: {
        rangDate: [],
      },
      domsDatas: "",
    };
  },
  mounted() {
    /*  console.log("process.env", );
    this.domsDatas = require("./htmlFile");
    this.$nextTick(() => {
      this.dealWithNode();
    }); */
    // this.getDatas();
    let sendObj = {
      startTime: null,
      endTime: null,
    };
    let nowTimes = new Date().getTime();
    let endTimes = 1000 * 60;
    sendObj.endTime = moment(nowTimes).format("YYYY-MM-DD HH:mm:ss");
    sendObj.startTime = moment(nowTimes - endTimes * 60).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    this.getDatas(sendObj);
  },
  methods: {
    moment,
    getDatas(sendObj) {
      console.log(sendObj);
      if (process.env.NODE_ENV === "development") {
        // 开发环境
        this.domsDatas = require("./htmlFile");
        this.$nextTick(() => {
          this.dealWithNode();
        });
      } else {
        getGZRainfall({ ...sendObj }).then((res) => {
          let reg = new RegExp(`..\/images`, "g");
          this.domsDatas = res.replace(reg, "/gzswqx/images");
          this.$nextTick(() => {
            this.dealWithNode();
          });
          //this.domsDatas =res.body.data[0].data;
          // console.log("domsDatas", this.domsDatas);
        });
      }
    },
    dealWithNode() {
      let unitDom = document.querySelector(".unit");
      let mapTitle = document.querySelector(".pagetop"); // 图标标题
      let pagetopDoms = document.querySelectorAll(".pagetop");
      let tablesDoms = document.querySelectorAll("table");
      if (unitDom) {
        unitDom.parentNode.removeChild(unitDom);
        mapTitle.classList.add("mapTitle");
        pagetopDoms[4].classList.add("mapTitle");
        tablesDoms[3].classList.add("show-tale");
        pagetopDoms[1].parentNode.removeChild(pagetopDoms[1]);
      }
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
    // 切换显示的数据按钮
    selectTimeBtn(type) {
      this.sendForm.rangDate = [];
      this.activeBtn = type;
      let sendObj = {
        startTime: null,
        endTime: null,
      };
      let nowTimes = new Date().getTime();
      let endTimes = 1000 * 60;
      if (type === "1小时") {
        sendObj.endTime = moment(nowTimes).format("YYYY-MM-DD HH:mm:ss");
        sendObj.startTime = moment(nowTimes - endTimes * 60).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.getDatas(sendObj);
      }
      if (type === "3小时") {
        sendObj.endTime = moment(nowTimes).format("YYYY-MM-DD HH:mm:ss");
        sendObj.startTime = moment(nowTimes - endTimes * 60 * 3).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.getDatas(sendObj);
      }
      if (type === "实时") {
        // 5分钟
        sendObj.endTime = moment(nowTimes).format("YYYY-MM-DD HH:mm:ss");
        sendObj.startTime = moment(nowTimes - endTimes * 5).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.getDatas(sendObj);
      }
    },
    // 选中时间后
    rangTimeOk(a, b) {
      console.log(this.sendForm.rangDate.length);
      if (this.sendForm.rangDate.length) {
        this.activeBtn = "";
        let sendObj = {
          startTime: moment(a[0]).format("YYYY-MM-DD HH:mm:ss"),
          endTime: moment(a[1]).format("YYYY-MM-DD HH:mm:ss"),
        };
        this.getDatas(sendObj);
      }
    },
    // 时间改变
    rangTimeChange() {
      if (!this.sendForm.rangDate.length) {
        this.activeBtn = "1小时";
        this.selectTimeBtn("1小时");
      }
    },
    // 重置
    doReset() {
      this.activeBtn = "1小时";
      this.sendForm = {
        rangDate: [],
      };
      this.domsDatas = "";
      let sendObj = {
        startTime: null,
        endTime: null,
      };
      let nowTimes = new Date().getTime();
      let endTimes = 1000 * 60;
      sendObj.endTime = moment(nowTimes).format("YYYY-MM-DD HH:mm:ss");
      sendObj.startTime = moment(nowTimes - endTimes * 60).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.getDatas(sendObj);
    },
  },
  beforeDestroy() {
    if (this.timeOuts) {
      clearTimeout(this.timeOuts);
    }
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";

/deep/ .ant-calendar-picker-container {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 16vh * @h;
  transform: scale(2, 2);
}
</style>
