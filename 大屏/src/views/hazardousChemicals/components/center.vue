<template>
  <div class="city-hidden-danger-center">
    <div class="right">
      <div id="crystalContainer">
        <div
          id="envCenterInfo"
          class="status-bar"
          style="left: 0px; right: 0px; bottom: 0px"
        >
          <div id="camera_alt">视点高：NaN米</div>
          <div id="env_alt">海拔：NaN米</div>
          <div id="env_lat">纬度：NaN</div>
          <div id="env_lon">经度：NaN</div>
        </div>
      </div>
      <div class="map">
        <div class="icon">
          <div :class="['icon-camera']" @click="switchCamera()"></div>
          <div :class="['icon-transport']" @click="switchTransport()"></div>
          <div class="video-name-box" v-if="false">
            <p
              :class="[
                { 'video-zm-list-selected': item.active },
                'video-zm-list',
              ]"
              @click="switchCameraInfo(item, index)"
              v-for="(item, index) in videoZMList"
              :key="index"
            >
              {{ item.zm }}
            </p>
          </div>
        </div>
      </div>
      <div class="industries-list">
        <div
          class="industries-item"
          v-for="(item, index) in industriesList"
          :key="index"
          @click="openResource(item)"
        >
          <div class="industries-title">{{ item.name }}</div>
          <div class="industries-number">
            {{ item.num }}
            <span class="industries-unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
      <div class="center-right-select">
        <div
          class="select-item"
          v-for="(item, index) in selectThing"
          :key="index"
        >
          <p @click="openShow(item, index, $event)">
            <label style="cursor: pointer">
              {{ item.dictValue }}
              <div class="item-fold">
                <a-icon type="down" v-if="!item.show" />
                <a-icon type="up" v-if="item.show" />
              </div>
            </label>

            <span
              @click.stop="flexClickAllItem(item, index)"
              :class="[item.active ? 'active-span' : '']"
            ></span>
          </p>
          <ul v-show="item.show">
            <li v-for="(citem, cindex) in item.children" :key="cindex">
              <label>{{ citem.dictValue }}</label>
              <span
                :class="[citem.active ? 'active-span' : '']"
                @click="flexClickliItem(item, index, citem, cindex)"
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 视频组件
    <div class="center-fixed-icon" style="width: auto; display: flex">
      <div class="btn-video" @click="videoClick($event)">
        <img src="../../../assets/images/theCityThreeProofing/icon_video.png" alt="" />
      </div>
    </div> -->
    <!-- 资源统计 弹窗 -->
    <pop-up-layer
      :show="resourceShow"
      :setStyles="{ left: '50%', top: '30%' }"
      ref="myPopUpLayer"
      class="leftTable centerTable"
      :title="popTitle"
      @doClose="close"
    >
      <template slot="content">
        <div class="search-box">
          <!-- 下拉选择框 -->
          <div class="sub">
            <div class="selected-box" v-if="openType == '1'">
              <div class="sub-title">企业分类：</div>
              <div class="my-select">
                <a-select
                  allowClear
                  placeholder="请选择企业分类"
                  v-model="industriesOption"
                  @change="handelSelected"
                >
                  <a-select-option
                    allowClear
                    :value="item.key"
                    v-for="(item, index) in industryList"
                    :key="index"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <!-- <div class="selected-box" v-if="openType == '1'">
              <div class="sub-title">区域：</div>
              <div class="my-select">
                <a-select
                  allowClear
                  placeholder="请选择"
                  v-model="areaSelected"
                  @change="handelSelected"
                >
                  <a-select-option
                    :value="item"
                    v-for="(item, index) in areaList"
                    :key="index"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </div> -->
            <div class="search-input" v-if="openType !== '3'">
              <a-input-search
                :placeholder="placeholder"
                enter-button
                @search="onSearch"
                v-model="searchFrom"
              />
            </div>
            <div class="back-transport" v-if="openType == '3' && isCarDetail">
              <div class="type-btn" @click="backToTransport">返回</div>
            </div>
          </div>
        </div>
        <div class="table-list">
          <Table :columns="columns" :listData="tableData">
            <template slot="index" slot-scope="{ record, text, index }">
              <span>{{ index + 1 }}</span>
            </template>
            <template slot="option" slot-scope="{ record, text, index }">
              <div class="type-btn" @click="dChemicalLoc(record)">定位</div>
            </template>
            <template
              v-if="openType == '3'"
              slot="num"
              slot-scope="{ record, text, index }"
            >
              <a
                @click="toCarDetail(record)"
                href="javascript:;"
                style="color: rgb(1, 224, 228)"
                >{{ text }}</a
              >
            </template>
          </Table>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="pagination.total"
            :currentPage="pagination.current"
            @changePages="pagesChange"
          />
        </div>
      </template>
    </pop-up-layer>

    <!-- 危化车辆 弹窗 -->
    <pop-up-layer
      :show="showTransport"
      :setStyles="{ left: '41%', top: '70%' }"
      ref="myPopUpLayer"
      class="leftTable"
      title="危化车辆行驶列表"
      @doClose="dangerCarClose"
    >
      <template slot="content">
        <div class="search-box">
          <!-- 下拉选择框 -->
          <div class="sub">
            <div class="selected-box">
              <div class="sub-title">区域：</div>
              <div class="my-select">
                <a-select
                  allowClear
                  @change="doSearchDangerCar"
                  placeholder="请选择"
                  v-model="areaSelected"
                >
                  <a-select-option
                    :value="item"
                    v-for="(item, index) in areaList"
                    :key="index"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="search-input">
              <a-input-search
                placeholder=""
                enter-button
                v-model="searchWord"
                @search="doSearchDangerCar"
              />
            </div>
          </div>
        </div>
        <div class="table-list">
          <Table :columns="columns" :listData="tableData">
            <template slot="index" slot-scope="{ record, text, index }">
              <span>{{ index + 1 }}</span>
            </template>
            <template slot="phone" slot-scope="{ record, text, index }">
              <div class="exchange">
                {{ text }}
                <a-icon
                  type="phone"
                  class="icon"
                  @click="clickPhone(record, index, $event)"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  @click="clickMessage(record, index, $event)"
                />
              </div>
            </template>
          </Table>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
    <VideoTree ref="VideoTree"></VideoTree>
  </div>
