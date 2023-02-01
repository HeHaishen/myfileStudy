<!--
 * @Author: your name
 * @Date: 2021-06-19 10:36:06
 * @LastEditTime: 2021-06-22 18:19:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\index.vue
-->
<template>
  <!-- 防暴雨内涝 -->
  <div class="waterlogging">
    <!-- 暴雨 -->
    <div class="water-rainstorm">
      <div class="water-rainstorm-top">
        <info-title title='广州市防暴雨内涝'></info-title>

        <water-left></water-left>
      </div>

    </div>
    <!-- 预警 -->
    <div class="water-warning">
      <div class="water-warning-top">
        <info-title title='各区气象预警综合图'></info-title>

        <water-right></water-right>
      </div>

    </div>
  </div>
</template>

<script>
import InfoTitle from './components/infoTitle.vue'
import WaterLeft from './components/WaterRainstorm'
import WaterRight from './components/WeatherPrediction'
export default {
  name: "",
  props: {},
  components: { InfoTitle, WaterLeft, WaterRight },
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
.waterlogging {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .water-rainstorm {
    position: relative;
    width: 48.8%;
    height: 100%;
    padding: 3%;
    .water-rainstorm-top {
      position: relative;
      background: url('./images/waterlogging.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 5%;
      height: 100%;
      width: 100%;
    }
  }
  .water-warning {
    position: relative;
    width: 48.8%;
    height: 100%;
    padding: 3%;
    .water-warning-top {
      position: relative;
      background: url('./images/waterlogging.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 5%;
      height: 100%;
      width: 100%;
    }
  }
}
</style>