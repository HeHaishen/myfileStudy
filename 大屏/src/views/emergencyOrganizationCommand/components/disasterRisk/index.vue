<!--
 * @Description: 灾害风险实时监测情况
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-25 11:05:03
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-05 17:06:11
-->
<!-- 灾害风险实时监测情况 -->
<template>
  <div class="manage" ref="manages">
    <ModelBox class="manage_yjdw" :title="setTitle()">
      <div slot="content" class="content">
        <div class="rightTitle">
          <div class="more" @click="onMore">
            <a-icon v-if="showType != 1" type="rollback" />
            <span v-else> 更多 </span>
          </div>
        </div>
        <div class="btns" v-show="showType == 1">
          <div class="btn" @click="changeTab(2)">综合统计</div>
        </div>
        <div id="disaster_risk_list" v-show="showType == 1" class="list">
          <vue-seamless-scroll
            :data="listData"
            class="warp"
            :class-option="{ step: 0.5 }"
            v-if="listData.length > 0"
          >
            <div class="ul">
              <div class="item" v-for="item in listData" :key="item.sid">
                <div class="icon">
                  <img
                    src="~@/assets/images/emergencyOrganizationCommand/disaster_risk_list_icon.png"
                    alt=""
                    srcset=""
                  />
                </div>
                <div class="title" :title="item.name">
                  {{ item.name }}
                </div>
                <div
                  class="time"
                  :title="
                    item.occurrenceTime
                      ? moment(item.occurrenceTime).format('YYYY-MM-DD HH:mm')
                      : ''
                  "
                >
                  {{
                    item.occurrenceTime
                      ? moment(item.occurrenceTime).format("YYYY-MM-DD HH:mm")
                      : ""
                  }}
                </div>
                <div class="dw" @click="onClick(item)">定位</div>
              </div>
            </div>
          </vue-seamless-scroll>
          <div v-else class="zqjcqk">
            <a-empty>
              <span slot="description" style="color: #fff">
                今日暂未发现隐患
              </span>
            </a-empty>
          </div>
        </div>
        <div v-if="showType != 1">
          <ComprehensiveStatistics
            v-show="showType == 2"
            @echartsClick="echartsClick"
          />
          <DistrictsStatistics v-if="showType == 3" :formData="formData" />
        </div>
      </div>
    </ModelBox>

    <pop-up-layer
      v-if="show"
      :show="show"
      @doClose="close"
      opsition="pageCenter"
      title="灾害风险实时监测情况"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import ModelBox from "../modelBox/index.vue";
