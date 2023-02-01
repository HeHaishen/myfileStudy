<!--
 * @Description: 突发事件
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditTime: 2021-11-03 13:52:35
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="emergency">
    <div class="public-head">
      {{ title }}
    </div>
    <div class="public-content">
      <div class="conditions-search">
        <span>事件名称：</span>
        <a-input id="c-input" class="c-input" placeholder="请输入事件名称" v-model.trim="queryData.xxbt"></a-input>
        <button class="mouse-click btn" @click="onQuery">查询</button>
        <button class="mouse-click btn default" @click="toTypicalCase">查看典型案例</button>
      </div>
      <div class="more" @click="onMore">更多</div>
      <clist class="list" :columns="columns" :listData="listData">
        <template slot="jbxxlxdm" slot-scope="{ record }">
          <div style="cursor: pointer">
            <img :src="getCurrentIcon(record.jbxxlxdm)" class="event-icon" />
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
    </div>
    <pop-up-layer v-if="moreShow" :show="moreShow" @doClose="moreClose" opsition="pageCenter" title="突发事件-更多" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
    <pop-up-layer v-if="detailShow" :show="detailShow" @doClose="detailClose" opsition="pageCenter" title="突发事件-详情" ref="myPopUpLayer">
      <div slot="content" class="detail-upLayer_content">
        <DetailView :contentObj="detailObj" />
      </div>
    </pop-up-layer>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import UpView from "./upView.vue";
import DetailView from "./detailView.vue";
import { getIdsmApi } from "@/api/idsm/index";
export default {
  name: '',
  props: {},
  components: { Clist, ChangePage, UpView, DetailView },
  data() {
    return {
      title: '突发事件',
      columns: [
        { title: "", textIndex: "jbxxlxdm", width: "8%" },
        { title: "事件名称", textIndex: "xxbt", width: "32%" },
        { title: "死亡", textIndex: "swzs", width: "8%" },
        { title: "受伤", textIndex: "ssrs", width: "8%" },
        { title: "接报时间", textIndex: "bssj", width: "19%" },
        { title: "操作", textIndex: "operate", width: "25%" },
      ],
      eventTypeList: {
        0: require("@/assets/images/majorFestivalsConductor/icon_shou.png"),
        1: require("@/assets/images/majorFestivalsConductor/icon_xu.png"),
        2: require("@/assets/images/majorFestivalsConductor/icon_zhuan.png"),
      },
      listData: [],
      queryData: {},
      total: 0,
      pageSize: 5,
      currentPage: 1,
      moreShow: false,
      detailShow: false,
      detailObj: {}
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.doQuery()
  },
  methods: {
    // 列表数据获取 
    doQuery() {
      let body = {
        body: {
          ...this.queryData,
        },
        page: this.currentPage,
        pageSize: this.pageSize,
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
    // 获取事件图标
    getCurrentIcon(type) {
      return this.eventTypeList[type]
    },
    // 前往查询
    onQuery() {
      this.currentPage = 1;
      this.doQuery();
    },
    // 查看典型案例
    toTypicalCase() {
      console.log('查看典型案例');
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
    /** 更多事件 */
    onMore() {
      this.moreShow = true;
    },
    /** 关闭更多页面 */
    moreClose() {
      this.moreShow = false;
    },
    detailClose() {
      this.detailShow = false;
    }
  },
}
</script>
<style lang='less' scoped>
@import '../../../common.less';
.emergency {
  border: 2px solid #015ebd;
  width: 100%;
  height: 856px;
  position: relative;
  background-color: #001941;

  .more {
    position: absolute;
    color: white;
    background: #013ba9;
    cursor: pointer;
    padding: 4px 26px;
    font-size: 24px;
    border: 1px solid #2f78df;
    border-radius: 21px;
    top: 20px;
    right: 40px;
  }
}
// 搜索栏样式
.conditions-search {
  display: flex;
  align-items: center;
  margin: 0 20px 20px;

  .c-input {
    width: 278px;
    margin-right: 10px;
  }

  .time {
    font-size: 22px;
  }

  > span {
    font-size: 28px;
    color: white;
  }

  > input {
    width: 270px;
    height: 43px;
    line-height: 30px;
    background-color: #01245e;
    color: #fff;
    padding-left: 20px;
    border: 1px solid #2f78df;
    margin-right: 30px;
    font-size: 22px;

    &::placeholder {
      color: #eee;
    }
  }

  > button {
    background-color: #013ba9;
    border: none;
    margin-right: 10px;
    &.btn {
      background-color: #013ba9;
      font-size: 24px;
      padding: 4px 26px;
      .box-sizing();
      border: 1px solid #2f78df;
      margin-right: 30px;
      color: white;
      cursor: pointer;
      &.default {
        background-color: transparent;
      }
    }
  }
}
// 表格样式
.list {
  max-height: calc(100% - 84px - 44px);
  overflow: auto;
  /deep/ .list-header {
    padding: 10px 16px;
    background: #0d2e63;
    div {
      font-size: 30px;
      color: #fff;
    }
  }
  /deep/ .list-body {
    height: auto !important;
    li {
      margin: 0;
      background: #092a5d;
      div {
        line-height: 42.5px;
        font-size: 30px;
        padding: 18px 16px;
        span {
          color: #c5d6f4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      // 操作按钮样式
      .operate {
        cursor: pointer;
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
  }
}
// 弹窗标题样式
/deep/.c-popup-layer {
  .layer-title {
    font-size: 26px;
  }
}
// 详情窗口样式
.detail-upLayer_content {
  width: 806px;
  height: 438px;
  overflow-y: auto;
}
</style>
