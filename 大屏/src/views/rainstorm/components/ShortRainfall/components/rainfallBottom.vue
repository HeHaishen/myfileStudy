<!--
 * @Author: your name
 * @Date: 2021-06-19 16:18:51
 * @LastEditTime: 2021-06-22 14:37:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\RealtimeRainfall\components\rainfallottom.vue
-->
<template>
  <div class="five-minutes">
    <a-radio-group :value="radioDefault" class="radio-style" button-style="solid" @change="dataChange">
      <a-radio-button v-for="item in radioData" :key="item.value" :value="item.value" @click="onChange(item)">
        {{item.title}}
      </a-radio-button>
    </a-radio-group>
    <div class="five-date">
      <span>时段：</span>
      <span class="date-old">{{moment().format('YYYY-MM-DD HH:mm:ss')}}</span>
      <span style="padding:0 1%">~</span>
      <span class="date-new">{{moment().format('YYYY-MM-DD HH:mm:ss')}}</span>
    </div>
    <div class="echarts-style">
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from 'moment'
export default {
  name: 'echartsTable',
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      moment,
      radioData: [{ title: '水位剖面图', value: '0', image: '' }, { title: '水位过程线', value: '1', image: '' }],
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
}
</script>
<style lang='less' scoped>
.five-minutes {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  .five-date {
    color: #ffffffcc;
    display: flex;
    flex-wrap: wrap;
    font-size: var(--mini-font);
    padding: 2% 0;
    .date-old,
    .date-new {
      border: 1px solid #006ef4;
      border-radius: 5px;
      padding: 0 1%;
      margin-bottom: 1%;
    }
  }
  .radio-style {
    margin: 5px 0;
  }
  /deep/.ant-radio-group {
    font-size: var(--mini-font);
  }
  /deep/.ant-radio-button-wrapper {
    margin-right: 5px;
    background-color: transparent;
    border: 1px solid #006df4;
    border-radius: 5px;
    // border-color: transparent;
    // border: none;
    color: #fff;
    height: auto;
    line-height: normal;
    &:last-child,
    &:first-child {
      border: 1px solid #006df4;
      border-radius: 5px;
    }
  }
  /deep/.ant-radio-group-solid
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border: 1px solid #006df4;
    background-image: linear-gradient(#13aae8, #026be8);
    border-radius: 5px;
    // background: linear-gradient(90deg, #00bdd1, #00bcd100);
    // border: none;
    // border-color: transparent;
  }
  /deep/.ant-radio-button-wrapper:not(:first-child)::before {
    display: none;
  }
  .echarts-style {
    flex: 1;
    width: 100%;
    background: url('../images/img.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>