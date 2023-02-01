<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-09 11:11:32
 * @LastEditTime: 2021-09-16 16:23:20
-->
<template>
  <div>
    <pop-up-layer
      v-show="show"
      :show="show"
      :setStyles="{}"
      @doClose="allCenterBtnClose"
      opsition="btnRight"
      :title="title"
      ref="realTimeChecks"
      class="real-time-check"
    >
      <template slot="content">
        <div class="detail-content">
          <div class="detail-content-left">
            <a-tree
              v-if="treeData.length"
              :load-data="onLoadData"
              :tree-data="treeData"
              :replaceFields="replaceTreeFields"
              @select="treeSelect"
            />
          </div>
          <div class="detail-content-right" v-show="!rightAllObj.allTableShow">
            <div
              class="content-right-top"
              v-if="parentData && parentData.k !== 3"
            >
              <div class="right-top-left">
                <ul v-if="showObj.rightTopLeftList">
                  <li v-for="(i, k) in showObj.rightTopLeftList" :key="k">
                    <label for="">{{ i.lableName }}</label>
                    <span>{{ i.lableNameValue }}</span>
                  </li>
                </ul>
              </div>
              <div class="right-top-right">
                <div
                  class="top-right-task"
                  v-if="showObj.rightTopLeftList"
                  v-show="btnActive === 0"
                >
                  <p v-for="(i, k) in showObj.rightTopShowList" :key="k">
                    <label for="">{{ i.name }}</label>
                    <span>{{ i.value }}</span>
                  </p>
                  <!-- <p>
                  <label for="">警戒库容(m³):</label>
                  <span>{{ showObj.rightTopLeftList.warningCapacity }}</span>
                </p>
                <p>
                  <label for="">戒需水量(m³):</label>
                  <span>{{ showObj.rightTopLeftList.warningWaterNum }}%</span>
                </p> -->
                </div>
                <div class="top-btn-change">
                  <p
                    v-for="(i, k) in btnList"
                    :key="k"
                    :class="btnActive === k ? 'active' : ''"
                    @click="btnClick(i, k)"
                  >
                    {{ i.name }}
                  </p>
                </div>
                <div
                  v-show="btnActive === 0"
                  class="top-lists"
                  v-if="
                    showObj.rightTopListHeader &&
                    showObj.rightTopListHeader.length
                  "
                >
                  <clist
                    :columns="showObj.rightTopListHeader"
                    :listData="showObj.rightTopListContent"
                  ></clist>
                </div>
                <div v-show="btnActive === 1" class="right-top-chart"></div>
              </div>
            </div>
            <div
              class="content-right-top"
              v-if="parentData && parentData.k === 3"
            >
              <div class="right-top-full">
                <ul
                  v-if="
                    showObj.rightTopLeftList && showObj.rightTopLeftList.length
                  "
                >
                  <li v-for="(i, k) in showObj.rightTopLeftList" :key="k">
                    <label for="">{{ i.lableName }}</label>
                    <span>{{ i.lableNameValue }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="content-right-bottom">
              <div class="right-bottom-inner example-3d">
                <swiper class="swiper" :options="swiperOption">
                  <swiper-slide v-for="(i, k) in showObj.videoList" :key="k">
                    <div class="video-inner">
                      <video
                        muted="muted"
                        autoplay="autoplay"
                        loop="loop"
                        src="../../../assets/media/contact_point.mp4"
                      ></video>
                      <p>{{ i.name }}</p>
                    </div>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>

          <div class="detail-content-right" v-show="rightAllObj.allTableShow">
            <div class="right-content-search">
              <div class="search">
                <input
                  type="text"
                  placeholder="请输入名称搜索"
                  v-model="searchValue"
                />
                <span @click="doSearch">搜索</span>
              </div>
              <div>
                <button class="video-discussion">视频会商</button>
                <button
                  class="checkedAll"
                  @click="checkedAllClick"
                  v-show="rightAllObj.contentList.length != 0"
                >
                  全选
                </button>
              </div>
            </div>
            <div class="content-right-all">
              <clist
                :columns="rightAllObj.headerList"
                :listData="rightAllObj.contentList"
              >
                <template slot="hiddenStatus" slot-scope="{ record, text }">
                  {{ text ? "是" : "否" }}
                </template>
                <template slot="phone" slot-scope="{ record, text }">
                  {{ text
                  }}<a-icon
                    type="phone"
                    class="icon"
                    @click="clickMobilePhone(record, $event)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="clickMessage(record, $event)"
                    v-show="text"
                  />
                </template>

                <template
                  slot="administrationPhone"
                  slot-scope="{ record, text }"
                >
                  {{ text
                  }}<a-icon
                    type="phone"
                    class="icon"
                    @click="clickAdministrationPhone(record, $event)"
                    v-show="text"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="clickAdministrationMessage(record, $event)"
                    v-show="text"
                  />
                </template>
                <template slot="checked" slot-scope="{ record, text, index }">
                  <div
                    class="checked mouse-click"
                    @click="checkedClick(record, index)"
                  >
                    {{ text ? "√" : "" }}
                  </div>
                </template>
                <template slot="name" slot-scope="{ record, text }">
                  <div @click="goDetail(record, text)" style="cursor: pointer">
                    {{ text }}
                  </div>
                </template>
              </clist>
              <div class="list-change-page">
                <ChangePage
                  :total="total"
                  :currentPage="currentPage"
                  @changePages="clickChangePages"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>
<script>
import Clist from "@/components/APicture/c-table";
import ChangePage from "@/components/APicture/changePage";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import "swiper/css/swiper.css";
import {
  getReservoirWaterDetail, // 水库水情-detail
  getRiversWaterDetail, // 河湖水情-detail
  getPumpLockWaterDetail, // 泵站水闸水情-detail
  getWaterloggingDetail, // 积水内涝点-detail
  getThreeListApi,
  getReservoirApi,
} from "../../../api/theCityThreeProofing";
export default {
  components: {
    Clist,
    Swiper,
    SwiperSlide,
    ChangePage,
    ContactPhone,
    MessageSend,
  },
  data() {
    return {
      selected: [],
      show: false,
      title: "水情水库",
      parentData: {},
      // 默认列表
      total: 0,
      currentPage: 1,
      searchValue: null,
      // 展示数据
      treeData: [
        {
          title: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
        },
      ],
      btnActive: 0,
      btnList: [
        { name: "列表", key: 0 },
        { name: "图表", key: 1 },
      ],
      treeSelectObj: {
        name: null,
        areaCode: null,
      },
      // 进入，列表
      rightAllObj: {
        allTableShow: true,
        headerList: [],
        contentList: [],
      },
      // 点击到具体
      showObj: {
        rightTopLeftList: [],
        rightTopShowList: [],
        rightTopListHeader: [],
        rightTopListContent: [],
        videoList: [],
      },
      replaceTreeFields: {
        children: "children",
        title: "name",
        key: "sn",
        isLeaf: false,
      },
      // 底部视频
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 2,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  mounted() {
    this.$on("show", (data) => {
      console.log(data);
      this.initDataAll();
      this.show = !this.show;

      if (this.show) {
        // 打开
        this.parentData = data;
        this.title = `${data.i.title}-${data.pageTypeName}`;
        this.$refs.realTimeChecks.saveEvent = data.saveEvent;
        this.initDataset();
        if (this.parentData.k || this.parentData.k === 0) {
          this.getRemoteDatas(this.parentData.k);
          this.getAllListHeader(this.parentData.k);
        }
        this.getThreeList();
        this.$nextTick(() => {});
      } else {
        // 关闭
      }
    });
  },
  methods: {
    /**
     * @description: 水库水情-河湖水情-泵站水闸水情-积水内涝点 单选框的切换
     * @param {*} record
     * @param {*} index
     * @return {*}
     */
    checkedClick(record, index) {
      this.rightAllObj.contentList[index].checked =
        !this.rightAllObj.contentList[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.rightAllObj.contentList));
    },

    /**
     * @description: 水库水情-河湖水情-泵站水闸水情-积水内涝点 打电话与发短信
     * @param {*}
     * @return {*}
     */
    clickMobilePhone(record, e) {
      let { contacts, phone } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: contacts,
        phone,
      });
    },
    clickMessage(record, e) {
      let { contacts, phone } = record;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: contacts,
        phone,
      });
    },

    clickAdministrationPhone(record, e) {
      let { administrationPhone, administrationName } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationPhone,
      });
    },
    clickAdministrationMessage(record, e) {
      let { administrationPhone, administrationName } = record;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationPhone,
      });
    },

    /**
     * @description: 水库水情-河湖水情-泵站水闸水情-积水内涝点 点击全选
     * @param {*}
     * @return {*}
     */
    checkedAllClick() {
      let data = this.rightAllObj.contentList.filter((item) => item.checked);
      console.log("选中了", data);
      this.rightAllObj.contentList.map((item) => {
        if (data.length === this.rightAllObj.contentList.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      })
    },

    // 初始化所有数据
    initDataAll() {
      this.searchValue = null;
      this.total = 0;
      this.currentPage = 1;
      this.treeSelectObj = {
        name: null,
        areaCode: null,
      };
      this.treeData = [];
      this.treeData = [
        {
          title: "广州市",
          key: "440100000000",
          en: "440100000000",
          sn: "440100000000",
          isLeaf: false,
        },
      ];
    },
    initDataset() {
      this.initRightLeftList();
    },
    initRightLeftList() {
      let currentObj = {
        0: {
          rightTopLeftList: [
            {
              lableName: "名称：",
              lableNameValue: "地下水库",
              getName: "name",
            },
            {
              lableName: "地址：",
              lableNameValue: "白云区XXXXXXXXXX",
              getName: "address",
            },
            {
              lableName: "总库容（万m³）：",
              lableNameValue: "15",
              getName: "",
            },
            {
              lableName: "保护人口（万人）：",
              lableNameValue: "15",
              getName: "",
            },
            {
              lableName: "联系人：",
              lableNameValue: "15",
              getName: "contacts",
            },
            {
              lableName: "联系人电话：",
              lableNameValue: "15919306879",
              getName: "phone",
            },
            {
              lableName: "是否存在隐患：",
              lableNameValue: "是",
              getName: "",
            },
          ],
          rightTopShowList: [
            { name: "警戒水位:", value: "1.17" },
            { name: "警戒库容(m³):", value: "2587" },
            { name: "戒需水量(m³):", value: "45.10%" },
          ],
          rightTopListHeader: [
            { title: "时间", index: 0, textIndex: "time", width: "25%" },
            {
              title: "实时水位（m）",
              index: 1,
              textIndex: "realtimeWater",
              width: "25%",
            },
            {
              title: "当前库容（m³）",
              index: 2,
              textIndex: "currentCapacity",
              width: "25%",
            },
            {
              title: "蓄水量（m³）",
              index: 3,
              textIndex: "storageCapacity",
              width: "25%",
            },
          ],
          rightTopListContent: [
            // {
            //   time: "2021-08-10 12:00:00",
            //   realTimeWaterLeve: "1.51",
            //   currentCapacity: "2678",
            //   storageCapacity: "45.12%",
            // },
            // {
            //   time: "2021-08-10 12:00:00",
            //   realTimeWaterLeve: "1.51",
            //   currentCapacity: "2678",
            //   storageCapacity: "45.12%",
            // },
            // {
            //   time: "2021-08-10 12:00:00",
            //   realTimeWaterLeve: "1.51",
            //   currentCapacity: "2678",
            //   storageCapacity: "45.12%",
            // },
            // {
            //   time: "2021-08-10 12:00:00",
            //   realTimeWaterLeve: "1.51",
            //   currentCapacity: "2678",
            //   storageCapacity: "45.12%",
            // },
            // {
            //   time: "2021-08-10 12:00:00",
            //   realTimeWaterLeve: "1.51",
            //   currentCapacity: "2678",
            //   storageCapacity: "45.12%",
            // },
          ],
          videoList: [
            { name: "视频1", url: "" },
            { name: "视频2", url: "" },
            { name: "视频3", url: "" },
            { name: "视频4", url: "" },
          ],
        },
        1: {
          rightTopLeftList: [
            {
              lableName: "名称：",
              lableNameValue: "牛心岭上",
              getName: "name",
            },
            {
              lableName: "地址：",
              lableNameValue: "白云区XXXXXXXXXX",
              getName: "address",
            },
            {
              lableName: "联系人：",
              lableNameValue: "15",
              getName: "contacts",
            },
            {
              lableName: "联系人电话：",
              lableNameValue: "15919306879",
              getName: "phone",
            },
            {
              lableName: "是否存在隐患：",
              lableNameValue: "否",
              getName: "hiddenStatus",
            },
          ],
          rightTopShowList: [{ name: "警戒水位:", value: "1.17" }],
          rightTopListHeader: [
            { title: "时间", index: 0, textIndex: "time", width: "50%" },
            {
              title: "实时水位（m）",
              index: 1,
              textIndex: "realtimeWater",
              width: "50%",
            },
          ],
          rightTopListContent: [
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
          ],
          videoList: [
            { name: "视频1", url: "" },
            { name: "视频2", url: "" },
            { name: "视频3", url: "" },
            { name: "视频4", url: "" },
          ],
        },
        2: {
          rightTopLeftList: [
            {
              lableName: "名称：",
              lableNameValue: "地下水库",
              getName: "name",
            },
            {
              lableName: "地址：",
              lableNameValue: "白云区XXXXXXXXXX",
              getName: "address",
            },
            {
              lableName: "装机容量（千瓦）：",
              lableNameValue: "15",
              getName: "installedCapacity",
            },
            {
              lableName: "设计流量（m3/s）：",
              lableNameValue: "15",
              getName: "designFlow",
            },
            {
              lableName: "联系人：",
              lableNameValue: "15",
              getName: "contacts",
            },
            {
              lableName: "联系人电话：",
              lableNameValue: "15919306879",
              getName: "phone",
            },
            {
              lableName: "是否存在隐患：",
              lableNameValue: "是",
              getName: "hiddenStatus",
            },
          ],
          rightTopShowList: [{ name: "警戒水位:", value: "1.17" }],
          rightTopListHeader: [
            { title: "时间", index: 0, textIndex: "time", width: "50%" },
            {
              title: "实时水位（m）",
              index: 1,
              textIndex: "realtimeWater",
              width: "50%",
            },
          ],
          rightTopListContent: [
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
            {
              time: "2021-08-10 12:00:00",
              realTimeWaterLeve: "1.51",
            },
          ],
          videoList: [
            { name: "视频1", url: "" },
            { name: "视频2", url: "" },
            { name: "视频3", url: "" },
            { name: "视频4", url: "" },
          ],
        },
        3: {
          rightTopLeftList: [
            {
              lableName: "名称：",
              lableNameValue: "地下水库",
              getName: "name",
            },
            {
              lableName: "地址：",
              lableNameValue: "白云区XXXXXXXXXX",
              getName: "address",
            },
            {
              lableName: "程度：",
              lableNameValue: "轻度内涝",
              getName: "degree",
            },
            {
              lableName: "责任单位：",
              lableNameValue: "越秀区建设和水务局",
              getName: "responsibleUnit",
            },
            {
              lableName: "行政责任人及联系电话：",
              lableNameValue: "张乐-13800138000",
              getName: "administrationName",
            },
            {
              lableName: "技术责任人及联系电话：",
              lableNameValue: "张乐-13800138000",
              getName: "skillName",
            },
            {
              lableName: "日常管养责任人及联系电话：",
              lableNameValue: "张乐-13800138000",
              getName: "maintenanceName",
            },
            {
              lableName: "治理进展情况：",
              lableNameValue:
                "针对此处水浸的“广州市深层隧道排水管理系统东濠涌试验段工程”正在进行",
              getName: "governanceProgress",
            },
          ],
          rightTopShowList: [{ name: "警戒水位:", value: "1.17" }],
          videoList: [
            { name: "视频1", url: "" },
            { name: "视频2", url: "" },
          ],
        },
      };
      if (this.parentData.k || this.parentData.k === 0) {
        this.showObj = JSON.parse(
          JSON.stringify(currentObj[this.parentData.k])
        );
        console.log("this.showObj", this.showObj);
      }
    },
    initChart() {
      this.rightTopChartDiv = this.$echarts.init(
        document.querySelector(".right-top-chart")
      );
      this.rightTopChartDiv.setOption(this.lineChart());
    },
    goDetail(record, text) {
      console.log("点击水库", text);
      this.rightAllObj.allTableShow = false;
      let showKey = this.parentData.k;
      let sendObj = {
        body: { sid: record.sid },
        page: 1,
        pageSize: 10,
      };
      switch (showKey) {
        case 0:
          this.getReservoirData(record.sid);
          this.getReservoirRealMonitorData(record.sid);
          break;
        case 1:
          this.doGetRiversWaterDetail(sendObj).then((res) => {
            if (res.success) {
              if (res.body.data && res.body.data.length) {
                let responeData = res.body.data[0];
                this.showObj.rightTopLeftList.map((i, k) => {
                  this.showObj.rightTopLeftList[k].lableNameValue =
                    responeData[i.getName];
                });
                console.log(
                  this.showObj.rightTopLeftList,
                  "this.showObj.rightTopLeftList"
                );
              }
            }
          });
          this.getReservoirRealMonitorData(record.sid);
          break;
        case 2:
          this.doGetPumpLockWaterDetail(sendObj).then((res) => {
            if (res.success) {
              if (res.body.data && res.body.data.length) {
                let responeData = res.body.data[0];
                this.showObj.rightTopLeftList.map((i, k) => {
                  i.lableNameValue = responeData[i.getName];
                });
              }
            }
          });
          this.getReservoirRealMonitorData(record.sid);
          break;
        case 3:
          this.doGetWaterloggingDetail(sendObj).then((res) => {
            if (res.success) {
              if (res.body.data && res.body.data.length) {
                let responeData = res.body.data[0];
                this.showObj.rightTopLeftList.map((i, k) => {
                  i.lableNameValue = responeData[i.getName];
                });
              }
            }
          });
          break;
      }
      console.log(1111111);
    },
    // 获取默认打开的列表
    getAllListHeader(k) {
      this.rightAllObj = {
        allTableShow: true,
        headerList: [],
        contentList: [],
      };
      switch (k) {
        case 0:
          this.rightAllObj["headerList"] = [
            { title: "名称", index: 0, textIndex: "name", width: "15%" },
            { title: "地址", index: 1, textIndex: "address", width: "40%" },
            {
              title: "总库客(万m³)",
              index: 2,
              textIndex: "storageTotal",
              width: "15%",
            },
            {
              title: "保护人口(万人)",
              index: 3,
              textIndex: "protectPopulation",
              width: "30%",
            },
            { title: "联系人", index: 4, textIndex: "contacts", width: "20%" },
            { title: "联系人电话", index: 5, textIndex: "phone", width: "30%" },
            {
              title: "是否存在隐患",
              index: 6,
              textIndex: "hiddenStatus",
              width: "30%",
            },
            { title: "", index: 4, textIndex: "checked", width: "10%" },
          ];
          break;
        case 1:
          this.rightAllObj["headerList"] = [
            { title: "名称", index: 0, textIndex: "name", width: "15%" },
            { title: "地址", index: 1, textIndex: "address", width: "40%" },
            { title: "联系人", index: 4, textIndex: "contacts", width: "20%" },
            { title: "联系人电话", index: 5, textIndex: "phone", width: "30%" },
            {
              title: "是否存在隐患",
              index: 6,
              textIndex: "hiddenStatus",
              width: "30%",
            },
            { title: "", index: 4, textIndex: "checked", width: "10%" },
          ];
          break;
        case 2:
          this.rightAllObj["headerList"] = [
            { title: "名称", index: 0, textIndex: "name", width: "15%" },
            { title: "地址", index: 1, textIndex: "address", width: "40%" },
            {
              title: "装机容量(千瓦)",
              index: 2,
              textIndex: "installedCapacity",
              width: "15%",
            },
            {
              title: "设计流量（m3/s）",
              index: 3,
              textIndex: "designFlow",
              width: "30%",
            },
            { title: "联系人", index: 4, textIndex: "contacts", width: "20%" },
            { title: "联系人电话", index: 5, textIndex: "phone", width: "30%" },
            {
              title: "是否存在隐患",
              index: 6,
              textIndex: "hiddenStatus",
              width: "30%",
            },
            { title: "", index: 4, textIndex: "checked", width: "10%" },
          ];
          break;
        case 3:
          this.rightAllObj["headerList"] = [
            { title: "名称", index: 0, textIndex: "name", width: "15%" },
            { title: "地址", index: 1, textIndex: "address", width: "40%" },
            {
              title: "程度",
              index: 2,
              textIndex: "degree",
              width: "15%",
            },
            {
              title: "责任单位",
              index: 3,
              textIndex: "responsibleUnit",
              width: "30%",
            },
            {
              title: "责任负责人",
              index: 4,
              textIndex: "administrationName",
              width: "20%",
            },
            {
              title: "责任负责人联系电话",
              index: 5,
              textIndex: "administrationPhone",
              width: "30%",
            },
            { title: "", index: 4, textIndex: "checked", width: "10%" },
          ];
          break;
        default:
          break;
      }
    },
    // 获取水库水情  详情
    getReservoirData(obj, pages = 1, pageSize = 10) {
      getReservoirApi({
        codes: "72BEfbRK",
        body: {
          sid: obj,
        },
      }).then((res) => {
        if (res.success) {
          console.log("获取水库水情-详情", res);
          if (res.body.data && res.body.data.length) {
            let responeData = res.body.data[0];
            this.showObj.rightTopLeftList.map((i, k) => {
              this.showObj.rightTopLeftList[k].lableNameValue =
                responeData[i.getName];
            });
          }
          /*   this.showObj.rightTopLeftList = JSON.parse(
            JSON.stringify(res.body.data[0])
          ); */
        }
      });
    },
    // 获取水库水情  实时监测数据
    getReservoirRealMonitorData(obj, pages = 1, pageSize = 10) {
      const typeCodeObj = {
        0: "GsFk88WT",
        1: "5L5NwKAs",
        2: "LpKOKegJ",
      };
      getReservoirApi({
        codes: typeCodeObj[this.parentData.k],
        body: {
          reservoirUnique: obj,
        },
      }).then((res) => {
        if (res.success) {
          console.log("获取水库水情-实时监测数据", res);
          this.showObj.rightTopListContent = JSON.parse(
            JSON.stringify(res.body.data)
          );
          // this.showObj.rightTopLeftList = JSON.parse(
          //   JSON.stringify(res.body.data[0])
          // );
        }
      });
    },

    allCenterBtnClose() {
      this.show = false;
    },

    onLoadData(treeNode) {
      console.log("水库水情", treeNode);
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        if (treeNode.dataRef.types < 3) {
          this.getSecondThreeList(treeNode.eventKey)
            .then((res) => {
              // let dataList =
              if (res.success) {
                console.log("关系树数据", res);
                if (res.body.data && res.body.data.length) {
                  treeNode.dataRef.children = res.body.data;
                  this.treeData = [...this.treeData];
                  resolve();
                } else {
                  resolve();
                }
              }
            })
            .catch((err) => {
              if (err) {
                resolve();
              }
            });
        } else {
          let codeObj = {
            0: "AtbyBgqV",
            1: "MaKLgjna",
            2: "BrxhdzTF",
            3: "YTkebhCI",
          };
          console.log(
            "this.parentData.k",
            this.parentData.k,
            codeObj[this.parentData.k]
          );
          let sendObj = {
            codes: codeObj[this.parentData.k],
            areaCode: treeNode.dataRef.sn,
          };
          this.getAreaAnyList(sendObj)
            .then(async (res) => {
              console.log("水库名称", res);
              if (res.success) {
                if (res.body.data && res.body.data.length) {
                  let arr = [];
                  let arr2 = res.body.data.map((i, key) => {
                    i = {
                      ...i,
                      sn: i.areaCode + i.sid,
                      isLeaf: true,
                    };
                    arr.push(i);
                  });
                  treeNode.dataRef.children = arr;
                  this.treeData = [...this.treeData];
                }
                resolve();
              } else {
                resolve();
              }
            })
            .catch((err) => {
              if (err) {
                resolve();
              }
            });
        }
      });
    },
    // 切换图标和表
    btnClick(i, k) {
      this.btnActive = k;
      this.$nextTick(() => {
        this.initChart();
      });
    },
    // 获取接口数据
    getRemoteDatas(k) {
      let send = { body: { sn: "440100000000" }, page: 1, pageSize: 10 };
      switch (k) {
        case 0:
          this.getReservoirList();
          /*  getReservoirWaterDetail({ body: { sn: "440100000000" } })
            .then((res) => {
              if (res.success) {
                console.log("success", res);
              } else {
                this.$message.error("");
              }
            })
            .catch((err) => {
              if (err) {
                console.log(888);
              }
            }); */
          break;
        case 1:
          this.doGetRiversWaterDetail(send);
          break;
        case 2:
          this.doGetPumpLockWaterDetail(send);
          break;
        case 3:
          this.doGetWaterloggingDetail(send);
          break;
        default:
          break;
      }
    },
    lineChart(obj) {
      let that = this;
      let option = (option = {
        title: {
          text: "折线图堆叠",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(20),
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
        },
        legend: {
          data: ["优化前", "优化后"],
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
            "十",
            "十一",
            "十二",
            "十三",
          ],
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        series: [
          {
            name: "优化前",
            type: "line",
            data: [15, 24, 26, 29, 32, 30, 33, 34, 42, 39, 46, 49, 55],
          },
          {
            name: "优化后",
            type: "line",
            data: [3, 4, 2, 3, 2, 3, 3, 3, 4, 1, 3, 1, 4],
          },
        ],
      });
      return option;
    },
    // 获取树---第一级别
    getThreeList() {
      // alert(99999999999);
      getThreeListApi({ codes: "Z67lpx15", send: { sn: "440100000000" } })
        .then((res) => {
          if (res.success) {
            if (res.body.data && res.body.data.length) {
              this.treeData = res.body.data;
            }
          } else {
            this.$message.error("获取关系树失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("获取关系树错误！");
          }
        });
    },
    // 获取树---第一级别
    getSecondThreeList(areaCode) {
      // alert(99999999999);
      return new Promise((resolve) => {
        getThreeListApi({ codes: "Z67lpx15", send: { en: areaCode } })
          .then((res) => {
            if (res.success) {
              resolve(res);
            } else {
              this.$message.error("获取关系树失败！");
            }
          })
          .catch((err) => {
            if (err) {
              this.$message.error("获取关系树错误！");
            }
          });
      });
    },
    // 点击树节点
    treeSelect(selectedKeys, e) {
      console.log(selectedKeys, e, e.node.dataRef.isLeaf);
      this.total = 0;
      this.currentPage = 1;
      this.treeSelectObj.name = e.node.dataRef.name;
      this.treeSelectObj.areaCode = selectedKeys[0];
      if (e.node.dataRef.name == "广州市") {
        this.getReservoirList();
        let showKey = this.parentData.k;
        let send = { body: { sn: "440100000000" }, page: 1, pageSize: 10 };
        switch (showKey) {
          case 0:
            this.getReservoirList();
            break;
          case 1:
            this.doGetRiversWaterDetail(send);
            break;
          case 2:
            this.doGetPumpLockWaterDetail(send);
            break;
          case 3:
            this.doGetWaterloggingDetail(send);
            break;
          default:
            break;
        }
      } else {
        let showKey = this.parentData.k;
        let send = { body: { sn: selectedKeys[0] }, page: 1, pageSize: 10 };
        switch (showKey) {
          case 0:
            this.getReservoirList(selectedKeys[0]);
            break;
          case 1:
            this.doGetRiversWaterDetail(send);
            break;
          case 2:
            this.doGetPumpLockWaterDetail(send);
            break;
          case 3:
            this.doGetWaterloggingDetail(send);
            break;
          default:
            break;
        }
      }

      if (e.node.dataRef.isLeaf) {
        this.rightAllObj.allTableShow = false;
        console.log(
          "点击树节点e.node.dataRef.isLeaf",
          e.node.dataRef.isLeaf,
          e
        );
        let showKey = this.parentData.k;
        let sendObj = {
          body: { sid: e.node.dataRef.sid },
          page: 1,
          pageSize: 10,
        };
        switch (showKey) {
          case 0:
            this.getReservoirData(e.node.dataRef.sid);
            this.getReservoirRealMonitorData(e.node.dataRef.sid);
            break;
          case 1:
            this.doGetRiversWaterDetail(sendObj).then((res) => {
              if (res.success) {
                if (res.body.data && res.body.data.length) {
                  let responeData = res.body.data[0];
                  this.showObj.rightTopLeftList.map((i, k) => {
                    this.showObj.rightTopLeftList[k].lableNameValue =
                      responeData[i.getName];
                  });
                  console.log(
                    this.showObj.rightTopLeftList,
                    "this.showObj.rightTopLeftList"
                  );
                }
              }
            });
            this.getReservoirRealMonitorData(e.node.dataRef.sid);
            break;
          case 2:
            this.doGetPumpLockWaterDetail(sendObj).then((res) => {
              if (res.success) {
                if (res.body.data && res.body.data.length) {
                  let responeData = res.body.data[0];
                  this.showObj.rightTopLeftList.map((i, k) => {
                    i.lableNameValue = responeData[i.getName];
                  });
                }
              }
            });
            this.getReservoirRealMonitorData(e.node.dataRef.sid);
            break;
          case 3:
            this.doGetWaterloggingDetail(sendObj).then((res) => {
              if (res.success) {
                if (res.body.data && res.body.data.length) {
                  let responeData = res.body.data[0];
                  this.showObj.rightTopLeftList.map((i, k) => {
                    i.lableNameValue = responeData[i.getName];
                  });
                }
              }
            });
            break;
        }
      } else {
        this.rightAllObj.allTableShow = true;
      }
    },
    // 获取水库详情列表
    getReservoirList(obj, page = 1, pageSize = 10, searchForm = {}) {
      /* let detaiCodeObj = {
        0: "AtbyBgqV",
        1: "MaKLgjna",
        2: "BrxhdzTF",
        3: "YTkebhCI",
      }; */
      getReservoirApi({
        codes: "72BEfbRK",
        body: {
          areaCode: obj,
          ...searchForm,
        },
        page,
        pageSize,
      }).then((res) => {
        console.log("获取水库详情列表", res);
        if (res.success) {
          if (Array.isArray(res.body.data) && res.body.data.length) {
            res.body.data.map((item) => {
              item.checked = false;
            });
          }
          this.rightAllObj.contentList = JSON.parse(
            JSON.stringify(res.body.data)
          );
          this.total = parseInt(res.body.total);
          // this.selected = ["440100000000"];
          console.log(this.rightAllObj.contentList);
        }
      });
    },
    // 获取河湖水情
    doGetRiversWaterDetail(obj) {
      return new Promise((resolve, reject) => {
        getRiversWaterDetail(obj)
          .then((res) => {
            if (res.success) {
              if (Array.isArray(res.body.data) && res.body.data.length) {
                res.body.data.map((item) => {
                  item.checked = false;
                });
              }
              this.rightAllObj.contentList = JSON.parse(
                JSON.stringify(res.body.data)
              );
              this.total = parseInt(res.body.total);
              resolve(res);
            } else {
              this.$message.error("");
              resolve(res);
            }
          })
          .catch((err) => {
            if (err) {
              console.log(888);
              reject();
            }
          });
      });
    },
    // 获取泵站水闸水情
    doGetPumpLockWaterDetail(obj) {
      return new Promise((resolve, reject) => {
        getPumpLockWaterDetail(obj)
          .then((res) => {
            if (res.success) {
              if (Array.isArray(res.body.data) && res.body.data.length) {
                res.body.data.map((item) => {
                  item.checked = false;
                });
              }
              this.rightAllObj.contentList = JSON.parse(
                JSON.stringify(res.body.data)
              );
              this.total = parseInt(res.body.total);
              resolve(res);
            } else {
              this.$message.error("");
            }
          })
          .catch((err) => {
            if (err) {
              console.log(888);
              reject();
            }
          });
      });
    },
    // 获取积水内涝点
    doGetWaterloggingDetail(obj) {
      return new Promise((resolve, reject) => {
        getWaterloggingDetail(obj)
          .then((res) => {
            if (res.success) {
              if (Array.isArray(res.body.data) && res.body.data.length) {
                res.body.data.map((item) => {
                  item.checked = false;
                });
              }
              this.rightAllObj.contentList = JSON.parse(
                JSON.stringify(res.body.data)
              );
              this.total = parseInt(res.body.total);
              resolve(res);
            } else {
              this.$message.error("");
            }
          })
          .catch((err) => {
            if (err) {
              console.log(err);
              reject(err);
            }
          });
      });
    },
    // 获取水库名称
    getAreaAnyList(obj, pages = 1, pageSize = 10) {
      return new Promise((resolve) => {
        getThreeListApi({ codes: obj.codes, send: { areaCode: obj.areaCode } })
          .then((res) => {
            if (res.success) {
              resolve(res);
            } else {
              resolve(false);
              this.$message.error("获取关系树失败！");
            }
          })
          .catch((err) => {
            if (err) {
              this.$message.error("获取关系树错误！");
              resolve(false);
            }
          });
      });
    },
    // 切换分页
    clickChangePages(pages, pageSize) {
      this.currentPage = parseInt(pages.pages);
      let keys = this.parentData.k;
      let send = {
        body: {
          areaCode: this.treeSelectObj.areaCode,
          name: this.searchValue,
        },
        page: pages.pages,
        pageSize: 10,
      };
      switch (keys) {
        case 0:
          this.getReservoirList(this.treeSelectObj.areaCode, pages.pages, 10, {
            name: this.searchValue,
          });
          break;
        case 1:
          this.doGetRiversWaterDetail(send);
          break;
        case 2:
          this.doGetPumpLockWaterDetail(send);
          break;
        case 3:
          this.doGetWaterloggingDetail(send);
          break;
        default:
          break;
      }
    },
    //  搜索
    doSearch() {
      this.currentPage = 1;
      let keys = this.parentData.k;
      let send = {
        body: {
          areaCode: this.treeSelectObj.areaCode
            ? this.treeSelectObj.areaCode
            : null,
          name: this.searchValue,
        },
        page: this.currentPage,
        pageSize: 10,
      };
      switch (keys) {
        case 0:
          this.getReservoirList(
            this.treeSelectObj.areaCode ? this.treeSelectObj.areaCode : null,
            this.currentPage,
            10,
            {
              name: this.searchValue,
            }
          );
          break;
        case 1:
          this.doGetRiversWaterDetail(send);
          break;
        case 2:
          this.doGetPumpLockWaterDetail(send);
          break;
        case 3:
          this.doGetWaterloggingDetail(send);
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@w:100 /6400;
// @h:100 /1079;
@h:100 /900;
// ol, ul, dl,p{
//   margin-bottom:0;
// }
.box-sizing() {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.border-radisu(@x, @y) {
  border-radius: @x @y;
  -o-border-radius: @x @y;
  -ms-border-radius: @x @y;
  -moz-border-radius: @x @y;
  -webkit-border-radius: @x @y;
}
.box-shadow() {
  box-shadow: 0 0 10vh * @h #00eaff inset;
  -o-box-shadow: 0 0 10vh * @h #00eaff inset;
  -ms-box-shadow: 0 0 10vh * @h #00eaff inset;
  -moz-box-shadow: 0 0 10vh * @h #00eaff inset;
  -webkit-box-shadow: 0 0 10vh * @h #00eaff inset;
}
/* 滚动条 */
*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4vw * @w; /*高宽分别对应横竖滚动条的尺寸*/
  height: 2vh * @h;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4vw * @w;
  box-shadow: inset 0 0 1px rgba(44, 152, 255, 0.2);
  background: #2c98ff;
}
*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 1px rgba(44, 152, 255, 0.2);
  border-radius: 4vw * @w;
  background: #030c22;
}
.detail-content {
  width: 1700vw * @w;
  height: 500vh * @h;
  display: flex;
  justify-content: flex-start;
  padding: 10vh * @h 14vw * @w;
  .box-sizing();
  .detail-content-left {
    height: 100%;
    width: 18%;
    margin-right: 1%;
    border: #999 1px solid;
    overflow: auto;
    /deep/ span {
      color: white;
      font-size: 18vh * @h;
      line-height: 28vh * @h;
    }
    & /deep/ .ant-tree-switcher {
      font-size: 18vh * @h;
      line-height: 28vh * @h;
    }
    & /deep/ .ant-tree-switcher i {
      font-size: 18vh * @h;
      line-height: 28vh * @h;
    }
    & /deep/ .ant-tree-switcher .ant-tree-switcher-icon {
      font-size: 18vh * @h !important;
      line-height: 28vh * @h;
    }
    & /deep/ .ant-tree-node-selected {
      background-color: transparent;
    }
    /deep/ .ant-tree-node-selected span {
      color: #2de9e8;
    }
    /deep/ .ant-tree-switcher {
      width: auto;
    }
    /deep/ .ant-tree-node-content-wrapper .ant-tree-title {
      padding: 10vh * @h 0;
      .box-sizing();
    }
    /deep/ .ant-tree > li:first-child {
      margin-top: 10vh * @h;
    }
    /deep/ .ant-tree li {
      margin: 10vh * @h 0;
    }
  }
  .detail-content-right {
    height: 100%;
    width: 81%;
    .content-right-top {
      width: 100%;
      height: 58%;
      margin-bottom: 2%;
      display: flex;
      justify-content: flex-start;
      .right-top-left {
        height: 100%;
        width: 30%;
        margin-right: 1%;
        ul {
          width: 100%;
          height: 100%;
          padding: 14vh * @h 6vw * @w;
          li {
            width: 100%;
            min-height: 28vh * @h;
            height: auto;
            display: flex;
            justify-content: flex-start;
            font-size: 18vh * @h;
            color: white;
            align-items: flex-start;
            label {
              display: block;
              flex-shrink: 0;
              height: auto;
              font-size: 18vh * @h;
              line-height: 24vh * @h;
            }
            span {
              display: block;
              height: auto;
              font-size: 18vh * @h;
              line-height: 24vh * @h;
            }
          }
        }
      }
      .right-top-right {
        height: 100%;
        width: 69%;
        position: relative;
        .top-right-task {
          width: 100%;
          height: 24vh * @h;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 4vh * @h;
          p {
            width: auto;
            height: 24vh * @h;
            color: white;
            margin-right: 10vw * @w;
            label {
              font-size: 18vh * @h;
            }
            span {
              font-size: 20vh * @h;
            }
          }
        }
        .top-btn-change {
          width: auto;
          height: 24vh * @h;
          position: absolute;
          flex-wrap: nowrap;
          display: flex;
          top: 0;
          right: 0;
          p {
            width: 64vw * @w;
            height: 24vh * @h;
            border: 1px solid #00ffff;
            line-height: 24vh * @h;
            color: white;
            font-size: 14vh * @h;
            margin-left: 14vw * @w;
            text-align: center;
            cursor: pointer;
          }
          .active {
            .box-shadow();
          }
        }
        .top-lists {
          width: 100%;
          height: calc(100% - 28vh * @h);
          border: 1px solid rgba(0, 204, 255, 1);
        }
        .right-top-chart {
          margin-top: 24vh * @h;
          width: 100%;
          height: calc(100% - 28vh * @h);
        }
      }
      .right-top-full {
        width: 100%;
        height: 100%;
        ul {
          width: 100%;
          height: 100%;
          overflow: auto;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            width: 48%;
            height: auto;
            min-height: 28vh * @h;
            display: flex;
            justify-content: flex-start;
            font-size: 18vh * @h;
            color: white;
            align-items: center;
            margin: 0 1%;

            label {
              display: block;
              flex-shrink: 0;
              height: auto;
              font-size: 18vh * @h;
              line-height: 24vh * @h;
            }
            span {
              display: block;
              height: auto;
              font-size: 18vh * @h;
              line-height: 24vh * @h;
            }
          }
        }
      }
    }
    .content-right-bottom {
      width: 100%;
      height: 40%;
      .right-bottom-inner {
        width: 100%;
        height: 100%;
      }
    }
    .content-right-all {
      width: 100%;
      height: calc(100% - 90vh * @h);
      .list-change-page {
        margin-top: 20vh * @h;
        display: flex;
        justify-content: flex-end;
      }

      .checked {
        width: 20vh * @h;
        height: 20vh * @h;
        border: 1px solid #00ffff;
      }

      .icon {
        margin: 0 10vw * @w;
        color: #00ffff;
        cursor: pointer;
      }
    }
  }
}

.mouse-click {
  cursor: pointer;
}

/* 插件 */
.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 18vh * @h;
    background-color: rgb(60, 19, 155);
    background-position: center;
    // background-size: cover;
    .video-inner {
      width: 100%;
      height: 100%;
      video {
        width: 100%;
        height: 80%;
        cursor: pointer;
        background: black;
      }
      p {
        width: 100%;
        height: 20%;
        line-height: 30vh * @h;
        font-size: 30vh * @h;
        color: white;
      }
    }
    // color: blue;
  }

  .swiper-pagination {
    /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
    }
  }
}

