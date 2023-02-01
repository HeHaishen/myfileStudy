<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-10-09 13:45:33
-->
<template>
  <div class="dust-explosion-left">
    <div class="left-left">
      <div class="model-title">粉尘涉爆企业信息</div>
      <div class="update-time position-update-time">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="information-list">
        <div
          v-for="(item, index) in dustExplosionInformationList"
          :class="{ 'active-click': index === 0, 'information-child': true }"
          :key="index"
        >
          <div class="information-title">{{ item.name }}</div>
          <div class="information-number">
            {{ item.num }}
          </div>
        </div>
      </div>
      <div class="industries">
        <div class="eight-industry">
          <div class="industry-title">八大行业粉尘涉爆企业</div>
          <ul class="industry-list">
            <li
              v-for="(item, index) in industryList"
              class="active-click industry-child"
              :key="index"
              @click="open($event, item.name, index)"
            >
              <div class="industry-number">
                <div class="number-bg" :class="[`number-bg-img${index}`]"></div>
                <div class="number">
                  {{ item.num }}
                </div>
              </div>
              <div class="title">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <div class="dust-industry">
          <div class="dust-title">粉尘专项企业</div>
          <div class="dust-chart"></div>
        </div>
      </div>
      <div class="region-situation">
        <div class="model-little-title">区域企业情况</div>
        <div class="situation-chart"></div>
      </div>
      <pop-up-layer
        class="my-popup"
        :show="show"
        v-if="show"
        :setStyles="{}"
        title="粉尘涉爆企业"
        @doClose="close"
        ref="myPopUpLayer"
      >
        <template slot="content">
          <div class="sub"></div>
          <div class="search" v-show="industryListData.length !== 0">
            <div></div>
            <div class="water_search">
              <a-input-search
                placeholder="输入关键字"
                v-model="dustInput"
                @search="industryClick"
              />
            </div>
          </div>

          <div class="empty" v-show="industryListData.length == 0">
            暂无相关信息
          </div>
          <div class="table-list" v-show="industryListData.length !== 0">
            <Table :columns="industryColumns" :listData="industryListData">
              <!-- <template slot="state" slot-scope="{ record, text }">
                <span :style="{ color: text == '在线' ? 'red' : 'green' }">{{
                  text
                }}</span>
              </template> -->
            </Table>
          </div>
          <div class="list-change-page" v-show="industryListData.length !== 0">
            <ChangePage
              :total="total"
              :currentPage="currentPage"
              @changePages="clickChangePages"
            />
          </div>
        </template>
      </pop-up-layer>
    </div>
    <div class="left-right">
      <div class="model-title">设备信息</div>
      <div class="update-time position-update-time">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <ul class="device-information">
        <li
          v-for="(item, index) in deviceList"
          :key="index"
          :class="[index == 0 ? 'click-and-point' : '']"
          @click="openDevice($event, index)"
        >
          <div class="li-left">
            <div class="total-number">{{ item.totalNumber }}</div>
            <div class="total-desc">{{ item.totalName }}</div>
          </div>
          <div class="li-right">
            <div class="online">
              <div class="desc">{{ item.onlineName }}</div>
              <div class="number">{{ item.onlineNumber }}</div>
            </div>
            <div class="warning">
              <div class="desc">{{ item.warningName }}</div>
              <div class="number">{{ item.warningNumber }}</div>
            </div>
          </div>
        </li>
        <!-- <li>
          <div class="li-left">
            <div class="total-number">226</div>
            <div class="total-desc">物联网设备</div>
          </div>
          <div class="li-right">
            <div class="online">
              <div class="desc">在线传感器</div>
              <div class="number">220</div>
            </div>
            <div class="warning">
              <div class="desc">预警传感器</div>
              <div class="number">6</div>
            </div>
          </div>
        </li> -->
      </ul>

      <div class="device-list">
        <div class="model-little-title">重点监控企业区域设备列表</div>
        <div class="table-list">
          <Table :columns="columns" :listData="listData">
            <template slot="key" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="position" slot-scope="{ record, text }">
              <span @click="videoLocationPointer(record, text)" class="border">
                定位
              </span>
            </template>
          </Table>
        </div>

        <!-- <div class="table-list">
          <div class="table-top">
            <div>序号</div>
            <div>设备类型</div>
            <div>设备名称</div>
            <div>设备地址</div>
            <div>状态</div>
          </div>
          <ul class="table-bottom">
            <li
              class="table-child"
              v-for="(item, index) in deviceData"
              :key="index"
            >
              <div>{{ item.key }}</div>
              <div>{{ item.name }}</div>
              <div>{{ item.age }}</div>
              <div>{{ item.address }}</div>
              <div>{{ item.tags }}</div>
            </li>
          </ul>
        </div> -->
      </div>
      <pop-up-layer
        class="my-popup"
        :show="rightShow"
        v-if="rightShow"
        :setStyles="{}"
        title="设备列表"
        @doClose="rightClose"
        ref="myPopUpLayer"
      >
        <template slot="content">
          <div class="sub">
            <!-- <div class="sub-title">范围：</div> -->
          </div>
          <div class="search-icon">
            <input type="text" v-model="deviceInput" />
            <div class="icon-container" @click="deviceSearchClick">
              <img :src="iconSearch" alt="" class="img" />
            </div>
            <!-- <div class="my-select">
              <a-select placeholder="辖区" v-model="regionOption">
                <a-select-option
                  :value="item.number"
                  v-for="(item, index) in regionList"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </div>
            <div class="my-select">
              <a-select v-model="nameOption" placeholder="企业名称">
                <a-select-option
                  :value="item.number"
                  v-for="(item, index) in nameList"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </div> -->
          </div>
          <div class="table-list">
            <Table :columns="deviceColumns" :listData="deviceListData">
              <template slot="position" slot-scope="{ record, text }">
                <div class="border" @click="clickVideo(record)">定位</div>
              </template>
              <template slot="type" slot-scope="{ record, text }">
                <div>摄像头</div>
              </template>
            </Table>
          </div>
          <div class="list-change-page">
            <ChangePage
              :total="deviceTotal"
              :currentPage="deviceCurrentPage"
              @changePages="clickDeviceChangePages"
            />
          </div>
        </template>
      </pop-up-layer>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Table from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage";
