/*
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-22 15:16:00
 * @LastEditTime: 2021-07-22 15:18:04
 */


/* 企业隐患上报排名 */

/* 按区排名 */
let listData = [
    {
        "name": "增城区",
        "value": "302"
    },
    {
        "name": "从化区",
        "value": "290"
    },
    {
        "name": "南沙区",
        "value": "270"
    },
    {
        "name": "花都区",
        "value": "310"
    },
    {
        "name": "番禺区",
        "value": "290"
    },
    {
        "name": "黄埔区",
        "value": "294"
    },
    {
        "name": "白云区",
        "value": "300"
    },
    {
        "name": "荔湾区",
        "value": "292"
    },
    {
        "name": "海珠区",
        "value": "260"
    },
    {
        "name": "越秀区",
        "value": "272"
    },
    {
        "name": "天河区",
        "value": "270"
    }
];

/* 按八大行业排名 */
let listData2 = [
    {
        "name": "冶金",
        "value": "135"
    },
    {
        "name": "有色",
        "value": "130"
    },
    {
        "name": "建材",
        "value": "150"
    },
    {
        "name": "机械",
        "value": "120"
    },
    {
        "name": "轻工",
        "value": "820"
    },
    {
        "name": "纺织",
        "value": "640"
    },
    {
        "name": "烟草",
        "value": "150"
    },
    {
        "name": "商贸",
        "value": "1005"
    }];



/* 企业事故风险情况 */

/* 事故总数各等级分布 */
let listData3 = [
    {
        "name": "一般事故",
        "value": 270
    },
    {
        "name": "较大事故",
        "value": 130
    },
    {
        "name": "重大事故",
        "value": 13
    },
    {
        "name": "特大事故",
        "value": 2
    }];

/* 事故排行对比分析 */
let listItem = {
    newList0: [{
        "name": "交通运输",
        "value": 310
    },
    {
        "name": "工业制造",
        "value": 50
    },
    {
        "name": "建筑施工",
        "value": 38
    },
    {
        "name": "其他",
        "value": 17
    }],
    newList1: [{
        "name": "交通运输",
        "value": 210
    },
    {
        "name": "工业制造",
        "value": 60
    },
    {
        "name": "建筑施工",
        "value": 28
    },
    {
        "name": "其他",
        "value": 29
    }],
    newList2: [{
        "name": "交通运输",
        "value": 340
    },
    {
        "name": "工业制造",
        "value": 70
    },
    {
        "name": "建筑施工",
        "value": 38
    },
    {
        "name": "其他",
        "value": 10
    }],
    newList3: [{
        "name": "交通运输",
        "value": 321
    },
    {
        "name": "工业制造",
        "value": 30,
    },
    {
        "name": "建筑施工",
        "value": 88
    },
    {
        "name": "其他",
        "value": 47
    }],
    newList4: [{
        "name": "交通运输",
        "value": 210
    },
    {
        "name": "工业制造",
        "value": 22
    },
    {
        "name": "建筑施工",
        "value": 88
    },
    {
        "name": "其他",
        "value": 17
    }],
    newList5: [{
        "name": "交通运输",
        "value": 210
    },
    {
        "name": "工业制造",
        "value": 59
    },
    {
        "name": "建筑施工",
        "value": 28
    },
    {
        "name": "其他",
        "value": 72
    }],
    newList6: [{
        "name": "交通运输",
        "value": 31
    },
    {
        "name": "工业制造",
        "value": 150
    },
    {
        "name": "建筑施工",
        "value": 138
    },
    {
        "name": "其他",
        "value": 170
    }],
    newList7: [{
        "name": "交通运输",
        "value": 31
    },
    {
        "name": "工业制造",
        "value": 250
    },
    {
        "name": "建筑施工",
        "value": 138
    },
    {
        "name": "其他",
        "value": 17
    }],
    newList8: [{
        "name": "交通运输",
        "value": 310
    },
    {
        "name": "工业制造",
        "value": 20
    },
    {
        "name": "建筑施工",
        "value": 48
    },
    {
        "name": "其他",
        "value": 17
    }],
}
/* 按行业 */
let listData4 = [{
    name: "交通运输",
    value: 310
},
{
    name: "工业制造",
    value: 50
},
{
    name: "建筑施工",
    value: 38
},
{
    name: "其他",
    value: 17
}];

