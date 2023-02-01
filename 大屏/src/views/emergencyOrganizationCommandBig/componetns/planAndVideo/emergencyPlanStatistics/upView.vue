<!--
 * @Description: 事件-更多
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors:  
 * @Date: 2021-10-11 18:06:36
 * @LastEditTime: 2021-11-03 15:12:09
-->
<template>
  <div class="up_view">
    <div class="conditions-search">
      <span>编制部门：</span><input v-model.trim="queryData.preparationDepartment" placeholder="编制部门" />
      <span>事件类型：</span><input v-model.trim="queryData.eventType" placeholder="事件类型" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData">
      <template slot="eventType" slot-scope="{ record }">
        {{eventType[record.eventType]}}
      </template>
      <template slot="operate" slot-scope="{ record }">
        <div class="operate" @click="toView(record)">查看</div>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage :total="total" v-model="currentPage" @changePages="changePages" />
    </div>
    <pop-up-layer v-if="detailShow" :show="detailShow" @doClose="detailClose" opsition="pageCenter" title="应急预案" ref="myPopUpLayer">
      <div slot="content" class="detail-upLayer_content">
        <see :itemObj="detailObj" />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { plansFind } from '@/api/reservePlan/plansManage'
import { eventType } from '@/utils';
import See from './See.vue'

export default {
  components: { Clist, ChangePage, See },
  props: {
    activeKey: {
      type: String,
    },
  },
  data() {
    return {
      columns1: [
        { title: "序号", textIndex: "index", width: "8%" },
        { title: "预案名称", textIndex: "planName", width: "26%" },
        { title: "编制部门", textIndex: "preparationDepartment", width: "21%" },
        { title: "事件类型", textIndex: "eventType", width: "35%" },
        { title: "操作", textIndex: "operate", width: "15%" },
      ],
      eventTypeList: {
        0: require("@/assets/images/majorFestivalsConductor/icon_shou.png"),
        1: require("@/assets/images/majorFestivalsConductor/icon_xu.png"),
        2: require("@/assets/images/majorFestivalsConductor/icon_zhuan.png"),
      },
      columns: [],
      listData: [],
      queryData: {
        preparationDepartment: '',
        eventType: '',
      },
      total: 0,
      currentPage: 1,
      /** 事件类型 */
      eventType,
      /* 详情 */
      detailShow: false,
      detailObj: {},
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: function (val) {
        console.log("plan", val, this);
        this.columns = val == 1 ? this.columns1 : this.columns1;
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() {
  },
  //挂载完成 访问DOM元素
  mounted() { },
  //方法集合
  methods: {
    doQuery() {
      let data = {
        body: {
          planCategory: this.activeKey,
          ...this.queryData,
        },
        page: this.currentPage,
        pageSize: 5,
        sortName: "sid",
        sortOrder: "desc"
      }
      plansFind(data).then((res) => {
        if (res.success) {
          res.body.map((v, i) => {
            Object.assign(v, {
              index: (this.currentPage - 1) * 5 + (i + 1),
            });
          });
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
  height: 599px;
  width: 1133px;
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
  width: 1138px;
  height: 638px;
  overflow-y: auto;
}
</style>

