<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-11 10:05:47
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-02 15:03:53
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <div class="conditions-search" v-if="activeKey == 1">
      <span>仓库名称：</span><input v-model="queryData.mc" placeholder="仓库名称" />
      <span>地址：</span><input v-model="queryData.dz" placeholder="地址" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <div class="conditions-search" v-else-if="activeKey == 2">
      <span>供应商名称：</span><input v-model="queryData.qymc" placeholder="供应商名称" />
      <span>地址：</span><input v-model="queryData.dz" placeholder="地址" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <div class="conditions-search" v-else>
      <span>名称：</span><input v-model="queryData.name" placeholder="名称" />
      <span>待命点：</span><input v-model="queryData.standbyPoint" placeholder="待命点" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
    </div>
    <clist class="list" :columns="columns" :listData="listData">
      <template v-for="item in columns.filter(
          (e) => !['fzrbgdh', 'dw'].includes(e.textIndex)
        )" :slot="item.textIndex" slot-scope="{ text, record }">
        <span :style="{
            cursor: item.textIndex == 'wzzl' ? 'pointer' : 'default',
          }" :title="text" :key="item.textIndex" @click="onChange(record, item.textIndex)">
          {{ text }}
        </span>
      </template>

      <template slot="fzrbgdh" slot-scope="{ text, record }">
        <div :title="text" class="phone">
          {{ text }}
          <a-icon type="phone" class="icon" @click="clickMobilePhone(record, $event)" v-show="text" />
          <a-icon type="mail" class="icon" @click="clickMessage(record, $event)" v-show="text" />
        </div>
      </template>
      <template slot="dw" slot-scope="{ record }">
        <div class="dw" @click="onGPS(record)">
          <svg t="1633855607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="100%" height="100%">
            <path d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z" p-id="2762" fill="#1383FE"></path>
          </svg>
        </div>
      </template>
    </clist>
    <div class="pagination big_pagination">
      <ChangePage :total="total" :currentPage="currentPage" @changePages="changePages" />
    </div>

    <pop-up-layer v-if="wzzlShow" :show="wzzlShow" @doClose="wzzlClose" opsition="pageCenter" :title="`${activeKey == 1 ? formData.mc : formData.qymc}-救灾物资`" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <WzzlDetails :sscklx="activeKey" :ckzj="formData.cbkbh" />
      </div>
    </pop-up-layer>

    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { getIdsmApi } from "@/api/idsm/index";
import WzzlDetails from "./wzzlDetails.vue";
import mixin from "./mixin";

export default {
  components: { Clist, ChangePage, WzzlDetails },
  mixins: [mixin],
  props: {
    activeKey: {
      type: String,
    },
  },
  data() {
    return {
      columns1: [
        { title: "仓库名称", textIndex: "mc" },
        { title: "主管部门", textIndex: "zgdw" },
        { title: "负责人", textIndex: "fzr" },
        { title: "电话", textIndex: "fzrbgdh" },
        { title: "储备总量", textIndex: "wzzl" },
        { title: "地址", textIndex: "dz" },
        { title: "定位", textIndex: "dw" },
      ],
      columns2: [
        { title: "供应商名称", textIndex: "qymc", width: "20%" },
        { title: "负责人", textIndex: "fzr", width: "15%" },
        { title: "电话", textIndex: "fzrbgdh", width: "25%" },
        { title: "物资总量", textIndex: "wzzl", width: "15%" },
        { title: "地址", textIndex: "dz", width: "15%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns3: [
        { title: "名称", textIndex: "name" },
        { title: "待命点", textIndex: "standbyPoint" },
        { title: "负责人", textIndex: "contacts" },
        { title: "电话", textIndex: "fzrbgdh" },
        { title: "物资总量", textIndex: "num" },
        { title: "单位", textIndex: "unit" },
        { title: "定位", textIndex: "dw" },
      ],
      columns: [],
      listData: [],
      tabKeys: [
        { label: "存储仓库", key: "1" },
        { label: "保障企业", key: "2" },
      ],
      // activeKey: "1",
      queryData: {},
      total: 0,
      currentPage: 1,
      wzzlShow: false,
      formData: {},
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler(val) {
        if (val == 1) {
          this.columns = this.columns1;
        } else if (val == 2) {
          this.columns = this.columns2;
        } else {
          this.columns = this.columns3;
        }
        this.currentPage = 1;
        this.queryData = {};
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() { },
  //挂载完成 访问DOM元素
  mounted() { },
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
      let code = "";
      switch (this.activeKey) {
        case "1":
        case 1:
          code = "lzVtiTyK";
          break;
        case "2":
        case 2:
          code = "9naLnFkk";
          break;
        default:
          code = "yNNzjlYo";
          break;
      }
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
    onGPS(record) {
      console.log(record, 1111);
      // let columns1= [
      //   { title: "仓库名称", textIndex: "mc" },
      //   { title: "主管部门", textIndex: "zgdw" },
      //   { title: "储备总量", textIndex: "wzzl" },
      //   { title: "地址", textIndex: "dz" }
      // ];
      // let columns2 = [
      //   { title: "供应商名称", textIndex: "qymc" },
      //   { title: "负责人", textIndex: "fzr" },
      //   { title: "电话", textIndex: "fzrbgdh" },
      //   { title: "物资总量", textIndex: "wzzl" },
      //   { title: "地址", textIndex: "dz" }
      // ];
      // let columns =
      //   this.activeKey == 1
      //     ? this.columns1.filter((e) => e.textIndex != "dw")
      //     : this.columns2.filter((e) => e.textIndex != "dw");
      //let items = JSON.parse(JSON.stringify(record));

      let items = pGzznCore.deepClone(record);
      //pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/jzwz" + this.activeKey + ".png",
        imgSize: { width: "38", height: "38" },
        type: "defaultTypejzwz" + this.activeKey,
        layerName: "救灾物资",
        info: this.columns.filter((e) => e.textIndex != "dw"),
        // phoneInfo:{phone:"fzrbgdh",name:"fzr"}
        isFlagPopule: true,
      };
      this.activeKey == 1
        ? ""
        : (objs.phoneInfo = { phone: "fzrbgdh", name: "fzr" });
      // items.lon = items.jd;
      // items.sid = items.rownum;
      // items.lat = items.wd;
      // items.name = items.mc;
      //pGzznCore.setPointLayerToMap([items], objs);

      objs.data = [items];
      pGzznCore.flyToPoint({ x: items.lon, y: items.lat, z: 13673 }, objs);
    },
    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },

    /** 点击事件 */
    onChange(record, key) {
      if (key == "wzzl") {
        this.formData = record;
        this.wzzlShow = true;
      }
    },

    /** 切换按钮 */
    changeTab(tab) {
      this.activeKey = tab.key;
    },

    wzzlClose() {
      this.wzzlShow = false;
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
@import '../../../common.less';
@import './mixin.less';
.up_view {
  min-width: 1200px;
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
        font-size: 30px;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 30px;
          padding: 0 10px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
      font-size: 32px;
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
      font-size: 32px;

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
        font-size: 32px;
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