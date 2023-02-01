<!--
 * @Description: 风险隐患
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-11-08 11:00:00
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 17:42:33
-->
<!-- 风险隐患 -->
<template>
  <div class="hidden_danger">
    <div class="more" @click="onMore">更多</div>
    <div id="disaster_risk_list" class="list">
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

    <pop-up-layer v-if="show" :show="show" @doClose="close" opsition="pageCenter" title="灾害风险实时监测情况" ref="myPopUpLayer" class="big_pop_up_layer">
      <div slot="content" class="upLayer_content">
        <UpView :eventData='eventData' />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import { yjzhPreventionDangerFindNew } from "@/api/idsm/index";
import UpView from "./UpView.vue";
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
  },
  //挂载完成 访问DOM元素
  mounted() {

    this.doQuery();

  },
  //方法集合
  methods: {
    moment,
    doQuery() {
      let { jd, wd } = this.eventData
      let infos = [
        { title: "序号", textIndex: "index", },
        { title: "事件名称", textIndex: "name", },
        { title: "描述", textIndex: "detail", },
        { title: "时间", textIndex: "occurrenceTime" },
      ]
      let body = {
        body: {
          latitude: wd ? wd : '',
          longitude: jd ? jd : '',
          distance: 1,
        },
      };
      yjzhPreventionDangerFindNew(body).then((res) => {
        if (res.success) {
          if (res.body) {
            this.listData = res.body;
            let items = pGzznCore.deepClone(res.body);
            pGzznCore.pointLayerRemove({ type: `defaultTypeHiddentEvent` });
            let objs = {
              imgUrl: `gzznGIS/Image/gjh/qyyh1红.png`,
              imgSize: { width: 40, height: 40 },
              type: `defaultTypeHiddentEvent`,
              layerName: '风险隐患',
              info: infos,
              lonLat: { lon: "longitude", lat: "latitude" },
            };
            pGzznCore.setPointLayerToMap(items, objs);
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
@import '../../../../common.less';

.hidden_danger {
  width: 100%;
  position: relative;
  .more {
    position: absolute;
    color: white;
    cursor: pointer;
    font-size: 32px;
    top: -102px;
    right: 14px;
  }

  .list {
    height: 100%;
    overflow: auto;
    position: relative;

    .item {
      overflow: hidden;
      font-size: 30px;
      padding: 10px 0;
      position: relative;
      .icon {
        width: 35px;
        height: 35px;
        position: absolute;
        left: 23px;
        top: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-left: 58px;
        width: 767px;
        color: white;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 60px;
      }
      .time {
        float: left;
        width: 246px;
        color: #95abdc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px 10px;
        line-height: 60px;
      }
      .dw {
        float: left;
        width: 100px;
        color: white;
        border: 5px solid #009fe9;
        text-align: center;
        line-height: 44px;
        cursor: pointer;
      }
    }
  }
}
</style>