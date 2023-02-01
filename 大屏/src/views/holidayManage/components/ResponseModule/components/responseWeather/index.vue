<!--
 * @Author: your name
 * @Date: 2021-06-19 10:36:06
 * @LastEditTime: 2021-06-23 11:16:57
 * @LastEditors: Please set LastEditors
 * @Description: 三防应急与响应气象
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\index.vue
-->
<template>
  <!-- 防暴雨内涝 -->
  <div class="response-weather">
    <!-- 暴雨 -->
    <div class="water-rainstorm">
      <div class="water-rainstorm-top">
        <h2>广州市防暴雨内涝</h2>
      </div>
      <div class="water-rainstorm-bottom">
        <water-left></water-left>

      </div>
    </div>
    <!-- 预警 -->
    <div class="water-warning">
      <div class="water-warning-top">
        <h2>各区气象预警综合图</h2>
      </div>
      <div class="water-warning-bottom">
        <water-right></water-right>

      </div>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/views/holidayManage/public/components/publicTitle.vue'
import WaterLeft from './components/WaterRainstorm'
import WaterRight from './components/WeatherPrediction'
export default {
  name: "responseWeather",
  props: {},
  components: { WaterLeft, WaterRight, PublicTitle },
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
.response-weather {
  width: 100%;
  height: 46%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: url('../../images/bg_img.png') no-repeat;
  background-size: 100% 100%;
  padding: 3%;
  position: relative;
  .water-rainstorm {
    position: relative;
    width: 48.8%;
    height: 100%;
    border: 1px solid #07cbd586;
    display: flex;
    flex-direction: column;
    .water-rainstorm-top {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2% 0 1%;
      h2 {
        font-size: var(--middle-font);
        font-weight: bold;
        color: #01ffff;
      }
    }
    .water-rainstorm-bottom {
      display: flex;
      justify-content: space-between;
      padding: 3%;
      height: calc(97% - var(--middle-font));
      width: 100%;
    }
  }
  .water-warning {
    position: relative;
    width: 48.8%;
    height: 100%;
    border: 1px solid #07cbd586;

    // padding: 3%;
    .water-warning-top {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2% 0 1%;
      h2 {
        font-size: var(--middle-font);
        font-weight: bold;
        color: #01ffff;
      }
    }
    .water-warning-bottom {
      display: flex;
      justify-content: space-between;
      padding: 3%;
      height: calc(97% - var(--middle-font));
      width: 100%;
    }
  }
}
</style>