/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 15:16:00
 * @LastEditTime: 2021-07-23 08:40:10
 */
/* 区域企业情况 */
let listData1 = [
  {
    name: "2017",
    data: [
      {
        name: "增城区",
        value: "120",
      },
      {
        name: "从化区",
        value: "110",
      },
      {
        name: "南沙区",
        value: "140",
      },
      {
        name: "花都区",
        value: "102",
      },
      {
        name: "番禺区",
        value: "112",
      },
      {
        name: "黄埔区",
        value: "144",
      },
      {
        name: "白云区",
        value: "90",
      },
      {
        name: "荔湾区",
        value: "102",
      },
      {
        name: "海珠区",
        value: "102",
      },
      {
        name: "越秀区",
        value: "132",
      },
      {
        name: "天河区",
        value: "101",
      },
    ],
  },
  {
    name: "2018",
    data: [
      {
        name: "增城区",
        value: "135",
      },
      {
        name: "从化区",
        value: "123",
      },
      {
        name: "南沙区",
        value: "156",
      },
      {
        name: "花都区",
        value: "122",
      },
      {
        name: "番禺区",
        value: "117",
      },
      {
        name: "黄埔区",
        value: "134",
      },
      {
        name: "白云区",
        value: "100",
      },
      {
        name: "荔湾区",
        value: "102",
      },
      {
        name: "海珠区",
        value: "109",
      },
      {
        name: "越秀区",
        value: "125",
      },
      {
        name: "天河区",
        value: "111",
      },
    ],
  },

  {
    name: "2019",
    data: [
      {
        name: "增城区",
        value: "125",
      },
      {
        name: "从化区",
        value: "113",
      },
      {
        name: "南沙区",
        value: "124",
      },
      {
        name: "花都区",
        value: "113",
      },
      {
        name: "番禺区",
        value: "109",
      },
      {
        name: "黄埔区",
        value: "121",
      },
      {
        name: "白云区",
        value: "96",
      },
      {
        name: "荔湾区",
        value: "97",
      },
      {
        name: "海珠区",
        value: "102",
      },
      {
        name: "越秀区",
        value: "121",
      },
      {
        name: "天河区",
        value: "105",
      },
    ],
  },
];
/* 粉尘专项企业ABCED类  不知道是不是写死*/
let listData2 = [
  {
    name: "专项一",
    value: 116,
  },
  {
    name: "专项二",
    value: 120,
  },
  {
    name: "专项三",
    value: 370,
  },
  {
    name: "专项四",
    value: 366,
  },
  {
    name: "专项五",
    value: 128,
  },
];
/* 涉尘涉爆 重大隐患统计 */
let listData3 = [
  {
    name: "隐患总数",
    data: [
      {
        name: "增城区",
        value: "3",
      },
      {
        name: "从化区",
        value: "2",
      },
      {
        name: "南沙区",
        value: "1",
      },
      {
        name: "花都区",
        value: "2",
      },
      {
        name: "番禺区",
        value: "1",
      },
      {
        name: "黄埔区",
        value: "5",
      },
      {
        name: "白云区",
        value: "4",
      },
      {
        name: "荔湾区",
        value: "1",
      },
      {
        name: "海珠区",
        value: "2",
      },
      {
        name: "越秀区",
        value: "3",
      },
      {
        name: "天河区",
        value: "3",
      },
    ],
  },
  {
    name: "隐患已整改",
    data: [
      {
        name: "增城区",
        value: "2",
      },
      {
        name: "从化区",
        value: "2",
      },
      {
        name: "南沙区",
        value: "1",
      },
      {
        name: "花都区",
        value: "2",
      },
      {
        name: "番禺区",
        value: "1",
      },
      {
        name: "黄埔区",
        value: "4",
      },
      {
        name: "白云区",
        value: "4",
      },
      {
        name: "荔湾区",
        value: "1",
      },
      {
        name: "海珠区",
        value: "2",
      },
      {
        name: "越秀区",
        value: "3",
      },
      {
        name: "天河区",
        value: "3",
      },
    ],
  },
  {
    name: "整改中",
    data: [
      {
        name: "增城区",
        value: "1",
      },
      {
        name: "从化区",
        value: "0",
      },
      {
        name: "南沙区",
        value: "0",
      },
      {
        name: "花都区",
        value: "0",
      },
      {
        name: "番禺区",
        value: "0",
      },
      {
        name: "黄埔区",
        value: "1",
      },
      {
        name: "白云区",
        value: "0",
      },
      {
        name: "荔湾区",
        value: "0",
      },
      {
        name: "海珠区",
        value: "0",
      },
      {
        name: "越秀区",
        value: "0",
      },
      {
        name: "天河区",
        value: "0",
      },
    ],
  },
  {
    name: "逾期未整改",
    data: [
      {
        name: "增城区",
        value: "0",
      },
      {
        name: "从化区",
        value: "0",
      },
      {
        name: "南沙区",
        value: "0",
      },
      {
        name: "花都区",
        value: "0",
      },
      {
        name: "番禺区",
        value: "0",
      },
      {
        name: "黄埔区",
        value: "",
      },
      {
        name: "白云区",
        value: "0",
      },
      {
        name: "荔湾区",
        value: "0",
      },
      {
        name: "海珠区",
        value: "0",
      },
      {
        name: "越秀区",
        value: "0",
      },
      {
        name: "天河区",
        value: "0",
      },
    ],
  },
  {
    name: "整改率",
    data: [
      {
        name: "增城区",
        value: "67",
      },
      {
        name: "从化区",
        value: "100",
      },
      {
        name: "南沙区",
        value: "100",
      },
      {
        name: "花都区",
        value: "100",
      },
      {
        name: "番禺区",
        value: "100",
      },
      {
        name: "黄埔区",
        value: "80",
      },
      {
        name: "白云区",
        value: "100",
      },
      {
        name: "荔湾区",
        value: "100",
      },
      {
        name: "海珠区",
        value: "100",
      },
      {
        name: "越秀区",
        value: "100",
      },
      {
        name: "天河区",
        value: "100",
      },
    ],
  },
];

