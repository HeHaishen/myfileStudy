<!--
 * @Description: 事件-更多
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors:  
 * @Date: 2021-10-11 18:06:36
 * @LastEditTime: 2021-11-02 14:32:54
-->
<template>
  <div class="up_view">
    <div class="conditions-search">
      <span>{{ activeKey == "1" ? "事件名称" : "负责人" }}：</span><input v-model.trim="queryData.xxbt" :placeholder="'事件名称'" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData">
      <template slot="jbxxlxdm" slot-scope="{ record }">
        <div style="cursor: pointer" @click="openDetail(record)">
          <img :src="getCurrentIcon(record.jbxxlxdm)" class="event-icon" />
        </div>
      </template>
      <template slot="xxbt" slot-scope="{ record, text }">
        <div style="cursor: pointer" @click="openDetail(record)">
          {{ text }}
        </div>
      </template>
      <template slot="swzs" slot-scope="{ record }">
        <span>{{record.swzs||0}}</span>
      </template>
      <template slot="ssrs" slot-scope="{ record }">
        <span>{{record.ssrs||0}}</span>
      </template>
      <template slot="operate" slot-scope="{ record }">
        <div class="operate" @click="toView(record)">查看</div>
        <div class="operate" @click="toConduct(record)">进入指挥</div>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage :total="total" v-model="currentPage" @changePages="changePages" />
    </div>
    <pop-up-layer v-if="detailShow" :show="detailShow" @doClose="detailClose" opsition="pageCenter" title="应急事件-详情" ref="myPopUpLayer">
      <div slot="content" class="detail-upLayer_content">
        <DetailView :contentObj="detailObj" />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { getIdsmApi } from "@/api/idsm/index";
import DetailView from "./detailView.vue";
export default {
  components: { Clist, ChangePage, DetailView },
  data() {
    return {
      columns1: [
        { title: "", textIndex: "jbxxlxdm", width: "8%" },
        { title: "事件名称", textIndex: "xxbt", width: "36%" },
        { title: "死亡人数", textIndex: "swzs", width: "8%" },
        { title: "受伤人数", textIndex: "ssrs", width: "8%" },
        { title: "接报时间", textIndex: "bssj", width: "20%" },
        { title: "操作", textIndex: "operate", width: "20%" },
      ],
      eventTypeList: {
        0: require("@/assets/images/majorFestivalsConductor/icon_shou.png"),
        1: require("@/assets/images/majorFestivalsConductor/icon_xu.png"),
        2: require("@/assets/images/majorFestivalsConductor/icon_zhuan.png"),
      },
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
      /* 详情 */
      detailShow: false,
      detailObj: {},
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
  },
  //挂载完成 访问DOM元素
  mounted() { },
  //方法集合
  methods: {
    /** 获取区域数据 */
    getList() {
      let body = {
        body: {
          dictName: "CITY_SJ",
        },
        pageSize: 10,
      };
      getIdsmApi("8qddPGf8", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            res.body.data.map((v) => { });
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
      let code = "8qddPGf8";
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
    // 查看事件
    toView(record) {
      this.detailShow = true;
      this.detailObj = record
    },
    // 进入指挥
    toConduct(record) {
      console.log(record, '进入指挥');
      this.$router.push({
        path: "/emergencyOrganizationCommandWarBig",
        query: {
          jbbh: record.jbbh,
          xxbt: record.xxbt,
          sjdjdm: record.sjdjdm,
          sjlxdm: record.sjlxdm,
          sfxzhq: record.sfxzhq,
          jd:record.jd,
          wd:record.wd,
        },
      });
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
    detailClose() {
      this.detailShow = false;
    },
    openDetail(i) {
      this.detailShow = true;
      this.detailObj = i;
    },
    getCurrentIcon(type) {
      return this.eventTypeList[type]
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../../common.less';
.up_view {
  height: 650px;
  width: 1960px;
  .list {
    height: calc(100% - 140px);
    margin-bottom: 14px;
    overflow: auto;
    .dw {
      width: 37px;
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
      }
    }
  }
  .pagination {
    text-align: center;
  }
  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15px 0 20px;
    margin: 20px;

    .c-select {
      width: 200px !important;
      margin-right: 28px;
      /deep/.ant-select-selection__rendered {
        margin: auto !important;
        height: 40px;
        line-height: 40px;
      }

      /deep/.ant-select-selection {
        // background-color: #036af3;
        background-color: #333333;
        color: white;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        border: 1px solid #4a6894;
        display: flex;
        .box-sizing();
      }

      /deep/.ant-select-arrow {
        display: none;
      }
    }

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
  .event-icon {
    display: block;
    width: 50px;
    float: left;
  }
  // 操作按钮样式
  .operate {
    border: 1px solid;
    padding: 0 14px;
    font-size: 22px;
    color: #e7ebf1;
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
// 详情窗口样式
.detail-upLayer_content {
  width: 806px;
  height: 438px;
  overflow-y: auto;
}
</style>

