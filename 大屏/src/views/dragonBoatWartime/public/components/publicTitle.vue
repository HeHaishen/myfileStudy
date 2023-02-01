<!--
 * @Author: your name
 * @Date: 2021-06-17 18:39:25
 * @LastEditTime: 2021-06-23 12:23:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\components\infoTitle.vue
-->
<template>
  <div class="public-title" :style="publicStyle">
    {{ title }}
  </div>
</template>    
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    publicStyle: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style lang="less" scoped>
.public-title {
  position: absolute;
  white-space: nowrap;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--large-font);
  font-weight: bold;
  color: #01ffff;
  // text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6,
  //   0 0 20px #0071a6;
}
</style>