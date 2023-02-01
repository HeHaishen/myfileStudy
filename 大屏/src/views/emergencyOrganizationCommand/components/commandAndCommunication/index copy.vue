<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: maoweiye
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-10 14:50:29
 * @LastEditTime: 2021-11-03 17:54:44
-->
<template>
<div class="manage">
  <ModelBox :title="title" class="c-mybox-position">
    <template slot="content" >
      <div class="content">
        <div class="rightTitle">
          <!-- <div class="more" v-if="activeKey == 2">更多</div> -->
        </div>
        <div class="btns">
          <div
            class="btn"
            v-for="item in tabKeys"
            :key="item.key"
            :class="[activeKey == item.key && 'active']"
            @click="changeTab(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <!-- 指挥车 -->
        <div class="carlist-box" v-if="activeKey == 1">
          <div class="item" v-for="(item,index) in carlist" :key="String(index)" @click="onMore(item)">
            <div class="left">
              <img src="../../../../assets/images/majorFestivalsConductor/firecar.png">
            </div>
            <div class="right">
              <div class="title">{{item.name}}</div>
              <div class="num">{{item.num}}<span class="unit"> {{item.unit}}</span></div>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <clist class="list" :columns="columns" :listData="listData" v-else>
          <template
            v-for="item in columns.filter((e) => e.textIndex != 'dw')"
            :slot="item.textIndex"
            slot-scope="{ text }"
          >
            <span :title="text" :key="item.textIndex">
              {{ text }}
            </span>
          </template>
          <template slot="dw" slot-scope="{ record }">
            <div class="dw" @click="onListGPS(record)">
              <svg
                t="1633855607571"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2761"
                width="100%"
                height="100%"
              >
                <path
                  d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z"
                  p-id="2762"
                  fill="#1383FE"
                ></path>
              </svg>
            </div>
          </template>
        </clist>
      </div>
    </template>
  </ModelBox>
  <pop-up-layer 
    :show="show"
    :setStyles="{}"
    @doClose="close"
    :title="defaultItem.name"
    opsition="pageCenter"
    ref="myPopUpLayer">
      <template slot="content" class="upLayer_content">
        <UpView :sid="defaultItem.sid" />
      </template>
  </pop-up-layer>
</div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox";
import Clist from "@/components/APicture/c-table.vue";
import { getIdsmApi } from "@/api/idsm/index";
import UpView from "./upView.vue";
import mixin from "./mixin";
export default {
  name: 'commandAndCommunication',
  mixins: [mixin],
  components: { ModelBox,Clist,UpView },
  props: {},
  data() {
    return {
      title: '应急指挥及通信',
      carlist: [
        // {name: '指挥车', num: '123',img: require("@/assets/images/majorFestivalsConductor/firecar.png")},
      ],
      defaultItem: {},
      show:false,

      activeKey: "1",
      tabKeys: [
        { label: "应急指挥车", key: "1" },
        { label: "800M通信", key: "2" },
      ],
      columns: [
        { title: "名称", textIndex: "a" },
        { title: "代码", textIndex: "b" },
        { title: "速度", textIndex: "c" },
        { title: "方向", textIndex: "d" },
        { title: "定位", textIndex: "dw" },
      ],
      listData: [
        {
          a: '单兵设备1',
          b: '10001',
          c: '1.5m/s',
          d: '45°',
          jd: '113.369058',
          wd: '23.103177'
        },
        {
          a: '单兵设备2',
          b: '10002',
          c: '1.5m/s',
          d: '45°',
          jd: '113.370367',
          wd: '23.103652'
        },
        {
          a: '单兵设备3',
          b: '10003',
          c: '1.5m/s',
          d: '45°',
          jd: '113.367696',
          wd: '23.103898'
        }
      ]
    }
  },
  watch: {
    activeKey: {
      immediate: true,
      handler(val) {
        if(val == 1){
          this.getCarList()
        }else{
          // this.doTablelist()
        }
      },
    },
    // pushData: {
    //   handler(newVal, oldVal) {
    //     console.log('dsafsfa',newVal)
    //     if(newVal.cmd) {
    //       let cmdCode = newVal.cmd
    //       switch(cmdCode){
    //         case 'vEt9KkOc':
    //           // this.getLeftEventList();
    //           console.log('soket')
    //           break;
    //         default:
    //           break;
    //       }

    //     }
    //   },
    //   deep: true,
    // },
  },
  computed:{
    // pushData(){
    //   return this.$store.getters.responeData
    // }
  },
  mounted() {
  },
  methods: {
    // 应急指挥及通信
    getCarList() {
      const code = 'xIY4Z3of'
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
          this.carlist = res.body.data
        }
      })
    },
    doTablelist() {
      let body = {
        body: {
          lxdm: 1,
        },
      };
      getIdsmApi('lzVtiTyK', body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.listData = res.body.data;
          } else {
            this.listData = [];
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 处理sorket数据
    // dealData(){
    //   let newData = {
    //     code: '10001',
    //     sudu: '2.0m/s'
    //   }
    //   this.listData.forEach(item => {
    //     if(item.b == newData.code){
    //       item.c = newData.sudu
    //     }
    //   });
    // },
    /** 更多事件点击 */
    onMore(item) {
      this.defaultItem = item
      this.show = true;
    },
    /** 关闭更多页面 */
    close() {
      this.show = false;
    },

    // 切换按钮
    changeTab(tab) {
      this.activeKey = tab.key;
    },
    // 指挥车
    onGPS(item){
      let items = pGzznCore.deepClone(item);
      let  columns = [
        { title: "名称", textIndex: "title" },
        { title: "地址", textIndex: "address" }
      ];
      pGzznCore.pointLayerRemove({type:"defaultType"})
      var objs = {
        imgUrl: 'gzznGIS/Image/forTeam.svg',
        type: "defaultType",
        layerName: "应急指挥及通信",
        info:columns,
        //phoneInfo:{phone:"fzryddh",name:"mc"}
      };
      
      items.lon = items.lon;
      items.sid = items.id?items.id:1;
      items.lat = items.lat;
      items.name = items.title;
      pGzznCore.setPointLayerToMap([items], objs)
    },
    // 800M
    onListGPS(record) {
      let columns = this.columns.filter((e) => e.textIndex != "dw")
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/forTeam.svg",
        type: "defaultType",
        layerName: "800M通信",
        info: columns,
        //phoneInfo:{phone:"fzryddh",name:"mc"}
      };

      items.lon = items.jd;
      items.sid = items.rownum;
      items.lat = items.wd;
      items.name = items.mc;
      pGzznCore.setPointLayerToMap([items], objs);
    },
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
@import "./mixin.less";
</style>