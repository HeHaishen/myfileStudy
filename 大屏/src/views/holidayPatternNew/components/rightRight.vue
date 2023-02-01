<template>
    <div class="holiday-right">
        <div class="shine-model-title">各系统运行专题</div>
        <div class="sys-chart"></div>
    </div>
</template>
<script>
    import { imgIcon } from './icon.js'

    export default {
        data() {
            return {
                icon: imgIcon.centerImg,
                iconImgList: [
                    {
                        name: 'city',
                        icon: require('../../../assets/images/normalcyPattern/icon_center.png')
                    },
                    {
                        name: 'city',
                        icon: require('../../../assets/images/normalcyPattern/icon_city.png')
                    },
                    {
                        name: 'bureau',
                        icon: require('../../../assets/images/normalcyPattern/icon_bureau.png')
                    },
                    {
                        name: 'area',
                        icon: require('../../../assets/images/normalcyPattern/icon_area.png')
                    }
                ]

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        methods: {
            initChart() {
                this.charDiv = this.$echarts.init(
                    document.getElementsByClassName("sys-chart")[0]
                )
                this.charDiv.setOption(this.setChart(this.chartDatas()))
                this.charDiv.resize()
                let that = this
                window.onresize = function () {
                    that.charDiv.resize()
                }
            },
            chartDatas() {
                let that = this
                const icons = this.icon
                console.log('icons', imgIcon)
                //imgIcon['bureauImg'] ,//局 
                // imgIcon['cityImg'],//城市
                // imgIcon['areaImg'],// 区
                return [
                    {
                        name: "应急管理综合应用平台 ",

                        tooltip: {
                            formatter: "{b}: 19999<br />"
                        },
                        value: [10, 0],
                        symbol: imgIcon['centerImg'],// 图片
                        symbolSize: [900, 280],// 图片大小
                        value: [450, 300],  // 位置
                        x: 900,
                        y: 300,
                        fixed: false,
                        // draggable: false,
                        category: 1,
                        label: {
                            show: false,
                            color: "#FFF",
                            position: 'bottom',
                        },
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#157eff"
                                    },
                                    {
                                        offset: 1,
                                        color: "#35c2ff"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "应急管理综合应用平台",

                        tooltip: {
                            formatter: "{b}: 19999<br />"
                        },
                        value: [10, 0],
                        symbol: '',// 图片
                        symbolSize: [20, 20],// 图片大小
                        value: [590, 300],  // 位置
                        x: 900,
                        y: 300,
                        fixed: false,

                        // draggable: false,
                        category: 1,
                        label: {
                            show: false,
                            color: "#FFF",
                            position: 'bottom',
                        },
                        itemStyle: {
                            normal: {
                                color: '#157eff',
                                opacity: 0,
                            }
                        }
                    },
                    {
                        name: "政数局",
                        symbol: imgIcon['bureauImg'],
                        symbolSize: [100, 80],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [33, 28],
                        },
                        value: [0, 400],
                        x: 0,
                        y: 400,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "应急局",
                        symbol: imgIcon['bureauImg'],
                        symbolSize: [100, 80],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [33, 28],
                        },
                        value: [260, 520],
                        x: 260,
                        y: 520,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "省厅",
                        symbol: imgIcon['bureauImg'],
                        symbolSize: [100, 80],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [38, 25],
                        },
                        value: [600, 600],
                        x: 600,
                        y: 600,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "市局",
                        symbol: imgIcon['cityImg'],
                        symbolSize: [100, 80],
                        label: {
                            offset: [38, 25],
                            color: "#efefef",
                            position: 'center',
                        },
                        value: [940, 520],
                        x: 940,
                        y: 520,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "穗智管",
                        symbol: imgIcon['bureauImg'],
                        symbolSize: [100, 80],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [33, 28],
                        },
                        value: [1200, 400],
                        x: 1200,
                        y: 400,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "天河区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [140, 240],
                        x: 140,
                        y: 240,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "黄埔区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [210, 190],
                        x: 210,
                        y: 190,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "白云区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [300, 160],
                        x: 300,
                        y: 160,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "番禺区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [390, 135],
                        x: 390,
                        y: 135,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "海珠区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [490, 135],
                        x: 490,
                        y: 135,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "荔湾区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [580, 130],
                        x: 580,
                        y: 130,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "南沙区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [685, 135],
                        x: 685,
                        y: 135,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "从化区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [800, 150],
                        x: 800,
                        y: 150,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "花都区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [900, 170],
                        x: 900,
                        y: 170,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "越秀区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [1015, 190],
                        x: 1015,
                        y: 190,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "增城区",
                        symbol: imgIcon['areaImg'],
                        symbolSize: [60, 60],
                        label: {
                            color: "#efefef",
                            position: 'center',
                            offset: [10, 26],
                        },
                        value: [1100, 230],
                        x: 1100,
                        y: 230,
                        fixed: true,
                        category: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#ffb402"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffdc84"
                                    }
                                ])
                            }
                        }
                    },
                ]
            },
            setChart(data) {
                let that = this
                let option = {
                    xAxis: {
                        show: false,
                        type: "value"
                    },
                    yAxis: {
                        show: false,
                        type: "value"
                    },
                    tooltip: {},
                    series: [
                        {
                            type: "graph",
                            zlevel: 5,

                            draggable: false,
                            coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

                            // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
                            // edgeLabel: {
                            //   normal: {
                            //     textStyle: {
                            //       fontSize: 60
                            //     }
                            //   }
                            // },
                            symbol: "rect",
                            symbolOffset: ["15%", 0],

                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data: data,
                            links: [
                                {
                                    source: "应急管理综合应用平台",
                                    target: "政数局",
                                    // source: "政数局",
                                    // target: "应急管理综合应用平台"
                                    // lineStyle: {
                                    //   normal: {
                                    //     color: "#12b5d0",
                                    //
                                    //   }
                                    // }
                                },
                                {
                                    source: "应急局",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "省厅",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "市局",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            color: "red",
                                        }
                                    }
                                },

                                {
                                    source: "穗智管",
                                    target: "应急管理综合应用平台",
                                    // source: "应急管理综合应用平台",
                                    // target: "穗智管",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },

                                {
                                    source: "应急管理综合应用平台",
                                    target: "天河区",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },

                                {
                                    source: "应急管理综合应用平台",
                                    target: "黄埔区"
                                    // lineStyle: {
                                    //   normal: {
                                    //     color: "#12b5d0",
                                    //
                                    //   }
                                    // }
                                },

                                {
                                    source: "应急管理综合应用平台",
                                    target: "白云区",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: '应急管理综合应用平台',
                                    target: '番禺区',
                                    // source: "番禺区",
                                    // target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: '应急管理综合应用平台',
                                    target: '海珠区',
                                    // source: "海珠区",
                                    // target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "荔湾区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "南沙区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "从化区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "花都区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "越秀区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                },
                                {
                                    source: "增城区",
                                    target: "应急管理综合应用平台",
                                    lineStyle: {
                                        normal: {
                                            // color: "#12b5d0",
                                        }
                                    }
                                }
                            ],

                            lineStyle: {
                                normal: {
                                    opacity: 1,
                                    color: "#53B5EA",
                                    curveness: 0.2,

                                    // 12b5d0
                                    // type: "dashed",
                                    width: 2
                                }
                            }
                        },

                        {
                            type: "lines",
                            coordinateSystem: "cartesian2d",
                            z: 1,
                            zlevel: 2,
                            animation: false,
                            effect: {
                                show: true,
                                period: 5,
                                trailLength: 0.01,
                                symbolSize: 12,
                                symbol: "pin",
                                loop: true,
                                // color: "rgba(55,155,255,0.5)"
                                color: "#22AC38",
                            },
                            lineStyle: {
                                normal: {
                                    color: "#22AC38",
                                    width: 0,
                                    curveness: 0.2
                                }
                            },

                            data: [
                                {
                                    coords: [
                                        [590, 300],
                                        [0, 400],
                                    ]
                                },
                                // {
                                //   coords: [
                                //     [100, 500],
                                //     [590, 300]
                                //   ]
                                // },
                                {
                                    coords: [
                                        [260, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [600, 600],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [940, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1200, 400],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [140, 240],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [210, 190],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [300, 160],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [390, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [490, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [580, 130],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [685, 135],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [800, 150],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [900, 170],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1015, 190],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1100, 230],
                                        [590, 300]
                                    ]
                                }
                            ]
                        },
                        {
                            type: "lines",
                            coordinateSystem: "cartesian2d",
                            z: 1,
                            zlevel: 2,
                            animation: false,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.01,
                                symbolSize: 12,
                                symbol: "pin",
                                loop: true,

                                // period: 2.5,
                                // trailLength:0,
                                // symbolSize: 12,
                                // symbol: "circle",
                                color: "rgba(55,155,255,0.5)"
                            },
                            lineStyle: {
                                normal: {
                                    color: "#22AC38",
                                    width: 0,
                                    curveness: 0.2
                                }
                            },

                            data: [
                                {
                                    coords: [
                                        [590, 300],
                                        [0, 400],
                                    ]
                                },
                                // {
                                //   coords: [
                                //     [100, 500],
                                //     [590, 300]
                                //   ]
                                // },
                                {
                                    coords: [
                                        [260, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [600, 600],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [940, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1200, 400],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [140, 240],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [210, 190],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [300, 160],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [390, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [490, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [580, 130],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [685, 135],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [800, 150],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [900, 170],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1015, 190],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1100, 230],
                                        [590, 300]
                                    ]
                                }
                            ]
                        },
                        {
                            type: "lines",
                            coordinateSystem: "cartesian2d",
                            z: 1,
                            zlevel: 2,
                            animation: false,

                            effect: {
                                show: true,
                                period: 8,
                                trailLength: 0.01,
                                symbolSize: 12,
                                symbol: "pin",
                                loop: true,

                                // period: 2.5,
                                // trailLength:0,
                                // symbolSize: 12,
                                // symbol: "circle",
                                color: "rgba(55,155,255,0.5)"
                            },
                            lineStyle: {
                                normal: {
                                    color: "#22AC38",
                                    width: 0,
                                    curveness: 0.2
                                }
                            },

                            data: [
                                {
                                    coords: [
                                        [590, 300],
                                        [0, 400],
                                    ]
                                },
                                // {
                                //   coords: [
                                //     [100, 500],
                                //     [590, 300]
                                //   ]
                                // },
                                {
                                    coords: [
                                        [260, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [600, 600],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [940, 520],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1200, 400],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [140, 240],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [210, 190],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [300, 160],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [390, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [590, 300],
                                        [490, 135],
                                    ]
                                },
                                {
                                    coords: [
                                        [580, 130],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [685, 135],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [800, 150],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [900, 170],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1015, 190],
                                        [590, 300]
                                    ]
                                },
                                {
                                    coords: [
                                        [1100, 230],
                                        [590, 300]
                                    ]
                                }
                            ]
                        }
                    ]
                }
                return option
            }

        }

    }
</script>
<style lang='less' scoped>
    @import '../index.less';
</style>