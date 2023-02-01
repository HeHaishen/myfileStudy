<!--
 * @Description: 三防-首页等头部组件
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-17 11:47:54
 * @LastEditTime: 2021-09-23 17:23:17
-->
<template>
  <div class="three-proofing-header">
    <div class="proofing-header-title">{{ title }}</div>
    <div class="proofing-exit-btn" @click="exitBigScreen" v-if='false'>退出大屏</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // title: "广州市应急管理平台",
    };
  },
  props: {
    title: {
      default: "广州市应急管理平台",
      type: String,
    },
    selfJunm: {
      // 是否自定义跳转
      default: false,
      type: Boolean,
    },
  },
  methods: {
    exitBigScreen() {
      if (this.selfJunm) {
        this.$emit("slefExitBig");
      } else {
        this.$router.push({ path: "/threeProoingHomePages" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
.three-proofing-header {
  width: 100%;
  height: 93vh * @h;
  background: url('../../../../assets/images/threeProofingHomePages/head.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .proofing-header-title {
    height: 40vh * @h;
    font-size: 40vh * @h;
    color: white;
    font-weight: bold;
  }
  .proofing-exit-btn {
    width: 110vw * @h;
    height: 36vh * @h;
    background: #07285f;
    border: 2vh * @h #08367d solid;
    font-size: 20vh * @h;
    color: white;
    font-weight: bold;
    position: absolute;
    top: 15vh * @h;
    right: 70vw * @w;
    text-align: center;
    line-height: 36vh * @h;
    .border-radius(18vh*@h,50%);
    cursor: pointer;
  }
}
</style>
