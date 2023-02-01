<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: maoweiye
 * @LastEditors: maoweiye
 * @Date: 2021-10-10 14:50:29
 * @LastEditTime: 2021-10-11 20:52:01
-->
<template>
<div class="manage">
  <ModelBox title="应急指挥及通信" class="c-mybox-position">
    <template slot="content" >
      <!-- <div class="two-icon-box">
        <div class="item" @click="showCarBox">
          <img src="../../../../assets/images/majorFestivalsConductor/command-car.png" alt="">
          <span>应急指挥车：{{carTotal}}</span>
        </div>
        <div class="item" @click="showCommunicationBox">
          <img src="../../../../assets/images/majorFestivalsConductor/communication-car.png" alt="">
          <span>800M通信：{{communicationTotal}}</span>
        </div>
      </div> -->
      <div class="carlist-box">
        <!-- 指挥车 -->
        <div class="item" v-for="(item,index) in carlist" :key="String(index)" @click="showCarBox(item)">
          <div class="left">
            <img :src="imgObj[item.name]">
          </div>
          <div class="right">
            <div class="title">{{item.name}}</div>
            <div class="num">{{item.num}}<span class="unit"> {{item.unit}}</span></div>
          </div>
          <div class="selected" v-if="openMoreList.findIndex((e) => e.name == item.name) > -1">
            <img
              src="~@/assets/images/majorFestivalsConductor/selected.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <!-- 800M -->
        <div class="item" @click="showCommunicationBox">
          <div class="left">
            <img src="../../../../assets/images/majorFestivalsConductor/car-communication.png">
          </div>
          <div class="right">
            <div class="title">800M通信</div>
            <div class="num">{{communicationTotal}}<span class="unit"> 台</span></div>
          </div>
          <div class="selected" v-if="communicationActive">
            <img
              src="~@/assets/images/majorFestivalsConductor/selected.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </template>
  </ModelBox>
  <!-- 应急指挥车弹窗 -->
  <template v-for="item in openMoreList">
    <pop-up-layer
      @click.native="onActive(item)"
      :key="item.name"
      :show="!item.isClose"
      :setStyles="{}"
      @doClose="carClose(item)"
      :title="item.name"
      opsition="pageCenter"
      ref="myPopUpLayer">
        <template slot="content" class="upLayer_content">
          <CarUpView :name="item.name" />
        </template>
    </pop-up-layer>
  </template>
  <!-- 800M通信弹窗 -->
  <pop-up-layer
    :show="communicationShow"
    :setStyles="{}"
    @doClose="communicationClose"
    title="800M通信"
    opsition="pageCenter"
    ref="myPopUpLayer">
      <template slot="content" class="upLayer_content">
        <CommunicationUpView :communicationShow="communicationShow" :communicationActive="communicationActive" :PlistData="cwXzq0wfList"/>
      </template>
  </pop-up-layer>