/* 按区域 */
let listData5 = [
    {
        name: "增城区",
        value: 39
    },
    {
        name: "从化区",
        value: 38
    },
    {
        name: "南沙区",
        value: 39
    },
    {
        name: "花都区",
        value: 35
    },
    {
        name: "番禺区",
        value: 38
    },
    {
        name: "黄埔区",
        value: 44
    },
    {
        name: "白云区",
        value: 38
    },
    {
        name: "荔湾区",
        value: 35
    },
    {
        name: "海珠区",
        value: 36
    },
    {
        name: "越秀区",
        value: 37
    },
    {
        name: "天河区",
        value: 36
    }
];

/* 事故总数行业分布 */
let listData6 = [
    {
        "name": "企业总数",
        "data": [
            {
                "name": "机械行业",
                "value": 40
            },
            {
                "name": "纺织行业",
                "value": 63
            },
            {
                "name": "轻工行业",
                "value": 57
            },
            {
                "name": "有色行业",
                "value": 50
            },
            {
                "name": "商贸行业",
                "value": 119
            },
            {
                "name": "建材行业",
                "value": 36
            },
            {
                "name": "冶金行业",
                "value": 30
            },
            {
                "name": "烟草行业",
                "value": 20
            }
        ]
    },
    {
        "name": "检查企业数",
        "data": [
            {
                "name": "机械行业",
                "value": 150
            },
            {
                "name": "纺织行业",
                "value": 520
            },
            {
                "name": "轻工行业",
                "value": 369
            },
            {
                "name": "有色行业",
                "value": 150
            },
            {
                "name": "商贸行业",
                "value": 600
            },
            {
                "name": "建材行业",
                "value": 120
            },
            {
                "name": "冶金行业",
                "value": 120
            },
            {
                "name": "烟草行业",
                "value": 121
            }
        ]
    },
    {
        "name": "检查次数",
        "data": [
            {
                "name": "机械行业",
                "value": 270
            },
            {
                "name": "纺织行业",
                "value": 740
            },
            {
                "name": "轻工行业",
                "value": 530
            },
            {
                "name": "有色行业",
                "value": 320
            },
            {
                "name": "商贸行业",
                "value": 712
            },
            {
                "name": "建材行业",
                "value": 270
            },
            {
                "name": "冶金行业",
                "value": 316
            },
            {
                "name": "烟草行业",
                "value": 210
            }
        ]
    }
];


/* 八大行业统计展现总数 */
let listData7 = [
    {
        "name": "隐患总数",
        "data": [
            {
                "name": "机械行业",
                "value": 36
            },
            {
                "name": "纺织行业",
                "value": 136
            },
            {
                "name": "轻工行业",
                "value": 127
            },
            {
                "name": "有色行业",
                "value": 56
            },
            {
                "name": "商贸行业",
                "value": 170
            },
            {
                "name": "建材行业",
                "value": 54
            },
            {
                "name": "冶金行业",
                "value": 36
            },
            {
                "name": "烟草行业",
                "value": 28
            }
        ]
    },
    {
        "name": "已整改",
        "data": [
            {
                "name": "机械行业",
                "value": 35
            },
            {
                "name": "纺织行业",
                "value": 120
            },
            {
                "name": "轻工行业",
                "value": 123
            },
            {
                "name": "有色行业",
                "value": 55
            },
            {
                "name": "商贸行业",
                "value": 169
            },
            {
                "name": "建材行业",
                "value": 53
            },
            {
                "name": "冶金行业",
                "value": 36
            },
            {
                "name": "烟草行业",
                "value": 27
            }
        ]
    },
    {
        "name": "整改中",
        "data": [
            {
                "name": "机械行业",
                "value": 1
            },
            {
                "name": "纺织行业",
                "value": 12
            },
            {
                "name": "轻工行业",
                "value": 3
            },
            {
                "name": "有色行业",
                "value": 1
            },
            {
                "name": "商贸行业",
                "value": 1
            },
            {
                "name": "建材行业",
                "value": 1
            },
            {
                "name": "冶金行业",
                "value": 0
            },
            {
                "name": "烟草行业",
                "value": 1
            }
        ]
    },
    {
        "name": "逾期未整改",
        "data": [
            {
                "name": "机械行业",
                "value": 0
            },
            {
                "name": "纺织行业",
                "value": 4
            },
            {
                "name": "轻工行业",
                "value": 1
            },
            {
                "name": "有色行业",
                "value": 0
            },
            {
                "name": "商贸行业",
                "value": 0
            },
            {
                "name": "建材行业",
                "value": 0
            },
            {
                "name": "冶金行业",
                "value": 0
            },
            {
                "name": "烟草行业",
                "value": 0
            }
        ]
    },
    {
        "name": "整改率",
        "data": [
            {
                "name": "机械行业",
                "value": 97
            },
            {
                "name": "纺织行业",
                "value": 88
            },
            {
                "name": "轻工行业",
                "value": 97
            },
            {
                "name": "有色行业",
                "value": 98
            },
            {
                "name": "商贸行业",
                "value": 99
            },
            {
                "name": "建材行业",
                "value": 98
            },
            {
                "name": "冶金行业",
                "value": 100
            },
            {
                "name": "烟草行业",
                "value": 96
            }
        ]
    }
];

