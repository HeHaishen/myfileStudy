<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-13 16:18:48
-->
<template>
  <div class="city-danger-center">
    <div class="icon">
      <div :class="['icon-camera']" @click="switchCamera()"></div>
      <div :class="['icon-transport']" @click="switchTransport()"></div>
    </div>
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
    <div class="c-center">
      <div class="center-statics">
        <div class="center-statics-innner">
          <p class="left-btn" @click="handlePrev" style="cursor: pointer" />
          <p class="right-btn" @click="handleNext" style="cursor: pointer" />
          <div class="center-statics-list">
            <a-carousel
              :slidesToShow="6"
              :slidesToScroll="1"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
              ref="circle"
            >
              <div class="list" v-for="(item, index) in listData" :key="index">
                <div>{{ item.areaName }}</div>
                <div>
                  <p>
                    <span>{{ item.bigRiskName }}：</span
                    ><span class="blue-font">{{ item.bigRisk }}</span
                    ><span>{{ item.bigRiskUnit }}</span>
                  </p>
                  <p>
                    <span>{{ item.videosName }}：</span
                    ><span class="blue-font">{{ item.videos }}</span
                    ><span>{{ item.videosUnit }}</span>
                  </p>
                </div>
              </div>
            </a-carousel>
          </div>
        </div>
      </div>

      <div class="center-right-innner">
        <ul class="center-right-list">
          <li @click="hazardClick($event)">
            <div>重大危险源企业</div>
            <p>
              <span class="blue-font">{{ citysDanger.hazardSource }}</span>
              <span>家</span>
            </p>
          </li>
          <li @click="ammoniaClick($event)">
            <div>涉氨企业</div>
            <p>
              <span class="blue-font">{{ citysDanger.ammoniaRelated }}</span>
              <span>家</span>
            </p>
          </li>
          <li @click="toxicClick($event)">
            <div>剧毒化学品</div>
            <p>
              <span class="blue-font">{{ citysDanger.toxicChemicals }}</span>
              <span>家</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- <center-statics /> -->
    <div class="center-right-select">
      <div class="search" v-if="false">
        <div class="placeholder">请输入关键字</div>
        <div class="icon-search"></div>
      </div>
      <div
        class="select-item"
        v-for="(item, index) in selectThing"
        :key="index"
      >
        <p @click="openShow(item, index)">
          <label style="cursor: pointer"
            >{{ item.dictValue }}
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

    <div class="select-right" v-if="false">
      <li
        v-for="(item, index) in selectRightList"
        :key="item.key"
        :class="[selectRightIndex === index ? 'active' : '']"
        @click="selectRightClick(index, item.value)"
      >
        {{ item.value }}
      </li>
    </div>

    <!-- <pop-up-layer v-show="playerObjs.show" :show="playerObjs.show" :setStyles="{'left':'77.9%','top':'50%'}" @doClose="staticResoureClose" ref="myPopUpLayer" :title="playerObjs.title" opsition="slefPoint" class="center-pop">
      <template slot="content">

        <Clist :columns="playerObjs.headerList" :listData="playerObjs.centerList">
          <template slot="name" slot-scope="{ record, text }">
            <p @click="detailClick(text, $event)">
              {{ text }}
            </p>
          </template>
        </Clist>

      </template>
    </pop-up-layer>
    <pop-up-layer :show="wadeObjs.show" :setStyles="{}" @doClose="staticResoureClose" ref="myPopUpLayer" opsition="slefPoint">
      <template slot="content">
        <Clist :columns="wadeObjs.headerList" :listData="wadeObjs.centerList">
          <template slot="name" slot-scope="{ record, text }">
            <p @click="detailClick(text, $event)">
              {{ text }}
            </p>
          </template>
        </Clist>
      </template>
    </pop-up-layer> -->
    <tempPop
      :v-if="playerObjs.show"
      :show="playerObjs.show"
      :setStyles="{ left: '77.9%', top: '50%' }"
      @doClose="staticResoureClose"
      ref="myPopUpLayer"
      opsition="btnRight"
      class="center-pop"
      :title="playerObjs.title"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="输入关键字"
            type="text"
            v-model="playerObjs.searchForm"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="onSearch"
          />
        </div>
        <div class="list-wrap">
          <Clist
            :columns="playerObjs.headerList"
            :listData="playerObjs.centerList"
          >
            <template slot="name" slot-scope="{ record, text }">
              <p @click="detailClick(text, $event)">
                {{ text }}
              </p>
            </template>
            <template slot="number" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="option" slot-scope="{ record, text, index }">
              <div class="type-optBtn" @click="positionActive(record)">
                定位
              </div>
            </template>
          </Clist>
        </div>
        
        <div class="list-change-page">
          <ChangePage
            :total="pagination.total"
            :currentPage="pagination.current"
            @changePages="pagesChange"
          />
        </div>
      </template>
    </tempPop>
    <pop-up-layer
      v-show="detail.show"
      :show="detail.show"
      :setStyles="{}"
      opsition="slefPoint"
      @doClose="close"
      ref="myPopUpLayer2"
      :title="detail.title"
      :sendEvent="saveEvent"
      class="detail-pop"
    >
      <template slot="content">
        <!-- <div class="back">返回</div> -->
        <div class="detail-top">
          <div class="detail-row">
            <div class="left-side">生产经营地址:</div>
            <div class="right-side">
              黄埔区惠东街道隔墙路牛栏园1号黄埔区惠东街道隔墙路牛栏园1号
            </div>
          </div>

          <div class="detail-row">
            <div class="left-side">企业注册地址:</div>
            <div class="right-side">广州市黄浦区文冲街道石化路振兴街18号</div>
          </div>

          <div class="detail-row">
            <div class="left-side">主要负责人:</div>
            <div class="right-side">杨坤林</div>
          </div>
          <div class="detail-row">
            <div class="left-side">负责人联系电话:</div>
            <div class="right-side">13890909-00</div>
          </div>
          <div class="detail-row">
            <div class="left-side">企业状态:</div>
            <div class="right-side">正常</div>
          </div>
          <div class="detail-row">
            <div class="left-side">风险评估级别信息:</div>
            <div class="right-side">橙色</div>
          </div>
          <div class="detail-row">
            <div class="left-side">企业分类与属性:</div>
            <div class="right-side">
              【石油库】【安全公告企业】【重点监管危险化学品】
              【石油化工企业】【罐区企业】
            </div>
          </div>
        </div>
        <div class="detail-bottom">
          <div class="tabs">
            <div class="tab" @click="tabLeftClick">
              <div class="title">危险物品实时保有量</div>
              <div class="number">7种</div>
              <div class="title ml">存量总数</div>
              <div class="number">32吨</div>
            </div>
            <div class="tab" @click="tabRightClick">
              <div class="title">实时监控</div>
              <div class="number">13台</div>
            </div>
          </div>
          <div class="danger-goods" v-if="dangerShow">
            <div class="title">危险物品动态</div>
            <div class="danger-goods-list">
              <Clist
                :columns="playerObjs.headerList"
                :listData="playerObjs.centerList"
              >
                <template slot="number" slot-scope="{ record, text, index }">
                  {{ index + 1 }}
                </template>
              </Clist>
            </div>
          </div>
          <div class="real-monitoring" v-else>
            <div class="title">实时监控</div>
            <ul class="monitor">
              <li
                class="monitor-child"
                v-for="(item, index) in monitorList"
                :class="[monitorIndex == index ? 'monitorActive' : '']"
                :key="index"
                @click="monitorClick(index)"
              >
                {{ item }}
              </li>
            </ul>
            <div class="tank-monitor">
              <Clist
                :columns="tankHeader"
                :listData="tankData"
                v-show="monitorIndex == 0"
              >
                <!-- <template slot="name" slot-scope="{ record, text }">
                  <p @click="detailClick(text, $event)">
                    {{ text }}
                  </p>
                </template> -->
              </Clist>

              <Clist
                :columns="gasHeader"
                :listData="gasData"
                v-show="monitorIndex == 1"
              >
                <!-- <template slot="name" slot-scope="{ record, text }">
                  <p @click="detailClick(text, $event)">
                    {{ text }}
                  </p>
                </template> -->
              </Clist>
              <div class="video" v-show="monitorIndex == 2">视频监测</div>
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>

    <pop-up-layer
      v-show="video.show"
      :show="video.show"
      :setStyles="{}"
      opsition="slefPoint"
      @doClose="videoClose"
      ref="myPopUpLayer3"
      title="视频监控"
      :sendEvent="video.event"
      class="video-pop"
    >
      <template slot="content">
        <div class="search">
          <input type="text" />
          <div class="icon-container">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <!-- 危化车辆 弹窗 -->
    <pop-up-layer
      :show="showTransport"
      :setStyles="{ left: '35%', top: '65%' }"
      ref="myPopUpLayer"
      class="centerTable"
      title="危险源运输车辆"
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
                  placeholder="请选择"
                  @change="doSearchDangerCar"
                  v-model="carObjs.areaSelected"
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
                v-model="carObjs.searchForm"
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
        <div class="list-change-page">
          <ChangePage
            :total="carObjs.total"
            :currentPage="carObjs.current"
            @changePages="carPageChange"
          />
        </div>
      </template>
    </pop-up-layer>
    <VideoTree ref="VideoTree"></VideoTree>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
