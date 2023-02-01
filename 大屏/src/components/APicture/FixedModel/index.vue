<!--
 * @Description: 龙舟水-预警监测、决策辅助、基础数据、部门信息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-29 11:34:55
 * @LastEditTime: 2021-10-22 17:53:17
-->
<template>
  <div class="c-fiexd-model is-scrace-tree">
    <ul class="fixed-model-list">
      <li
        v-for="(i, k) in newModelListData"
        :key="k"
        @click="clickActive(i, k)"
        :class="[activeKey === k ? 'activeli' : '']"
      >
        <img :src="getimg(i.name)" alt="" />
        <p>{{ i.name }}</p>
      </li>
    </ul>
    <div class="select-list-title-box">
      <div class="fixed-select-list" v-if="activeKey || activeKey === 0">
        <div class="select-list-title">{{ title }}</div>
        <ul class="select-list-ul">
          <li
            v-for="(item, key) in treeDataChildren"
            :key="key"
            @click="doListActive(item, key, getTitleShow(item))"
          >
            <img
              :src="getimg(item.name)"
              alt=""
              :class="[item.checked ? 'active_img' : '']"
            />
            <p :class="[item.checked ? 'active_p' : '']">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div
        class="indetail"
        v-if="indetailTitle.length != 0"
        v-show="activeKey || activeKey === 0"
      >
        <div class="indetail_content">
          <div class="water_search">
            <a-input-search
              placeholder="请输入名称"
              @search="doSearch"
              v-model="keywords"
            />
          </div>
          <div class="table">
            <Table :columns="columns" :listData="listData">
              <template slot="position" slot-scope="{ record }">
                <span class="location" @click="position(record)">定位</span>
              </template>
              <!-- <template slot="name"  slot-scope="{ record }">
                <span >{{ `${record.parentName}${record.name} `}}</span>
              </template> -->
            </Table>
          </div>
          <div class="page">
            <getPage
              :total="total"
              :currentPage="currentPage"
              @changePages="changePages"
            />
          </div>
        </div>
         <div class="indetail_title">
          <ul>
            <li
              v-for="(e, i) in indetailTitle"
              :key="i"
              @click="clickLi(e, i)"
              :class="{ activeli: activeliKey == i }"
            >
              {{ e.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/APicture/c-table.vue";
import getPage from "@/components/APicture/changePage/index.vue";
import { getDatainfo } from "@/api/forestFire";
export default {
  data() {
    return {
      activeKey: 0,
      keywords: "",
      modelListData: [
        {
          name: "监测预警",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics1.png"),
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
              name: "水利/三防",
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

      fixedListIcon: [
        {
          name: "基础图层",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics.png"),
        },
        {
          name: "道路",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics1.png"),
        },
        {
          name: "地铁出入口",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics2.png"),
        },
        {
          name: "地铁站点",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics3.png"),
        },
        {
          name: "地质风险点位",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics4.png"),
        },
        {
          name: "公交线路",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics5.png"),
        },
        {
          name: "公交站点",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics6.png"),
        },
        {
          name: "化工园区",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics7.png"),
        },
        {
          name: "机场",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics8.png"),
        },
        {
          name: "机场边界",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics9.png"),
        },
        {
          name: "科技园",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics10.png"),
        },
        {
          name: "企业",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics11.png"),
        },
        {
          name: "桥梁",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics12.png"),
        },
        {
          name: "疏散场所",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics13.png"),
        },
        {
          name: "水系",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics14.png"),
        },
        {
          name: "铁路线路及边界",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics15.png"),
        },
        {
          name: "铁路站点",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics16.png"),
        },
        {
          name: "小区",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics17.png"),
        },
        {
          name: "学校",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics18.png"),
        },
        {
          name: "医院",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics19.png"),
        },
        {
          name: "园区",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics20.png"),
        },
        {
          name: "政府机关",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics21.png"),
        },
        {
          name: "植被",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics22.png"),
        },
        {
          name: "重点危险源",
          icon: require("../../../assets/images/dragonBoat/newfixed/basics/basics23.png"),
        },
        {
          name: "救援保障类",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard.png"),
        },

        {
          name: "避难场所",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard1.png"),
        },
        {
          name: "仓库",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard2.png"),
        },

        {
          name: "大型装备",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard3.png"),
        },

        {
          name: "公共广播点告警点",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard4.png"),
        },
        {
          name: "固定定位图像接入",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard5.png"),
        },
        {
          name: "交通",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard6.png"),
        },
        {
          name: "联勤保障单",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard7.png"),
        },
        {
          name: "人员",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard8.png"),
        },
        {
          name: "水上搜救基地",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard9.png"),
        },
        {
          name: "无人机起降点",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard10.png"),
        },
        {
          name: "消防",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard11.png"),
        },
        {
          name: "医疗保障",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard12.png"),
        },
        {
          name: "应急救援测绘保障基地",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard13.png"),
        },
        {
          name: "应急训练演练场所",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard14.png"),
        },
        {
          name: "应急指挥及应急保障机构",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard15.png"),
        },

        {
          name: "责任网格",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard16.png"),
        },
        {
          name: "直升机备用起降点",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard17.png"),
        },
        {
          name: "重点防护目标",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard18.png"),
        },
        {
          name: "专家",
          icon: require("../../../assets/images/dragonBoat/newfixed/safeguard/safeguard19.png"),
        },
        {
          name: "风险监测接入类",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk.png"),
        },
        {
          name: "常见风险源",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk1.png"),
        },
        {
          name: "地质",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk2.png"),
        },
        {
          name: "非煤矿山",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk3.png"),
        },

        {
          name: "工业生产企业",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk4.png"),
        },
        {
          name: "环境",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk5.png"),
        },
        {
          name: "林业",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk6.png"),
        },
        {
          name: "煤矿",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk7.png"),
        },
        {
          name: "气象",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk8.png"),
        },
        {
          name: "水利三防",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk9.png"),
        },
        {
          name: "特种设备",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk10.png"),
        },
        {
          name: "危化品",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk11.png"),
        },
        {
          name: "烟花爆竹",
          icon: require("../../../assets/images/dragonBoat/newfixed/risk/risk12.png"),
        },

        //城市生命线类
        {
          name: "城市生命线类",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife.png"),
        },
        {
          name: "电",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife/citylife1.png"),
        },
        {
          name: "气",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife/citylife1.png"),
        },
        {
          name: "桥梁",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife/citylife1.png"),
        },
        {
          name: "热",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife/citylife1.png"),
        },
        {
          name: "自来水",
          icon: require("../../../assets/images/dragonBoat/newfixed/citylife/citylife1.png"),
        },

        //消防一张图数据内容
        {
          name: "消防一张图数据内容",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire.png"),
        },
        {
          name: "地震带信息",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire1.png"),
        },
        {
          name: "防火单位",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire2.png"),
        },
        {
          name: "核电站信息",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire3.png"),
        },
        {
          name: "建筑信息",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire4.png"),
        },
        {
          name: "救援力量",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire5.png"),
        },
        {
          name: "救灾储备物资",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire6.png"),
        },
        {
          name: "联勤保障单位",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire7.png"),
        },
        {
          name: "灭火单位",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire8.png"),
        },
        {
          name: "取水码头",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire9.png"),
        },
        {
          name: "石化类信息",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire10.png"),
        },
        {
          name: "水电站、水库",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire11.png"),
        },
        {
          name: "特种装备",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire12.png"),
        },
        {
          name: "天然水源",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire13.png"),
        },
        {
          name: "消防单位",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire14.png"),
        },
        {
          name: "消防队站",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire15.png"),
        },
        {
          name: "消防设备",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire16.png"),
        },
        {
          name: "消防水池",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire17.png"),
        },
        {
          name: "消防水鹤",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire18.png"),
        },
        {
          name: "消防水源",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire19.png"),
        },
        {
          name: "消火栓",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire20.png"),
        },
        {
          name: "应急保障",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire21.png"),
        },
        {
          name: "油气管线",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire22.png"),
        },
        {
          name: "灾情信息",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire23.png"),
        },
        {
          name: "增援编队",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire24.png"),
        },
        {
          name: "重大安保涉会场所",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire25.png"),
        },
        {
          name: "重大安保驻地",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire26.png"),
        },
        {
          name: "专业队伍",
          icon: require("../../../assets/images/dragonBoat/newfixed/fire/fire27.png"),
        },
        {
          name: "三维模型数据",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata.png"),
        },
        {
          name: "城市重点区域",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata1.png"),
        },
        {
          name: "大型体育场馆",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata2.png"),
        },
        {
          name: "地铁",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata3.png"),
        },
        {
          name: "地铁站",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata4.png"),
        },
        {
          name: "地下管网",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata5.png"),
        },
        {
          name: "飞机场",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata6.png"),
        },
        {
          name: "高架",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata7.png"),
        },
        {
          name: "航空影像",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata8.png"),
        },
        {
          name: "化工园区",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata9.png"),
        },
        {
          name: "火车站",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata10.png"),
        },
        {
          name: "历史灾害模型数据库",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata11.png"),
        },
        {
          name: "林区",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata12.png"),
        },
        {
          name: "汽车站",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata13.png"),
        },
        {
          name: "桥",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata14.png"),
        },
        {
          name: "隧道",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata15.png"),
        },
        {
          name: "重点岛",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata16.png"),
        },
        {
          name: "重要场馆",
          icon: require("../../../assets/images/dragonBoat/newfixed/threedata/threedata17.png"),
        },
        //移动数据接入
        {
          name: "移动数据接入",
          icon: require("../../../assets/images/dragonBoat/newfixed/location.png"),
        },
        {
          name: "110 GPS",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location1.png"),
        },
        {
          name: "119 GPS",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location2.png"),
        },
        {
          name: "120 GPS",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location3.png"),
        },
        {
          name: "北斗手环",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location4.png"),
        },
        {
          name: "冲锋舟",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location5.png"),
        },
        {
          name: "船舶",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location6.png"),
        },
        {
          name: "对讲机",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location7.png"),
        },
        {
          name: "社会单位大巴",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location8.png"),
        },
        {
          name: "通航飞机",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location9.png"),
        },
        {
          name: "危化品运输车辆",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location10.png"),
        },
        {
          name: "无人机",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location11.png"),
        },
        {
          name: "移动单兵",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location12.png"),
        },
        {
          name: "应急人员手机APP",
          icon: require("../../../assets/images/dragonBoat/newfixed/location/location13.png"),
        },
      ],
      notFind: require("../../../assets/images/dragonBoat/newfixed/notFind.png"),
      newModelListData: [],
      iconSelectObj: [],
      indetailTitle: [],
      activeliKey: "",
      columns: [
        {
          title: "名称",
          textIndex: "name",
          width: "40%",
        },
        {
          title: "类型",
          textIndex: "parentName",
          width: "40%",
        },
        {
          title: "操作",
          textIndex: "position",
        },
      ],
      listData: [],
      total: 1,
      currentPage: 1,
      treeDataChildren: [],
      title: "",
      interfaceCode: "",
      parentName: "",
      attribution: "",
    };
  },
 
  methods: {
    position(node) {
      if (this.parentName == "避难场所" || this.parentName == "应急场所") {
        pGzznCore.teamPowerLocation(node, 11);
      } else if (this.parentName == "应急队伍") {
        pGzznCore.teamPowerLocation(node, 0);
      } else if (this.parentName == "提防" || this.parentName == "堤防") {
        pGzznCore.teamPowerLocation(node, 12);
      } else if (this.parentName == "雨量站") {
        pGzznCore.teamPowerLocation(node, 13);
      } else if (this.parentName == "水位监测") {
        pGzznCore.teamPowerLocation(node, 14);
      } else if (this.parentName == "内涝点") {
        pGzznCore.teamPowerLocation(node, 15);
      } else if (this.parentName == "重点监控区域(视频)") {
        pGzznCore.teamPowerLocation(node, 16);
      } else if (this.parentName == "涉危企业") {
        pGzznCore.teamPowerLocation(node, 17);
      } else if (this.parentName == "地铁站") {
        pGzznCore.teamPowerLocation(node, 18);
      }
    },
    isScrace() {
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      console.log(heightClint,widthClint)
      const columnNum = heightClint / 1889;
      const widthScrac = parseFloat((widthClint / 9120).toFixed(2)); // 宽度
      const divs = document.querySelector(".is-scrace-tree");
      console.log("transform", divs);
      divs.style.transform = `scale(${widthScrac},${columnNum})`;
      divs.style.transformOrigin = "0 0";
    },
    getimg(name) {
      return (
        this.fixedListIcon.find((e) => e.name == name)?.icon ?? this.notFind
      );
    },
    // 图层规划数据结构
    getData() {
      getDatainfo("bGUr1G9u", { body: { parentId: 0 } }).then((res) => {
        if (res.success) {
          this.newModelListData = res.body.data;
          this.title = this.newModelListData[0].name;
          this.getChildrenTree(this.newModelListData[0].sid);
        }
      });
    },

    //获取子节点
    getChildrenTree(node) {
      getDatainfo("bGUr1G9u", { body: { parentId: node } }).then((res) => {
        if (res.success) {
          res.body.data.map((e, i) => {
            e.checked = false;
            console.log(e.interfaceCode);
            this.indetailTitle.map((item) => {
              if (e.sid == item.sid) {
                res.body.data[i].checked = true;
              }
            });
          });
          this.treeDataChildren = res.body.data;
        }
      });
    },

    //左侧标题点击
    clickActive(i, k) {
      if (k === this.activeKey) {
        this.activeKey = null;
        return false;
      }
      this.activeKey = k;
      this.title = i.name;
      this.getChildrenTree(i.sid);
    },

    getTitleShow(item) {
      const flag = this.indetailTitle.find((e) => e.sid == item.sid);
      if (flag != undefined) return true;
    },
    doSearch() {
      this.currentPage = 1;
      if (this.interfaceCode == null) {
        this.getChildrenTable();
      } else {
        this.getChildrenTable2(this.interfaceCode);
      }
    },
    //获取三级数据
    getChildrenTable() {
      let data = {
        body: { attribution: this.attribution, name: this.keywords },
        page: this.currentPage,
        size: 10,
      };
      getDatainfo("bGUr1G9u", data).then((res) => {
        if (res.success) {
          res.body.data.map((e) => {
            e.parentName = this.parentName;
          });
          this.listData = res.body.data;
          this.total = Number(res.total);
        }
      });
    },
    // 点击 图标
    doListActive(item, key, flag) {
      item.checked = !item.checked;
      this.parentName = item.name;
      this.interfaceCode = item.interfaceCode;
      this.attribution = item.sid;
      if (flag) {
        this.indetailTitle.map((e, i) => {
          if (item.name == e.name) {
            this.indetailTitle.splice(i, 1);
          }
        });
        this.listData = [];
        if(this.indetailTitle.length) {
          let saveItem = this.indetailTitle[this.indetailTitle.length-1]
          this.activeliKey = this.indetailTitle.length-1
          this.clickLi(saveItem,this.activeliKey)
        }
      } else {
        this.activeliKey = this.indetailTitle.length;
        this.indetailTitle.push(item);
        if (item.interfaceCode != null) {
          this.getChildrenTable2(item.interfaceCode);
        } else {
          this.getChildrenTable();
        }
      }
    },

    //另外类型接口
    getChildrenTable2(node) {
      let data = {
        body: { name: this.keywords },
        page: this.currentPage,
        size: 10,
      };
      getDatainfo(node, data).then((res) => {
        if (res.success) {
          res.body.data.map((e) => {
            e.parentName = this.parentName;
            if (!e.name) {
              for (let q in e) {
                if (q.includes("Name")) {
                  const name = e[Object.keys(e)[0]];
                  e.name = name;
                }
              }
            }
          });
          this.listData = res.body.data;
          this.total = Number(res.total);
        }
      });
    },

    //表格标题  点击
    clickLi(e, i) {
      this.parentName = e.name;
      this.attribution = e.sid;
      this.activeliKey = i;
      this.keywords = "";
      if (this.interfaceCode == null) {
        this.getChildrenTable();
      } else {
        this.getChildrenTable2(this.interfaceCode);
      }
    },
    // 按钮
    changePages(val) {
      this.currentPage = val.pages;
      if (this.interfaceCode == null) {
        this.getChildrenTable();
      } else {
        this.getChildrenTable2(this.interfaceCode);
      }
    },
  },
  components: {
    Table,
    getPage,
  },
  computed: {},
  mounted() {
    this.getData();
    this.$nextTick(()=>{
      this.isScrace()
    })
  },
};
</script>

<style lang="less" scoped>
.c-fiexd-model {
  height: auto;
  max-height:100%;
  width: 151px;
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
        font-size: 22px;
        color: white;
        text-align: center;
        margin-top: 2px;
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
    width: 374px;
    min-height: 918px;
    overflow: auto;
    background: rgba(15, 48, 84, 0.6);
    position: absolute;
    right: -374px;
    top: 0;
    z-index: 9888;
    border-left: 2px solid black;
    border-right:1px solid black;
    .select-list-title {
      width: calc(100% - 0px);
      height: 58px;
      font-size: 30px;
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
        margin-bottom: 25px;
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
          font-size: 22px;
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
  .select-list-title-box {
    width:600px;
    min-height:918px;
    height:auto;
    overflow: auto;
   
    .indetail {
      width: 500px;
      height: 918px;
      position: absolute;
      right: -880px;
      top: 0;
      z-index: 9888;
      display: flex;
       
      .indetail_title {
        width: 30px;
        height: auto;
       
        ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-align: center;
          color: #fff;
          width: 30px;
          background:rgba(15, 48, 84, 0.5);
          li {
            width: 100%;
            height: auto;
            border: 1px solid rgba(15, 48, 84, 0.7);
            cursor: pointer;
            padding: 5px;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
             
            &:hover {
              background: linear-gradient(to bottom, #77f3ff 0%, #04eaff 100%);
              opacity: 0.8;
            }
          }
        }
      }
      .indetail_content {
        flex: 1;
        background: rgba(15, 48, 84, 0.6);
        padding: 20px;
        width: 100%;
        height: 100%;
        .table {
          width: 100%;
          margin-bottom: 10px;
          font-size: 16px;
          height: calc(100% - 120px);
          .location {
            display: block;
            height: auto;
            width: 80%;
            text-align: center;
            padding: 4px;
            line-height: 30px;
            border: 1px solid rgb(1, 255, 255);
            cursor: pointer;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
          }
        }
      }
    }
  }
  .activeli {
    background: linear-gradient(to bottom, #77f3ff 0%, #04eaff 100%);
    color: black;
  }
}
.water_search {
  width: 70%;
  height: 36px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /deep/.ant-input {
    width: 100%;
    height: 100%;
    border: 1px solid #01ffff;
    background-color: transparent;
    color: #fff;
    font-size: 26px;
  }

  /deep/.ant-input-suffix {
    height: 100%;
    font-size: 25px;
    i {
      color: #01ffff;
    }
    /deep/.ant-input-affix-wrapper {
      height: 100%;
    }
  }
}
.page {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 100%;
  .c-page-all {
    display: flex;
    flex-wrap: wrap;
    li{
      margin-top:8px;
    }
    
  }

}

/deep/ .ant-pagination-item-ellipsis{
}
</style>
