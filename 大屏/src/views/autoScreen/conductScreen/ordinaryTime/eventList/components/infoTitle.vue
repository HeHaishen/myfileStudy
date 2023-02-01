<!--
 * @Author: your name
 * @Date: 2021-06-17 18:39:25
 * @LastEditTime: 2021-06-17 20:43:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\components\infoTitle.vue
-->
<template>
  <div class="public-title">
    {{ title }}
  </div>
</template>    
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@h:100 /3200;
@w:100 /1920;
.public-title {
  position: absolute;
  top: -@h*26vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: @h*52vh;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 @h*5vh #fff, 0 0 @h*10vh #0071a6, 0 0 @h*15vh #0071a6, 0 0 @h*20vh #0071a6;
}
</style>