<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 20:09:38
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-03 14:11:34
-->
<template>
  <div class="searchbox">
    <div class="search">
      <input
        type="text"
        @keyup.enter="doSearch"
        :placeholder="placeholder"
        class="input"
        ref="input"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <img
        src="@/assets/images/dragonBoat/icon/u421.svg"
        alt=""
        @click="doSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeholder", "value"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    doSearch(event) {
      this.$emit("doSearch", event.target.value);
    },
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
  created() {},
  destroyed() {
    if(this.value){
        this.value =''
    }
    
  },
};
</script>
<style  lang='less' scoped>
@import "../common.less";
.searchbox {
  width: 100%;
  padding: 0 10px;
  .box-sizing();
  .search {
    padding: 5px;
    .box-sizing();
    border: 1px solid rgba(2, 167, 240, 1);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    height: 35px;
    align-items: center;

    img {
      display: block;
      width: 25px;
      height: 25px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
.input {
  height: 25px;
  padding: 2px;
  flex: 1;
  background: none;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.0235294117647059);
  font-size: 14px;
}
</style>