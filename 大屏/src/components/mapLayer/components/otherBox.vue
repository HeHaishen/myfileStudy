<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-02 14:08:19
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-11 19:20:57
-->
<template>
  <div class="otherBox">
    <div class="search">
      <a-input-search
        placeholder="请输入名称"
        @search="doSearch"
        v-model="keywords"
      />
    </div>
    <div class="table">
      <Table :columns="columns" :listData="listData">
        <template slot="position" slot-scope="{ record }">
          <span class="location" @click="position(record)">定位</span>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>
  </div>
</template>

<script>
import Table from "@/components/APicture/c-table.vue";
import Page from "./Page.vue";
export default {
  components: { Table, Page },
  props: {
    columns: {
      // 表头数组
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    listData: {
      // 展示数据数组
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    total: {
      required: false,
      default: false,
    },
    currentPage: {
      required: false,
      default: false,
    },
  },
  data() {
    return {
      keywords: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    doSearch() {
      this.$emit("doSearch", this.keywords);
    },
    changePages(value) {
      this.$emit("changePages", value);
    },
    position(node) {
      this.$emit("position", node);
    },
  },
  created() {},
};
</script>
<style lang='less' scoped>
@import "../common.less";
.otherBox {
  height: 100%;
  position: relative;
  .table {
  margin-top: 10px;
  height: calc(100% - 155px);
  /deep/.list-header {
    padding: 10px !important;
    div {
      font-size: 28px !important;
    }
  }
  /deep/.list-body {
    //  height: calc(100% - 200px);
    li {
      margin: 0;
      div {
        font-size: 19px;
        line-height: 1.2;
      }
    }
  }
}
  
}

.search {
  padding: 0 10px;
  margin-top: 10px;
  .box-sizing();

  /deep/.ant-input {
    background-color: #183555;
    border: 1px solid #1296db;
    color: #fff;
    height: 35px;
    svg {
      height: 30px;
      width: 30px;
    }
  }
}

.page {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 100%;
}

/deep/.ant-input-search-icon {
  color: #1296db !important;
  font-size: 14px !important;
}

.location {
  border: 1px solid #3eefff;
  padding: 3px 15px;
  cursor: pointer;
}
</style>