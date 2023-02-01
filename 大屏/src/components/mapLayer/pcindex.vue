<!--
 * @Description: 龙舟水-预警监测、决策辅助、基础数据、部门信息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-07-29 11:34:55
 * @LastEditTime: 2021-11-11 19:26:27
-->
<template>
  <div class="c-fiexd-model is-scrace-tree">
    <div class="fixedbox">
      <popup
        :src="url"
        :layerShow="layerShow"
        ref="popup"
        :popupTitle="popupTitle"
      />

      <ul class="fixed-model-list">
        <li
          v-for="(i, k) in newModelListData"
          :key="k"
          @click="clickActive(i, k)"
          :class="[activeKey === k ? 'activeli' : '']"
        >
          <img :src="getimg(i.name)" alt="" />
          <p>{{ getStr(i.name) }}</p>
        </li>
      </ul>
      <div class="fixed-select-list" v-if="activeKey || activeKey === 0">
        <div class="select-list-title">{{ title }}</div>
        <ul class="select-list-ul" v-show="!showDetection">
          <li
            v-for="(item, key) in treeDataChildren"
            :key="key"
            @click="doListActive(item, key)"
          >
            <img
              :src="getimg(item.name)"
              alt=""
              :class="[item.checked ? 'active_img' : '']"
            />
            <p :class="[item.checked ? 'active_p' : '']">{{ item.name }}</p>
          </li>
        </ul>
        <!-- 风险监测 -->
        <ul class="select-list-ul risk" v-show="showDetection">
          <li
            v-for="(item, key) in layerDetection"
            :key="key"
            @click="clickDetection(item, key)"
            :class="item.noTouch ? 'noTouch' : ''"
          >
            <div>
              <img :src="getimg(item.name)" alt="" />
              <img
                src="../../assets/images/dragonBoat/icon/u19.svg"
                alt=""
                v-show="item.checked"
                class="originCheck"
              />
            </div>
            <p :class="[item.checked ? 'active_p' : '']">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <transition name="slide-fade">
        <div class="detection" v-if="goon">
          <div class="detection_left">
            <div class="title">{{ detectionTitle }}</div>
            <!-- 强降雨 -->
            <heavy v-if="layerId == 14" />
            <!-- 水库 -->
            <reservoir v-if="layerId == 1" />
            <!-- 河流 -->
            <river v-if="layerId == 2" />
            <!-- 大风 -->
            <gale v-if="layerId == 5" />
            <!-- 交通 -->
            <traffic v-if="layerId == 6" />
            <!-- 视频监测 -->
            <monitoring v-if="layerId == 7" />
            <!-- 应急响应 -->
            <response v-if="layerId == 8" />
            <!-- 预警信号 -->
            <signal v-if="layerId == 11" />
            <!-- 风暴潮 -->
            <stormTide v-if="layerId == 12" />
            <!-- 地震速报 -->
            <quickReport v-if="layerId == 13" />
            <!-- 其他 -->
            <otherBox
              v-if="layerId == null"
              :columns="columns"
              :listData="listData"
              :total="total"
              :currentPage="currentPage"
              @position="position"
              @changePages="changePages"
              @doSearch="doSearch"
            >
            </otherBox>
          </div>
          <div
            class="detection_right"
            v-show="detectionTilteArr.length"
            :key="layerId"
          >
            <ul>
              <li
                v-for="(e, i) in detectionTilteArr"
                :key="i"
                :class="detectionTilteActive == i ? 'active_right' : ''"
                @click="detectionClick(e, i)"
              >
                {{ e.name }}
              </li>
            </ul>
            <div style="font-size: 18px,cursor: pointer;" @click="goonClick">
              <a-icon type="left" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Table from "@/components/APicture/c-table.vue";
