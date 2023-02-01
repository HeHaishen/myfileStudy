import * as echarts from 'echarts';

export const option = {
    title: {},
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            textStyle: {
                color: "rgba(255,255,255,0)",
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,1)',
            }
        },
        data: [0, 20, 40, 60, 80, 100, 120]
    },
    yAxis: {
        axisLabel: {
            textStyle: {
                fontSize: 34,
                color: "rgba(255,255,255,1)",
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,1)',
            }
        },
        splitLine:{
            show: true,
            lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0)',
            }
        },
        type: 'value'
    },
    series: [
        {
            name: 'Line 1',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [40, 60, 100, 150, 90, 60, 0]
        }
    ]
};