</template>

<script>
import VideoTree from "@/components/APicture/videoTree/index.vue";

import * as api from "@/api/hazardousChemicals";
import Table from "@/components/APicture/c-table.vue";
import * as commonColumns from "./utils/tableData";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import ChangePage from "@/components/APicture/changePage";

export default {
  components: {
    VideoTree,
    Table,
    ContactPhone,
    MessageSend,
    ChangePage,
  },
  data() {
    return {
      tagCodes:["WHPQY_SCQY","WHPQY_JYQY","WHPQY_SYQY","WHPQY_WYCL","WHPQY_YSQY","WHPQY_YHBZ","WHPQY_MBQY","WHPQY_YQCS"],// 危化品企业总数
      stockTotal: "",
      areaSelected: "",
      searchWord: "",
      //企业列表（右上角）
      industriesList: [],
      placeholder: "请输入企业名称",

      // 侧边企业列表
      selectThing: [],
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      popTitle: "",
      openType: "",
      industriesOption: undefined,
      industryList: [
        { key: "WHPQY_SCQY", value: "生产企业" },
        { key: "WHPQY_JYQY", value: "经营企业" },
        { key: "WHPQY_SYQY", value: "使用企业" },
        { key: "WHPQY_YHBZ", value: "烟花爆竹企业" },
        { key: "WHPQY_YSQY", value: "运输企业" },
        { key: "WHPQY_MBQY", value: "民爆企业" },
        { key: "WHPQY_YQCS", value: "油气长输管道企业" },
        // "生产企业",
        // "经营企业",
        // "使用企业",
        // "烟花爆竹企业",
        // "运输企业",
        // "口岸企业",
        // "民爆企业",
        // "废弃处置企业",
        // "城镇燃气企业",
        // "油气长输管道企业",
      ],
      areaList: [
        "越秀区",
        "荔湾区",
        "海珠区",
        "天河区",
        "白云区",
        "黄埔区",
        "番禺区",
        "花都区",
        "南沙区",
        "增城区",
        "从化区",
      ],
      columns: [],
      tableData: [],
      resourceShow: false,
      code: "",
      areaSelected: "",
      isCarDetail: false,
      videoZMList: [],
      isShowCamera: false,
      showTransport: false,
      areaDatas: [],
      pagination: {
        total: 0,
        current: 1,
      },
      parentItem: null,
      searchFrom: "",
    };
  },
  created() {
    this.getResourceStatistics();
    this.getSidebarDatas();
    // 获取一屏订全城监控视频数
    this.getVideoZM();
    this.getAreaData();
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    window.hChemicalsResource = this.openResource;
    window.hChemicalsStatistics = this.getStockStatistics;
    this.init();
  },
  watch: {
    parentItem: function (newValue, oldValue) {
      this.searchFrom = undefined;
      this.industriesOption = undefined;
      this.areaSelected = undefined;
    },
  },
  methods: {
    handelSelected(e) {
      this.getTableData();
    },
    // 打电话
    clickPhone(i, k, e) {
      /**
	  let sendMsg = {
        name: '海参',
        phone: '15919304717',
      }; */
      let { driver, phone } = i;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnTop",
        name: driver,
        phone,
        item: i,
      });
    },
    // 打电话-对外接口
    clickTeamPhone(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    // 点击短信
    clickMessage(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      let { driver, phone } = i;

      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnTop",
        name: driver,
        phone,
      });
    },
    // 发短信-对外接口
    clickTeamMessage(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    doSearchDangerCar() {
      let queryParams = {
        areaCode: this.areaSelected,
        driver: this.searchWord,
      };
      console.log(queryParams);

      this.code = "QbvbEoFH";
      this.columns = commonColumns.columnsTransportDetail2;
      this.getTableData(queryParams);
    },
    //弹窗关闭
    dangerCarClose() {
      this.showTransport = false;
    },
    switchTransport() {
      this.showTransport = !this.showTransport;
      this.resourceShow = false;
      this.isShowCamera = false;
      this.areaSelected = undefined;
      if (this.showTransport) {
        this.doSearchDangerCar();
      }
    },
    switchCameraInfo(item, index) {
      if (item.zm === "城管云" || item.zm === "危化品") {
        if (item.zm === "城管云") {
          console.log("城管云");
          pGzznCore.urbanDangerousImageProvider();
        } else if (item.zm === "危化品") {
          console.log("危化品");
          pGzznCore.dangerousImageProvider();
        }
      } else {
        if (item.active) {
          pGzznCore.urbanDangerousRemoveProvider(item.zm);
        } else {
          pGzznCore.urbanDangerousZMProvider(item.zm);
        }
      }
      this.videoZMList[index].active = !this.videoZMList[index].active;
      console.log("active", this.videoZMList[index].active);
    },
    // 获取视频分组
    getVideoZM() {
      let that = this;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      api.commonApi(params, "nEuS0yYD").then((res) => {
        if (res.success) {
          let addList = [
            {
              zm: "危化品",
            },
            {
              zm: "城管云",
            },
          ];
          let data = [...res.body.data, ...addList];
          data.map((item) => {
            item.active = false;
            return item;
          });
          this.videoZMList = data;
          console.log("videoZMList", data);
        }
      });
    },
    //获取表格数据
    getTableData(queryParams) {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.name = this.searchFrom;
      params.body.companyName = this.searchFrom;

      if (queryParams) {
        params.body = { ...params.body, ...queryParams };
      }
      if (
        this.openType == "1" ||
        this.openType == "2" ||
        this.openType == "5"
      ) {
        console.log('this.openType',this.openType)
        let code = "";
        if (this.areaSelected) {
          let item = this.getAreaCode(this.areaSelected)[0];
          console.log("item", item);
          code = item ? item.sn : "";
        }
        // params.body.areaCode = code;

        if (this.industriesOption === undefined) {
          console.group("???");
          params.body.tagCodes = [...this.tagCodes];
        } else {
          params.body.tagCodes = [];
          params.body.tagCodes.push(this.industriesOption);
        }

        // params.body.tagCodes = ;
      }
      params.page = this.pagination.current;
      console.log(params, "params99999");

      api.commonApi(params, this.code).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    getAreaCode(name) {
      return this.areaDatas.filter((item) => item.name == name);
    },
    //获取广州市各区域列表
    getAreaData() {
      let code = "Z67lpx15";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = { ...params.body, en: "440100000000" };
      api.commonApi(params, code).then((res) => {
        if (res.success) {
          this.areaDatas = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },
    //危化品存量统计 - 各区分类统计
    getStockStatistics(name) {
      this.stockTotal = "";
      let code = "RhzkJpdN";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      let areaCode = this.getAreaCode(name)[0].sn || "";
      params.body = { ...params.body, areaCode: areaCode };
      api.commonApi(params, code).then((res) => {
        if (res.success) {
          let data = res.body.data;
          if (data && data.length > 0) {
            this.stockTotal = data[0].stockNum;
            pGzznCore.addPromiseHChemicalsStatistics(this.stockTotal, name);
            //console.log('危化品企业总数',this.stockTotal);
          }
        } else {
          console.error(res.message);
        }
      });
    },
    close() {
      this.resourceShow = false;
    },
    //车辆详情
    toCarDetail(item) {
      let queryParams = {
        areaCode: item.areaCode,
      };
      this.isCarDetail = true;
      this.code = "QbvbEoFH";
      this.columns = commonColumns.columnsTransportDetail;
      this.getTableData(queryParams);
    },
    dChemicalLoc(record) {
      pGzznCore.dChemicalLocation(record);
    },
    //返回车辆总数
    backToTransport() {
      this.isCarDetail = false;
      this.code = "31qvtsE5";
      this.columns = commonColumns.columnsTransport;
      this.getTableData();
    },
    // 应急资源弹窗
    openResource(item, status) {
      if (this.parentItem != item) {
        this.industriesOption = undefined;
        this.areaSelected = undefined;
        this.searchFrom = undefined;
      }
      this.parentItem = item;

      console.log(status, "statusstatusstatusstatusstatus");

      if (!status) {
        this.pagination.current = 1;
        console.log(this.pagination.current);
      }
      this.openType = item.code;
      this.isCarDetail = false;
      //重置所有搜索条件
      //this.reset();
      switch (item.code) {
        case "1":
          this.popTitle = item.name;
          this.placeholder = "请输入企业名称";
          // this.code = "LEzG7sao";
          this.code = "b2qAFMeN";
          this.columns = commonColumns.columnsDanger;
          this.getTableData();
          break;
        case "2":
          this.placeholder = "";
          this.popTitle = item.name;
          this.placeholder = "请输入企业名称";
          this.code = "SPDzjg7M";
          this.columns = commonColumns.columnsEmphasis;
          this.getTableData();
          break;
        case "3":
          this.popTitle = item.name;
          this.code = "31qvtsE5";
          this.columns = commonColumns.columnsTransport;
          this.getTableData();
          break;
        case "4":
          this.popTitle = item.name;
          this.placeholder = "请输入品名";
          this.code = "47gLHB9v";
          this.columns = commonColumns.columnsVariety;
          this.getTableData();
          break;
        case "5":
          this.popTitle = item.name;
          this.code = "LEzG7sao";
          this.areaSelected = item.areaName;
          this.industriesOption = undefined;
          this.columns = commonColumns.columnsDanger;
          this.getTableData();
          break;
        default:
          break;
      }
      this.resourceShow = true;
      this.showTransport = false;
    },
    //获取侧边栏数据：一层
    getSidebarDatas() {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.dictName = "HC_LAYER";
      api.commonApi(params, code).then((res) => {
        if (res.success) {
          let data = [];
          for (let item of res.body.data) {
            let newItem = { ...item, active: false, show: false, children: [] };
            data = [...data, newItem];
          }
          this.selectThing = data;
        } else {
          console.error(res.message);
        }
      });
    },
    // 企业、车辆、品种数量统计表
    getResourceStatistics() {
      api.getResourceStatistics(this.defaultParams).then((res) => {
        if (res.success) {
          this.industriesList = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },

    init() {
      let crystalDiv = document.getElementById("crystalContainer");
      let rightRect = crystalDiv.parentNode.getBoundingClientRect();
      let crystalRect = crystalDiv.getBoundingClientRect();
      mapOffsetPixel = Math.round((rightRect.width - crystalRect.width) / 2);
      mapOffsetYPixel = Math.round((rightRect.height - crystalRect.height) / 2);
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(12);
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.selectThing[index].active = JSON.parse(JSON.stringify(!item.active));
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
      if (this.selectThing[index].active) {
        //遍历获取子级的所有详情数据
        this.selectThing[index].children.forEach((option) => {
          this.getSidebarDetail(option);
        });
        is_Bool = true;
        this.selectThing[index].show = true;
        this.selectThing[index].children.map((citem, cindex) => {
          this.selectThing[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.selectThing[index].children, false);
        this.selectThing[index].children.forEach((option) => {
          pGzznCore.addPromiseHazardousQYRemove(option.dictValue);
        });
      }
    },
    flexClickliItem(item, index, citem, cindex) {
      this.selectThing[index].children[cindex].active = !citem.active;
      if (this.selectThing[index].children[cindex].active) {
        //获取该项的详情
        this.getSidebarDetail(citem);
        let childrenLength = this.selectThing[index].children.length;
        let currentArr = this.selectThing[index].children.filter((i, k) => {
          if (i.active) {
            return i;
          }
        });
        if (currentArr.length === childrenLength) {
          this.selectThing[index].active = true;
        }
      } else {
        this.selectThing[index].active = false;
        pGzznCore.addPromiseHazardousQYRemove(citem.dictValue);
      }
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
    },
    switchCamera($event) {
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
      this.isShowCamera = !this.isShowCamera;
      this.showTransport = false;
    },
    // 展示
    openShow(item, index) {
      item.show = !item.show;
      // 如果是展开 且 子级没有数据，则请求接口获取子级
      if (item.show && item.children.length == 0) {
        this.getSidebarChildren(item);
      }
    },
    //获取侧边栏顶层数据的子级
    getSidebarChildren(parent) {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.parentId = parent.sid;
      api.commonApi(params, code).then((res) => {
        if (res.success) {
          let data = JSON.parse(JSON.stringify(res.body.data));
          for (let item of data) {
            item.active = false;
          }
          parent.children = data;
        } else {
          console.error(res.message);
        }
      });
    },
    //获取侧边栏二级数据项的具体详情
    getSidebarDetail(item) {
      let code = item.interfaceCode;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = item.condition ? JSON.parse(item.condition) : {};
      api.commonApi(params, code).then((res) => {
        if (res.success) {
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 0);
        } else {
          console.error(res.message);
        }
      });
    },

    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },

    pagesChange(pages, current) {
      console.log(pages);

      this.pagination.current = +pages.pages;
      console.log(this.pagination.current);

      this.openResource(this.parentItem, true);
    },
    onSearch() {
      console.log(11);
      this.openResource(this.parentItem);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>