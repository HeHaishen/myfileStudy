<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 20:44:19
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-02 18:25:15
-->
<template>
    <ul class="detection_ul" >
      <li
        v-for="(e, i) in titleList"
        :key="i"
        @click="changeli(e, i)"
        :class="detectionActive == i ? 'detectionActive' : ''"
        :style="Setstyle"
      >
        {{ e.title }} <slot :name="e.sup" />
      </li>
    </ul>
</template>

<script>
export default {
  components: {},
  props: {
    titleList: {
      // 表头数组
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
     Setstyle: {
      // 样式
      type:Object,
      required: false,
     
    },
  },
  data() {
    return {
      detectionActive: 0,
      // titleList:[{title:1},{title:2},{title:3}]
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeli(e, i) {
      this.detectionActive = i;
      this.$emit("changeli", e, i);
    },
  },
  created() {},
};
</script>
<style lang='less' scoped>
@import "../common.less";
.detection_ul {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  li {
    flex: auto;
    display: flex;
    justify-content: center;
    line-height: 30px;
    height: 30px;
    width: 100%;
    position: relative;
    cursor: pointer;
    color: #fff;
    .box-sizing();
  }
}
.detectionActive {
  border-bottom: 3px solid #02a7f0;
  font-weight: 600;
  .box-sizing();
}
</style>