<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 16:32:58
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 09:53:26
-->
<template>
  <div class="reservoir">
    <!-- <div class="title" v-show="hideBox">分类</div>
    <div class="title_box" v-show="hideBox">
      <ul>
        <li @click="clickbox(e,i)" v-for="(e, i) in title_box" :key="i">
          {{ e.title }}
          <img
            src="@/assets/images/dragonBoat/icon/u452.svg"
            alt=""
            v-show="i == active"
          />
        </li>
      </ul>
    </div> -->

    <titleBox
      :titleList="titleList1"
      @changeli="changeli"
      :Setstyle="{ height: '40px', 'line-height': '40px' }"
    >
      <!-- <template slot="sup">
        <sup class="sup"> </sup>
      </template> -->
    </titleBox>

    <!-- <search @doSearch="doSearch" placeholder="搜索水库" /> -->
    <div class="tree" v-show="hideBox">
      <a-tree
        :tree-data="treeData"
        :replaceFields="replaceFields"
        :load-data="onLoadData"
        @expand="expand"
        @select="treeSelect"
      >
        <!-- <template slot="switcherIcon" slot-scope="text, record">
          <a-icon type="minus-square" />
          <a-icon type="plus-square" v-else />
        </template> -->
      </a-tree>
    </div>

    <div class="clist" v-show="!hideBox">
      <mytable
        :columns="columns1"
        :listData="listData"
        v-show="!hideTreeList"
      />
      <mytable :columns="columns" :listData="listData" v-show="hideTreeList" />
      <div class="page" v-show="hideTreeList">
        <Page
          :total="total"
          :currentPage="currentPage"
          @changePages="changePages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mytable from "./mytable.vue";
