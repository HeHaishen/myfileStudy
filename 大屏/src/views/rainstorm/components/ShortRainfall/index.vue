<!--
 * @Author: your name
 * @Date: 2021-06-19 10:36:06
 * @LastEditTime: 2021-06-21 10:29:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\ShortRainfall\index.vue
-->
<template>
  <!-- 短临降雨 -->
  <div class="short-rainfall">
    <!-- 色斑图 -->
    <div class="short-rainfall-content">
      <div class="rainfall-top">
        <info-title title='短临降雨预测图'></info-title>

        <rainfall-top></rainfall-top>
      </div>
      <!-- 五分钟 -->
      <div class="rainfall-bottom">
        <info-title title='汛线水位测站列表'></info-title>

        <rainfall-bottom></rainfall-bottom>
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
.short-rainfall {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .short-rainfall-content {
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