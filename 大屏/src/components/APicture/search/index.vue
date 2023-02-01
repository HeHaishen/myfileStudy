<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-15 21:23:18
 * @LastEditTime: 2021-08-16 11:10:34
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="videoClickClose"
    opsition="btnTop"
    ref="SearchAllModel"
    title="搜索"
    class="center-four-pop"
  >
    <template slot="content">
      <div class="center-search">
        <a-input
          class="c-input"
          placeholder="输入关键字"
          type="text"
          v-model="searchForm.name"
        />
        <img
          src="../../../assets/images/emergencyOverview/icon_search.png"
          alt=""
          @click="searchMonitor"
        />
      </div>
      <div class="ul-wrap">
        <!--  <clist :columns="headerList" :listData="listData">
          <template slot="opation">
            <div class="table-btn-wrap">
              <p>定位</p>
            </div>
          </template>
        </clist> -->
      </div>
    </template>
  </pop-up-layer>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      parentData: {},
      searchForm: {
        name: null,
      },
      headerList: [],
      listData: [],
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.show = !this.show;
      this.parentData = data;
      this.$refs.SearchAllModel.saveEvent = data.saveEvent;
    });
  },
  methods: {
    searchMonitor() {},
    videoClickClose() {
      this.show = false;
    },
  },
};
</script>
<style lang="less">
@import "./index";
</style>
