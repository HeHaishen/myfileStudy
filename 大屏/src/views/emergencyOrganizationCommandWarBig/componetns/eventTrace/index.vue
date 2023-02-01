<!--
 * @Description: 事件跟踪
 * @Author: liuxin
 * @Date: 2021-11-01 16:33:57
 * @LastEditTime: 2021-11-05 16:56:33
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="event-trace">
    <div class="public-head">
      {{ title }}
    </div>
    <div class="public-content">
      <ul class="list">
        <li v-for="(i, k) in progressList" :key="i.id">
          <div class="title-message">
            <p class="title-p title-green" :title="i.name">{{ i.name }}</p>
            <p class="title-p" v-show="k == 0" :class="[k === 0 ? 'title-yellow' : 'title-green']" title="最新灾情上报">
              最新灾情上报
            </p>
            <p :title="
                i.created ? moment(i.created).format('YYYY-MM-DD HH:mm:ss') : ''
              ">
              {{
                i.created ? moment(i.created).format("YYYY-MM-DD HH:mm:ss") : ""
              }}
            </p>
          </div>
          <div class="content-detail white-color">
            <div class="content-detail-type gray-color" :title="handType(i.type)">
              {{ handType(i.type) }}
            </div>
            <div :title="i.content">{{ i.content }}</div>
          </div>
          <div class="color-box color-box-green"></div>
        </li>
      </ul>
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import { contingencyplansDisposetaskResultFindResult } from "@/api/idsm/index";
import moment from "moment";

export default {
  name: "",
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => { },
    },
  },
  components: {},
  data() {
    return {
      title: "事件跟踪",
      progressList: [],
    };
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
            case "GOu7aoP0":
              this.doQuery();
              break;
          }
        }
      },
    },
    "$route.query":{
      handler(newVal,oldVal){
        this.doQuery(newVal.jbbh)
      },
      deep:true,
    }
  },
  created() { },
  mounted() {
    this.doQuery();
  },
  methods: {
    moment,
    init() {
      this.doQuery(this.eventData.jbbh);
    },
    async doQuery(eventId) {
      if (!eventId) {
        return;
      }
      let body = {
        body: {
          eventId
        },
      };
      let data = await contingencyplansDisposetaskResultFindResult(body);
      if (data.success) {
        this.progressList = data.body;
      } else {
        this.$MyMessage.error(data.message);
      }
    },

    /** 处理类型 */
    handType(type) {
      switch (type) {
        case 1:
        case "1":
          return "指令下达";
        case 2:
        case "2":
          return "指令反馈";
        case 3:
        case "3":
          return "公共信息";
        default:
          return type;
      }
    },
  },
};
</script>
<style lang='less' scoped>
@import './index.less';
.event-trace {
  width: 1400px;
  height: 1934px;
  // margin-top: 40px;
  border: 2px solid #015ebd;
  position: relative;
  background-color: #001941;
}
</style>