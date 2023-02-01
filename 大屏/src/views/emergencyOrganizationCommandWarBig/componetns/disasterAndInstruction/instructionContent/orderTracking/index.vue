<!--
 * @Description: 指令跟踪
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 18:10:11
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 19:13:32
-->
<!-- 指令跟踪 -->
<template>
  <div class="order_tracking">
    <div class="more" @click="onMore">更多</div>
    <clist class="list" :columns="columns" :listData="listData">
      <template
        v-for="item in columns"
        :slot="item.textIndex"
        slot-scope="{ text }"
      >
        <span :title="text" :key="item.textIndex">
          {{ text }}
        </span>
      </template>

      <template slot="eventStatus" slot-scope="{ text }">
        <span :title="text == 1 ? '指挥中' : '已完成'">
          {{ text == 1 ? "指挥中" : "已完成" }}
        </span>
      </template>
    </clist>

    <pop-up-layer
      v-if="isOpenMore"
      :show="isOpenMore"
      @doClose="close"
      opsition="pageCenter"
      title="指令跟踪"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <UpView @onChangeItem="onChangeItem" :eventData="eventData" />
      </div>
    </pop-up-layer>

    <pop-up-layer
      class="tracking_detail_layer"
      :show="isOpenDetail"
      @doClose="detailClose"
      opsition="pageCenter"
      title="指令详情"
      ref="myPopUpLayer"
    >
      <div slot="content" class="tracking_detail">
        <div class="item">
          <div class="label">执行人：</div>
          <div class="value">
            {{ formData.executor }}
          </div>
        </div>
        <div class="item">
          <div class="label">执行情况：</div>
          <div class="value">
            {{ formData.eventStatus == 1 ? "指挥中" : "已完成" }}
          </div>
        </div>
        <div class="item" style="width: 100%">
          <div class="label" style="width: 25%">指令内容：</div>
          <div class="value" style="width: 75%">
            {{ formData.content }}
          </div>
        </div>

        <clist
          class="list"
          :columns="detailColumns"
          :listData="formData.executorList"
        >
          <template
            v-for="item in detailColumns"
            :slot="item.textIndex"
            slot-scope="{ text }"
          >
            <span :title="text" :key="item.textIndex">
              {{ text }}
            </span>
          </template>

          <template slot="executorType" slot-scope="{ text }">
            <span
              :title="
                text == 1 ? '应急人员' : text == 2 ? '救援专家' : '救援队伍'
              "
            >
              {{ text == 1 ? "应急人员" : text == 2 ? "救援专家" : "救援队伍" }}
            </span>
          </template>
        </clist>
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import {
  plansDisDespicableFind,
  plansDisDespicableDetailWith,
} from "@/api/idsm/index";
import UpView from "./upView.vue";

export default {
  components: { Clist, UpView },
  props: {
    /** 当前应急事件数据 */
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      columns: [
        { title: "指令内容", textIndex: "content", width: "60%" },
        { title: "执行人", textIndex: "executor", width: "20%" },
        { title: "执行情况", textIndex: "eventStatus", width: "20%" },
      ],
      listData: [],
      /** 更多视图控制器 */
      isOpenMore: false,
      detailColumns: [
        { title: "执行人名称", textIndex: "executor" },
        { title: "执行人职位", textIndex: "executorPosition" },
        { title: "执行人联系电话", textIndex: "executorTel" },
        { title: "执行人类型", textIndex: "executorType" },
      ],
      /** 详情视图控制器 */
      isOpenDetail: false,
      /** 当前点击数据项 */
      formData: {
        executorList: [],
      },
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
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    init() {
      this.formData = {
        executorList: [],
      };
      this.isOpenDetail = false;
      this.isOpenDetail = false;
      this.doQuery();
    },
    async doQuery() {
      if (!this.eventData.jbbh) {
        return;
      }
      let body = {
        body: {
          eventId: this.eventData.jbbh,
        },
      };
      this.listData = [];
      let data = await plansDisDespicableFind(body);
      console.log(data, "data--data");
      if (data.success) {
        this.listData = data.body;
      } else {
        this.$MyMessage.error(data.message);
      }
    },

    /** 更多事件 */
    onMore() {
      this.isOpenMore = true;
    },

    /** 关闭更多页面 */
    close() {
      this.isOpenMore = false;
    },

    /** 点击子项 */
    onChangeItem(record) {
      this.formData = {
        executorList: [],
      };
      plansDisDespicableDetailWith(record.sid).then((res) => {
        if (res.success) {
          if (!res.body.executorList) {
            res.body.executorList = [];
          }
          this.formData = res.body;
        } else {
          this.$MyMessage.error(res.message);
        }
      });
      this.$nextTick(() => {
        this.isOpenDetail = true;
      });
    },

    /** 关闭详情 */
    detailClose() {
      this.formData = {
        executorList: [],
      };
      this.isOpenDetail = false;
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../../../common.less";

.order_tracking {
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
    // height: calc(100% - (202px));
    overflow: auto;
    /deep/ .list-header {
      padding: 10px 16px;
      background: #0d2e63;
      div {
        font-size: 32px;
        color: #2295ff;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        margin: 0;
        background: #092a5d;
        div {
          line-height: 42.5px;
          font-size: 38px;
          padding: 18px 16px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        // 操作按钮样式
        .operate {
          border: 1px solid;
          padding: 0 14px;
          font-size: 24px;
          color: #fff;
          border-color: #10d378;
          background: #10b46777;
          & + .operate {
            margin-left: 5px;
            border-color: #103fda;
            background: #0d36be67;
          }
        }
        &.double-columns {
          background: #012257;
        }
      }
    }
  }

  .tracking_detail_layer {
    background: rgba(2, 14, 35, 1);
  }

  .tracking_detail {
    min-width: 1200px;
    color: white;
    padding-top: 10px;
    .item {
      width: 50%;
      font-size: 28px;
      line-height: 50px;
      float: left;
      overflow: hidden;
      margin: 10px 0;
      .label,
      .value {
        width: 50%;
        display: inline-block;
        float: left;
        text-align: right;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .value {
        text-align: left;

        /deep/ .ant-input-affix-wrapper,
        /deep/ .ant-input-number {
          background-color: transparent;
          border-color: #1382bb;
          color: white;
          width: 100%;

          .ant-input {
            background-color: transparent;
            border-color: #1382bb;
            color: white;
          }
          .ant-input-suffix {
            color: white;
          }
        }
      }
    }
  }
}
</style>