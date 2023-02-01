<!--
 * @Author: your name
 * @Date: 2021-06-19 10:43:59
 * @LastEditTime: 2021-06-23 13:41:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\waterRight.vue
-->
<template>
  <div class="water-right">
    <a-radio-group :value="radioDefault" class="radio-style"  button-style="solid" @change="dataChange">
      <a-radio-button v-for="item in radioData"  :key="item.value" :value="item.value" @click="onChange(item)" :style="{background:`url('${item.image}') no-repeat`,backgroundSize:'100% 100%'}">
        <!-- {{item.title}} -->
      </a-radio-button>
    </a-radio-group>
    <div class="prediction-charts" ref="PredictionCharts"></div>
  </div>
</template>

<script>
import GZMapJson from '../../mapJson/GuangZhou'

export default {
  name: 'WeatherPrediction',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      radioData: [{ title: '雷雨', value: '0', image: require('../../../../images/zs6_03.png') }, { title: '高温', value: '1', image: require('../../../../images/zs6_05.png') }, { title: '闪电', value: '2', image: require('../../../../images/zs6_07.png') }, { title: '台风', value: '3', image: require('../../../../images/zs6_09.png') }],
      radioDefault: '0',

    };
  },
  watch: {
  },
  computed: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
    // 切换数据按钮
    dataChange(e) {
      e.preventDefault()
      this.radioDefault = e.target.value
    },
    initCharts() {
      this.predictionCharts = this.$echarts.init(this.$refs.PredictionCharts)
      this.$echarts.registerMap('Guangzhou', GZMapJson.GuangZhouJson)
      this.handleOption()
      window.addEventListener("resize", () => {
        this.predictionCharts.resize();
      });
    },
    changeValue(value) {
      switch (String(value)) {
        case "0":
          return "I级"
        case "1":
          return "IV级"
        case "2":
          return "II级"
        case "3":
          return "III级"
        default:
          return "正常"
      }
    },
    handleOption() {
      let option = {
        tooltip: {
          trigger: 'item',
          // formatter: (e, t, n) => {
          //   return `${e.name}：${this.changeValue(e.value)}`
          // }, //悬浮展示格式
        },

        visualMap: {
          min: 0,
          max: 11,
          right: 26,
          bottom: 40,
          showLabel: !0,
          pieces: [{
            value: 1,
            label: "越秀",
            color: "#5d66ff"
          }, {
            value: 2,
            label: "南沙",
            color: "#f5e82a"
          }, {
            value: 3,
            label: "海珠",
            color: "#fa531c"
          }, {
            value: 4,
            label: "白云",
            color: "#fe0000"
          }, {
            value: 5,
            label: "天河",
            color: "#5d33ff"
          }, {
            value: 6,
            label: "黄埔",
            color: "#5b46ff"
          }, {
            value: 7,
            label: "番禺",
            color: "#5f16ff"
          }, {
            value: 8,
            label: "花都",
            color: "#ee66ff"
          }, {
            value: 9,
            label: "从化",
            color: "#bb66ff"
          }, {
            value: 10,
            label: "增城",
            color: "#5d00ff"
          }, {
            value: 11,
            label: "荔湾",
            color: "#5dc2cf"
          }],
          show: !0,
          textStyle: {
            fontSize: 18,
            color:'#fff'
          }
        },

        series: [
          {
            name: '广州市数据',
            type: 'map',
            mapType: 'Guangzhou', // 自定义扩展图表类型
            // 悬浮样式

            label: {  //显示名称
              show: false,
              color: 'white'
            },
            itemStyle: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
              }
            },
            data: [
              { name: '白云区', value: 1 },
              { name: '天河区', value: 2 },
              { name: '增城区', value: 3 },
              { name: '荔湾区', value: 4 },
              { name: '越秀区', value: 5 },
              { name: '海珠区', value: 6 },
              { name: '黄埔区', value: 7 },
              { name: '番禺区', value: 8 },
              { name: '花都区', value: 9 },
              { name: '南沙区', value: 10 },
              { name: '从化区', value: 11 },
            ],
            // 自定义名称映射
            nameMap: {
              'Baiyun': '白云区',
              'Tianhe': '天河区',
              'Zengcheng': '增城区',
              'Liwan': '荔湾区',
              'Yuexiu': '越秀区',
              'Haizhu': '海珠区',
              'Huangpu': '黄埔区',
              'Panyu': '番禺区',
              'Huadu': '花都区',
              'Nansha': '南沙区',
              'Conghua': '从化区',
            }
          }
        ]
      }
      this.predictionCharts.setOption(option)
      // 解决初始加载无法继承父级宽高问题
      this.$nextTick(() => {
        this.predictionCharts.resize();
      })
    }
  },
}
</script>
<style lang='less' scoped>
.water-right {
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .radio-style {
    padding: 2%;
    // height: 10%;
  }
  /deep/.ant-radio-button-wrapper {
    margin: 0 5px;
    &:last-child,
    &:first-child {
      border-radius: 0;
    }
  }
  /deep/.ant-radio-group-solid
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #2056b0;
    border-color: #2056b0;
  }

  .prediction-charts {
    width: 100%;
    // height: 85%;
    flex: 1;
  }
}
</style>