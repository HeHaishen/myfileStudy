<!--
 * @Description: 进度情况内容
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-27 15:44:01
 * @LastEditTime: 2021-11-01 14:45:11
-->
<template>
  <div class="progrees-of-inner">
    <ul class="list">
      <li v-for="(i, k) in progressList" :key="i.id">
        <div class="title-message">
          <p class="step-p step-green" v-show="k !== 0">{{ k + 1 }}</p>
          <p
            class="title-p"
            :class="[k === 0 ? 'title-yellow' : 'title-green']"
          >
            {{ i.executor }}
          </p>
          <p>{{ i.created }}</p>
        </div>
        <div
          class="content-detail"
          :class="[k === 0 ? 'white-color' : 'gray-color']"
        >
          {{ i.content }}
        </div>
        <div
          class="color-box"
          :class="[k === 0 ? 'color-box-yellow' : 'color-box-green']"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { contingencyplansDisposetaskResultFind } from "@/api/idsm/index";

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
      ],
    };
  },
  created() {
    this.doQuery();
  },
  methods: {
    async doQuery() {
      let body = {
        body: {
          eventId: "1120",
        },
      };
      let data = await contingencyplansDisposetaskResultFind(body);
      console.log(data);
      if (data.success) {
        // this.progressList = data.body;
      } else {
        this.$MyMessage.error(data.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
