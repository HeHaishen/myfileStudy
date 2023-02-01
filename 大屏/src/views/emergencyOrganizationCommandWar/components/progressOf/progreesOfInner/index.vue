<!--
 * @Description: 进度情况内容
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-27 15:44:01
 * @LastEditTime: 2021-11-03 16:49:09
-->
<template>
  <div class="progrees-of-inner">
    <ul class="list">
      <li v-for="(i, k) in progressList" :key="i.id">
        <div class="title-message">
          <p class="title-p title-green">{{ i.name }}</p>
          <p
            class="title-p"
            v-show="k == 0"
            :class="[k === 0 ? 'title-yellow' : 'title-green']"
          >
            最新灾情上报
          </p>
          <p>
            {{
              i.created ? moment(i.created).format("YYYY-MM-DD HH:mm:ss") : ""
            }}
          </p>
        </div>
        <div class="content-detail white-color">
          <div class="content-detail-type gray-color">
            {{ handType(i.type) }}
          </div>
          <div>{{ i.content }}</div>
        </div>
        <div class="color-box color-box-green"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { contingencyplansDisposetaskResultFindResult } from "@/api/idsm/index";
import moment from "moment";

export default {
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
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
  },
  created() {
    this.doQuery();
  },
  methods: {
    moment,
    init() {
      this.doQuery();
    },
    async doQuery() {
      let body = {
        body: {
          eventId: this.eventData.jbbh,
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

<style lang="less" scoped>
@import "./index.less";
</style>