let accidentOne = {
    accident1: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident2: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident3:
        [{
            name: "交通运输",
            value: 310
        },
        {
            name: "工业制造",
            value: 50
        },
        {
            name: "建筑施工",
            value: 38
        },
        {
            name: "其他",
            value: 17
        }],
    accident4: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident5: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident6: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident7: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
    accident8: [{
        name: "交通运输",
        value: 310
    },
    {
        name: "工业制造",
        value: 50
    },
    {
        name: "建筑施工",
        value: 38
    },
    {
        name: "其他",
        value: 17
    }],
}
/* 八大行业统计展现总数 */
let listData8 = [
    {
        "name": "隐患总数",
        "data": [
            {
                "name": "专项1",
                "value": 159
            },
            {
                "name": "专项2",
                "value": 170
            },
            {
                "name": "专项3",
                "value": 190
            },
            {
                "name": "专项4",
                "value": 124
            }
        ]
    },
    {
        "name": "已整改",
        "data": [
            {
                "name": "专项1",
                "value": 157
            },
            {
                "name": "专项2",
                "value": 168
            },
            {
                "name": "专项3",
                "value": 181
            },
            {
                "name": "专项4",
                "value": 112
            }
        ]
    },
    {
        "name": "整改中",
        "data": [
            {
                "name": "专项1",
                "value": 4
            },
            {
                "name": "专项2",
                "value": 5
            },
            {
                "name": "专项3",
                "value": 6
            },
            {
                "name": "专项4",
                "value": 5
            }
        ]
    },
    {
        "name": "逾期未整改",
        "data": [
            {
                "name": "专项1",
                "value": 1
            },
            {
                "name": "专项2",
                "value": 2
            },
            {
                "name": "专项3",
                "value": 1
            },
            {
                "name": "专项4",
                "value": 1
            }
        ]
    },
    {
        "name": "整改率",
        "data": [
            {
                "name": "专项1",
                "value": 99
            },
            {
                "name": "专项2",
                "value": 99
            },
            {
                "name": "专项3",
                "value": 95
            },
            {
                "name": "专项4",
                "value": 90
            }
        ]
    }
];
let tabale1 = [
    {
        title: '白云区“3·11”在建楼房电梯间坍塌事故',
        level: '较大事故',
        type: '坍塌',
        time: '2008.3.11',
    },
    {
        title: '广州轨道交通三号线北延段“5.15”较大事故',
        level: '较大事故',
        type: '中毒窒息',
        time: '2009.5.15',
    },
    {
        title: '增城市沙埔粮食管理所“4·30”厂房坍塌事故',
        level: '较大事故',
        type: '坍塌',
        time: '2009.4.30',
    },
    {
        title: '黄埔区“11.09”广东南碱公司带滤机框架上部结构工程坍塌较大事故',
        level: '较大事故',
        type: '坍塌',
        time: '2010.1.9',
    },
    {
        title: '白云区“9.17”华南北路（中段）污水主干管过铁路段工程较大事故',
        level: '较大事故',
        type: '中毒窒息',
        time: '2010.9.17',
    },
    {
        title: '天河区“5.8”花花世界购物中心在建楼房桥廊坍塌事故',
        level: '较大事故',
        type: '坍塌',
        time: '2010.5.8',
    },
    {
        title: '黄埔区“6.11”广州港舜船舶工程有限公司中毒窒息较大安全事故',
        level: '较大事故',
        type: '中毒窒息',
        time: '2011.6.11',
    },
    {
        title: '广州市巨亮光电科技股份有限公司“11.6”火灾较大事故',
        level: '较大事故',
        type: '火灾',
        time: '2012.11.6',
    },
    {
        title: '海珠区南洲街三滘村“8.25”在建消防站坍塌较大事故',
        level: '较大事故',
        type: '坍塌',
        time: '2012.8.25',
    },
    {
        title: '海珠区南洲街三滘村出租屋生产作坊“8.13”火灾较大事故',
        level: '较大事故',
        type: '火灾',
        time: '2012.8.13',
    },
    {
        title: '广州“7.20”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.7.20',
    },
    {
        title: '广州市“7·12”广清高速较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.7.12',
    },
    {
        title: '广州市“7·8”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.7.8',
    },
    {
        title: '广州市“5.17”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.5.17',
    },
    {
        title: '广州市 “4.27” 广澳高速公路较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.4.27',
    },
    {
        title: '广州市“4.16”京港澳高速公路较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.4.16',
    },
    {
        title: '广州市“3.6”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.3.6',
    },

    {
        title: '广州5·5中兴2轮与MOL MOTIVATOR轮碰撞重大事故',
        level: '重大事故',
        type: '水上交通',
        time: '2014.5.5',
    },
    {
        title: '广州市“1.15”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2012.1.15',
    },
    {
        title: '广州市越秀区“12.15”较大火灾事故',
        level: '较大事故',
        type: '火灾',
        time: '2013.12.15',
    },
    {
        title: '广州“6•29”道路交通事故引发爆燃重大事故',
        level: '重大事故',
        type: '道路交通',
        time: '2012.6.29',
    },
    {
        title: '广州市越秀区“10.25”火灾事故',
        level: '较大事故',
        type: '火灾',
        time: '2013.10.25',
    },
    {
        title: '广州市白云区“10.25”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2013.10.25',
    },
    {
        title: '广州“9 .16”较大道路交通事故',
        level: '较大事故',
        type: '道路交通',
        time: '2013.9.16',
    },
    {
        title: '广州市“6·17”重大油船爆炸事故',
        level: '重大事故',
        type: '爆燃事故',
        time: '2013.9.16',
    },
]
let table2 = [
    {
        title: '广州市增城环升竹制品加工部',
        area: '大田村委会',
        type: '竹制品制造',
        industry: '轻工',
        address: '广州市增城区中新镇大田村茶园南街三巷26号'
    },
    {
        title: '特百惠（中国）有限公司',
        area: '乌洲村村委会',
        type: '橡胶和塑料制品业',
        industry: '轻工',
        address: '广州市南沙区黄阁镇鸡谷山路84号'
    },
    {
        title: '广州市长峰建筑材料有限公司',
        area: '乌洲村村委会',
        type: '非金属矿物制品业',
        industry: '建材',
        address: '广州市南沙区黄阁镇乌洲村乌洲大道6号'
    },
    {
        title: '广州鸿凯五金制品有限公司',
        area: '长沙布村委会',
        type: '其他金属制日用品制造',
        industry: '轻工',
        address: '广州市白云区钟落潭镇广从八路755号'
    },
    {
        title: '广东吉艺木业有限公司',
        area: '乌石村委会',
        type: '家具制造业',
        industry: '轻工',
        address: '广州市增城区中新镇乌石村乌石一路10号'
    },
    {
        title: '广州韩居定制家居有限公司',
        area: '明珠工业园',
        type: '木质家具制造',
        industry: '轻工',
        address: '广州市从化区温泉镇永和路38号（厂房一）'
    },
    {
        title: '广州建盈预拌混凝土有限公司',
        area: '南星村委会',
        type: '非金属矿物制品业',
        industry: '建材',
        address: '广州市从化区温泉镇灌村中路183号'
    },
    {
        title: '广州天朗保温箱有限公司',
        area: '大田村委会',
        type: '专用设备制造业',
        industry: '机械',
        address: '广州市白云区钟落潭镇良田村良沙路713号'
    },
    {
        title: '广州市大绿贸易有限公司',
        area: '莲溪村村委会',
        type: '其他批发业',
        industry: '商贸',
        address: '广州市南沙区黄阁镇莲溪村新丰北街19号'
    },
    {
        title: '广州真知丽化妆品有限公司',
        area: '石榴桥社区居委会',
        type: '化妆品及卫生用品批发',
        industry: '商贸',
        address: '广州市白云区江高镇神山管理区振兴北路32号之一'
    },
]
export default {
    listData,
    listData2,
    listData3,
    listData4,
    listData6,
    listData5,
    listData7,
    listData8,
    listItem,
    accidentOne,
    tabale1,
    table2
}

