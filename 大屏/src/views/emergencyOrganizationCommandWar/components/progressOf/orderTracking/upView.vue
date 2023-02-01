<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-04 15:36:44
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <!-- <div class="conditions-search">
      <span>队伍名称：</span
      ><input v-model="queryData.mc" placeholder="队伍名称" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div> -->
    <clist class="list" :columns="columns" :listData="listData">
      <template
        v-for="item in columns"
        :slot="item.textIndex"
        slot-scope="{ text, record }"
      >
        <span :title="text" :key="item.textIndex" @click="onItem(record)">
          {{ text }}
        </span>
      </template>

      <template slot="status" slot-scope="{ text }">
        <span :title="handlerStatus(text)">
          {{ handlerStatus(text) }}
        </span>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { plansDisDespicableFind } from "@/api/idsm/index";

export default {
  components: { Clist, ChangePage },
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
        { title: "执行情况", textIndex: "status", width: "20%" },
      ],
      listData: [],
      queryData: {},
      total: 0,
      currentPage: 1,
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    doQuery() {
      let body = {
        body: {
          ...this.queryData,
          eventId: this.eventData.jbbh,
        },
        page: this.currentPage,
      };
      plansDisDespicableFind(body).then((res) => {
        if (res.success) {
          this.listData = res.body;
          this.total = parseInt(res.total);
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },

    /** 处理状态转换 */
    handlerStatus(status) {
      switch (status) {
        case 1:
        case "1":
          return "未完成";
        case 2:
        case "2":
          return "接收人已读";
        case 3:
        case "3":
          return "完成";
        case 4:
        case "4":
          return "终止";
        default:
          return status;
      }
    },

    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },

    onQuery() {
      this.currentPage = 1;
      this.doQuery();
    },
    onEmpty() {
      this.currentPage = 1;
      this.queryData = {};
      this.doQuery();
    },

    /** 点击子项 */
    onItem(record) {
      this.$emit("onChangeItem", record);
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";
.up_view {
  min-width: 900vw * @w;
  .btns {
    width: 100%;
    overflow: hidden;
    margin: 5px 0;
    .btn {
      cursor: pointer;
      display: inline-block;
      background: rgba(10, 42, 100, 1);
      // background: #02648e;
      margin-right: 5px;
      color: white;
      padding: 10vh * @h 30vw * @w;
      font-size: 11vh * @h;
      border: 2px #1d4fa2 solid;

      &.active {
        background: #02648e;
        border-color: #0275a1;
      }
    }
  }

  .list {
    max-height: 800vh * @h;
    overflow: auto;
    margin: 20vh * @h 0;
    .dw {
      width: 50vw * @w;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14vh * @h 0;
      div {
        font-size: 18vh * @h;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 18vh * @h;
          padding: 0 10vw * @w;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .phone {
          .icon {
            margin: 0 10vw * @w;
            color: #00ffff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15vh * @h 0 20vh * @h;
    margin: 20vh * @h;

    .time {
      font-size: 22vh * @h;
    }

    > span {
      font-size: 18vh * @h;
      color: white;
    }

    > input {
      width: 200vw * @w;
      height: 35vh * @h;
      line-height: 30vh * @h;
      background-color: #333333;
      color: #fff;
      padding-left: 20vw * @w;
      border: none;
      margin-right: 30vw * @w;
      font-size: 16vh * @h;

      &::placeholder {
        color: #eee;
      }
    }

    > button {
      background-color: #169bd5;
      border: none;
      margin-right: 10vh * @h;

      &.btn {
        background-color: #169bd5;
        font-size: 18vh * @h;
        // line-height: 35vh * @h;
        padding: 4vh * @h 8vh * @h !important;
        .box-sizing();
        border: none;
        margin-right: 10vh * @h;
        border-radius: 6vh * @h;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>