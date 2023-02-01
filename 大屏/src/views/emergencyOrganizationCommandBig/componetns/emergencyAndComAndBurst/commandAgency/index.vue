<!--
 * @Description: 指挥机构
 * @Author: liuxin
 * @Date: 2021-11-01 15:30:48
 * @LastEditors:  
 * @LastEditTime: 2021-11-03 20:00:58
-->
<template>
  <div class="command_agency">
    <div class="public-head">指挥机构</div>
    <div class="public-content">
      <div class="event-inner">
        <ul>
          <li v-for="item in showList" :key="item.id" @click="liClickEvent(item.orgLevel)">
            <div>
              <p class="icon">
                <img :src="item.icon" />
              </p>
              <p class="name">{{ item.title }}</p>
            </div>
            <div>
              <p :style="item.textStyle">
                {{ item.num ? item.num : "0" }}<span style="color:#fff;font-size:24px;margin-left:8px;">{{item.unit?item.unit:'人'}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
    <pop-up-layer :show="isOpenAgency" v-if="isOpenAgency" @doClose="close" opsition="pageCenter" title="指挥机构" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <UpView :activeKey='activeKey' />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import { getIdsmApi } from "@/api/idsm";
import UpView from "./upView.vue";
export default {
  name: "",
  props: {},
  components: { UpView },
  data() {
    return {
      showList: [
        {
          id: 1,
          title: "市级指挥机构",
          icon: require("@/assets/images/majorFestivalsConductor/icon_event.png"),
          textStyle: { color: "#2790fd", fontSize: '34px' },
          num: "122",
          flag: false,
        },
        {
          id: 2,
          title: "区级指挥机构",
          icon: require("@/assets/images/majorFestivalsConductor/icon_event.png"),
          textStyle: { color: " #fee845", fontSize: '34px' },
          num: "65",
          flag: false,
        },
        {
          id: 3,
          title: "镇街级指挥机构",
          icon: require("@/assets/images/majorFestivalsConductor/icon_event.png"),
          textStyle: { color: "#fd8232", fontSize: '34px' },
          num: "13",
          flag: false,
        },
        {
          id: 5,
          title: "村(居)级指挥机构",
          icon: require("@/assets/images/majorFestivalsConductor/icon_event.png"),
          textStyle: { color: "#01e99d", fontSize: '30px' },
          num: "1",
          flag: false,
        },
      ],
      listData: [],
      chartXData: [],
      chartYData: [],
      moreShow: false,
      detailShow: false,
      detailObj: {},
      isOpenAgency: false,
      activeKey: ''
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.doGetEventList();
    });
  },
  methods: {
    // 获取各级机构统计
    doGetEventList() {
      getIdsmApi("utm2wk4H", { body: {} })
        .then((res) => {
          if (res.success) {
            this.showList.map((item, index) => {
              res.body.data.map((e, i) => {
                if (e.name == item.title) {
                  item.num = e.num;
                  item.orgLevel = e.orgLevel;
                  item.rownum = e.rownum;
                  item.unit = e.unit;
                }
              });
            });
          }
        })
    },
    //每个模块点击展开指挥机构 
    liClickEvent(type) {
      this.activeKey = type
      this.isOpenAgency = true;
    },
    /** 关闭页面 */
    close() {
      this.isOpenAgency = false;
    },
    //  点击事件
    clickEventLine(i, k) {
      this.onGPS(i);
      this.detailShow = true;
      console.log(i);
      this.getRemoteDetail(i.sid);
    },
    onGPS(item) {
      let items = pGzznCore.deepClone(item);
      let columns = [
        { title: "名称", textIndex: "xxbt" },
        { title: "时间", textIndex: "sjsj" },
      ];
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/forTeam.svg",
        type: "defaultType",
        layerName: "应急事件",
        info: columns,
        //phoneInfo:{phone:"fzryddh",name:"mc"}
      };

      items.lon = items.lon;
      items.sid = items.id ? items.id : 1;
      items.lat = items.lat;
      items.name = items.xxbt;
      pGzznCore.setPointLayerToMap([items], objs);
    },
    onMore() {
      this.moreShow = true;
    },
    moreClose() {
      this.moreShow = false;
    },
    detailClose() {
      this.detailShow = false;
    },
  },
};
</script>
<style lang='less' scoped>
@import '../../../common.less';
.command_agency {
  border: 2px solid #015ebd;
  width: 100%;
  height: 370px;
  position: relative;
  background-color: #001941;
  .event-inner {
    width: 100%;
    height: calc(100% - 84px);
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 515px;
        height: 100px;
        display: flex;
        margin-bottom: 20px;
        background: url('../../../../../assets/images/majorFestivalsConductor/bg_event2.png')
          center no-repeat;
        background-size: 100% 100%;
        justify-content: flex-start;
        // padding-top: 21px;
        .box-sizing();
        cursor: pointer;
        div {
          height: 100%;
          p {
            width: 100%;
            text-align: center;
          }
        }
        div:nth-child(2) {
          width: 236px;
          p {
            font-size: 34px;
            height: 100%;
            line-height: 100px;
            font-weight: bold;
          }
        }
        div:nth-child(1) {
          width: 208px;
          .icon {
            height: 55px;
            display: flex;
            justify-content: center;
            img {
              display: block;
              height: 55px;
            }
          }
          .name {
            height: 48px;
            width: 100%;
            text-align: center;
            color: white;
            line-height: 48px;
            font-size: 24px;
          }
        }
      }
    }
  }
  .rightTitle {
    position: absolute;
    top: 0;
    right: 30px;
    line-height: 64px;
    color: white;
    font-size: 22px;
    .more {
      cursor: pointer;
    }
  }
  .c-popup-layer {
    background-color: #0d203e;
  }

  .upLayer_content {
    padding: 10px 10px;
  }
}
</style>