import { getIdsmApi, yjzhPreventionDangerFind } from "@/api/idsm/index";
import ComprehensiveStatistics from "./comprehensiveStatistics.vue";
import DistrictsStatistics from "./districtsStatistics.vue";
import UpView from "./UpView.vue";
import moment from "moment";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  components: {
    ModelBox,
    ComprehensiveStatistics,
    DistrictsStatistics,
    UpView,
    vueSeamlessScroll,
  },
  data() {
    return {
      listData: [],
      /** 更多视图库控制器 */
      show: false,
      /** 综合统计视图框控制器 */
      showType: 1,
      /** 近五日综合统计当前数据 */
      formData: {},
      Timeout: null,
    };
  },
  watch: {
    pushData: {
      deep: true,
      handler(newVal) {
        if (newVal.cmd) {
          switch (newVal.cmd) {
            case "12dW752u":
              this.doQuery();
              break;
          }
        }
      },
    },
  },
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  computed: {
    pushData() {
      return this.$store.getters.responeData;
    },
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    moment,
    /** 设置标题 */
    setTitle() {
      if (this.showType == 1) {
        return "灾害风险实时监测情况";
      } else if (this.showType == 2) {
        return "近5日灾害风险监测情况";
      } else {
        return `${this.formData.name}各区灾害风险监测情况`;
      }
    },
    doQuery() {
      let body = {
        body: {
          occurrenceTimeStart: moment().format("YYYY-MM-DD 00:00:00"),
          occurrenceTimeEnd: moment().format("YYYY-MM-DD 23:59:59"),
        },
      };
      yjzhPreventionDangerFind(body).then((res) => {
        if (res.success) {
          if (res.body) {
            this.listData = res.body;
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    onClick(record) {
      //let items = JSON.parse(JSON.stringify(record));
      let columns = [
        { title: "区域", textIndex: "areaName", width: "15%" },
        { title: "事件名称", textIndex: "name", width: "32%" },
        { title: "描述", textIndex: "detail", width: "20%" },
        { title: "时间", textIndex: "occurrenceTime", width: "20%" },
      ];

      let items = pGzznCore.deepClone(record);
      if (
        !pGzznCore.pointLayerRemove({ type: `zhfydefaultType${items.sid}` })
      ) {
        var objs = {
          imgUrl: "gzznGIS/Image/gjh/qyyh1红.png",
          imgSize: { width: 32, height: 32 },
          type: `zhfydefaultType${items.sid}`,
          layerName: "灾害风险实时监测情况",
          info: columns,
          lonLat: { lon: "longitude", lat: "latitude" },
        };

        items.lon = items.longitude;
        items.sid = items.lxdm;
        items.lat = items.latitude;
        // items.name = items.mc;
        // items.z = items.zrs;
        pGzznCore.setPointLayerToMap([items], objs);
      }
    },
    /** 更多事件点击 */
    onMore() {
      if (this.showType == 1) {
        this.show = true;
      } else {
        this.formData = {};
        this.showType -= 1;
      }
    },
    /** echarts 点击事件 */
    echartsClick(params) {
      this.showType = 3;
      this.formData = params;
    },
    /** 关闭更多页面 */
    close() {
      this.show = false;
    },

    /** 切换按钮
     *  @param{Number} type 1.灾害风险实时监测情况 2.综合统计
     */
    changeTab(type) {
      this.showType = type;
    },

    /** 初始化滚动 */
    initScroll() {
      return;
      let oMarquee = document.getElementById("disaster_risk_list"); //滚动对象
      let iLine = oMarquee.querySelectorAll(".item");
      if (!iLine) {
        return false;
      }
      let iLineHeight = iLine[0].clientHeight; //单行高度，像素
      let iLineCount = this.listData.length; //实际行数
      let iScrollAmount = 1; //每次滚动高度，像素
      // oMarquee.innerHTML += oMarquee.innerHTML;
      let self = this;

      function run() {
        oMarquee.scrollTop += iScrollAmount;
        if (oMarquee.scrollTop >= iLineCount * iLineHeight) {
          oMarquee.scrollTop = 0;
        }

        if (oMarquee.scrollTop % iLineHeight == 0) {
          self.Timeout = setTimeout(run, 2500);
        } else {
          self.Timeout = setTimeout(run, 10);
        }
      }
      this.Timeout = setTimeout(run, 6000);

      oMarquee.onmouseover = () => {
        clearTimeout(this.Timeout);
      };
      oMarquee.onmouseout = () => {
        this.Timeout = setTimeout(run, 6000);
      };
    },
  },
  beforeDestroy() {
    // clearInterval(this.Inter);
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";
.manage {
  .manage_yjdw {
    top: 1721vh * @h;
    left: 2815vw * @w;
    // position: relative;
    .rightTitle {
      position: absolute;
      top: 0;
      right: 30vw * @w;
      line-height: 64vh * @h;
      color: white;
      font-size: 22vh * @h;
      .more {
        cursor: pointer;
      }
    }
  }
  .content {
    height: 330vh * @h;
    overflow: hidden;
    .btns {
      width: 100%;
      overflow: hidden;
      // margin: 5px 0;
      .btn {
        position: absolute;
        left: 408vw * @w;
        top: 10vh * @h;

        cursor: pointer;
        display: inline-block;
        background: rgba(10, 42, 100, 1);
        // background: #02648e;
        margin-right: 5px;
        color: white;
        padding: 5vh * @h 30vw * @w;
        font-size: 11vh * @h;
        border: 2px #1d4fa2 solid;

        &.active {
          background: #02648e;
          border-color: #0275a1;
        }
      }
    }

    .list {
      height: 100%;
      overflow: auto;
      position: relative;

      .item {
        overflow: hidden;
        font-size: 28vh * @h;
        padding: 10vh * @h 0;
        position: relative;
        .icon {
          width: 35vw * @w;
          height: 35vh * @h;
          position: absolute;
          left: 23vw * @w;
          top: 20vh * @h;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-left: 58vw * @w;
          width: 500vw * @w;
          color: white;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 60vh * @h;
        }
        .time {
          float: left;
          width: 246vw * @w;
          color: #95abdc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0px 10 * @w;
          line-height: 60vh * @h;
        }
        .dw {
          float: left;
          width: 135vw * @w;
          color: white;
          border: 5vh * @h solid #009fe9;
          text-align: center;
          line-height: 44vh * @h;
          cursor: pointer;
        }
      }
    }

    .zhtj_echarts {
      height: 330vh * @h;
      width: 100%;
    }
  }
}
</style>

<style lang="less">
@import "../../common.less";
.content {
  .zqjcqk {
    .ant-empty {
      .ant-empty-image {
        margin-top: calc((330vh * @h - 150vh * @h) / 3);
        height: 150vh * @h;
      }
    }
  }
}
</style>