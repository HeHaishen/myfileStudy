<!--
 * @Description:广交会应急指挥
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-10 10:16:45
 * @LastEditTime: 2021-10-14 08:12:42
-->
<template>
  <div class="header">
    <div class="header-right">
    </div>
    <div class="header-center"> <span class="small-header">实况、实时 - </span> 第130届广交会应急保障专题<span class="small-header"> - 实用、实战</span></div>
    <div class="header-left">
      <p>{{ DateObj["datas"] }}</p>
      <p>{{ DateObj["weeks"] }}</p>
      <p>{{ DateObj["times"] }}</p>
    </div>
  </div>
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
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