/* 涉尘涉爆 一般隐患统计 */
let listData4 = [
  {
    name: "隐患总数",
    data: [
      {
        name: "增城区",
        value: "25",
      },
      {
        name: "从化区",
        value: "13",
      },
      {
        name: "南沙区",
        value: "24",
      },
      {
        name: "花都区",
        value: "13",
      },
      {
        name: "番禺区",
        value: "19",
      },
      {
        name: "黄埔区",
        value: "21",
      },
      {
        name: "白云区",
        value: "16",
      },
      {
        name: "荔湾区",
        value: "17",
      },
      {
        name: "海珠区",
        value: "12",
      },
      {
        name: "越秀区",
        value: "21",
      },
      {
        name: "天河区",
        value: "15",
      },
    ],
  },
  {
    name: "隐患已整改",
    data: [
      {
        name: "增城区",
        value: "23",
      },
      {
        name: "从化区",
        value: "12",
      },
      {
        name: "南沙区",
        value: "21",
      },
      {
        name: "花都区",
        value: "13",
      },
      {
        name: "番禺区",
        value: "19",
      },
      {
        name: "黄埔区",
        value: "18",
      },
      {
        name: "白云区",
        value: "15",
      },
      {
        name: "荔湾区",
        value: "14",
      },
      {
        name: "海珠区",
        value: "12",
      },
      {
        name: "越秀区",
        value: "21",
      },
      {
        name: "天河区",
        value: "14",
      },
    ],
  },
  {
    name: "整改中",
    data: [
      {
        name: "增城区",
        value: "2",
      },
      {
        name: "从化区",
        value: "1",
      },
      {
        name: "南沙区",
        value: "3",
      },
      {
        name: "花都区",
        value: "0",
      },
      {
        name: "番禺区",
        value: "0",
      },
      {
        name: "黄埔区",
        value: "2",
      },
      {
        name: "白云区",
        value: "1",
      },
      {
        name: "荔湾区",
        value: "3",
      },
      {
        name: "海珠区",
        value: "0",
      },
      {
        name: "越秀区",
        value: "0",
      },
      {
        name: "天河区",
        value: "1",
      },
    ],
  },
  {
    name: "逾期未整改",
    data: [
      {
        name: "增城区",
        value: "0",
      },
      {
        name: "从化区",
        value: "1",
      },
      {
        name: "南沙区",
        value: "3",
      },
      {
        name: "花都区",
        value: "0",
      },
      {
        name: "番禺区",
        value: "0",
      },
      {
        name: "黄埔区",
        value: "1",
      },
      {
        name: "白云区",
        value: "0",
      },
      {
        name: "荔湾区",
        value: "0",
      },
      {
        name: "海珠区",
        value: "0",
      },
      {
        name: "越秀区",
        value: "0",
      },
      {
        name: "天河区",
        value: "0",
      },
    ],
  },
  {
    name: "整改率",
    data: [
      {
        name: "增城区",
        value: "92",
      },
      {
        name: "从化区",
        value: "98",
      },
      {
        name: "南沙区",
        value: "88",
      },
      {
        name: "花都区",
        value: "100",
      },
      {
        name: "番禺区",
        value: "100",
      },
      {
        name: "黄埔区",
        value: "86",
      },
      {
        name: "白云区",
        value: "94",
      },
      {
        name: "荔湾区",
        value: "82",
      },
      {
        name: "海珠区",
        value: "100",
      },
      {
        name: "越秀区",
        value: "100",
      },
      {
        name: "天河区",
        value: "93",
      },
    ],
  },
];
/* 涉尘涉爆 重大事故统计 */
let listData5 = [
  {
    name: "事故总数",
    data: [
      {
        name: "增城区",
        value: "3",
      },
      {
        name: "从化区",
        value: "8",
      },
      {
        name: "南沙区",
        value: "5",
      },
      {
        name: "花都区",
        value: "2",
      },
      {
        name: "番禺区",
        value: "7",
      },
      {
        name: "黄埔区",
        value: "4",
      },
      {
        name: "白云区",
        value: "2",
      },
      {
        name: "荔湾区",
        value: "5",
      },
      {
        name: "海珠区",
        value: "4",
      },
      {
        name: "越秀区",
        value: "3",
      },
      {
        name: "天河区",
        value: "6",
      },
    ],
  },
  {
    name: "死亡人数",
    data: [
      {
        name: "增城区",
        value: "12",
      },
      {
        name: "从化区",
        value: "7",
      },
      {
        name: "南沙区",
        value: "15",
      },
      {
        name: "花都区",
        value: "12",
      },
      {
        name: "番禺区",
        value: "10",
      },
      {
        name: "黄埔区",
        value: "14",
      },
      {
        name: "白云区",
        value: "8",
      },
      {
        name: "荔湾区",
        value: "13",
      },
      {
        name: "海珠区",
        value: "12",
      },
      {
        name: "越秀区",
        value: "8",
      },
      {
        name: "天河区",
        value: "13",
      },
    ],
  },
  {
    name: "受伤人数",
    data: [
      {
        name: "增城区",
        value: "25",
      },
      {
        name: "从化区",
        value: "20",
      },
      {
        name: "南沙区",
        value: "14",
      },
      {
        name: "花都区",
        value: "17",
      },
      {
        name: "番禺区",
        value: "20",
      },
      {
        name: "黄埔区",
        value: "14",
      },
      {
        name: "白云区",
        value: "10",
      },
      {
        name: "荔湾区",
        value: "24",
      },
      {
        name: "海珠区",
        value: "17",
      },
      {
        name: "越秀区",
        value: "20",
      },
      {
        name: "天河区",
        value: "13",
      },
    ],
  },
  {
    name: "经济损失",
    data: [
      {
        name: "增城区",
        value: "5",
      },
      {
        name: "从化区",
        value: "10",
      },
      {
        name: "南沙区",
        value: "6",
      },
      {
        name: "花都区",
        value: "16",
      },
      {
        name: "番禺区",
        value: "20",
      },
      {
        name: "黄埔区",
        value: "15",
      },
      {
        name: "白云区",
        value: "10",
      },
      {
        name: "荔湾区",
        value: "17",
      },
      {
        name: "海珠区",
        value: "13",
      },
      {
        name: "越秀区",
        value: "20",
      },
      {
        name: "天河区",
        value: "16",
      },
    ],
  },
];
/* 涉尘涉爆 一般事故统计 */
let listData6 = [
  {
    name: "事故总数",
    data: [
      {
        name: "增城区",
        value: "13",
      },
      {
        name: "从化区",
        value: "18",
      },
      {
        name: "南沙区",
        value: "15",
      },
      {
        name: "花都区",
        value: "12",
      },
      {
        name: "番禺区",
        value: "17",
      },
      {
        name: "黄埔区",
        value: "14",
      },
      {
        name: "白云区",
        value: "12",
      },
      {
        name: "荔湾区",
        value: "15",
      },
      {
        name: "海珠区",
        value: "14",
      },
      {
        name: "越秀区",
        value: "13",
      },
      {
        name: "天河区",
        value: "16",
      },
    ],
  },
  {
    name: "死亡人数",
    data: [
      {
        name: "增城区",
        value: "2",
      },
      {
        name: "从化区",
        value: "4",
      },
      {
        name: "南沙区",
        value: "1",
      },
      {
        name: "花都区",
        value: "5",
      },
      {
        name: "番禺区",
        value: "2",
      },
      {
        name: "黄埔区",
        value: "4",
      },
      {
        name: "白云区",
        value: "1",
      },
      {
        name: "荔湾区",
        value: "5",
      },
      {
        name: "海珠区",
        value: "3",
      },
      {
        name: "越秀区",
        value: "4",
      },
      {
        name: "天河区",
        value: "1",
      },
    ],
  },
  {
    name: "受伤人数",
    data: [
      {
        name: "增城区",
        value: "5",
      },
      {
        name: "从化区",
        value: "10",
      },
      {
        name: "南沙区",
        value: "4",
      },
      {
        name: "花都区",
        value: "7",
      },
      {
        name: "番禺区",
        value: "14",
      },
      {
        name: "黄埔区",
        value: "4",
      },
      {
        name: "白云区",
        value: "10",
      },
      {
        name: "荔湾区",
        value: "4",
      },
      {
        name: "海珠区",
        value: "17",
      },
      {
        name: "越秀区",
        value: "10",
      },
      {
        name: "天河区",
        value: "13",
      },
    ],
  },
  {
    name: "经济损失",
    data: [
      {
        name: "增城区",
        value: "3",
      },
      {
        name: "从化区",
        value: "7",
      },
      {
        name: "南沙区",
        value: "6",
      },
      {
        name: "花都区",
        value: "8",
      },
      {
        name: "番禺区",
        value: "3",
      },
      {
        name: "黄埔区",
        value: "15",
      },
      {
        name: "白云区",
        value: "8",
      },
      {
        name: "荔湾区",
        value: "14",
      },
      {
        name: "海珠区",
        value: "6",
      },
      {
        name: "越秀区",
        value: "14",
      },
      {
        name: "天河区",
        value: "6",
      },
    ],
  },
];

