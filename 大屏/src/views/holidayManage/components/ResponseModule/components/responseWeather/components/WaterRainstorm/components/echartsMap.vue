<!--
 * @Author: your name
 * @Date: 2021-06-19 14:35:08
 * @LastEditTime: 2021-06-23 09:51:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\components\WaterRainstorm\components\mapJson\echartsMap.vue
-->
<template>
  <div ref="mapGuangZhouCharts" class="echars-map"></div>
</template>

<script>
import GZMapJson from '../../../mapJson/GuangZhou'
import bus from '@/utils/Bus'

export default {
  name: 'echartsMap',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {

    };
  },
  watch: {
  },
  computed: {},
  created() { },
  mounted() {
    bus.$on('tabChange', (key) => {
      this.$nextTick(() => {
        this.chart.resize();
      })
    })
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.mapGuangZhouCharts)
      this.$echarts.registerMap('Guangzhou', GZMapJson.GuangZhouJson)
      this.handleOption()
      window.addEventListener("resize", () => {
        this.chart.resize();
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
        backgroundColor: 'transparent',
        // title: {
        //   text: '广州市数据',
        //   subtext: '数据来自test'
        // },
        // emphasis: {  //淡化
        //   focus: 'self'
        // },
        tooltip: {
          trigger: 'item',

          formatter: (e, t, n) => {
            return `${e.name}：${this.changeValue(e.value)}`
          }, //悬浮展示格式
        },
        // 操作按钮
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },

        visualMap: {
          min: 0,
          max: 3,
          left: 0,
          bottom: 10,
          showLabel: !0,
          text: ["区级"],
          pieces: [{
            value: 3,
            label: "IV级",
            color: "#5d66ff"
          }, {
            value: 2,
            label: "III级",
            color: "#f5e82a"
          }, {
            value: 1,
            label: "II级",
            color: "#fa531c"
          }, {
            value: 0,
            label: "I级",
            color: "#fe0000"
          }],
          show: !0,
          textStyle: {
            fontSize: 18,
            color:'#fff'
          },
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
            data: this.data,
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
      this.chart.setOption(option)
      // 解决初始加载无法继承父级宽高问题
      this.$nextTick(() => {
        this.chart.resize();
      })
    }
  },
}
</script>
<style lang='less' scoped>
.echars-map {
  width: 100%;
  height: 100%;
}
</style>