<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 14:39:07
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <div class="conditions-search">
      <span>名称：</span
      ><input v-model="queryData.mc" placeholder="名称" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData">
      <template
        v-for="item in columns.filter(
          (e) => !['fzryddh', 'dw'].includes(e.textIndex)
        )"
        :slot="item.textIndex"
        slot-scope="{ text }"
      >
        <span :title="text" :key="item.textIndex">
          {{ text }}
        </span>
      </template>
      <template slot="fzryddh" slot-scope="{ text, record }">
        <div :title="text" class="phone">
          {{ text }}
          <a-icon
            type="phone"
            class="icon"
            @click="clickMobilePhone(record, $event)"
            v-show="text"
          />
          <a-icon
            type="mail"
            class="icon"
            @click="clickMessage(record, $event)"
            v-show="text"
          />
        </div>
      </template>
      <template slot="dw" slot-scope="{ record }">
        <div class="dw" @click="tableTdClick(record)">
          <svg
            t="1633855607571"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2761"
            width="100%"
            height="100%"
          >
            <path
              d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z"
              p-id="2762"
              fill="#1383FE"
            ></path>
          </svg>
        </div>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>

    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import mixin from "./mixin";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ChangePage },
  mixins: [mixin],
  props:{
    sid:{
      type:String
    },
  },
  data() {
    return {
      columns: [
        { title: "名称", textIndex: "mc", width: "25%" },
        { title: "数目", textIndex: "zrs", width: "10%" },
        { title: "待命地点", textIndex: "zrs", width: "10%" },
        { title: "负责人", textIndex: "fzr", width: "10%" },
        { title: "联系电话", textIndex: "fzryddh", width: "35%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      listData: [],
      activeKey: "1",
      queryData: {},
      total: 0,
      currentPage: 1,
    };
  },
  watch: {
    sid: {
      handler() {
        this.doQuery();
      },
    }
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
          ...this.queryData,
          lxdm: this.activeKey,
        },
        page: this.currentPage,
      };
      getIdsmApi("1pQeEGzH", body).then((res) => {
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

    tableTdClick(record) {
      // let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/forTeam.svg",
        type: "defaultType",
        layerName: "应急救援队伍",
        info: this.columns,
      };

      items.lon = items.jd;
      items.sid = items.lxdm;
      items.lat = items.wd;
      items.name = items.mc;
      items.z = items.zrs;
      pGzznCore.setPointLayerToMap([items], objs);
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
@import "./mixin.less";
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