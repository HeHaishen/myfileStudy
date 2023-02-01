<!--
 * @Description: 头部
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-08 10:15:29
 * @LastEditTime: 2021-09-28 17:30:47
-->
<template>
  <!-- 头部-开始 -->
  <div class="picture-header">
    <div class="picture-header-left">
      <!-- <ul>
        <li>
          <img src="" alt="" /> 
          <a-icon class="header-left-icon" type="skin" />
          <p>个性化</p>
        </li>
        <li>
          <img src="" alt="" />
          <a-icon class="header-left-icon" type="appstore" />
          <p>版面</p>
        </li>
        <li>
          <img src="" alt="" /> 
          <a-icon class="header-left-icon" type="link" />
          <p>接入</p>
        </li>
      </ul> -->
    </div>
    <div class="picture-header-center">{{ title }}</div>
    <div class="picture-header-right">
      <p>{{ DateObj["datas"] }}</p>
      <p>{{ DateObj["weeks"] }}</p>
      <p>{{ DateObj["times"] }}</p>
    </div>
  </div>
  <!-- 头部-结束 -->
</template>

<script>
export default {
  data() {
    return {
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
  },
  methods: {
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
  width: 100%;
  // height: 199px;
  height:6vh;
  background: url("../../assets/images/bg_header.png") no-repeat no-repeat
    center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: 0 10px 220px rgba(0, 0, 0, 0.2) inset;
  .picture-header-left {
    width: 782px;
    // height: 124px;
    height:5vh
    // & ul {
    //   width: 100%;
    //   height: 100%;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   li {
    //     height: auto;
    //     width: 107px;
    //     cursor: pointer;
    //     img {
    //       display: block;
    //       width: 38px;
    //       height: 38px;
    //       margin: 0 auto;
    //     }
    //     .header-left-icon {
    //       font-size: 38px;
    //       color: white;
    //     }
    //     i {
    //       display: block;
    //       width: 38px;
    //       height: 38px;
    //       margin: 0 auto;
    //     }
    //     p {
    //       width: 100%;
    //       height: 42px;
    //       text-align: center;
    //       line-height: 42px;
    //       color: white;
    //       font-size: 24px;
    //     }
    //   }
    // }
  }
  .picture-header-center {
    width: auto;
    // font-size: 96px;
    // line-height: 192px;
    font-size:4.5vh;
    line-height: 6vh;
    color: white;
    // background:url("../../assets/images/header_line_bg.png") no-repeat center;
    // background-size:100% 100%;
  }
  .picture-header-right {
    width: 782px;
    // height: 124px;
    height:5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      width: auto;
      padding: 0 22px 0 22px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      color: white;
      // font-size: 28px;
      font-size:2vh;
      font-weight: bold;
    }
  }
}
</style>
