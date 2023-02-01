<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-08-28 16:06:55
-->
<template>
  <div class="dust-explosion-center">
    <div class="left">
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
          <div
            :class="['icon-camera', { 'icon-camera-selected': isShowCamera }]"
            @click="switchCamera($event)"
          ></div>
          <div
            :class="[
              'icon-transport',
              { 'icon-transport-selected': showTransport },
            ]"
          ></div>
          <div class="video-name-box" v-if="isShowCamera">
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
          @click="industryOpen(item.name)"
        >
          <div class="industries-title">{{ item.name }}</div>
          <div class="industries-number">
            {{ item.num }}
            <span class="industries-unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
      <div class="my-tree" v-if="treeShow">
        <div class="title">视频监控</div>

        <div class="search">
          <div class="searchBar"></div>
          <div class="c-icon"></div>
        </div>

        <div class="tree">
          <a-tree
            v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
        </div>
      </div>
      <div class="center-right-select">
        <div
          class="select-item"
          v-for="(item, index) in selectThing"
          :key="index"
        >
          <div @click="openShow(item, index)" class="select-child">
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
          </div>
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
      <pop-up-layer
        class="my-popup"
        :show="industryShow"
        v-if="industryShow"
        :setStyles="{}"
        :title="industryTitle"
        @doClose="close"
        ref="myPopUpLayer"
      >
        <template slot="content">
          <div class="search-icon" v-show="industryListData.length !== 0">
            <input type="text" />
            <div class="icon-container">
              <img :src="iconSearch" alt="" class="img" />
            </div>
          </div>
          <!-- <div class="sub">
            <div class="sub-title">行业筛选：</div>
            <div class="my-select">
              <a-select placeholder="请选择" v-model="industriesOption">
                <a-select-option
                  :value="item.number"
                  v-for="(item, index) in industryList"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </div>
          </div> -->
          <div class="table-list">
            <Table :columns="industryColumns" :listData="industryListData">
              <!-- <template slot="state" slot-scope="{ record, text }">
                <span :style="{ color: text == '在线' ? 'red' : 'green' }">{{
                  text
                }}</span>
              </template> -->
            </Table>
          </div>
        </template>
      </pop-up-layer>

      <div class="right">
        <!-- <ul class="industries-father">
          <li class="industrries-child"></li>
        </ul> -->
      </div>
    </div>
    <VideoTree ref="VideoTree"></VideoTree>
  </div>
</template>

