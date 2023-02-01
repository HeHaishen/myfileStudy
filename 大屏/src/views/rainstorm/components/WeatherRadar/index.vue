<!--
 * @Author: your name
 * @Date: 2021-06-19 10:36:06
 * @LastEditTime: 2021-06-22 18:18:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\WeatherRadar\index.vue
-->
<template>
  <!-- 气象雷达 -->
  <div class="weather-radar">
    <div class="weather-radar-content">
      <div class="weather-radar-content-top">
        <info-title title='气象雷达回波图'></info-title>
        <div class="radar-left">
          <a-radio-group :value="radioDefault" class="radio-style" button-style="solid" @change="dataChange">
            <a-radio-button v-for="item in radioData" :key="item.value" :value="item.value" @click="onChange(item)">
              <i class="radio-cion"></i>{{item.title}}
            </a-radio-button>
          </a-radio-group>
        </div>
        <div class="radar-right">
          <img src="./images/leida.gif" alt="" class="radar-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTitle from './components/infoTitle.vue'

export default {
  name: "",
  props: {},
  components: { InfoTitle },
  data() {
    return {
      radioData: [{ title: '广州市雷达地图', value: '0', image: '' }, { title: '省雷达地图', value: '1', image: '' }, { title: '气象卫星云图', value: '2', image: '' }],
      radioDefault: '0',
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    onChange(value) {
      console.log(value);
    },
    // 切换数据按钮
    dataChange(e) {
      e.preventDefault()
      this.radioDefault = e.target.value
    },
  },
};
</script>
<style lang='less' scoped>
.weather-radar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .weather-radar-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    .weather-radar-content-top {
      position: relative;
      background: url('./images/box4.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 5% 1%;
      height: 100%;
      width: 100%;
    }
    .radar-left {
      width: auto;
      height: 100%;
      background: #103D70;
      .radio-style {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      /deep/.ant-radio-group {
        font-size: var(--super-mini-font);
      }
      /deep/.ant-radio-button-wrapper {
        margin: 0;
        background: transparent;
        border-color: transparent;
        border: none;
        color: #fff;
        height: auto;
        line-height: var(--super-mini-font);
        padding-top: 5%;
        padding-bottom: 5%;
        .radio-cion {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #0382e1;
          border-radius: 50%;
          margin-right: 6px;
        }
        &:last-child,
        &:first-child {
          border-radius: 0;
        }
      }
      /deep/.ant-radio-group-solid
        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        background: linear-gradient(90deg, #00bdd1, #00bcd100);
        border: none;
        border-color: transparent;
        .radio-cion {
          background: #00ff01;
        }
      }
      /deep/.ant-radio-button-wrapper:not(:first-child)::before {
        display: none;
      }
    }
    .radar-right {
      flex: 1;
      height: 100%;
      background-color: #000;
      .radar-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>