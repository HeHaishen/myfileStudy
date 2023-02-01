<!--
 * @Description: 龙舟水-预警监测、决策辅助、基础数据、部门信息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-29 11:34:55
 * @LastEditTime: 2021-08-04 10:58:52
-->
<template>
  <div class="c-fiexd-model">
    <ul class="fixed-model-list">
      <li
        v-for="(i, k) in modelListData"
        :key="k"
        @click="clickActive(i, k)"
        :class="[activeKey === k ? 'activeli' : '']"
      >
        <img :src="i.icon" alt="" />
        <p>{{ i.name }}</p>
      </li>
    </ul>
    <div
      v-if="activeKey || activeKey===0"
      class="fixed-select-list"
      v-for="(i, k) in modelListData"
      :key="k"
      v-show="activeKey === k"
    >
      <div class="select-list-title">
        {{ modelListData[activeKey]["name"] }}
      </div>
      <ul class="select-list-ul">
        <li
          v-for="(item, key) in i.listData"
          :key="key"
          @click="doListActive(i, k, item, key)"
        >
          <img
            :src="item.icon"
            alt=""
            :class="[item.checked ? 'active_img' : '']"
          />
          <p :class="[item.checked ? 'active_p' : '']">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey: 0,
      modelListData: [
        {
          name: "监测预警",
          icon: require("../../../assets/images/dragonBoat/fixed/icon_wraning.png"),
          listData: [
            {
              name: "强降水",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_1.png"),
              checked: false,
            },
            {
              name: "水库",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_2.png"),
              checked: false,
            },
            {
              name: "河流",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_3.png"),
              checked: false,
            },
            {
              name: "台风",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_4.png"),
              checked: false,
            },
            {
              name: "传播",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_5.png"),
              checked: false,
            },
            {
              name: "大风",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_6.png"),
              checked: false,
            },
            {
              name: "交通网路",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_7.png"),
              checked: false,
            },
            {
              name: "视频监控",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_8.png"),
              checked: false,
            },
            {
              name: "应急响应",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_9.png"),
              checked: false,
            },
            {
              name: "卫星云图",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_10.png"),
              checked: false,
            },
            {
              name: "雷达图",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_11.png"),
              checked: false,
            },
            {
              name: "预警信息",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_12.png"),
              checked: false,
            },
            {
              name: "风暴湖",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_13.png"),
              checked: false,
            },
            {
              name: "地震速报",
              icon: require("../../../assets/images/dragonBoat/fixed/warning/icon_14.png"),
              checked: false,
            },
          ],
        },
        {
          name: "决策辅助",
          icon: require("../../../assets/images/dragonBoat/fixed/icon_help.png"),
          listData: [
            {
              name: "格点雨量",
              icon: require("../../../assets/images/dragonBoat/fixed/help/icon_1.png"),
              checked: false,
            },
            {
              name: "模板靶向",
              icon: require("../../../assets/images/dragonBoat/fixed/help/icon_2.png"),
              checked: false,
            },
            {
              name: "水系",
              icon: require("../../../assets/images/dragonBoat/fixed/help/icon_3.png"),
              checked: false,
            },
            {
              name: "应急四库",
              icon: require("../../../assets/images/dragonBoat/fixed/help/icon_4.png"),
              checked: false,
            },
            {
              name: "在线标绘",
              icon: require("../../../assets/images/dragonBoat/fixed/help/icon_5.png"),
              checked: false,
            },
          ],
        },
        {
          name: "基础数据",
          icon: require("../../../assets/images/dragonBoat/fixed/icon_basedata.png"),
          listData: [
            {
              name: "航空护林",
              icon: require("../../../assets/images/dragonBoat/fixed/baseData/icon_1.png"),
              checked: false,
            },
            {
              name: "人员密集",
              icon: require("../../../assets/images/dragonBoat/fixed/baseData/icon_2.png"),
              checked: false,
            },
            {
              name: "应急救援",
              icon: require("../../../assets/images/dragonBoat/fixed/baseData/icon_3.png"),
              checked: false,
            },
            {
              name: "灾害隐患",
              icon: require("../../../assets/images/dragonBoat/fixed/baseData/icon_4.png"),
              checked: false,
            },
          ],
        },
        {
          name: "部门信息",
          icon: require("../../../assets/images/dragonBoat/fixed/icon_part.png"),
          listData: [
            {
              name: "公安",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_1.png"),
              checked: false,
            },
            {
              name: "供电",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_2.png"),
              checked: false,
            },
            {
              name: "海事",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_3.png"),
              checked: false,
            },
            {
              name: "教育",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_4.png"),
              checked: false,
            },
            {
              name: "民政",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_5.png"),
              checked: false,
            },
            {
              name: "气象",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_6.png"),
              checked: false,
            },
            {
              name: "生态环境",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_7.png"),
              checked: false,
            },
            {
              name: "水利",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_8.png"),
              checked: false,
            },
            {
              name: "通信管理",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_9.png"),
              checked: false,
            },
            {
              name: "卫生健康",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_10.png"),
              checked: false,
            },
            {
              name: "文化旅游",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_11.png"),
              checked: false,
            },
            {
              name: "住建",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_12.png"),
              checked: false,
            },
            {
              name: "自然资源",
              icon: require("../../../assets/images/dragonBoat/fixed/part/icon_13.png"),
              checked: false,
            },
          ],
        },
      ],
      iconSelectObj: [],
    };
  },
  methods: {
    clickActive(i, k) {
      if (k === this.activeKey) {
        this.activeKey = null;
        return false;
      }
      this.activeKey = k;
    },
    doListActive(i, k, item, key) {
      let type = this.modelListData[k]["listData"][key]["checked"];
      this.modelListData[k]["listData"][key]["checked"] = !type;
    },
  },
};
</script>

