<!--
 * @Description: 灾害风险实时监测情况
 * @Author: liuxin
 * @Date: 2021-11-01 15:30:48
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-05 17:07:49
-->
<template>
  <div class="real_inspection">
    <div class="public-head">
      灾害风险实时监测情况
      <div class="more" @click="onMore">
        <span>更多</span>
      </div>
    </div>
    <div class="public-content">
      <div id="disaster_risk_list" class="list">
        <vue-seamless-scroll :data="listData" class="warp" :class-option="{ step: 0.5 }" v-if="listData.length > 0">
          <div class="ul">
            <div class="item" v-for="item in listData" :key="item.sid">
              <div class="icon">
                <img src="~@/assets/images/emergencyOrganizationCommand/disaster_risk_list_icon.png" alt="" srcset="" />
              </div>
              <div class="title" :title="item.name">
                {{ item.name }}
              </div>
              <div class="time" :title="
                  item.occurrenceTime
                    ? moment(item.occurrenceTime).format('YYYY-MM-DD HH:mm')
                    : ''
                ">
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
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>

    <pop-up-layer :show="show" @doClose="close" opsition="pageCenter" title="灾害风险实时检查情况" ref="myPopUpLayer" class="big_pop_up_layer">
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import UpView from "./UpView.vue";
import { yjzhPreventionDangerFind } from "@/api/idsm/index";
import moment from "moment";

export default {
  name: "",
  props: {},
  components: { vueSeamlessScroll, UpView },
  data() {
    return {
      listData: [],
      /** 更多视图库控制器 */
      show: false,
    };
  },
  created() {
    this.doQuery();
  },
  computed: {
    pushData() {
      return this.$store.getters.responeData;
    },
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
  mounted() { },
  methods: {
    moment,
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
          layerName: "灾害风险实时检查情况",
          info: columns,
          lonLat: { lon: "longitude", lat: "latitude" },
        };

        items.lon = items.longitude;
        items.sid = items.lxdm;
        items.lat = items.latitude;
        items.name = items.mc;
        items.z = items.zrs;
        pGzznCore.setPointLayerToMap([items], objs);
      }
    },

    /** 更多事件点击 */
    onMore() {
      this.show = true;
    },

    /** 关闭更多页面 */
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang='less' scoped>
@import '../../../common.less';
.real_inspection {
  border: 2px solid #015ebd;
  width: 100%;
  height: 950px;
  position: relative;
  background-color: #001941;

  .public-head {
    position: relative;
    .more {
      position: absolute;
      top: -2px;
      right: 40px;
      cursor: pointer;
      font-size: 38px;
    }
  }

  .public-content {
    height: calc(950px - 85px);

    .list {
      height: 100%;
      overflow: auto;
      position: relative;

      .item {
        overflow: hidden;
        font-size: 34px;
        padding: 10px 0;
        position: relative;
        .icon {
          width: 40px;
          height: 40px;
          position: absolute;
          left: 17px;
          top: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-left: 58px;
          width: 745px;
          color: white;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 60px;
        }
        .time {
          float: left;
          width: 251px;
          color: #95abdc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0px 10px;
          line-height: 60px;
        }
        .dw {
          float: left;
          width: 110px;
          color: white;
          border: 5px solid #009fe9;
          text-align: center;
          line-height: 44px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="less">
.zqjcqk {
  .ant-empty {
    .ant-empty-image {
      margin-top: calc((950px - 150px - 85px) / 2.5);
      height: 150px;
    }
  }
}
</style>