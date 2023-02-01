<template>
  <div class="command-dispatch">
    <div class="dispatch">
      <div class="search-tab">
        <div class="tabs">
          <p
            v-for="(item, index) in rightTabsList"
            :class="[leftRightEventIndex === index ? 'right-tabs-active' : '']"
            :key="index"
            @click="leftEventChange(item, index)"
          >
            {{ item.name }}
          </p>
        </div>
        <div class="search">
          <a-input-search placeholder="输入关键字" />
        </div>
      </div>

      <div class="left-right-scope" v-if="leftRightEventIndex === 0">
        <ul>
          <li
            v-for="(item, index) in scopeList"
            @click="scopeHandelActive(item, index)"
            :class="scopeActive === index ? 'scope-active' : ''"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) in scopeTypeList" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="left-right-thing" v-if="leftRightEventIndex === 0">
        <div
          class="right-thing-list"
          v-for="(item, index) in thingList"
          :key="index"
        >
          <div class="thing-list-title">
            <p>{{ item.name }}</p>
            <p
              @click="doOpenShow(item, index)"
              :class="[item.active ? 'list-title-active ' : '']"
            >
              ▶
            </p>
          </div>
          <ul
            class="think-list-ul"
            v-show="item.active && item.listData.length"
          >
            <li v-for="(i, k) in item.listData" :key="k">
              <span
                @click="doChoseThing(index, k, i.active)"
                :class="[i.active ? 'active-span' : '']"
                style="
                  color: white;
                  font-size: 26px;
                  text-align: center;
                  line-height: 30px;
                  font-weight: bold;
                "
                >{{ i.active ? "✔" : "" }}</span
              ><label> {{ i.ranksName }}</label>
            </li>
          </ul>
          <ul
            class="think-list-model"
            v-show="item.active && item.listDeviceData.length"
          >
            <li v-for="(i, k) in item.listDeviceData" :key="k">
              <div>
                <img :src="i.iconUrl" alt="" />
                <!-- <img src="./images/11.png" alt="" /> -->
              </div>
              <div>
                <p>
                  <span>{{ i.sortNum }}</span
                  >{{ i.unit }}
                </p>
                <p>{{ i.equipName }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 事件列表 -->
      <div
        class="left-bottom-content file-model-all"
        v-if="leftRightEventIndex === 1"
      >
        <div class="fire-list-header">
          <p>发生事件</p>
          <p>内容</p>
          <p>区域</p>
          <p>事件登记</p>
          <p>来源</p>
          <p>操作</p>
        </div>
        <ul class="fire-list-content" v-if="leftRightEventDatatList.length">
          <li v-for="(item, index) in leftRightEventDatatList" :key="index">
            <div>{{ item.created }}</div>
            <div>{{ item.eventName }}</div>
            <div>{{ item.eventPlace }}</div>
            <div>{{ item.reporter }}</div>
            <div>{{ eventSourceType[item.eventSource] }}</div>
            <div><span @click="toPointerHanderl(item)">定位</span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTeamInfo,
  getIotDevice,
  choseTeamGetDatas,
  searchWaterlogging,
  leftEventList,
  leftEventDetail,
  fileTypeLon,
  getWeather,
  getWeatherSeven,
  geteQuipment,
  getFacilities,
  getTeamPerson,
  getWaterLevel,
  getEmergencyPlan,
} from "@/api/dragonBoat";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      rightTabsList: [
        { key: 0, name: "指挥调度" },
        { key: 1, name: "事件列表" },
      ],
      leftRightEventIndex: 0,
      scopeList: [
        { key: 1000, name: "1KM" },
        { key: 2000, name: "2KM" },
        { key: 3000, name: "3KM" },
      ],
      scopeActive: 0,
      scopeTypeList: [
        { key: 0, name: "影响区域范围" },
        { key: 1, name: "未来24小时影响范围" },
      ],
      thingList: [
        {
          key: 0,
          name: "应急队伍",
          active: false,
          listData: [
            { ranksName: "抢险救援队伍一线", active: true },
            { ranksName: "抢险救援队伍一线", active: true },
            { ranksName: "抢险救援队伍一线", active: true },
            { ranksName: "抢险救援队伍一线", active: true },
            { ranksName: "抢险救援队伍一线", active: true },
            { ranksName: "抢险救援队伍一线", active: true },
          ],
          listDeviceData: [],
        },
        {
          key: 1,
          name: "应急装备",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 2,
          name: "应急人员",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 3,
          name: "重要设施",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 4,
          name: "物联网设备",
          active: false,
          listData: [],
          listDeviceData: [
            {
              iconUrl: require("./images/drone.png"),
              sortNum: "2",
              unit: "架",
              equipName: "无人机",
            },
            {
              iconUrl: require("./images/camera.png"),
              sortNum: "10",
              unit: "个",
              equipName: "摄像头",
            },
            {
              iconUrl: require("./images/thermometer.png"),
              sortNum: "10",
              unit: "个",
              equipName: "温度传感器",
            },
          ],
        },
      ],
      // 装备列表
      quipmentList: [],
      waterLevelList: [],
      // 应急预案
      emergencyPlanList: [],
      // 左侧事件列表
      leftRightEventDatatList: [],
      leftRightEventIndex: 0,
      eventSourceType: {
        0: "pc",
        1: "移动终端",
        2: "邮件",
        3: "短信",
        4: "电话",
        5: "其他",
      },
      mapPathActive: "1",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.doGeteQuipment(); // 获取装备
    this.doGetFacilities(); // 获取设施
    this.doGetTeamPerson(); //获取应急人员
    this.doGetWaterLevel(); //获取监测水位
    this.doGetEmergencyPlan(); //应急预案
    this.getLeftEventList();
    this.thingList[0]["active"] = true; //默认展开
    this.thingList[4]["active"] = true; //默认展开
  },
  mounted() {},
  methods: {
    leftEventChange(item, index) {
      this.leftRightEventIndex = index;
    },
    scopeHandelActive(item, index) {
      this.scopeActive = index;
      pGzznCore.addPromiseEventRange(item.key);
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.iconSelectOneObj[index].active = JSON.parse(
        JSON.stringify(!item.active)
      );
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (this.iconSelectOneObj[index].active) {
        is_Bool = true;
        this.iconSelectOneObj[index].children.map((citem, cindex) => {
          this.iconSelectOneObj[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.iconSelectOneObj[index].children, false);
      }
      for (let i = 0; i < item.children.length; i++) {
        let citem = item.children[i];
        if (citem.type == "5") {
          //水位站
          pGzznCore.addPromiseWaterLevel(is_Bool);
          WaterStationState = is_Bool;
        } else if (citem.type == "4") {
          //隧道
          pGzznCore.addPromiseTunnel(is_Bool);
        } else if (citem.type == "3") {
          //水浸点
          pGzznCore.addPromiseWaterloggingPoint(is_Bool);
        } else if (citem.type == "2") {
          //堤防
          pGzznCore.addPromiseBeware(is_Bool);
        } else if (citem.type == "1") {
          //水库
          pGzznCore.addPromiseReservoirs(is_Bool);
        } else if (citem.type == "6") {
          //雨量站
          pGzznCore.addPromiseRainfallStation(is_Bool);
        } else if (
          citem.type == "440103" ||
          citem.type == "440104" ||
          citem.type == "440105" ||
          citem.type == "440106" ||
          citem.type == "440111" ||
          citem.type == "440112" ||
          citem.type == "440113" ||
          citem.type == "440114" ||
          citem.type == "440115" ||
          citem.type == "440183" ||
          citem.type == "440184"
        ) {
          //避难场所
          pGzznCore.addPromiseShelterArea(citem.type, is_Bool);
        }
      }
    },
    flexClickliItem(item, index, citem, cindex) {
      this.iconSelectOneObj[index].children[cindex].active = !citem.active;
      if (this.iconSelectOneObj[index].children[cindex].active) {
        let childrenLength = this.iconSelectOneObj[index].children.length;
        let currentArr = this.iconSelectOneObj[index].children.filter(
          (i, k) => {
            if (i.active) {
              return i;
            }
          }
        );
        if (currentArr.length === childrenLength) {
          this.iconSelectOneObj[index].active = true;
        }
      } else {
        this.iconSelectOneObj[index].active = false;
      }
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (citem.type == "5") {
        //水位站
        pGzznCore.addPromiseWaterLevel(citem.active);
        WaterStationState = citem.active;
      } else if (citem.type == "4") {
        //隧道
        pGzznCore.addPromiseTunnel(citem.active);
      } else if (citem.type == "3") {
        //水浸点
        pGzznCore.addPromiseWaterloggingPoint(citem.active);
      } else if (citem.type == "2") {
        //堤防
        pGzznCore.addPromiseBeware(citem.active);
      } else if (citem.type == "1") {
        //水库
        pGzznCore.addPromiseReservoirs(citem.active);
      } else if (citem.type == "6") {
        //雨量站
        pGzznCore.addPromiseRainfallStation(citem.active);
      } else if (
        citem.type == "440103" ||
        citem.type == "440104" ||
        citem.type == "440105" ||
        citem.type == "440106" ||
        citem.type == "440111" ||
        citem.type == "440112" ||
        citem.type == "440113" ||
        citem.type == "440114" ||
        citem.type == "440115" ||
        citem.type == "440183" ||
        citem.type == "440184"
      ) {
        //避难场所
        pGzznCore.addPromiseShelterArea(citem.type, citem.active);
      }
    },
    doOpenShow(item, index) {
      this.thingList[index]["active"] = !item.active;
    },
    doChoseThing(index, k, active) {
      this.thingList[index]["listData"][k]["active"] = !active;
      if (!active) {
        this.doChoseTeamGetDatas(this.thingList[index]["listData"][k].sid);
      }
      let sid = this.thingList[index]["listData"][k].sid;
      return this.thingList[index]["listData"][k];
    },
    // 选中-应急队伍-获取数据
    doChoseTeamGetDatas(sid) {
      if (sid) {
        choseTeamGetDatas(sid).then((res) => {
          if (res.success) {
            console.log(89898989, res);
          }
        });
      }
    },
    // 获取物联网设备
    doGetIotDevice(res) {
      //修改成按范围注入

      getIotDevice().then((res) => {
        if (res.success) {
          this.thingList[4]["listDeviceData"] = [];
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = false;
              this.thingList[4]["listDeviceData"].push(i);
            });
          }
        }
      });
      /**
      this.thingList[4]["listDeviceData"] = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = false;
          this.thingList[4]["listDeviceData"].push(i);
        });
      }
      */
    },
    // 获取装备
    doGeteQuipment(res) {
      geteQuipment({ body: {} }).then((res) => {
        if (res.success) {
          this.thingList[1].listData = [];
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = false;
              i.ranksName = i.equipmentName;
              this.thingList[1].listData.push(i);
            });
          }
        }
      });
      /**

      this.thingList[1].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = true;
          i.ranksName = i.equipmentName;
          this.thingList[1].listData.push(i);
        });
      }
      */
    },
    // 获取设施
    doGetFacilities(res) {
      getFacilities({ body: {} }).then((res) => {
        if (res.success) {
          this.thingList[3].listData = [];
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = true;
              i.ranksName = i.name;
              this.thingList[3].listData.push(i);
            });
          }
        }
        /**
      this.thingList[3].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = false;
          i.ranksName = i.name;
          this.thingList[3].listData.push(i);
        });
      }*/
      });
    },
    // 获取应急人员
    doGetTeamPerson(res) {
      getTeamPerson({ body: {} })
        .then((res) => {
          if (res.success) {
            this.thingList[2].listData = [];
            if (res.body && res.body.length) {
              let saveList = JSON.parse(JSON.stringify(res.body));
              saveList.map((i, k) => {
                i.active = false;
                i.ranksName = i.name;
                this.thingList[2].listData.push(i);
              });
            }
          }
        })
        .catch((err) => {});
      //   this.thingList[2].listData = [];
      //   if (res.body && res.body.length) {
      //     let saveList = JSON.parse(JSON.stringify(res.body));
      //     saveList.map((i, k) => {
      //       i.active = true;
      //       i.ranksName = i.name;
      //       this.thingList[2].listData.push(i);
      //     });
      //   }
    },
    // 查询内涝点
    doSearchWaterlogging() {
      searchWaterlogging({ body: {}, page: 1, pageSize: 1000 }).then((res) => {
        console.log("内涝点", res);
        if (res.success) {
        }
      });
    },
    doGetWaterLevel() {
      console.log(9999);
      getWaterLevel({ body: {} }).then((res) => {
        if (res.success) {
          this.waterLevelList = [];
          if (res.body && res.body.length) {
            this.waterLevelList = res.body;
            this.waterLevelList.map((i, k) => {
              i.keys = k + 1;
              // i.showValue = i.value?i.value:''
            });
          }
        }
      });
    },
    // 应急预案-获取
    doGetEmergencyPlan() {
      getEmergencyPlan({ body: { eventId: "2521067874866184192" } }).then(
        (res) => {
          if (res.success) {
            this.emergencyPlanList = res.body;
            // console.log('应急预案',res)
          }
        }
      );
    },
    //切换事件
    dragonBoatEvent(sid) {
      for (let i = 0; i < this.leftRightEventDatatList.length; i++) {
        if (this.leftRightEventDatatList[i].sid == sid) {
          this.radioTabsActiveObj = this.leftRightEventDatatList[i];
          this.getLeftEventDetail(this.leftRightEventDatatList[i]);
          break;
        }
      }
    },
    // 查询龙舟水左侧事件列表
    getLeftEventList() {
      leftEventList({ body: {} })
        .then((res) => {
          if (res.success) {
            this.leftRightEventDatatList = res.body;
            this.getLeftEventDetail(this.leftRightEventDatatList[0]);
          } else {
            this.leftRightEventDatatList = [];
          }
        })
        .catch((error) => {
          if (error) {
          }
        });
    },
    // 点击定位
    toPointerHanderl(item) {
      this.radioTabsActiveObj = item;
      this.getLeftEventDetail(item);
      pGzznCore.addPromiseEventInfo(item);
    },
    // 事件跟踪记录
    getLeftEventDetail(item) {
      leftEventDetail({ body: { eventId: item.sid } }).then((res) => {
        if (res.success) {
          this.eventDataList = JSON.parse(JSON.stringify(res.body));
        } else {
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
.command-dispatch {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3% 0;
  .dispatch {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: auto;
    background: url("./images/bg_event.png") no-repeat no-repeat center;
    background-size: 100% 100%;
    padding: 4% 3%;
    .search-tab {
      width: 100%;
      height: 6%;
      display: flex;
      justify-content: space-between;
    }
    .tabs {
      width: 38%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 28px;
      p {
        width: 48%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 1px #00ffff solid;
        color: white;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .search {
      width: 45%;
      height: 100%;
      display: flex;
      align-items: center;
      /deep/.ant-input {
        width: 100%;
        height: 100%;
        border: 1px solid #01ffff;
        background-color: transparent;
        color: #fff;
        font-size: 34px;
      }
    }
    .right-tabs-active {
      box-shadow: 0 0 20px #01ffff inset;
      -o-box-shadow: 0 0 20px #01ffff inset;
      -ms-box-shadow: 0 0 20px #01ffff inset;
      -moz-box-shadow: 0 0 20px #01ffff inset;
      -webkit-box-shadow: 0 0 20px #01ffff inset;
    }
    .left-right-scope {
      width: 100%;
      height: 5.5%;
      display: flex;
      justify-content: space-between;
      margin: 4% 0;
      ul:first-child {
        width: 37%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          width: 30%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          cursor: pointer;
          color: white;
          font-size: 25px;
          white-space: nowrap;
        }
        .scope-active {
          box-shadow: 0 0 20px #01ffff inset;
          -o-box-shadow: 0 0 20px #01ffff inset;
          -ms-box-shadow: 0 0 20px #01ffff inset;
          -moz-box-shadow: 0 0 20px #01ffff inset;
          -webkit-box-shadow: 0 0 20px #01ffff inset;
        }
        li:last-child {
          margin-right: 0px;
        }
        li:hover {
          opacity: 0.6;
        }
      }
      ul:last-child {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          height: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          cursor: pointer;
          color: white;
          font-size: 25px;
          white-space: nowrap;
        }
      }
      ul:nth-child(1) li {
        border: 1px #00ffff solid;
        background: rgba(19, 56, 100, 0.8);
      }
      ul:nth-child(2) li {
        border: 1px #48ef6e solid;
        background: rgba(72, 239, 110, 0.6);
      }
    }
    .left-right-thing {
      width: 100%;
      height: 79%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .right-thing-list {
        width: 100%;
        margin-bottom: 1%;
        .thing-list-title {
          height: 100%;
          width: 100%;
          background: #1e5375;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            color: white;
            font-size: 30px;
          }
          p:nth-child(1) {
            margin-left: 42px;
            padding: 15px 0;
          }
          p:nth-child(2) {
            margin-right: 20px;
            color: #43e0ff;
            cursor: pointer;
          }
          .list-title-active {
            transform: rotate(90deg);
          }
        }
        .think-list-ul {
          width: 100%;
          height: auto;
          display: flex;
          padding: 10px;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            // flex: 3 0 0%;
            width: 33%;
            padding: 10px;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              width: 31px;
              height: 31px;
              border: 1px #00ffff solid;
              border-radius: 4px 4px;
              margin-right: 10px;
              margin-left: 6px;
              cursor: pointer;
            }
            label {
              color: white;
              font-size: 22px;
            }
            .active-span {
              background: #00ffff;
            }
          }
        }
        .think-list-model {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 35px 20px 35px 20px;
          li {
            width: 30%;
            align-items: center;
            padding: 20px 3%;
            background: rgba(19, 56, 100, 0.8);
            display: flex;
            justify-content: center;

            div:nth-child(1) {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 16px;
              img {
                display: block;
                width: 60px;
                height: 60px;
              }
            }
            div:nth-child(2) {
              height: 76px;
              box-sizing: border-box;
              -o-box-sizing: border-box;
              -ms-box-sizing: border-box;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              p {
                line-height: 32px;
                font-size: 23px;
                color: white;
                span {
                  color: #00ffff;
                  font-size: var(--mini-number-font);
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
    .left-bottom-content {
      width: 100%;
      height: 85%;
      margin-top: 4%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .fire-list-header {
        width: 100%;
        padding: 14px;
        background: #113953;
        color: #feffff;
        font-size: 28px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
      }
      .file-model-all {
        padding: 62px 14px 10px 14px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      p {
        text-align: center;
      }
      p:nth-child(1) {
        width: 15%;
        flex-shrink: 0;
      }
      p:nth-child(2) {
        width: 25%;
        flex-shrink: 0;
      }
      p:nth-child(3) {
        width: 15%;
        flex-shrink: 0;
      }
      p:nth-child(4) {
        width: 15%;
        flex-shrink: 0;
      }
      p:nth-child(5) {
        width: 15%;
        flex-shrink: 0;
      }
      p:nth-child(6) {
        width: 15%;
        flex-shrink: 0;
      }
      .fire-list-content {
        width: 100%;
        height: auto;
        li {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: nowrap;
          font-size: 26px;
          color: #feffff;
          border-bottom: 2px #314c53 solid;
          div {
            text-align: center;
            padding: 10px 0 10px 0;
          }
          div:nth-child(1) {
            width: 15%;
            flex-shrink: 0;
          }
          div:nth-child(2) {
            width: 25%;
            flex-shrink: 0;
          }
          div:nth-child(3) {
            width: 15%;
            flex-shrink: 0;
          }
          div:nth-child(4) {
            width: 15%;
            flex-shrink: 0;
          }
          div:nth-child(5) {
            width: 15%;
            flex-shrink: 0;
          }
          div:nth-child(6) {
            width: 15%;
            flex-shrink: 0;
            span {
              display: block;
              padding: 4px 4px;
              border: 1px #00fffe solid;
              cursor: pointer;
            }
          }
        }
        li:nth-child(1) {
          margin-top: 22px;
        }
        & li:last-child {
          border-bottom: 0px;
        }
      }
    }
  }
  /deep/.ant-input-search-icon {
    color: #00ffff;
    font-size: var(--mini-font);
  }
}
</style>