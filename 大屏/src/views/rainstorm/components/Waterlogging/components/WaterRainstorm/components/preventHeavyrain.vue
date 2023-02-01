<!--
 * @Author: your name
 * @Date: 2021-06-19 11:48:26
 * @LastEditTime: 2021-06-19 14:45:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\rainstorm\components\Waterlogging\components\WaterRainstorm\components\preventHeavyrain.vue
-->
<template>
  <div class="prevent-heavyrain">
    <div class="heavyrain-echars">
      <echarts-map :data="data"></echarts-map>
    </div>
    <div class="heavyrain-table">
      <echarts-table></echarts-table>
    </div>
  </div>
</template>

<script>
import EchartsMap from './echartsMap.vue'
import EchartsTable from './echartsTable.vue'
export default {
  name: 'preventHeavyrain',
  props: {},
  components: { EchartsMap, EchartsTable },
  data() {
    return {
      data: [
        { name: '白云区', value: '' },
        { name: '天河区', value: 2 },
        { name: '增城区', value: '' },
        { name: '荔湾区', value: 0 },
        { name: '越秀区', value: 0 },
        { name: '海珠区', value: 2 },
        { name: '黄埔区', value: '' },
        { name: '番禺区', value: '' },
        { name: '花都区', value: 3 },
        { name: '南沙区', value: 2 },
        { name: '从化区', value: '' },
      ],
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
  },
  methods: {

  },
}
</script>
<style lang='less' scoped>
.prevent-heavyrain {
  width: 100%;
  height: 100%;
  padding: 0 18px;
  display: flex;
  align-items: center;
  .heavyrain-echars {
    flex: 6;
    height: 100%;
  }
  .heavyrain-table {
    float: right;
    flex: 4;
    height: 60%;
    max-width: 600px;
    max-height: 640px;
  }
}
</style>