<!--
 * @Description: 风险隐患
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-11-08 11:00:00
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-08 11:21:19
-->
<!-- 风险隐患 -->
<template>
  <div class="hidden_danger">
    <div id="disaster_risk_list" class="list">
      <div class="more" @click="onMore">更多</div>
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
    </div>

    <pop-up-layer v-if="show" :show="show" @doClose="close" opsition="pageCenter" title="灾害风险实时监测情况" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import { yjzhPreventionDangerFind } from "@/api/idsm/index";
import UpView from "@/views/emergencyOrganizationCommand/components/disasterRisk/UpView.vue";
import moment from "moment";

export default {
  components: { UpView },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      isOpenMore: false,
      listData: [],
      /** 更多视图库控制器 */
      show: false,
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  //挂载完成 访问DOM元素
  mounted() { },
  //方法集合
  methods: {
    moment,
    doQuery() {
      let body = {
        body: {},
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
    /** 打点附件突发事件 */
    TakeCareOf() { },

    /** 更多事件 */
    onMore() {
      this.show = true;
    },

    /** 关闭更多页面 */
    close() {
      this.show = false;
    },

    onClick(record) {
      let items = JSON.parse(JSON.stringify(record));
      let columns = [
        { title: "区域", textIndex: "areaName", width: "15%" },
        { title: "事件名称", textIndex: "name", width: "32%" },
        { title: "描述", textIndex: "detail", width: "20%" },
        { title: "时间", textIndex: "occurrenceTime", width: "20%" },
      ];

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
        pGzznCore.setPointLayerToMap([items], objs);
      }
    },
  },
};
</script>
<style lang='less' scoped>
@import '../../../common.less';

.hidden_danger {
  width: 100%;
  position: relative;
  .more {
    position: absolute;
    color: white;
    cursor: pointer;
    font-size: 22vh * @h;
    top: 0vh * @h;
    right: 0vw * @w;
    z-index: 9999;
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
        width: 400vw * @w;
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
        margin: 0px 10vw * @w;
        line-height: 60vh * @h;
      }
      .dw {
        float: left;
        width: 100vw * @w;
        color: white;
        border: 5vh * @h solid #009fe9;
        text-align: center;
        line-height: 44vh * @h;
        cursor: pointer;
      }
    }
  }
}
</style>