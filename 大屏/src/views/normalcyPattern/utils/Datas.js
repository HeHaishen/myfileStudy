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
let listItem= {
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
        "value": 30
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
        "name":"企业总数",
        "data":[
            {
                "name":"机械行业",
                "value":40
            },
            {
                "name":"纺织行业",
                "value":63
            },
            {
                "name":"轻工行业",
                "value":57
            },
            {
                "name":"有色行业",
                "value":50
            },
            {
                "name":"商贸行业",
                "value":119
            },
            {
                "name":"建材行业",
                "value":36
            },
            {
                "name":"冶金行业",
                "value":30
            },
            {
                "name":"烟草行业",
                "value":20
            }
        ]
    },
    {
        "name":"检查企业数",
        "data":[
            {
                "name":"机械行业",
                "value":150
            },
            {
                "name":"纺织行业",
                "value":520
            },
            {
                "name":"轻工行业",
                "value":369
            },
            {
                "name":"有色行业",
                "value":150
            },
            {
                "name":"商贸行业",
                "value":600
            },
            {
                "name":"建材行业",
                "value":120
            },
            {
                "name":"冶金行业",
                "value":120
            },
            {
                "name":"烟草行业",
                "value":121
            }
        ]
    },
    {
        "name":"检查次数",
        "data":[
            {
                "name":"机械行业",
                "value":270
            },
            {
                "name":"纺织行业",
                "value":740
            },
            {
                "name":"轻工行业",
                "value":530
            },
            {
                "name":"有色行业",
                "value":320
            },
            {
                "name":"商贸行业",
                "value":712
            },
            {
                "name":"建材行业",
                "value":270
            },
            {
                "name":"冶金行业",
                "value":316
            },
            {
                "name":"烟草行业",
                "value":210
            }
        ]
    }
];


/* 八大行业统计展现总数 */
let listData7 = [
    {
        "name":"隐患总数",
        "data":[
            {
                "name":"机械行业",
                "value":36
            },
            {
                "name":"纺织行业",
                "value":136
            },
            {
                "name":"轻工行业",
                "value":127
            },
            {
                "name":"有色行业",
                "value":56
            },
            {
                "name":"商贸行业",
                "value":170
            },
            {
                "name":"建材行业",
                "value":54
            },
            {
                "name":"冶金行业",
                "value":36
            },
            {
                "name":"烟草行业",
                "value":28
            }
        ]
    },
    {
        "name":"已整改",
        "data":[
            {
                "name":"机械行业",
                "value":35
            },
            {
                "name":"纺织行业",
                "value":120
            },
            {
                "name":"轻工行业",
                "value":123
            },
            {
                "name":"有色行业",
                "value":55
            },
            {
                "name":"商贸行业",
                "value":169
            },
            {
                "name":"建材行业",
                "value":53
            },
            {
                "name":"冶金行业",
                "value":36
            },
            {
                "name":"烟草行业",
                "value":27
            }
        ]
    },
    {
        "name":"整改中",
        "data":[
            {
                "name":"机械行业",
                "value":1
            },
            {
                "name":"纺织行业",
                "value":12
            },
            {
                "name":"轻工行业",
                "value":3
            },
            {
                "name":"有色行业",
                "value":1
            },
            {
                "name":"商贸行业",
                "value":1
            },
            {
                "name":"建材行业",
                "value":1
            },
            {
                "name":"冶金行业",
                "value":0
            },
            {
                "name":"烟草行业",
                "value":1
            }
        ]
    },
    {
        "name":"逾期未整改",
        "data":[
            {
                "name":"机械行业",
                "value":0
            },
            {
                "name":"纺织行业",
                "value":4
            },
            {
                "name":"轻工行业",
                "value":1
            },
            {
                "name":"有色行业",
                "value":0
            },
            {
                "name":"商贸行业",
                "value":0
            },
            {
                "name":"建材行业",
                "value":0
            },
            {
                "name":"冶金行业",
                "value":0
            },
            {
                "name":"烟草行业",
                "value":0
            }
        ]
    },
    {
        "name":"整改率",
        "data":[
            {
                "name":"机械行业",
                "value":97
            },
            {
                "name":"纺织行业",
                "value":88
            },
            {
                "name":"轻工行业",
                "value":97
            },
            {
                "name":"有色行业",
                "value":98
            },
            {
                "name":"商贸行业",
                "value":99
            },
            {
                "name":"建材行业",
                "value":98
            },
            {
                "name":"冶金行业",
                "value":100
            },
            {
                "name":"烟草行业",
                "value":96
            }
        ]
    }
];

let accidentOne={
    accident1:[{
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
        accident2:[{
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
    accident4:[{
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
        accident5:[{
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
            accident6:[{
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
                accident7:[{
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
                    accident8:[{
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
        "name":"隐患总数",
        "data":[
            {
                "name":"专项1",
                "value":159
            },
            {
                "name":"专项2",
                "value":170
            },
            {
                "name":"专项3",
                "value":190
            },
            {
                "name":"专项4",
                "value":124
            }
        ]
    },
    {
        "name":"已整改",
        "data":[
            {
                "name":"专项1",
                "value":157
            },
            {
                "name":"专项2",
                "value":168
            },
            {
                "name":"专项3",
                "value":181
            },
            {
                "name":"专项4",
                "value":112
            }
        ]
    },
    {
        "name":"整改中",
        "data":[
            {
                "name":"专项1",
                "value":4
            },
            {
                "name":"专项2",
                "value":5
            },
            {
                "name":"专项3",
                "value":6
            },
            {
                "name":"专项4",
                "value":5
            }
        ]
    },
    {
        "name":"逾期未整改",
        "data":[
            {
                "name":"专项1",
                "value":1
            },
            {
                "name":"专项2",
                "value":2
            },
            {
                "name":"专项3",
                "value":1
            },
            {
                "name":"专项4",
                "value":1
            }
        ]
    },
    {
        "name":"整改率",
        "data":[
            {
                "name":"专项1",
                "value":99
            },
            {
                "name":"专项2",
                "value":99
            },
            {
                "name":"专项3",
                "value":95
            },
            {
                "name":"专项4",
                "value":90
            }
        ]
    }
];
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
    accidentOne
}