import {
  getEquipmentListApi,
  getEnterpriseInfor,
  getEightInfor,
  getDustIndustry,
  getEquipmentCamera,
  getEquipmentSensor,
  getEquipmentListInfor,
  getRegionalEnterprises,
  getEnterpriseTypeStatistics,
  getEightIndustries,
  getDeviceListApi,
} from "@/api/dustAndExplosionNew";
import listData from "../index.js";

export default {
  data() {
    return {
      dustInput: "",
      deviceInput: "",
      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),
      total: 0,
      currentPage: 1,
      deviceTotal: 0,
      deviceCurrentPage: 1,
      show: false,
      rightShow: false,
      // 行业筛选
      industriesOption: undefined,
      // 辖区
      regionOption: undefined,
      // 企业名称
      nameOption: undefined,
      // opsition: "pagetLeft",
      dustExplosionInformationList: [
        { name: "企业总数", num: 201 },
        { name: "重点企业总数", num: 286 },
        { name: "新增企业总数", num: 25 },
        { name: "关停企业总数", num: 14 },
      ],

      // 八大行业粉尘涉爆企业
      industryList: [
        { num: 24, name: "冶金" },
        { num: 18, name: "有色" },
        { num: 12, name: "建材" },
        { num: 36, name: "机械" },
        { num: 48, name: "轻工" },
        { num: 62, name: "纺织" },
        { num: 16, name: "烟草" },
        { num: 12, name: "商贸" },
      ],
      industryList2: [],

      // 粉尘专项企业
      dustList: [],
      // 粉尘专项图
      dustChart: null,

      situationChart: null,
      // 表头 设备列表
      columns: [
        { textIndex: "key", title: "序号", width: "10%" },
        { textIndex: "typeName", title: "设备类型", width: "15%" },
        { textIndex: "name", title: "设备名称", width: "30%" },
        { textIndex: "address", title: "设备地址", width: "30%" },
        { textIndex: "position", title: "定位", width: "15%" },
      ],

      // 设备列表数据
      listData: [
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx",
        //   address: "广州市天河区白",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
      ],

      industryColumns: [
        { textIndex: "rownum", title: "序号", width: "10%" },
        { textIndex: "name", title: "企业名称", width: "25%" },
        { textIndex: "areaName", title: "所属辖区", width: "20%" },
        { textIndex: "address", title: "地址", width: "25%" },
        { textIndex: "industryTypeName", title: "行业类别", width: "20%" },
        { textIndex: "tagName", title: "八大行业", width: "15%" },
      ],
      industryListData: [
        {
          rownum: "1",
          name: "广州市增城环升竹制品加工部",
          jurisdiction: "大田村委会",
          address: "广州市增城区中新镇大田村茶园南街三巷26号",
          industryType: "竹制品制造",
          eightIndustry: "轻工",
        },
        {
          rownum: "2",
          name: "特百惠（中国）有限公司",
          jurisdiction: "乌洲村村委会",
          address: "广州市南沙区黄阁镇鸡谷山路84号",
          industryType: "橡胶和塑料制品业",
          eightIndustry: "轻工",
        },
        {
          rownum: "3",
          name: "广州市长峰建筑材料有限公司",
          jurisdiction: "乌洲村村委会",
          address: "广州市南沙区黄阁镇乌洲村乌洲大道6号",
          industryType: "非金属矿物制品业",
          eightIndustry: "建材",
        },
      ],

      deviceColumns: [
        { textIndex: "rownum", title: "序号", width: "25%" },
        { textIndex: "type", title: "设备类型", width: "25%" },
        { textIndex: "name", title: "设备名称", width: "25%" },
        // { textIndex: "address", title: "所属公司", width: "25%" },
        // { textIndex: "industryType", title: "设备地址", width: "20%" },
        { textIndex: "position", title: "定位", width: "25%" },
      ],
      deviceListData: [],

      // 获取区域企业情况
      regionSituationList: {
        nameArr: [],
        dataArr: {
          regionArr: [],
          valueArr: {
            seventeenArr: [],
            eighteenArr: [],
            nintheenArr: [],
          },
        },
      },

      // 设备列表
      deviceList: [
        {
          totalNumber: "128",
          totalName: "摄像头总数",
          onlineNumber: "126",
          onlineName: "在线摄像头",
          warningNumber: "2",
          warningName: "预警摄像头",
        },
        {
          totalNumber: "226",
          totalName: "物联网设备",
          onlineNumber: "220",
          onlineName: "在线传感器",
          warningNumber: "6",
          warningName: "预警传感器",
        },
      ],

      // 区域列表(下拉框)
      regionList: [],

      // 企业名称列表(下拉框)
      nameList: [],

      rangeColumn: [
        { textIndex: "key", title: "序号" },
        { textIndex: "type", title: "设备类型" },
        { textIndex: "name", title: "设备名称" },
        { textIndex: "company", title: "所属公司" },
        { textIndex: "address", title: "设备地址" },
        { textIndex: "state", title: "状态" },
      ],

      rangeListData: [
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx",
        //   address: "广州市天河区白",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
        // {
        //   key: "1",
        //   name: "摄像头",
        //   age: "xxxxx摄像头",
        //   address: "广州市天河区白庙南东兴街102号",
        //   tags: "在线",
        // },
      ],
      data: {
        body: {
          name: "",
          tagCode: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },

      // 指标管理
      tagCodes: [
        "FZSB_YJHY",
        "FZSB_YSHY",
        "FZSB_JCHY",
        "FZSB_JXHY",
        "FZSB_QGHY",
        "FZSB_FZHY",
        "FZSB_YCHY",
        "FZSB_SMHY",
      ],
    };
  },
  created() {
    this.init();
    console.log("设计师", listData);
  },
  components: {
    Table,
    ChangePage,
  },
  mounted() {},
  computed: {},
  methods: {
    industryClick() {
      this.data.body.name = this.dustInput;
      this.eightIndustries();
    },
    clickVideo(record) {
      pGzznCore.videoSearchLocation(record); //地图定位
    },
    deviceSearchClick() {
      this.data.body.name = this.deviceInput;
      this.getDeviceListPopData();
    },
    // 切换分页
    clickChangePages(pages, pageSize) {
      this.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.eightIndustries();
    },

    clickDeviceChangePages(pages, pageSize) {
      this.deviceCurrentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getDeviceListPopData();
    },
    moment,
    init() {
      this.getDustList();
      // this.getRegionSituationList();
      this.getEquipmentList();

      // 获取企业信息
      this.EnterpriseInfor();
      // 获取八大行业粉尘涉爆
      this.eightIndustry();
      // 获取设备信息-摄像头
      this.getCameraInfor();
      // 获取设备信息-传感器
      this.getSensorInfor();
      // 获取区域企业情况
      this.regionalEnterprises();
      // 获取企业类型统计
      this.enterpriseTypeStatistics();
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      // 粉尘专项企业
      this.dustChart = this.$echarts.init(
        document.getElementsByClassName("dust-chart")[0]
      );
      //获取粉尘专项企业数据
      this.dustIndustry();

      this.situationChart = this.$echarts.init(
        document.getElementsByClassName("situation-chart")[0]
      );
      this.situationChart.setOption(this.situationChartBar());

      let that = this;
      window.onresize = function () {
        that.dustChart.resize();
        that.situationChart.resize();
      };
    },

    videoLocationPointer(record, text) {
      pGzznCore.dustExplosionLocation(record);
    },

    //获取企业信息
    EnterpriseInfor() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEnterpriseInfor(data).then((res) => {
        if (res.success) {
          console.log("获取企业信息", res);
          this.dustExplosionInformationList = JSON.parse(
            JSON.stringify(res.body.data)
          );
        }
      });
    },

    // 获取设备列表的弹窗
    getDeviceListPopData() {
      getDeviceListApi(this.data).then((res) => {
        if (res.success) {
          console.log("获取设备列表的弹窗", res);
          this.deviceListData = res.body.data;
          this.deviceTotal = parseInt(res.body.total);
        }
      });
      // commonApi("LQcgZPIU", this.data).then((res) => {
      //   if (res.success) {
      //     console.log("获取设备列表的弹窗", res);
      //   }
      // });
    },

    //八大行业粉尘涉爆企业
    eightIndustry() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEightInfor(data).then((res) => {
        if (res.success) {
          console.log("八大行业粉尘涉爆企业", res);
          this.industryList = JSON.parse(JSON.stringify(res.body.data));
          this.industryList2 = [{ num: 0, name: "全部" }, ...this.industryList];
        }
      });
    },

    //获取粉尘专项
    dustIndustry() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getDustIndustry(data).then((res) => {
        if (res.success) {
          let arr = [];
          arr = res.body.data.map((e) => {
            e.value = e.num;
            return e;
          });
          this.dustChart.setOption(this.dustChartPie(arr));
        }
      });
    },

    // 设备信息-摄像头
    getCameraInfor() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEquipmentCamera(data).then((res) => {
        if (res.success) {
          let arr = res.body.data;
          this.deviceList[0].totalNumber = arr[0].num;
          this.deviceList[0].totalName = arr[0].name;
          this.deviceList[0].onlineNumber = arr[1].num;
          this.deviceList[0].onlineName = arr[1].name;
          this.deviceList[0].warningNumber = arr[2].num;
          this.deviceList[0].warningName = arr[2].name;
        }
      });
    },

    // 设备信息-传感器
    getSensorInfor() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEquipmentSensor(data).then((res) => {
        if (res.success) {
          let arr = res.body.data;
          this.deviceList[1].totalNumber = arr[0].num;
          this.deviceList[1].totalName = arr[0].name;
          this.deviceList[1].onlineNumber = arr[1].num;
          this.deviceList[1].onlineName = arr[1].name;
          this.deviceList[1].warningNumber = arr[2].num;
          this.deviceList[1].warningName = arr[2].name;
        }
      });
    },

    // 获取设备列表
    getEquipmentList() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getEquipmentListInfor(data).then((res) => {
        if (res.body.data && res.body.data.length) {
          this.listData = res.body.data;
        }
      });
    },

    // getEquipmentList() {
    //   return new Promise((resolve, reject) => {
    //     getEquipmentListApi({
    //       body: {},
    //       page: 1,
    //       pageSize: 1246,
    //       sortName: "id",
    //       sortOrder: "desc",
    //     }).then((res) => {
    //       if (res.success) {
    //         if (res.body && res.body.length) {
    //           this.listData = res.body;
    //           this.listData.map((item, index) => {
    //             item.key = index + 1;
    //             item.type = "摄像头";
    //             item.state = "在线";
    //           });
    //         }
    //       }
    //     });
    //   });
    // },
    // echart数据处理
    formatDataList(arr, type, value, name, typeName) {
      let Arr = [];
      let tyoeArr = [];
      for (const key in type) {
        arr.map((item) => {
          if (item.type == key) {
            Arr.push({
              value: item[value] + "",
              name: name === "dimension" ? item[name] + "月" : item[name],
              typeName: item[typeName],
            });
          }
        });
        tyoeArr.push({ name: type[key], data: [] });
      }
      tyoeArr.map((val, index) => {
        Arr.map((val1) => {
          if (val.name === val1.typeName) {
            val.data.push(val1);
          }
        });
      });
      return tyoeArr;
    },
    // 获取区域企业情况
    regionalEnterprises() {
      getRegionalEnterprises(this.data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("获取区域企业情况", res.body);
            this.situationChart.setOption({
              dataset: {
                dimensions: [
                  "areaName",
                  "enterpriseNum",
                  "eightIndustries",
                  "special",
                ],
                source: res.body.data,
              },
            });
          }
        }
      });
    },

    // 获取企业类型统计
    enterpriseTypeStatistics() {
      getEnterpriseTypeStatistics(this.data).then((res) => {
        if (res.success) {
          console.log(1);
        }
      });
    },

    // 获取粉尘专项企业
    getDustList() {
      this.dustList = listData.listData2;
    },

    // change(name){
    //   this.industriesOption = name
    //   this.data.body = name !== '全部' ? { eightIndustry : name } : {}
    //   this.eightIndustries()
    // },
    // 八大行业粉尘涉爆企业弹窗数据
    eightIndustries() {
      getEightIndustries(this.data).then((res) => {
        if (res.success) {
          this.industryListData = res.body.data;
          this.total = parseInt(res.body.total);
          this.show = true;
        }
      });
    },
    // 点击展示
    open($event, name, index) {
      this.data.page = 1;
      this.currentPage = 1;
      this.data.body.name = "";
      console.log("八大行业的弹窗数据", name);
      this.data.body.tagCode = this.tagCodes[index];
      this.eightIndustries();
      // if (!index) {
      //   this.data.body.name = "";
      //   this.data.page = 1;
      //   this.data.body = index === 0 ? {} : { eightIndustry: item.name };
      //   this.eightIndustries();
      // }
    },

    // 点击关闭
    close() {
      this.show = false;
      this.dustInput = "";
      this.data.body.name = "";
      this.data.body.tagCodes = "";
      this.data.page = 1;
      this.currentPage = 1;
    },

    openDevice($event, index) {
      // return;
      if (index === 0) {
        this.data.body.name = "";
        this.rightShow = true;
        this.templateEvent = $event;
        this.getDeviceListPopData();
      }
    },

    rightClose() {
      this.rightShow = false;
      this.deviceInput = "";
    },

    // 粉尘专项Chart
    dustChartPie(obj) {
      let that = this;
      let option = {
        tooltip: {
          //   show: false,
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        color: [
          "#7c00ff",
          "#00c800",
          "#00d7e9",
          "#007aff",
          "#e2395c",
          "#ffff00",
          "#ff5b00",
        ],
        legend: {
          color: ["#7c00ff", "#00c800", "#00d7e9", "#007aff", "#e2395c"],
          // data: ["专项一", "专项二", "专项三", "专项四", "专项五"],
          // show: true,
          // right: "0",
          top: "0",
          left: "center",
          icon: "circle", //正方形图例  square
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          orient: "horizontal",
          itemGap: that.$setFontSize(20),

          // show: true,
          itemWidth: that.$setFontSize(10),
          // // itemHeight: 25,
          // orient: "vertical", //orient  horizontal
          // bottom: "25%",
          // right: "0%",
          // //   bottom: '40%',
          // // left: '80%',  //图例距离左的距离
          // //y: 'center',  //图例上下居中
          // textStyle: {
          //   color: "#666666",
          //   fontWeight: "normal",
          //   fontSize: "8",
          // },
          // // legend文字过长 用省略号显示
          // formatter: function (name) {
          //   // if (!name) return ''
          //   // console.log(name)
          //   if (name.length > 4) {
          //     name = name.slice(0, 4) + "...";
          //   }
          //   return name;
          // },
          // // 鼠标移上去图例显示完整的文字
          // tooltip: {
          //   show: true,
          // },
        },
        grid: {
          // left: '-10%',
          // x: -10,
          // y: 0,
          // x1: 0,
          // y1: 0,
        },
        series: [
          {
            // top: 'center',
            // left: '-40%',
            // zoom: 2,
            // name: "专项一",
            type: "pie",
            radius: ["30%", "55%"],
            center: ["50%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //   borderRadius: 10,
              borderColor: "#091d43",
              borderWidth: 3,
              //   color:'#000'
            },
            label: {
              show: true,
              position: "outside", //inside与outside 搭配labelLine一起使用
              formatter: "{b} {c}",

              textStyle: {
                fontWeight: "100",
                fontFamily: "Microsoft YaHei",
                color: "#fff",
                fontSize: that.$setFontSize(14),
              },
            },

            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              // length：10,
              length: 4,
            },
            data: obj,
          },
        ],
      };
      return option;
      // let option = {
      //   backgroundColor: "#031d33",
      //   tooltip: {
      //     show: true,
      //   },
      //   series: [
      //     {
      //       type: "pie",
      //       radius: ["30%", "60%"],
      //       center: ["50%", "50%"],
      //       hoverAnimation: true,
      //       // zoom: 1.5,
      //       z: 10,
      //       itemStyle: {
      //         normal: {
      //           borderWidth: 5,
      //           borderColor: "#003359",
      //         },
      //       },
      //       label: {
      //         show: false,
      //       },
      //       data: [100, 23, 43, 65, 34, 74],
      //       labelLine: {
      //         show: false,
      //       },
      //     },
      //   ],
      // };
      // return option;
    },

    // 区域企业情况
    situationChartBar() {
      let that = this;
      let option = {
        backgroundColor: "#091c42",
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "8%",
          top: "20%",
          right: "0",
          bottom: "8%",
        },
        legend: {
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          icon: "square", //正方形图例  square
          right: "0",
          top: "5%",
          textStyle: {
            color: "#ffffff",
            fontSize: that.$setFontSize(14),
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#02c2d8", //X轴文字颜色
              fontSize: that.$setFontSize(16),
            },
            interval: 0,
            // rotate: 30,
          },
        },
        yAxis: [
          {
            type: "value",
            interval: 100, // 步长
            // min: 0, // 起始
            // max: 5, // 终止
            name: "单位(家)",
            color: "#fff",
            nameTextStyle: {
              color: "#fff",
              align: "left",
              fontSize: that.$setFontSize(16),
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              // formatter: "",
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          // {
          //   type: 'value',
          //   position: 'right',
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#396A87',
          //       width: 2,
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: '{value}', //右侧Y轴文字显示
          //     textStyle: {
          //       color: '#396A87',
          //       fontSize: 14,
          //     },
          //   },
          // },
        ],
        series: [
          {
            name: "企业数",
            type: "bar",
            show: true,
            itemStyle: {
              normal: {
                color: "#007aff",
              },
            },
          },
          {
            name: "八大行业",
            type: "bar",
            show: true,
            itemStyle: {
              normal: {
                color: "#00c800",
              },
            },
          },
          {
            name: "专项",
            type: "bar",
            show: true,
            itemStyle: {
              normal: {
                color: "#00ffff",
              },
            },
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
