<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors:  
 * @LastEditTime: 2021-11-01 19:18:59
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
      <template v-for="item in columns" :slot="item.textIndex" slot-scope="{ text }">
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
    <div class="pagination">
      <ChangePage :total="total" :currentPage="currentPage" @changePages="changePages" />
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
      default: () => { },
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
  mounted() { },
  //方法集合
  methods: {
    doQuery() {
      let body = {
        body: {
          ...this.queryData,
          eventId: "1120",
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
  },
};
</script>
<style lang='less' scoped>
@import '../../../../common.less';
.up_view {
  min-width: 1100px;
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
      padding: 10px 30px;
      font-size: 11px;
      border: 2px #1d4fa2 solid;

      &.active {
        background: #02648e;
        border-color: #0275a1;
      }
    }
  }

  .list {
    max-height: 800px;
    overflow: auto;
    margin: 20px 0;
    .dw {
      width: 50px;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14px 0;
      div {
        font-size: 18px;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 18px;
          padding: 0 10px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .phone {
          .icon {
            margin: 0 10px;
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
    // margin: 15px 0 20px;
    margin: 20px;

    .time {
      font-size: 22px;
    }

    > span {
      font-size: 18px;
      color: white;
    }

    > input {
      width: 200px;
      height: 35px;
      line-height: 30px;
      background-color: #333333;
      color: #fff;
      padding-left: 20px;
      border: none;
      margin-right: 30px;
      font-size: 16px;

      &::placeholder {
        color: #eee;
      }
    }

    > button {
      background-color: #169bd5;
      border: none;
      margin-right: 10px;

      &.btn {
        background-color: #169bd5;
        font-size: 18px;
        // line-height: 35px;
        padding: 4px 8px !important;
        .box-sizing();
        border: none;
        margin-right: 10px;
        border-radius: 6px;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>