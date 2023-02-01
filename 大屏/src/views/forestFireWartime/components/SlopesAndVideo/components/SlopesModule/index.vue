<template>
    <div class="slopes-module">
        <public-title title="火场附近坡形坡地"></public-title>
        <div class="s-m-content" id="s-m-content"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { option } from "../../config";
import PublicTitle from "../public/PublicTitle.vue";

export default {
    name: "",
    props: {},
    components: {
        PublicTitle,
    },
    data() {
        return {
            option,
            chartDom: null,
            myChart: null,
        };
    },
    watch: {},
    computed: {},
    created(){
        window.addEventListener('resize',this.onResize,false);
    },
    beforeDestroy() {
        this.myChart && this.myChart.dispose();
        window.removeEventListener('resize',this.onResize,false);
    },
    mounted() {
        this.initChart()
    },
    methods: {
        // 调整窗口后重置
        onResize(){
            this.myChart && this.myChart.resize();
        },
        //初始化图形
        initChart() {
            const that = this;
            if(!that.chartDom){
                that.chartDom = document.getElementById('s-m-content');
            }

            if(that.myChart){
                that.myChart.setOption(that.option);
            }else{
                that.myChart = echarts.init(that.chartDom);
                that.myChart.setOption(that.option);
            }
        },
    },
};
</script>
<style lang='less' scoped>
.slopes-module {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../images/bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 3%;
    position: relative;
    .s-m-content {
        width: 100%;
        height: 100%;
    }
}
</style>