import { getDatainfo } from "@/api/forestFire";
import reservoir from "@/components/mapLayer/components/reservoir.vue"; //水库
import heavy from "@/components/mapLayer/components/heavy.vue"; //强降雨
import river from "@/components/mapLayer/components/river.vue"; //河流
import gale from "@/components/mapLayer/components/gale.vue"; //河流
import traffic from "@/components/mapLayer/components/traffic.vue"; //交通
import monitoring from "@/components/mapLayer/components/monitoring.vue"; //视频监测
import response from "@/components/mapLayer/components/response.vue"; //应急响应
import signal from "@/components/mapLayer/components/signal.vue"; //预警信号
import stormTide from "@/components/mapLayer/components/stormTide.vue"; //风暴潮
import quickReport from "@/components/mapLayer/components/quickReport.vue"; //地震速报
import otherBox from "@/components/mapLayer/components/otherBox.vue"; //地震速报
import popup from "@/components/mapLayer/components/popup.vue"; //弹框
import Cookies from "js-cookie";
import { fixedListIcon } from "./index.js";
export default {
  components: {
    Table,
    reservoir,
    heavy,
    river,
    gale,
    traffic,
    monitoring,
    response,
    signal,
    stormTide,
    quickReport,
    otherBox,
    popup,
  },
  data() {
    return {
      activeKey: null,
      keywords: "",
      popupTitle: "",
      detectionListData: [],
      detectionareaContent: [],
      layerDetection: [
        { name: "强降雨", id: 14, layerId: 14, checked: false },
        { name: "水库", id: 1, layerId: 1, checked: false },
        { name: "河流", id: 2, layerId: 2, checked: false, noTouch: true },
        { name: "船舶", id: 3, layerId: 3, checked: false, noTouch: true },
        {
          name: "台风",
          id: 4,
          layerId: undefined,
          checked: false,
          url: `http://10.100.100.112/taifeng/web.html?token=${Cookies.get(
            "token"
          )}`,
        },
        { name: "大风", id: 5, layerId: 5, checked: false },
        { name: "交通路网", id: 6, layerId: 6, checked: false, noTouch: true },
        { name: "视频监控", id: 7, layerId: 7, checked: false },
        { name: "应急响应", id: 8, layerId: 8, checked: false },
        {
          name: "卫星云图",
          id: 9,
          layerId: undefined,
          checked: false,
          url: "http://tqyb.com.cn/gz/weatherLive/cloudPictureFull/",
        },
        {
          name: "雷达图",
          id: 10,
          layerId: undefined,
          checked: false,
          url: "http://tqyb.com.cn/gz/weatherLive/radarFullPub/",
        },
        {
          name: "预警信号",
          id: 11,
          layerId: 11,
          checked: false,
          noTouch: true,
        },
        { name: "风暴潮", id: 12, layerId: 12, checked: false, noTouch: true },
        {
          name: "地震速报",
          id: 13,
          layerId: 13,
          checked: false,
          noTouch: true,
        },
      ],

      notFind: require("../../assets/images/dragonBoat/newfixed/notFind.png"),
      newModelListData: [],
      detectionTilteArr: [],
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
      detectionColums: [
        {
          title: "序号",
          textIndex: "name",
          width: "40%",
        },
        {
          title: "区县",
          textIndex: "name",
          width: "40%",
        },
        {
          title: "站址",
          textIndex: "name",
          width: "40%",
        },
        {
          title: "雨量(mm)",
          textIndex: "name",
          width: "40%",
        },
        {
          title: "操作",
          textIndex: "name",
          width: "40%",
        },
      ],
      areaShow: false,
      layerShow: false,
      url: "",
      defaultParams: {
        body: {
          obtname: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      listData: [],
      detectionActive: 0,
      total: 1,
      currentPage: 1,
      treeDataChildren: [],
      title: "",
      interfaceCode: "",
      parentName: "",
      attribution: "",
      layerId: null,
      detectionTitle: "",
      detectionTilteArr: [],
      detectionTilteActive: 0,
      goon: false,
      showDetection: false,
    };
  },
  computed: {},
  methods: {
    goonClick() {
      this.goon = false;
    },

    //风险点击 右边
    detectionClick(e, i) {
      this.detectionTitle = e.name;
      this.detectionTilteActive = i;
      this.attribution = e.sid;
      if (e.interfaceCode) {
        this.getChildrenTable2(e.interfaceCode);
      } else {
        e.layerId ? (this.layerId = e.layerId) : (this.layerId = null);
        if (e.url) {
          this.goon = false;
          this.$refs.popup.layerShow = true;
          this.url = item.url;
          this.popupTitle = item.name;
        }
        if (e.interfaceCode == null) {
          this.getChildrenTable();
        }
      }
    },
    //风险监测
    getRiskdata(node) {
      getDatainfo("bGUr1G9u", { body: { parentId: node }, pageSize: 100 }).then(
        (res) => {
          if (res.success) {
            this.layerDetection.map((e) => {
              res.body.data.map((item) => {
                item.checked = false;
                if (e.name == item.name) {
                  item.layerId = e.layerId;
                  if (e.url) {
                    item.url = e.url;
                  }
                  if (e.noTouch) {
                    item.noTouch = e.noTouch;
                  }
                }
              });
            });

            this.detectionTilteArr.map((e) => {
              res.body.data.map((item) => {
                if (e.sid == item.sid) {
                  item.checked = true;
                }
              });
            });
            this.layerDetection = res.body.data;
          }
        }
      );
    },
    playDot(node) {
      getDatainfo(node.interfaceCode, { body: {}, page: -1 }).then((res) => {
        if (res.success) {
          if (
            node.name == "避难场所" ||
            node.name == "应急场所" ||
            node.name == "应急队伍" ||
            node.name == "提防" ||
            node.name == "堤防" ||
            node.name == "雨量站" ||
            node.name == "水位监测" ||
            node.name == "内涝点" ||
            node.name == "重点监控区域(视频)" ||
            node.name == "涉危企业" ||
            node.name == "地铁站" ||
            node.name == "堤防"
          ) {
            return;
          } else {
            this.getUniversalGPS(res.body.data, node);
          }
        }
      });
    },
    //仓库
    getWarehouseGPS() {
      var title = [
        { title: "仓库名称", textIndex: "name" },
        { title: "负责人", textIndex: "contacts" },
        { title: "电话", textIndex: "phone" },
        { title: "储备总量", textIndex: "measureArea" },
        { title: "地址", textIndex: "address" },
      ];
      getDatainfo("sHBeU7jq", { body: {} }).then((res) => {
        if (res.success) {
          var objs = {
            imgUrl: "gzznGIS/Image/gjh/jzwz" + 1 + ".png",
            imgSize: { width: 40, height: 36 },
            type: "defaultTypejzwz" + 1,
            layerName: "救灾物资",
            info: title,
          };
          var items = pGzznCore.deepClone(res.body.data);
          pGzznCore.setPointLayerToMap(items, objs);
        }
      });
    },
    //风险点击
    clickDetection(item, key) {
      if (item.noTouch) {
        return;
      }

      item.checked = !item.checked;
      this.detectionTitle = item.name;
      let index = this.detectionTilteArr.findIndex((e) => e.name === item.name);
      this.detectionTilteActive = this.detectionTilteArr.length;
      if (item.checked) {
        this.detectionTilteArr.push(item);
        if (item.name == "强降雨") {
          this.getRains(item);
        }
        if(item.name == '大风'){
          this.getGale(item)
        }
        if (item.url) {
          this.$refs.popup.layerShow = true;
          this.url = item.url;
          this.popupTitle = item.name;
        } else {
          this.goon = true;
        }

        this.layerId = item.layerId;
      } else {
        this.detectionTilteArr.splice(index, 1);
        if (this.detectionTilteArr.length == 0) {
          this.goon = false;
        }
        if (item.url) {
          this.$refs.popup.layerShow = false;
        }
        if (item.name == "强降雨") {
          pGzznCore.pointLayerRemove({ type: "defaultTypeRain" });
        }
          if (item.name == "大风") {
          pGzznCore.pointLayerRemove({ type: "defaultTypeGale" });
        }
      }
    },
    //强降雨
    getRains(item) {
      getDatainfo("J51XySin", { body: {}, page: -1 }).then((res) => {
        if (res.success) {
          let lists = res.body.data;
          // var items = pGzznCore.deepClone(lists);
          var title = [
            {
              title: "区县",
              textIndex: "district",
            },
            {
              title: "站址",
              textIndex: "obtname",
            },
            {
              title: "雨量（mm）",
              textIndex: "hourrf",
            },
          ];
          var objs = {
            imgUrl: require("../../assets/images/dragonBoat/icon/u14.svg"),
            imgSize: { width: 40, height: 40 },
            type: "defaultTypeRain",
            layerName: "强降雨",
            info: title,
            lonLat: { lon: "lon1", lat: "lat1" },
          };
          pGzznCore.setPointLayerToMap(lists, objs);
        }
      });
    },
    //大风
    getGale() {
      getDatainfo("AMNiZVo3", { body: {}, page: -1 }).then((res) => {
        if (res.success) {
          let lists = res.body.data;
          var title = [
            {
              title: "区县",
              textIndex: "district",
            },
            {
              title: "站址",
              textIndex: "obtname",
            },
            {
              title: "风速（m/s）",
              textIndex: "wdidf",
            },
          ];
          var objs = {
            imgUrl: require("../../assets/images/dragonBoat/icon/u58.svg"),
            imgSize: { width: 40, height: 35 },
            type: "defaultTypeGale",
            layerName: "风速",
            info: title,
            isFlagPopule: true,
            lonLat: { lon: "lon1", lat: "lat1" },
          };
          pGzznCore.setPointLayerToMap(lists, objs);
        }
      });
    },
    getStr(data) {
      let name;
      if (data == "消防一张图数据内容") {
        name = data.substring(0, 5);
      } else {
        name = data.substring(0, 4);
      }
      return name;
    },
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
      } else {
        this.getSingle(node);
      }
    },
    isScrace() {
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      const columnNum = heightClint / 1300;
      const widthScrac = parseFloat((widthClint / 2400).toFixed(2)); // 宽度
      const divs = document.querySelector(".is-scrace-tree");
      divs.style.transform = `scale(${widthScrac},${columnNum})`;
      divs.style.transformOrigin = "0 0";
    },
    getimg(name) {
      return fixedListIcon.find((e) => e.name == name)?.icon ?? this.notFind;
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
    getPrecipitation() {
      getDatainfo("jbv3vyrP", this.defaultParams).then((res) => {
        if (res.success) {
          this.detectionareaContent = res.body.data;
        }
      });
    },
    //获取子节点
    getChildrenTree(node) {
      getDatainfo("bGUr1G9u", { body: { parentId: node }, pageSize: 100 }).then(
        (res) => {
          if (res.success) {
            res.body.data.map((e, i) => {
              e.checked = false;
              this.detectionTilteArr.map((item) => {
                if (e.sid == item.sid) {
                  res.body.data[i].checked = true;
                }
              });
            });
            this.treeDataChildren = res.body.data;
          }
        }
      );
    },

    //左侧标题点击
    clickActive(i, k) {
      if (k === this.activeKey) {
        this.activeKey = null;
        this.goon = false;
        return false;
      }
      if (i.sid == 3) {
        this.getRiskdata(i.sid);
        this.showDetection = true;
      } else {
        this.showDetection = false;
        this.getChildrenTree(i.sid);
      }
      this.activeKey = k;
      this.title = i.name;
    },
    //搜索
    doSearch(val) {
      this.currentPage = 1;
      if (this.interfaceCode == null) {
        this.getChildrenTable(val);
      } else {
        this.getChildrenTable2(this.interfaceCode, val);
      }
    },

    //获取三级数据
    getChildrenTable(val) {
      let data = {
        body: { attribution: this.attribution, name: val },
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
    getSingle(data) {
      console.log(data,'data');
      if (data.lat || data.lon) {
        var List = [
          { title: "名称", textIndex: "name" },
          { title: "地址", textIndex: "address" },
        ];
        var items = pGzznCore.deepClone([data]);
        let imgUrl = this.getimg(data.parentName);
        var objs = {
          imgUrl,
          imgSize: { width: 40, height: 36 },
          type : "defaultType" + data.parentName ,
          layerName: data.name,
          info: List,
          isFlagPopule: true,
          data: items,
        };
        // pGzznCore.setPointLayerToMap(items, objs, () => {
        //   pGzznCore.flyToPoint({ x: data.lon, y: data.lat, z: 13673 }, objs);
        // });
           pGzznCore.flyToPoint({ x: data.lon, y: data.lat, z: 13673 }, objs);
        // pGzznCore.setPointLayerToMap(items, objs);
      }
    },
    publicGPS(){







    },
       


    // 点击 图标
    doListActive(item, key) {
      console.log(item.interfaceCode,'interfaceCode');
      console.log(item,'item');
      this.detectionTitle = item.name;
      this.currentPage = 1;
      item.checked = !item.checked;
      this.layerId = null;
      this.parentName = item.name;
      this.interfaceCode = item.interfaceCode;
      this.attribution = item.sid;
      let index = this.detectionTilteArr.findIndex((e) => e.name === item.name);
      this.detectionTilteActive = this.detectionTilteArr.length;
      let type = "defaultType" + item.name;
      this.switchCamera(item.name);
      if (item.checked) {
        this.detectionTilteArr.push(item);
        // if (item.name == "仓库") {
        //   this.getWarehouseGPS();
        // }
        if (item.interfaceCode != null) {
          this.getChildrenTable2(item.interfaceCode);
          this.playDot(item);
        } else {
          this.getChildrenTable();
        }
        this.goon = true;
      } else {
        pGzznCore.pointLayerRemove({ type });
        this.listData = [];
        this.detectionTilteArr.splice(index, 1);
        if (this.detectionTilteArr.length == 0) {
          this.goon = false;
        }
      }
          },

    //打点
    switchCamera(name) {
      if (name == "机场") {
        pGzznCore.addPromiseAirport();
      } else if (name == "火车") {
        pGzznCore.addPromiseRailway();
      } else if (name == "地铁") {
        pGzznCore.addPromiseMetro();
      } else if (name == "港口") {
        pGzznCore.addPromiseHarbor();
      }
    },
    //通用打点
    getUniversalGPS(lists, node) {
      var items = pGzznCore.deepClone(lists);
      let type = "defaultType" + node.name;
      var List = [
        { title: "名称", textIndex: "name" },
        { title: "类型", textIndex: "fhmblxmc" },
        { title: "地址", textIndex: "address" },
      ];
      let imgUrl = this.getimg(node.name);
      var objs = {
        imgUrl,
        imgSize: { width: 40, height: 36 },
        type,
        layerName: lists[0].parentName,
        info: List,
      };

      pGzznCore.setPointLayerToMap(items, objs);
      
    },
    //另外类型接口  有指标
    getChildrenTable2(node, val) {
      let data = {
        body: { name: val },
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

  computed: {},
  mounted() {
    this.getData();
    this.getPrecipitation();
    this.$nextTick(() => {
      this.isScrace();
    });
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";

.popup {
  position: absolute;
  z-index: 99999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .c-layer-position {
    top: 0;
    left: 0;
    transform: none;
  }
}
/deep/.ant-select-selection {
  background-color: none !important;
}
.detectionActive {
  display: block !important;
  color: #fff;
}

.fade-enter {
  opacity: 0;
  transform: translateX(-300px);
}
.fade-leave-to {
  opacity: 0;
  //  transform: translateX(-400px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}

.risk {
  li {
    position: relative;
    div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px !important;
        height: 30px !important;
      }
      .originCheck {
        position: absolute;
        right: 28px;
        top: -3px;
        width: 20px !important;
        height: 20px !important;
      }
    }
    p {
      font-size: 14px !important;
      margin-top: 4px;
    }
  }
}

.noTouch {
  opacity: 0.6;
  // cursor: not-allowed !important;
}
</style>
