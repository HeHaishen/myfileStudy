<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-20 11:29:59
 * @LastEditTime: 2021-09-15 11:41:37
-->
<template>
  <a-pagination
    class="c-page-all"
    v-model="current"
    :total="total"
    :pageSize="pageSize"
    @change="changePage"
  />
</template>
<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
  props: {
    total: {
      require: true,
      type: Number,
      default: 0,
    },
    currentPage: {
      require: false,
      type: Number,
      default: 1,
    },
    pageSize:{
      require: false,
      type: Number,
      default: 10,
    },
  },
  model: {
    prop: "currentPage",
    // event: "changePages",
  },
  watch: {
    currentPage: {
      handler: function (newVal) {
        this.current = newVal;
      },
    },
  },
  methods: {
    changePage(pages, size) {
      this.current = pages;
      this.$emit("changePages", { pages, size });
    },
  },
};
</script>
<style lang="less">
@import "./index.less";

</style>
