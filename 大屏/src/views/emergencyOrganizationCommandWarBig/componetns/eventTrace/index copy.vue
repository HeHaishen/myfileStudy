<!--
 * @Description: 事件跟踪
 * @Author: liuxin
 * @Date: 2021-11-01 16:33:57
 * @LastEditTime: 2021-11-01 20:07:33
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
            <p class="step-p step-green" v-show="k !== 0">{{ k + 1 }}</p>
            <p class="title-p" :class="[k === 0 ? 'title-yellow' : 'title-green']">
              {{ i.executor }}
            </p>
            <p>{{ i.created }}</p>
          </div>
          <div class="content-detail" :class="[k === 0 ? 'white-color' : 'gray-color']">
            {{ i.content }}
          </div>
          <div class="color-box" :class="[k === 0 ? 'color-box-yellow' : 'color-box-green']"></div>
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

export default {
  name: '',
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
      title: '事件跟踪',
      progressList: [
        {
          id: 1,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 2,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 3,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 4,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 5,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 6,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 7,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 21,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 22,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 23,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 24,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 25,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 26,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 27,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 11,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 12,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 13,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 14,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 15,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 16,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
        {
          id: 17,
          executor: "最新灾情上报",
          created: "2021-09-19 16:38",
          content:
            "广州市岑村消防大队于8月24日14:13分到达火炉山南门一号，准备救援工作",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.doQuery();
  },
  methods: {
    async doQuery() {
      let body = {
        body: {
          eventId: "1120",
        },
      };
      let data = await contingencyplansDisposetaskResultFindResult(body);
      console.log(data);
      if (data.success) {
        // this.progressList = data.body;
      } else {
        this.$MyMessage.error(data.message);
      }
    },
  },
}
</script>
<style lang='less' scoped>
@import './index.less';
.event-trace {
  width: 1239px;
  height: 1934px;
  margin-top: 40px;
  border: 2px solid #015ebd;
  position: relative;
}
</style>