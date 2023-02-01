<!--  -->
<template>
  <div class="table-pop">
    <pop-up-layer :show="true" :setStyles="{}" opsition="pageRight" ref="myPopUpLayer" class="table-box" @doClose="tableClose" :title="title">
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.name" />
              <img src="../../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="onSearch" />
            </div>
          </div>
          <clist :columns="tableHeader" :listData="tableData" class="list">
            <template v-for="item in tableHeader" :slot="item.textIndex" slot-scope="{ text }">
              <span :title="text" :key="item.textIndex">
                {{ text }}
              </span>
            </template>
            <template slot="number" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="position" slot-scope="{ record, text, index }">
              <div class="dw" @click="positionClick(record)">
                <svg t="1633855607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="100%" height="100%">
                  <path d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z" p-id="2762" fill="#1383FE"></path>
                </svg>
              </div>
            </template>
            <template slot="phone" slot-scope="{ text, record }">
              <div :title="text" class="phone">
                {{ text }}
                <a-icon type="phone" class="icon" @click="clickMobilePhone(record, $event)" v-show="text" />
                <a-icon type="mail" class="icon" @click="clickMessage(record, $event)" v-show="text" />
              </div>
            </template>
          </clist>
          <div class="list-change-page">
            <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pageChange" />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import {
  getStudyList,
  findTypeDetail,
  findTypeDetailSite,
} from "@/api/idsm/index.js";
import ChangePage from "@/components/APicture/changePage";
import mixin from "./mixin";

export default {
  props: {
    tableHeader: {
      type: Array,
      default: [],
    },
    tableType: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    siteArr: {
      type: Object,
      default: () => {
        {
        }
      },
    },
  },
  mixins: [mixin],
  components: {
    Clist,
    ChangePage,
  },
  data() {
    return {
      tableData: [],
      pagination: {
        total: 0,
        current: 1,
      },
      query: {
        name: "",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() { },
  watch: {
    siteArr: {
      handler(newValue, oldValue) {
        if (newValue.lonArr.length && newValue.latArr.length) {
          // 有画圈时
          this.getTableSite();
        } else {
          //无画圈时调用
          this.getTable();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  methods: {
    //查询列表-无坐标筛选
    getTable() {
      let data = {
        body: {
          str: [this.tableType],
          name: this.query.name,
        },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      findTypeDetail(data).then((res) => {
        if (res.success) {
          this.tableData = res.body[this.tableType].body;
          this.pagination.total = Number(res.body[this.tableType].total);
        }
      });
    },
    getTableSite() {
      let data = {
        body: {
          str: [this.tableType],
          name: this.query.name,
          lonArr: this.siteArr.lonArr,
          latArr: this.siteArr.latArr,
        },
        page: this.pagination.current,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      findTypeDetailSite(data).then((res) => {
        if (res.success) {
          this.tableData = res.body[this.tableType].body;
          this.pagination.total = Number(res.body[this.tableType].total);
        }
      });
    },
    // 关闭弹窗
    tableClose() {
      this.pagination.current = 0;
      this.query.name = "";
      this.$emit("tableClose");
    },
    //搜索
    onSearch() {
      this.pagination.current = 1;
      if (this.siteArr.lonArr.length && this.siteArr.latArr.length) {
        this.getTableSite()
      } else {
        this.getTable();
      }
    },
    pageChange(param) {
      this.pagination.current = param.pages;
      if (this.siteArr.lonArr.length && this.siteArr.latArr.length) {
        this.getTableSite()
      } else {
        this.getTable();
      }
    },
    positionClick(item) {
      let record = pGzznCore.deepClone(item);
      var objs = {
        type: `defaultType${this.tableType}`,
        layerName: this.tableType,
        info: this.tableHeader.filter((e) => e.textIndex != "position"),
        //phoneInfo:{phone:"telephone",name:"name"},
        //video:{keys:"name",start:"/#/moreVideos?name=",end:""},
        isFlagPopule: true,
        lonLat: { lon: "jd", lat: "wd" },
      };
      objs.data = [record];
      let x = record.lon ? record.lon : record.jd;
      let y = record.lat ? record.lat : record.wd;
      pGzznCore.flyToPoint({ x: x, y: y, z: 13673 }, objs);
    },
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
@import '../index.less';
@import './mixin.less';

.table-box {
  width: 1000vw * @w;
  top: 47%;
  left: 14%;
  .table-content {
    width: 100%;
    height: 100%;
  }

  .list {
    max-height: 800vh * @h;
    overflow: auto;
  }
  .center-search {
    height: 60vh * @h;
    margin-bottom: 10vh * @h;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    .c-input {
      width: 300vw * @w;
      height: 100%;
      border: 1px rgb(1, 210, 233) solid;
      background-color: rgb(20, 38, 78);

      font-size: 14vh * @h;
      display: flex;
      align-items: center;
      padding-left: 10vw * @w;
      .box-sizing();
    }

    img {
      display: block;
      width: 23vh * @h;
      height: 23vh * @h;
      position: absolute;
      right: 1%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .dw {
    width: 50vw * @w;
    height: 100%;
    cursor: pointer;
  }
  .position-click {
    padding: 10vh * @h 10vw * @w;
    border: 1px solid;
  }
  /deep/ .list-header {
    padding: 14vh * @h 0;
    div {
      font-size: 24vh * @h;
    }
  }
  /deep/ .list-body {
    li {
      div {
        font-size: 24vh * @h;
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
</style>
