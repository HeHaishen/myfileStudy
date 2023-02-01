<!--
 * @Description: 物资总量详情
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 19:00:19
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-13 15:41:52
-->
<!-- 物资总量详情 -->
<template>
  <div class="up_view">
    <!-- <div class="conditions-search">
      <span>仓库名称：</span
      ><input v-model="queryData.mc" placeholder="仓库名称" />
      <span>地址：</span><input v-model="queryData.dz" placeholder="地址" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div> -->
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
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ChangePage },
  props: {
    /** sscklx=1：仓储仓库，sscklx=2：保障企业 */
    sscklx: {
      type: String,
    },
    ckzj: {
      type: String,
    },
  },
  data() {
    return {
      columns: [
        { title: "应急物资", textIndex: "mc" },
        { title: "物资数量", textIndex: "wzsl" },
        { title: "计量单位", textIndex: "jldw" },
      ],
      listData: [],
      queryData: {},
      total: 0,
      currentPage: 1,
    };
  },
  watch: {
    ckzj: {
      immediate: true,
      handler(val) {
        this.currentPage = 1;
        this.total = 0;
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    doQuery() {
      let body = {
        body: {
          ckzj: this.ckzj,
          sscklx: this.sscklx,
        },
        page: this.currentPage,
      };
      getIdsmApi("EnvpC5Io", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.listData = res.body.data;
            this.total = parseInt(res.total);
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },

    /** 切换按钮 */
    changeTab(tab) {
      this.activeKey = tab.key;
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
@import "../../common.less";
.up_view {
  min-width: 1000vw * @w;
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
    min-width: 1000vw * @w;
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