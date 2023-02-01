<!--
 * @Author: your name
 * @Date: 2021-06-19 10:36:06
 * @LastEditTime: 2021-06-21 10:24:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\RealtimeRainfall\index.vue
-->
<template>
  <!-- 实时降雨 -->
  <div class="realtime-rainfall">
    <!-- 色斑图 -->
    <div class="realtime-rainfall-content">
      <div class="rainfall-top">
        <info-title title='实时降雨色斑图'></info-title>

        <rainfall-top></rainfall-top>
      </div>
      <!-- 五分钟 -->
      <div class="rainfall-bottom">
        <slot name="rainBottom">
          <info-title title='过去5分钟实测降雨'></info-title>
          <rainfall-bottom></rainfall-bottom>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTitle from './components/infoTitle.vue'
import RainfallTop from './components/rainfallTop.vue'
import rainfallBottom from './components/rainfallBottom.vue'

export default {
  name: "",
  props: {},
  components: { InfoTitle, RainfallTop, rainfallBottom },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
};
</script>
<style lang='less' scoped>
.realtime-rainfall {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .realtime-rainfall-content {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .rainfall-top {
      position: relative;
      height: 56%;
      width: 100%;
      padding: 5%;
      background: url('./images/box1.png') no-repeat;
      background-size: 100% 100%;
    }
    .rainfall-bottom {
      position: relative;
      height: 42%;
      width: 100%;
      padding: 5%;
      background: url('./images/box2.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>