// import CenterStatics from "./centerStatics";
import VideoTree from "@/components/APicture/videoTree/index.vue";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import {
  commonApi,
  getDistrictsDangerApi,
  getCitysDangerApi,
  indicatorCodes,
} from "@/api/theCitysDanger";
import Clist from "@/components/APicture/c-table";
import ChangePage from "@/components/APicture/changePage";
import Table from "@/components/APicture/c-table.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
export default {
  components: {
    Clist,
    ChangePage,
    VideoTree,
    Table,
    ContactPhone,
    MessageSend,
    tempPop,
  },
  data() {
    return {
      video: {
        show: false,
        event: null,
      },
      iconSearch: require("../../../assets/images/theCitysDanger/u43.svg"),
      selectRightList: [
        { value: "风险云图", key: 1 },
        { value: "隐患点分布图", key: 2 },
        { value: "周边重要场所设施分布图", key: 3 },
        { value: "风险预警", key: 4 },
        { value: "视频监控", key: 5 },
      ],
      dangerShow: true,
      selectRightIndex: 0,
      defaultParams: {
        body: {},
        page: -1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      selectThing: [
        // {
        //   key: 0,
        //   name: "全市隐患企业分布",
        //   active: false,
        //   show: true,
        //   children: [],
        // },
        // {
        //   key: 1,
        //   name: "各区危险源分布",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "液氮制冷",
        //       active: false,
        //     },
        //     {
        //       childName: "可燃气体",
        //       active: false,
        //     },
        //     {
        //       childName: "可燃气体",
        //       active: false,
        //     },
        //     {
        //       childName: "可燃气体",
        //       active: false,
        //     },
        //     {
        //       childName: "液氮制冷",
        //       active: false,
        //     },
        //     {
        //       childName: "可燃气体",
        //       active: false,
        //     },
        //     {
        //       childName: "液氮制冷",
        //       active: false,
        //     },
        //     {
        //       childName: "可燃气体",
        //       active: false,
        //     },
        //   ],
        // },
        // {
        //   key: 2,
        //   name: "危险源等级分布",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "一般危险源",
        //       active: false,
        //     },
        //     {
        //       childName: "较大危险源",
        //       active: false,
        //     },
        //     {
        //       childName: "重大危险源",
        //       active: false,
        //     },
        //     {
        //       childName: "特大危险源",
        //       active: false,
        //     },
        //   ],
        // },
      ],
      listData: [],
      citysDanger: [],
      leftBtn: require("../../../assets/images/theCitysDanger/bg_left_btn.gif"),
      rightBtn: require("../../../assets/images/theCitysDanger/bg_right_btn.gif"),
      playerObjs: {
        show: false,
        title: "",
        searchForm: null,
        centerList: [],
        headerList: [
          {
            title: "序号",
            index: 0,
            textIndex: "number",
            width: "15%",
          },
          {
            title: "企业名称",
            index: 1,
            textIndex: "name",
            width: "20%",
          },
          { title: "区域", index: 2, textIndex: "address", width: "40%" },
          { title: "定位", index: 3, textIndex: "option", width: "25%" },
        ],
      },

      wadeObjs: {
        show: false,
        title: "",
        searchForm: null,
        headerList: [
          {
            title: "序号",
            index: 0,
            textIndex: "index",
            width: "20%",
          },
          {
            title: "企业名称",
            index: 1,
            textIndex: "name",
            width: "60%",
          },
          { title: "企业", index: 2, textIndex: "region", width: "20%" },
        ],
        centerList: [
          {
            index: 1,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 2,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 1,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 2,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 1,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 2,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 1,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 2,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 3,
            name: "广州中冠安泰石油化工有限公司",
            region: "天河",
          },
          {
            index: 1,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 2,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 3,
            name: "广州中冠安泰石油化工有限公司",
            region: "天河",
          },
          {
            index: 4,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 5,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 6,
            name: "广州中冠安泰石油化工有限公司",
            region: "天河",
          },
          {
            index: 7,
            name: "广州市黄埔区百顺仓储部",
            region: "番禺区",
          },
          {
            index: 8,
            name: "广州龙湖燃气有限公司",
            region: "越秀区",
          },
          {
            index: 9,
            name: "广州中冠安泰石油化工有限公司",
            region: "天河",
          },
        ],
      },
      detail: {
        show: false,
        title: "",
      },
      saveEvent: null,
      sendEvent: null,

      monitorList: ["储罐监测", "气体监测", "视频监测"],
      monitorIndex: 0,

      tankHeader: [
        {
          title: "序号",
          index: 0,
          textIndex: "index",
          width: "10%",
        },
        {
          title: "设备名称",
          index: 1,
          textIndex: "deviceName",
          width: "10%",
        },
        { title: "储罐名称", index: 2, textIndex: "tankName", width: "20%" },
        { title: "储罐编号", index: 3, textIndex: "tankNum", width: "10%" },
        { title: "监测类型", index: 4, textIndex: "monitorType", width: "10%" },
        { title: "监测数值", index: 5, textIndex: "monitorNum", width: "10%" },
        { title: "监测单位", index: 6, textIndex: "monitorUnit", width: "10%" },
        { title: "监测时间", index: 7, textIndex: "monitorTime", width: "20%" },
      ],
      tankData: [
        {
          index: 1,
          deviceName: "1#罐",
          tankName: "104储罐",
          tankNum: 104,
          monitorType: "温度",
          monitorNum: "48,2",
          monitorUnit: "度",
          monitorTime: "2021-05-23 10:34",
        },
        {
          index: 2,
          deviceName: "2#罐",
          tankName: "104储罐",
          tankNum: 104,
          monitorType: "温度",
          monitorNum: "48,2",
          monitorUnit: "度",
          monitorTime: "2021-05-23 10:34",
        },
        {
          index: 3,
          deviceName: "3#罐",
          tankName: "104储罐",
          tankNum: 104,
          monitorType: "温度",
          monitorNum: "48,2",
          monitorUnit: "度",
          monitorTime: "2021-05-23 10:34",
        },
      ],

      gasHeader: [
        {
          title: "序号",
          index: 0,
          textIndex: "index",
          width: "10%",
        },
        {
          title: "设备名称",
          index: 1,
          textIndex: "deviceName",
          width: "20%",
        },
        { title: "气体名称", index: 2, textIndex: "tankName", width: "20%" },
        { title: "监测类型", index: 4, textIndex: "monitorType", width: "10%" },
        { title: "监测数值", index: 5, textIndex: "monitorNum", width: "10%" },
        { title: "监测单位", index: 6, textIndex: "monitorUnit", width: "10%" },
        { title: "监测时间", index: 7, textIndex: "monitorTime", width: "20%" },
      ],
      gasData: [
        {
          index: 1,
          deviceName: "可燃气体报警器LPG",
          tankName: "液化石油气",
          monitorType: "可燃",
          monitorNum: "48,2",
          monitorUnit: "PPM",
          monitorTime: "2021-05-23 10:34",
        },
        {
          index: 2,
          deviceName: "2#罐",
          tankName: "104储罐",
          monitorType: "温度",
          monitorNum: "48,2",
          monitorUnit: "度",
          monitorTime: "2021-05-23 10:34",
        },
        {
          index: 3,
          deviceName: "3#罐",
          tankName: "104储罐",
          monitorType: "温度",
          monitorNum: "48,2",
          monitorUnit: "度",
          monitorTime: "2021-05-23 10:34",
        },
      ],
      pagination: {
        total: 0,
        current: 1,
      },
      showTransport: false,
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

      columns: [
        { textIndex: "index", title: "序号", width: "10%" },
        { textIndex: "licenseNum", title: "车牌", width: "30%" },
        { textIndex: "driver", title: "司机", width: "25%" },
        { textIndex: "phone", title: "联系电话", width: "35%" },
      ],
      tableData: [],
      riskActive: 0,
      carObjs: {
        total: 0,
        current: 1,
        areaSelected: "",
        searchForm: undefined,
      },
      areaDatas: [], //行政区域编码
    };
  },
  created() {
    this.getSidebarDatas();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  watch: {
    riskActive: {
      handler(newValue, oldValue) {
        this.playerObjs.searchForm = undefined;
        console.log(
          this.playerObjs.searchForm,
          "this.playerObjs.searchFormWatch"
        );
      },
      immediate: true,
    },
  },
  // methods: {
  // this.init();
  // },
  methods: {
    init() {
      this.getDistrictsDangerData();
      this.getCitysDangerData();
      this.getAreaData();
      const rightDiv = document.querySelector(".right");
      let rightWidth = rightDiv.getBoundingClientRect().width;
      let mainWidth = document.getElementById("crystalContainer").offsetWidth;
      let clientWidth = document.body.clientWidth;
      let tempWidth = (clientWidth - mainWidth) / 2;
      if (rightWidth > tempWidth) {
        mapToolLocation = rightWidth - tempWidth + 1433;
      }
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(16);
    },
    initChart() {},
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
    //获取侧边栏二级数据项的具体详情
    getSidebarDetail(item) {
      let code = item.interfaceCode;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = item.condition ? JSON.parse(item.condition) : {};
      commonApi(params, code).then((res) => {
        if (res.success) {
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 1);
        } else {
          console.error(res.message);
        }
      });
    },
    // 展示
    openShow(item, index) {
      item.show = !item.show;
      // this.selectThing[index].show = !this.selectThing[index].show;
      // 如果是展开 且 子级没有数据，则请求接口获取子级
      if (item.show && item.children.length == 0) {
        this.getSidebarChildren(item);
      }
    },

    videoClose() {
      this.video.show = false;
    },

    selectRightClick(index, value) {
      this.selectRightIndex = index;
      if (value == "视频监控") {
        this.video.show = true;
      }
    },

    //获取侧边栏顶层数据的子级
    getSidebarChildren(parent) {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.parentId = parent.sid;
      commonApi(params, code).then((res) => {
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

    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },

    //获取侧边栏数据：一层
    getSidebarDatas() {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.dictName = "HS_LAYER";
      commonApi(params, code).then((res) => {
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

    // 重大危险源-全市各区重大危险源统计
    getDistrictsDangerData() {
      getDistrictsDangerApi({ body: { codes: "UdYyxfqL" } }).then((res) => {
        console.log("重大危险源-全市各区重大危险源统计", res);
        if (res.body.data.length && res.success) {
          this.listData = res.body.data;
        }
      });
    },

    //  重大危险源-全市重大危险源统计
    getCitysDangerData() {
      getCitysDangerApi({ body: { codes: "omgrJMsw" } }).then((res) => {
        if (res.body && res.body.data && res.body.data.length) {
          console.log("重大危险源-全市重大危险源统计", res);
          this.citysDanger = res.body.data[0];
        }
      });
    },

    //按区排名 左按钮
    handlePrev() {
      this.$refs.circle.prev();
    },
    //按区排名 右按钮
    handleNext() {
      this.$refs.circle.next();
    },

    staticResoureClose() {
      this.playerObjs.show = false;
      this.playerObjs.searchForm = undefined;
      this.playerObjs.current = 1;
    },

    // 全市重大危险源企业
    getAllCityHazardData(tagCode) {
      indicatorCodes("b2qAFMeN", {
        body: { tagCode, name: this.playerObjs.searchForm },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
        console.log("全市重大危险源企业数据", res);
        if (res.body && res.body.data) {
          this.playerObjs.centerList = [];
          this.playerObjs.centerList = JSON.parse(
            JSON.stringify(res.body.data)
          );
          this.pagination.total = +res.total;
        }
      });
    },

    // 重大危险源企业
    hazardClick() {
      this.riskActive = 0;
      this.playerObjs.title = "重大危险源企业";
      this.playerObjs.show = true;
      this.getAllCityHazardData("ZDWXYQY");
    },
    //涉氨企业
    ammoniaClick() {
      this.riskActive = 1;
      this.playerObjs.title = "涉氨企业";
      this.playerObjs.show = true;
      this.getAllCityHazardData("QSYH_SAZL");
    },
    //剧毒化学品
    toxicClick() {
      this.riskActive = 2;
      this.playerObjs.title = "剧毒化学品";
      this.playerObjs.show = true;
      this.getAllCityHazardData("JDHXPQY");
    },

    detailClick(text, $event) {
      // this.saveEvent = e
      console.log("点击表格", text);
      this.detail.show = true;

      // this.playerObjs.show = false;
      this.$refs.myPopUpLayer2.saveEvent = $event;
      this.detail.title = text;
    },

    tabLeftClick() {
      this.dangerShow = true;
    },
    tabRightClick() {
      this.dangerShow = false;
    },

    close() {
      this.detail.show = false;
    },

    monitorClick(index) {
      this.monitorIndex = index;
    },

    // 分页
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages;
      if (this.riskActive == 0) {
        this.getAllCityHazardData("ZDWXYQY");
      } else if (this.riskActive == 1) {
        this.getAllCityHazardData("QSYH_SAZL");
      } else if (this.riskActive == 2) {
        this.getAllCityHazardData("JDHXPQY");
      }
    },

    //搜索
    onSearch() {
      this.pagination.current = 1;
      if (this.riskActive == 0) {
        this.getAllCityHazardData("ZDWXYQY");
      } else if (this.riskActive == 1) {
        this.getAllCityHazardData("QSYH_SAZL");
      } else if (this.riskActive == 2) {
        this.getAllCityHazardData("JDHXPQY");
      }
    },

    switchCamera($event) {
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
      this.showTransport = false;
    },

    getCarList() {
      let code = "QbvbEoFH";
      let areaCode = this.getAreaCode(this.carObjs.areaSelected)[0];

      console.log(areaCode, "areaCode ");

      let data = {
        body: {
          areaCode: areaCode ? areaCode.sn : "",
          driver: this.carObjs.searchForm,
        },
        page: this.carObjs.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(data, code).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.carObjs.total = +res.total;
        }
      });
    },

    switchTransport() {
      this.showTransport = !this.showTransport;
      this.carObjs.areaSelected = undefined;
      this.carObjs.searchForm = undefined;
      this.carObjs.current = 1;
      if (this.showTransport) {
        this.getCarList();
      }
    },

    getRiskALl() {
      let codes = "b2qAFMeN";
      let data = {
        body: {
          name: this.playerObjs.searchForm,
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(data, codes).then((res) => {
        console.log(res, "resresres");
        this.centerList = [];
      });
    },

    //弹窗关闭
    dangerCarClose() {
      this.showTransport = false;
    },

    positionActive(item) {
      pGzznCore.addPromiseHazardousQYLoction(item, this.riskActive);
    },

    //危险源运输车辆
    carPageChange(pages, current) {
      this.pagination.current = +pages.pages;
      this.getCarList();
    },

    //获取危险源运输车辆
    doSearchDangerCar() {
      this.getCarList();
    },

    //获取广州市各区域列表
    getAreaData() {
      let code = "Z67lpx15";
      let params = {
        body: {
          en: "440100000000",
        },
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      };
      commonApi(params, code).then((res) => {
        if (res.success) {
          this.areaDatas = res.body.data;
        } else {
          console.error(res.message);
        }
      });
    },
    getAreaCode(name) {
      return this.areaDatas.filter((item) => item.name == name);
    },
    clickPhone(i, k, e) {
      let sendMsg = {
        name: "海参",
        phone: "15919304717",
      };
      let { driver, phone } = i;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "slefPoint",
        name: driver,
        phone,
        item: i,
      });
    },
    clickMessage(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      let { driver, phone } = i;

      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "slefPoint",
        name: driver,
        phone,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
