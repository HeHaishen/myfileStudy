<template>
  <div class="echartsWrap">
    <div :id="this.id" class="myChart" :style="{'height':height+'px'}"></div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
// let echarts = require("echarts/lib/echarts");
// require("echarts/lib/component/grid");
// require("echarts/lib/component/legend");
// require("echarts/lib/chart/bar");
// require("echarts/lib/chart/pie");
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
// require("echarts/lib/component/toolbox");
// require("echarts/lib/chart/line");
export default {
  name: "echerts",
  props: {
    datas: {
      style: Object,
      default: {}
    },
    id:{
      style:String
    },
    height:{
      style:String
    }
  },
  data() {
    return {
      // aaheight:''
    };
  },
  components: {},
  mounted() {
    this.drawLine();
  },
  created() {},
  watch:{
    height:function(nval,oval){
      console.log('nvalheight',nval)
      console.log('ovalheight',oval)
      let chartName = this.$echarts.init(document.getElementById(this.id));
      chartName.resize({height:nval}); 
    }
  },
  methods: {
    drawLine() {
      if (!this.datas) {
        return;
      }
      let myChart = echarts.init(document.getElementById(this.id));
      // 绘制图表
      myChart.setOption(this.datas);
    }
  }
};
</script>
<style scoped="scoped" lang="less">
.myChart{
  width: 100%;
  min-height: 220px;
}
</style>