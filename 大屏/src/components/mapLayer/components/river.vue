<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 16:32:58
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-03 10:40:51
-->
<template>
  <div class="reservoir">
      <titleBox
      :titleList="titleList1"
      @changeli="changeli"
      :Setstyle="{ height: '40px', 'line-height': '40px' }"
    >
       <template slot="sup">
      <sup class="sup">  </sup>
      </template>
     </titleBox>
    <search   @doSearch='doSearch'  placeholder="搜索河流" style="margin-top:15px" />
    <div class="tree" v-show="hideBox">
      <a-tree :tree-data="treeData" />
    </div>

    <div class="clist" v-show="!hideBox">
      <Clist :columns="columns" :listData="listData" />
    </div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import titleBox from "@/components/mapLayer/components/titleBox.vue"
import search from "@/components/mapLayer/components/search.vue"
export default {
  components: { Clist ,titleBox,search},
  data() {
    return {
      detectionActive: 0,
      treeData: [
        {
          title: "0-0-0",
          key: "0-0-0",
          children: [
            { title: "0-0-0-0", key: "0-0-0-0" },
            { title: "0-0-0-1", key: "0-0-0-1" },
            { title: "0-0-0-2", key: "0-0-0-2" },
          ],
        },
      ],
      columns: [
        { title: "水库名称", textIndex: "code" },
        { title: "区域", textIndex: "name" },
        { title: "汛限水位(m)", textIndex: "addr" },
        { title: "当前水位(m)", textIndex: "addr" },
        { title: "差值(m)", textIndex: "addr" },
      ],
      
  titleList1: [
        { title: "按区域", index: 0 },
        { title: " 超警戒 ", index: 1 ,sup: "sup" },
      ],
      hideBox: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    AccordingArea() {
      this.hideBox = true;
      this.detectionActive = 0;
    },
    SuperAlert() {
      this.hideBox = false;
      this.detectionActive = 1;
    },
    doSearch() {},
  },
  created() {},
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
    margin-top: 10px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      color: #fff;
      li {
        width: 162px;
        height: 38px;
        background: #103054;
        border: 1px solid #1296db;
        line-height: 38px;
        .box-sizing();
        font-size: 15px;
        cursor: pointer;
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
    /deep/.ant-tree {
      font-size: 15px;
    }
    /deep/.ant-tree li .ant-tree-node-content-wrapper {
      color: #fff;
    }
  }
  .clist{
    margin-top: 20px;
    /deep/.list-header{
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
</style>