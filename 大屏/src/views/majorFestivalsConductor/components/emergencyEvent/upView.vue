<!--
 * @Description: 事件-更多
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-11 18:06:36
 * @LastEditTime: 2021-10-12 18:29:00
-->
<template>
  <div class="up_view">
    <div class="conditions-search">
      <span>{{ activeKey == "1" ? "事件名称" : "负责人" }}：</span
      ><input v-model.trim="queryData.xxbt" :placeholder="'事件名称'" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData"> </clist>
    <div class="pagination">
      <ChangePage
        :total="total"
        v-model="currentPage"
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
  data() {
    return {
      columns1: [
        { title: "事件名称", textIndex: "xxbt", width: "40%" },
        { title: "明细", textIndex: "sjms", width: "40%" },
        { title: "事发时间", textIndex: "sfsj", width: "20%" },
      ],
      columns: [],
      listData: [],
      activeKey: "1",
      queryData: {
        xxbt: null,
      },
      total: 0,
      currentPage: 1,
      /** 区域数据 */
      areaList: [],
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: function (val) {
        console.log("dj8", val, this);
        this.columns = val == 1 ? this.columns1 : this.columns1;
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() {
    this.getList();
    console.log(88888);
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    /** 获取区域数据 */
    getList() {
      let body = {
        body: {
          dictName: "CITY_SJ",
        },
        pageSize: 20,
      };
      getIdsmApi("XiZd79n8", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            res.body.data.map((v) => {});
            this.areaList = res.body.data.sort((a, b) => a.dictKey - b.dictKey);
            console.log(this.areaList);
          } else {
            this.areaList = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    doQuery() {
      let body = {
        body: {
          ...this.queryData,
        },
        page: this.currentPage,
      };
      let code = "XiZd79n8";
      getIdsmApi(code, body).then((res) => {
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

    onGPS(record) {
      //let items = JSON.parse(JSON.stringify(record));
      let items = pGzznCore.deepClone(record);
      let columns = [
        { title: "机构名称", textIndex: "orgName" },
        { title: "负责人", textIndex: "name" },
        { title: "电话", textIndex: "mobilePhone" },
      ];
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/forTeam.svg",
        type: "defaultType",
        layerName: "指挥救援组织",
        info: columns,
        phoneInfo: { phone: "mobilePhone", name: "name" },
      };

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
<style lang="less" scoped>
@import "../../common.less";
.up_view {
  height: 650vh * @h;
  width: 980vw * @w;
  .list {
    height: calc(100% - 140vh * @h);
    margin-bottom: 14vh * @h;
    overflow: auto;
    .dw {
      width: 37vw * @w;
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
      }
    }
  }

  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15vh * @h 0 20vh * @h;
    margin: 20vh * @h;

    .c-select {
      width: 200vw * @w !important;
      margin-right: 28vw * @w;
      /deep/.ant-select-selection__rendered {
        margin: auto !important;
        height: 40vh * @h;
        line-height: 40vh * @h;
      }

      /deep/.ant-select-selection {
        // background-color: #036af3;
        background-color: #333333;
        color: white;
        height: 40vh * @h;
        line-height: 40vh * @h;
        font-size: 24vh * @h;
        border: 1px solid #4a6894;
        display: flex;
        .box-sizing();
      }

      /deep/.ant-select-arrow {
        display: none;
      }
    }

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
<style lang="less">
.c-popuper-style {
  z-index: 9999;
}
</style>
