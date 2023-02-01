<!--
 * @Description: 地图-悬浮点击 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 14:59:48
 * @LastEditTime: 2021-10-29 16:16:53
-->
<template>
  <!-- 功能未完成 先隐藏 -->
  <div class="warp-search" v-if='false'>
    <div class="map-icon-svg" title="地址">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
        <image id="image0" width="48" height="48" x="0" y="0" href="data:image/png;base64,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" />
      </svg>
    </div>
    <div class="show-address">{{ address }}</div>
    <div class="search-input">
      <input v-model.trim="searchForm.address" type="text" @change="inputChange($event)" @input="inputInput($event)" @keyup.enter="upEnter" />
      <img src="@/assets/images/icon_search.png" @click="doSearch" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 区翰景路1号 */
      address: "广州市天河",
      searchForm: {
        address: "",
      },
    };
  },
  methods: {
    /* 点击搜索 */
    doSearch() {
      this.$emit("doSearch", { ...this.searchForm });
    },
    /* 值改变 */
    inputChange(e) {
      this.$emit("inputChange", { ...e, ...this.searchForm });
    },
    /* 值输入 */
    inputInput(e) {
      this.$emit("inputInput", { ...e, ...this.searchForm });
    },
    /* 按回车健 */
    upEnter() {
      this.$emit("enterUp", { ...this.searchForm });
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
