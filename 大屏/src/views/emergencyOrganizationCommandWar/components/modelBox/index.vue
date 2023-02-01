<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-10 13:56:29
 * @LastEditTime: 2021-10-10 15:24:24
-->
<template>
  <div class="c-model-box" :style="setStyle">
    <div class="model-header">
      <p class="text">{{ title }}</p>
    </div>
    <div class="model-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      //  设置标题
      default: "标题",
      type: String,
    },
    setStyle: {
      // 设置位置
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>