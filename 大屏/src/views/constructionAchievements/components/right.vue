<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: pengyuanzhen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-08-25 20:27:31
-->
<template>
  <div class="construction-achievement-right">
    <div class="model-title">系统建设情况</div>
    <div class="data">
      <div class="model-little-title">数据成效</div>
      <ul class="data-list">
        <li class="data-child" v-for="(item, index) in dataList" :key="index">
          <div class="num">
            {{ item.num }} <span class="unit">{{ item.unit }}</span>
          </div>
          <div class="bg"></div>
          <div class="title">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <div class="platform">
      <div class="model-little-title">平台使用成效</div>
      <div class="summary">一个中心、四个平台、三个系统</div>
      <ul class="platform-list">
        <li
          class="platform-child"
          v-for="(item, index) in platformList"
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
  </div>
</template>

<script>
import moment from "moment";
import { indicatorCodes } from "@/api/constructionAchievements/index";
export default {
  data() {
    return {
      dataList: [
        { number: 154632, title: "汇聚数据量" },
        { number: 18624, title: "日均数据增量" },
        { number: 256489, title: "视频数据量" },
        { number: 154632, title: "向政数局共享数据量" },
        { number: 32156, title: "数据主题" },
        { number: 154632, title: "元数据" },
      ],
      platformList: [
        { title: "活跃用户数", number: 506462, unit: "个" },
        { title: "日均使用时间", number: 8, unit: "小时" },
        { title: "收文数量", number: 22365, unit: "件" },
        { title: "发文数量", number: 23462, unit: "件" },
        { title: "危化企业数", number: 326, unit: "家" },
        { title: "工矿商贸企业数", number: 16462, unit: "家" },
        { title: "企业上报隐患数", number: 106462, unit: "个" },
        { title: "企业上报隐患数", number: 1259, unit: "次" },
        { title: "企业上报隐患数", number: 35356, unit: "件" },
        { title: "企业上报隐患数", number: 6462, unit: "件" },
      ],
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.getDataEffectivenessData();
      this.getPlatformEffectivenessData();
    },
    // 建设成果展示-数据成效
    getDataEffectivenessData() {
      indicatorCodes("XAderhoz", {
        body: {
          dimensionYear: "2021",
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成果展示-数据成效", res);
          this.dataList = res.body.data;
        }
      });
    },

    // 建设成功展示-平台使用成效
    getPlatformEffectivenessData() {
      indicatorCodes("KyXhDHVy", {
        body: {
          dimensionYear: "2021",
        },
      }).then((res) => {
        if (res.success && res.body && res.body.data && res.body.data.length) {
          console.log("建设成功展示-平台使用成效", res);
          this.platformList = res.body.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