/* 搜索框 */
.right-content-search {
  width: 100%;
  height: 48vh * @h;
  display: flex;
  align-items: center;
  // padding-left: 38vw * @w;
  .box-sizing();
  display: flex;
  justify-content: space-between;
  color: white;

  .checkedAll {
    width: 80vw * @w;
    font-size: 20vh * @h;
    background-color: #074990;
    padding: 2vh * @h 0;
    border: none;
    color: white;
    height: 35vh * @h;
    line-height: 35vh * @h;
  }

  .video-discussion {
    color: white;
    width: 130vw * @w;
    height: 35vh * @h;
    line-height: 35vh * @h;
    text-align: center;
    font-size: 20vh * @h;
    border-radius: 5vh * @h;
    margin-right: 20vw * @w;
    background-color: #074990;
    border: none;
  }

  div.search {
    width: auto;
    min-height: 34vh * @h;
    border: 1px #3573fc solid;
    display: flex;
    align-items: center;
    input {
      display: flex;
      width: 276vw * @w;
      height: 100%;
      border: 0 solid #fff;
      color: white;
      background: #062447;
      font-size: 16vh * @h;
      margin: 2vh * @h 2vh * @h 2vh * @h 2vh * @h;
    }
    span {
      display: block;
      height: 100%;
      width: 84vw * @w;
      height: 30vh * @h;
      background: #074990;
      color: white;
      margin: 2vh * @h 2vh * @h 2vh * @h 2vh * @h;
      font-size: 16vh * @h;
      line-height: 30vh * @h;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