import search from "@/components/mapLayer/components/search.vue";
import titleBox from "@/components/mapLayer/components/titleBox.vue";
import { getDatainfo, getThreeListApi } from "@/api/forestFire";
import Page from "@/components/mapLayer/components/Page.vue";
export default {
  components: { search, titleBox, Page, mytable },
  data() {
    return {
      title_box: [
        {
          title: "中小型水库",
        },
        {
          title: "大型水库",
        },
      ],
      total: 0,
      currentPage: 1,
      detectionActive: 0,
      treeData: [],
      columns: [
        { title: "水库名称", textIndex: "name" },
        { title: "地址", textIndex: "address" },
        { title: "警戒水位（m）", textIndex: "warningWater" },
        { title: "警戒库容（m³）", textIndex: "warningCapacity" },
        { title: "警戒需水量", textIndex: "warningWaterNum" },
      ],
      columns1: [
        { title: "时间", index: 0, textIndex: "time" },
        {
          title: "实时水位（m）",
          index: 1,
          textIndex: "realtimeWater",
        },
        {
          title: "当前库容（m³）",
          index: 2,
          textIndex: "currentCapacity",
        },
        {
          title: "蓄水量（m³）",
          index: 3,
          textIndex: "storageCapacity",
        },
      ],
      titleList1: [
        { title: "按区域", index: 0 },
        { title: " 超警戒 ", index: 1, sup: "sup" },
      ],
      replaceFields: {
        title: "name",
        key: "sid",
      },
      hideBox: true,
      listData: [],
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 10,
      },
      hideTreeList: true,
      expanded: true,
      active: "",
      parentData: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickbox(e, i) {
      this.active = i;
    },
    ggg(a) {
      console.log(a, "a------------------>");
    },
    expand(a, node) {
      node.node.dataRef.flag = node.expanded;
      console.log(this.treeData);
    },
    AccordingArea() {
      this.hideBox = true;
      this.detectionActive = 0;
    },
    SuperAlert() {
      this.hideBox = false;
      this.detectionActive = 1;
    },
    doSearch() {},
    onLoadData(treeNode, node) {
      console.log(treeNode, node);
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        if (treeNode.dataRef.name == "广州市") {
          this.getGuangZhou(treeNode);
        } else {
          this.getCodesList(treeNode);
        }

        resolve();
      }, 200);
    },
    changeli(e, i) {
      i == 1 ? (this.hideBox = false) : (this.hideBox = true);
    },
    getGuangZhou(treeNode) {
      getDatainfo("Z67lpx15", { body: { en: treeNode.dataRef.sn } }).then(
        (res) => {
          console.log(res);
          if (res.success) {
            treeNode.dataRef.children = res.body.data;
            this.treeData = [...this.treeData];
          }
        }
      );
    },
    getCodesList(treeNode) {
      getDatainfo("AtbyBgqV", { body: { areaCode: treeNode.dataRef.sn } }).then(
        (res) => {
          if (res.success) {
            res.body.data.map((e) => {
              e.isLeaf = true;
            });
            treeNode.dataRef.children = res.body.data;
            this.treeData = [...this.treeData];
          }
        }
      );
    },
    //树形结构
    getTreeList() {
      getDatainfo("Z67lpx15", { body: { sn: 440100000000 } }).then((res) => {
        if (res.success) {
          console.log(res);
          res.body.data.map((e) => {
            e["scopedSlots"] = { title: "icon" };
            e.expanded = false;
          });
          this.treeData = res.body.data;
        }
      });
    },
    treeSelect(a, b) {
      console.log(a, b);
      this.hideTreeList = false;
      this.getTreeChild(b.node.dataRef.sid);
    },
    getTable() {
      getDatainfo("72BEfbRK", { body: {} ,page:this.currentPage,pageSize:10}).then((res) => {
        if (res.success) {
          this.listData = res.body.data;
            this.total =Number(res.total)
        }
      });
    },
    getTreeChild(reservoirUnique) {
      getDatainfo("GsFk88WT", {
        body: { reservoirUnique: reservoirUnique },
      }).then((res) => {
        if (res.success) {
          this.listData = res.body.data;
        }
      });
    },
    changePages(val) {
      this.currentPage = val.pages;
      this.getTable();
    },
  },
  created() {},
  mounted() {
    this.getTreeList();
    this.getTable();
    console.log(this.listData);
  },
};
</script>
<style lang='less' scoped>
@import "../common.less";
.reservoir {
  .title {
    background: #054f72;
    font-weight: 600;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    font-size: 14px;
  }
  .title_box {
    margin-top: 7px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      color: #fff;
      li {
        width: 160px;
        height: 40px;
        background: #103054;
        border: 1px solid #1296db;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .box-sizing();
        font-size: 15px;
        cursor: pointer;
        position: relative;
        img {
          display: block;
          position: absolute;
          right: 0px;
          top: 0px;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .detection_ul {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 15px;
    li {
      width: 50%;
      height: 34px;
      line-height: 34px;
      position: relative;
      cursor: pointer;
      color: #fff;
      p {
        display: none;
        width: 100%;
        height: 3px;
        padding: 0;
        margin: 0;
        left: 0;
        bottom: 0;
        background-color: #02a7f0;
      }
      sup {
        display: inline-block;
        span {
          display: none;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
  .search {
    padding: 0 10px;
    .box-sizing();

    /deep/.ant-input {
      background-color: #183555;
      border: 1px solid #1296db;
      height: 35px;
      svg {
        height: 30px;
        width: 30px;
      }
    }
  }
  .tree {
    padding: 20px;
    color: #fff !important;
    /deep/.ant-tree li .ant-tree-node-content-wrapper:hover {
      background-color: #054f71;
    }
        /deep/ span {
            color: white;
        
          }
    /deep/.ant-tree {
      font-size: 15px;
    }

  }
  .clist {
    margin-top: 20px;
    /deep/.list-header {
      padding: 2px;
      font-weight: 600;
    }
  }
}
.detectionActive {
  display: block !important;
  color: #fff;
}
/deep/.ant-input-search-icon {
  color: #1296db !important;
  font-size: 14px !important;
}
.page {
  margin-top: 10px;
  padding: 0 5px;
  text-align: right;
}
</style>