/* 涉尘涉爆各区检查企业情况*/
let listData7 = [
  {
    name: "企业总数",
    data: [
      {
        name: "增城区",
        value: "128",
      },
      {
        name: "从化区",
        value: "117",
      },
      {
        name: "南沙区",
        value: "128",
      },
      {
        name: "花都区",
        value: "118",
      },
      {
        name: "番禺区",
        value: "115",
      },
      {
        name: "黄埔区",
        value: "126",
      },
      {
        name: "白云区",
        value: "99",
      },
      {
        name: "荔湾区",
        value: "105",
      },
      {
        name: "海珠区",
        value: "107",
      },
      {
        name: "越秀区",
        value: "124",
      },
      {
        name: "天河区",
        value: "105",
      },
    ],
  },
  {
    name: "检查企业数",
    data: [
      {
        name: "增城区",
        value: "102",
      },
      {
        name: "从化区",
        value: "110",
      },
      {
        name: "南沙区",
        value: "114",
      },
      {
        name: "花都区",
        value: "112",
      },
      {
        name: "番禺区",
        value: "102",
      },
      {
        name: "黄埔区",
        value: "114",
      },
      {
        name: "白云区",
        value: "91",
      },
      {
        name: "荔湾区",
        value: "95",
      },
      {
        name: "海珠区",
        value: "93",
      },
      {
        name: "越秀区",
        value: "94",
      },
      {
        name: "天河区",
        value: "91",
      },
    ],
  },
  {
    name: "检查次数",
    data: [
      {
        name: "增城区",
        value: "153",
      },
      {
        name: "从化区",
        value: "160",
      },
      {
        name: "南沙区",
        value: "144",
      },
      {
        name: "花都区",
        value: "187",
      },
      {
        name: "番禺区",
        value: "146",
      },
      {
        name: "黄埔区",
        value: "144",
      },
      {
        name: "白云区",
        value: "120",
      },
      {
        name: "荔湾区",
        value: "164",
      },
      {
        name: "海珠区",
        value: "147",
      },
      {
        name: "越秀区",
        value: "140",
      },
      {
        name: "天河区",
        value: "132",
      },
    ],
  },
];
/* 执法文书统计*/
let listData8 = [
  {
    name: "2017",
    data: [
      {
        name: "1月",
        value: "28",
      },
      {
        name: "2月",
        value: "47",
      },
      {
        name: "3月",
        value: "28",
      },
      {
        name: "4月",
        value: "58",
      },
      {
        name: "5月",
        value: "25",
      },
      {
        name: "6月",
        value: "36",
      },
      {
        name: "7月",
        value: "49",
      },
      {
        name: "8月",
        value: "25",
      },
      {
        name: "9月",
        value: "47",
      },
      {
        name: "10月",
        value: "34",
      },
      {
        name: "11月",
        value: "75",
      },
      {
        name: "12月",
        value: "25",
      },
    ],
  },
  {
    name: "2018",
    data: [
      {
        name: "1月",
        value: "48",
      },
      {
        name: "2月",
        value: "24",
      },
      {
        name: "3月",
        value: "45",
      },
      {
        name: "4月",
        value: "24",
      },
      {
        name: "5月",
        value: "37",
      },
      {
        name: "6月",
        value: "23",
      },
      {
        name: "7月",
        value: "15",
      },
      {
        name: "8月",
        value: "37",
      },
      {
        name: "9月",
        value: "31",
      },
      {
        name: "10月",
        value: "56",
      },
      {
        name: "11月",
        value: "46",
      },
      {
        name: "12月",
        value: "46",
      },
    ],
  },
  {
    name: "2019",
    data: [
      {
        name: "1月",
        value: "18",
      },
      {
        name: "2月",
        value: "37",
      },
      {
        name: "3月",
        value: "58",
      },
      {
        name: "4月",
        value: "38",
      },
      {
        name: "5月",
        value: "45",
      },
      {
        name: "6月",
        value: "46",
      },
      {
        name: "7月",
        value: "29",
      },
      {
        name: "8月",
        value: "65",
      },
      {
        name: "9月",
        value: "37",
      },
      {
        name: "10月",
        value: "54",
      },
      {
        name: "11月",
        value: "25",
      },
      {
        name: "12月",
        value: "35",
      },
    ],
  },
];
export default {
  listData1,
  listData2,
  listData3,
  listData4,
  listData5,
  listData6,
  listData7,
  listData8,
};