<script>
import {
  getTypesTotal,
  commonApi,
} from "../../../api/dustAndExplosionNew/index.js";
import Table from "@/components/APicture/c-table.vue";
import VideoTree from "@/components/APicture/videoTree/index.vue";
export default {
  data() {
    return {
      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),
      defaultParams: {
        body: {},
        page: -1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      treeShow: false,
      industriesOption: undefined,
      industryList: [
        { number: 24, title: "冶金" },
        { number: 18, title: "有色" },
        { number: 12, title: "建材" },
        { number: 36, title: "机械" },
        { number: 48, title: "轻工" },
        { number: 62, title: "纺织" },
        { number: 16, title: "烟草" },
        { number: 12, title: "商贸" },
      ],
      iconCamera: require("../../../assets/images/dustExplosion/icon_camera.png"),
      iconContact: require("../../../assets/images/dustExplosion/icon_contact.png"),
      //企业列表（右上角）
      industriesList: [
        { name: "未更新信息", num: 762, unit: "(家)" },
        { name: "未上报隐患", num: 435, unit: "(家)" },
        { name: "预期未整改", num: 106, unit: "(家)" },
      ],

      // 侧边企业列表
      selectThing: [
        // {
        //   key: 0,
        //   name: "粉尘涉爆企业",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "生产企业",
        //       active: false,
        //     },
        //     {
        //       childName: "经营企业",
        //       active: false,
        //     },
        //     {
        //       childName: "使用企业",
        //       active: false,
        //     },
        //     {
        //       childName: "危运车辆",
        //       active: false,
        //     },
        //     {
        //       childName: "运输企业",
        //       active: false,
        //     },
        //     {
        //       childName: "烟花爆竹",
        //       active: false,
        //     },
        //     {
        //       childName: "民爆企业",
        //       active: false,
        //     },
        //     {
        //       childName: "油气长输",
        //       active: false,
        //     },
        //   ],
        // },
        // {
        //   key: 1,
        //   name: "粉尘专项分类分布",
        //   active: false,
        //   show: true,
        //   children: [],
        // },
        // {
        //   key: 2,
        //   name: "事故分布",
        //   active: false,
        //   show: true,
        //   children: [],
        // },
        // {
        //   key: 3,
        //   name: "物联网设备",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "摄像头",
        //       active: false,
        //     },
        //     {
        //       childName: "传感器",
        //       active: false,
        //     },
        //   ],
        // },
        // {
        //   key: 4,
        //   name: "重点防护目标",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "脆弱目标",
        //       active: false,
        //     },
        //     {
        //       childName: "人群密集区",
        //       active: false,
        //     },
        //     {
        //       childName: "学校",
        //       active: false,
        //     },
        //   ],
        // },
        // {
        //   key: 5,
        //   name: "应急救援队伍",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "市属救援",
        //       active: false,
        //     },
        //     {
        //       childName: "区属救援",
        //       active: false,
        //     },
        //   ],
        // },
        // {
        //   key: 6,
        //   name: "应急救援资源",
        //   active: false,
        //   show: true,
        //   children: [
        //     {
        //       childName: "避难场所",
        //       active: false,
        //     },
        //     {
        //       childName: "疏散安置点",
        //       active: false,
        //     },
        //     {
        //       childName: "应急专家",
        //       active: false,
        //     },
        //     {
        //       childName: "医院",
        //       active: false,
        //     },
        //   ],
        // },
      ],

      sideIndustriesList: [
        {
          name: "粉尘涉爆企业",
          child: [
            { name: "生产企业" },
            { name: "经营企业" },
            { name: "使用企业" },
            { name: "危运车辆" },
            { name: "运输企业" },
            { name: "烟花爆竹" },
            { name: "民爆企业" },
            { name: "油气长输" },
          ],
        },
        {
          name: "粉尘专项分类分布",
          child: [],
        },
        {
          name: "事故分布",
          child: [],
        },
        {
          name: "物联网设备",
          child: [
            {
              name: "摄像头",
            },
            { name: "传感器" },
          ],
        },
        {
          name: "重点防护目标",
          child: [
            { name: "脆弱目标" },
            { name: "人群密集区" },
            { name: "学校" },
          ],
        },
        {
          name: "应急救援队伍",
          child: [{ name: "市属救援" }, { name: "区属救援" }],
        },
        {
          name: "粉尘涉爆企业",
          child: [
            { name: "避难场所" },
            { name: "疏散安置点" },
            { name: "应急专家" },
            { name: "医院" },
          ],
        },
      ],

      industryShow: false,
      industryTitle: "",

      industryColumns: [
        { textIndex: "key", title: "序号" },
        { textIndex: "name", title: "企业名称" },
        { textIndex: "region", title: "所属辖区" },
        { textIndex: "date", title: "最后隐患上报日期" },
        { textIndex: "inform", title: "通知" },
      ],
      industryListData: [
        {
          key: "1",
          name: "广州市增城环升竹制品加工部",
          region: "大田村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "2",
          name: "特百惠（中国）有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "3",
          name: "广州市长峰建筑材料有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "3",
          name: "广州市长峰建筑材料有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "3",
          name: "广州市长峰建筑材料有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "3",
          name: "广州市长峰建筑材料有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
        {
          key: "3",
          name: "广州市长峰建筑材料有限公司",
          region: "乌洲村村委会",
          date: "2020-09-13",
          inform: "通知",
        },
      ],

      // 树形控件
      treeData: [
        {
          title: "广州市",
          key: "0-0",
          children: [
            {
              title: "越秀区",
              key: "0-0-0",
              children: [
                { title: "东山街道", key: "0-0-0-0" },
                { title: "北京街道", key: "0-0-0-1" },
                { title: "光塔街道", key: "0-0-0-2" },
              ],
            },
            {
              title: "荔湾区",
              key: "0-0-1",
              children: [],
            },
            {
              title: "白云区",
              key: "0-0-2",
              children: [],
            },
            {
              title: "海珠区",
              key: "0-0-3",
              children: [],
            },
            {
              title: "天河区",
              key: "0-0-4",
              children: [],
            },
            {
              title: "番禺区",
              key: "0-0-5",
              children: [],
            },
            {
              title: "黄埔区",
              key: "0-0-6",
              children: [],
            },
            {
              title: "南沙区",
              key: "0-0-7",
              children: [],
            },
          ],
        },
      ],
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      isShowCamera: false,
      videoZMList: [],
      showTransport: false,
    };
  },
  created() {
    this.getVideoZM();
    this.getSidebarDatas();
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  components: {
    Table,
    VideoTree,
  },
  mounted() {
    this.init();
  },
  methods: {
    switchCamera($event) {
      // this.isShowCamera = !this.isShowCamera;
       console.log($event.offsetLeft);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
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
      commonApi(params, "nEuS0yYD").then((res) => {
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
    init() {
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(18);
      // 获取企业类型统计
      this.typeTotal();
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.selectThing[index].active = JSON.parse(JSON.stringify(!item.active));
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
      console.log(this.selectThing);
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
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 0);
        } else {
          console.error(res.message);
        }
      });
    },
    // 展示
    openShow(item, index) {
      item.show = !item.show;
      // 如果是展开 且 子级没有数据，则请求接口获取子级
      if (item.show && item.children.length == 0) {
        this.getSidebarChildren(item);
      }
      // this.selectThing[index].show = !this.selectThing[index].show;
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
      params.body.dictName = "PE_LAYER";
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

    // 获取企业统计信息
    typeTotal() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getTypesTotal(data).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            this.industriesList = JSON.parse(JSON.stringify(res.body.data));
          }
        }
      });
    },

    // 企业弹框
    industryOpen(title) {
      // return;
      console.log("企业弹框", title);
      this.industryShow = true;
      this.industryTitle = title;
      // this.industryTitle
    },

    close() {
      this.industryShow = false;
    },

    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },

    showCamera() {
      this.treeShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>