<style lang="less" scoped>
.c-fiexd-model {
  height: auto;
  width: 101px;
  background: rgba(15, 48, 84, 0.6);
  border-radius: 4px 4px;
  -o-border-radius: 4px 4px;
  -ms-border-radius: 4px 4px;
  -moz-border-radius: 4px 4px;
  -webkit-border-radius: 4px 4px;
  .fixed-model-list {
    width: auto;
    height: 100%;
    li {
      width: 100%;
      height: auto;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 13px 0 9px 0;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      img {
        display: block;
        height: 42px;
        width: auto;
      }

      p {
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        color: white;
        text-align: center;
      }
    }
    li:hover {
      background: #34eeff;
      color: black;
    }
    .activeli {
      background: linear-gradient(to bottom, #77f3ff 0%, #04eaff 100%);
      color: black;
    }
  }
  .fixed-select-list {
    width: 324px;
    min-height: 918px;
    overflow: auto;
    background: rgba(15, 48, 84, 0.6);
    position: absolute;
    right: -324px;
    top: 0;
    z-index: 9888;
    border-left: 2px solid black;
    .select-list-title {
      width: calc(100% - 0px);
      height: 58px;
      font-size: 26px;
      line-height: 58px;
      border-left: 4px #2a92f1 solid;
      border-bottom: 1px #2a92f1 solid;
      color: #2a92f1;
      padding-left: 14px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .select-list-ul {
      width: 100%;
      height: auto;
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        flex-shrink: 0;
        width: 33%;
        height: 70px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
        cursor: pointer;
        img {
          display: block;
          width: 33px;
          height: 33px;
          border-radius: 50% 50%;
          -o-border-radius: 50% 50%;
          -ms-border-radius: 50% 50%;
          -moz-border-radius: 50% 50%;
          -webkit-border-radius: 50% 50%;
        }
        p {
          width: 100%;
          height: 18px;
          font-size: 18px;
          text-align: center;
          color: white;
        }
        .active_img {
          border: 2px solid #34eeff;
        }
        .active_p {
          color: #34eeff;
        }
      }
      li:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