</div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox";
import { getIdsmApi } from "@/api/idsm/index";
import CarUpView from "./carUpView.vue";
import CommunicationUpView from "./communicationUpView.vue";
import { MessagePush } from "@/utils/pushMinix";
export default {
  name: 'commandAndCommunication',
  mixins: [MessagePush],
  components: { ModelBox,CarUpView,CommunicationUpView },
  props: {},
  data() {
    return {
      carShow:false,
      defaultItem: {}, // 点击的指挥车
      carTotal: 0,
      carlist: [],
      communicationShow:false,
      communicationTotal: 4,
      imgObj:{
        '指挥车': require("@/assets/images/majorFestivalsConductor/car-command.png"),
        '救护车': require("@/assets/images/majorFestivalsConductor/car-ambulance.png"),
        '工作用车': require("@/assets/images/majorFestivalsConductor/car-work.png"),
        '警车': require("@/assets/images/majorFestivalsConductor/car-police.png"),
        '消防车': require("@/assets/images/majorFestivalsConductor/car-fire.png"),
        '磁飞轮、发电车': require("@/assets/images/majorFestivalsConductor/car-power.png"),
        '排水/防涝作业车': require("@/assets/images/majorFestivalsConductor/car-waterlogging.png"),
        '供水抢修车': require("@/assets/images/majorFestivalsConductor/car-watersupply.png"),
        '广州移动通信应急保障车': require("@/assets/images/majorFestivalsConductor/car-mobile.png"),
        '广州联通通信应急保障车': require("@/assets/images/majorFestivalsConductor/car-unicom.png"),
        '广州电信通信应急保障车': require("@/assets/images/majorFestivalsConductor/car-telecom.png"),
      },
      imgObjNum:{
        '救护车':1,
        '工作用车': 2,
        '警车': 3,
        '消防车': 4,
        '磁飞轮、发电车':5,
        '排水/防涝作业车': 6,
        '供水抢修车':7,
        '广州移动通信应急保障车':8,      
        '广州电信通信应急保障车': 9,
        '广州联通通信应急保障车': 10,
        '指挥车':11,
      },

      openMoreList: [],
      /** 当前激活窗口 */
      activeWindow: null,
      clickToMap:{
        '救护车':false,
        '工作用车': false,
        '警车': false,
        '消防车': false,
        '磁飞轮、发电车':false,
        '排水/防涝作业车': false,
        '供水抢修车':false,
        '广州移动通信应急保障车':false,      
        '广州电信通信应急保障车':false,
        '广州联通通信应急保障车':false,
        '指挥车':false,
      },

      communicationActive: false,
      columns: [
        { title: "名称", textIndex: "alias", width: "20%" },
        { title: "数目", textIndex: "num", width: "10%" },
        { title: "待命地点", textIndex: "standbyPoint", width: "20%" },
        { title: "负责人", textIndex: "contacts", width: "10%" },
        { title: "联系电话", textIndex: "phone", width: "30%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns2: [
        { title: "设备名称", textIndex: "name" },
        { title: "设备编号", textIndex: "code" },
        { title: "定位", textIndex: "dw" },
      ],
      cwXzq0wfList:[]
    }
  },
  watch: {
  },
  computed:{
  },
  mounted() {
    this.getCarList()
    this.getCommunicationList()
  },
  methods: {
    /** 激活 */
    onActive(record) {
      this.activeWindow = record.key;
    },
    // 打开指挥车弹窗
    showCarBox(record){
      let index = this.openMoreList.findIndex((e) => e.name == record.name);
      this.activeWindow = record.name;
      this.clickToMap[record.name] = !this.clickToMap[record.name];
      this.getAllDataQuery();
      if (index > -1) {
        this.openMoreList.splice(index, 1);
        return;
      }
      this.openMoreList.push({
        isClose: false,
        ...record,
      });
    },
    /** 打开指挥车弹窗 */
    carClose(record) {
      let index = this.openMoreList.findIndex((e) => e.name == record.name);
      if (index > -1) {
        this.$set(this.openMoreList[index], "isClose", true);
        return;
      }
      if (this.openMoreList.length > 0) {
        this.activeWindow = this.openMoreList[this.openMoreList.length - 1].name;
      }
    },
    // 打开800M弹窗
    showCommunicationBox(){
      this.communicationActive = !this.communicationActive
      // 打钩状态
      if(this.communicationActive){
        this.communicationShow = true
        this.doComQuery()
      }else{
        this.communicationShow = false
        pGzznCore.pointLayerRemove({ type: "defaultTypeyjzhjtx12",isFlag:true});
      }
    },
    communicationClose(){
      this.communicationShow = false
    },
    // 应急指挥及
    getCarList() {
      const code = 'nH9MQ8hu'
      const data = {
        body: {
          type: 1
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          // this.carTotal = res.body.total
          this.carlist = res.body.data
        }
      })
    },
    // 800M通信
    getCommunicationList() {
      let body = {
        body: {},
      };
      getIdsmApi('kjYciE8k', body).then((res) => {
        if (res.success) {
          if(res.body.data[0] && res.body.data[0].num){
            this.communicationTotal = res.body.data[0].num
          }else{
            this.communicationTotal = 0
          }
        }
      });
    },
    // 应急车辆打点
    getAllDataQuery() {
      pGzznCore.pointLayerRemove({
        type: "defaultTypeyjzhjtx" + this.imgObjNum[this.activeWindow],
        isFlag: true,
      });
      if (!this.clickToMap[this.activeWindow]) {
        return;
      } 
      let body = {
        body: {
          name:  this.activeWindow,
        },
        page: -1,
      };
      getIdsmApi("xIY4Z3of", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.setLayerToMap(
              res.body.data,
              "defaultTypeyjzhjtx" + this.imgObjNum[this.activeWindow]
            );
          } else {
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    // 应急车辆打点
    setLayerToMap(list, typeStr) {
      let names = this.activeWindow;
      let items = pGzznCore.deepClone(list);
      let columns = this.columns.filter((e) => e.textIndex != "dw");
      pGzznCore.pointLayerRemove({ type: typeStr, isFlag: true });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjzhjtx" + this.imgObjNum[names] + ".png",
        imgSize: { width: 40, height: 36 },
        type: typeStr,
        layerName: "应急指挥车",
        info: columns,
        phoneInfo: { phone: "phone", name: "contacts" }
      };

      pGzznCore.setPointLayerToMap(items, objs);
    },

    // 800M打点
    doComQuery() {
      let body = {
        body: {
        },
        page: -1,
      };
      getIdsmApi("cwXzq0wf", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.cwXzq0wfList = res.body.data
            this.setToMap(res.body.data,"defaultTypeyjzhjtx12")
          } else {
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    // 800M打点
    setToMap(list, typeStr) {
      let items = pGzznCore.deepClone(list);
      let columns = this.columns2.filter((e) => e.textIndex != "dw");
      pGzznCore.pointLayerRemove({ type: typeStr, isFlag: true });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjzhjtx12.png",
        imgSize: { width: 40, height: 36 },
        type: typeStr,
        layerName: "800M通信",
        info: columns,
        //phoneInfo: { phone: "phone", name: "contacts" }
        lonLat:{lon:"lng",lat:"la"}
      };

      pGzznCore.setPointLayerToMap(items, objs);
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>