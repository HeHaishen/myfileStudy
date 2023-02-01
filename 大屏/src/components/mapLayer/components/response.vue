<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 21:07:13
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-09 09:54:41
-->
<template>
  <div class="response">
    <ul class="responseul">
      <li
        v-for="(e, i) in responseList"
        :key="i"
        :style="{ background: e.color }"
      >
        {{ e.title }}
      </li>
    </ul>
    <div class="table">
      <mytable :columns="columns" :listData="listData">
        <template slot="theName" slot-scope="{ record, text }">
           <div>  {{record.name}}  <a-icon type="caret-down" /></div>  
        </template>
        <!-- <template slot="slotbox">
          <div class="areaBox" v-show="areaShow">
            <ul>
              <li v-for="(e, i) in detectionarea" :key="i">
                {{ e.title }}
              </li>
            </ul>
          </div>
        </template> -->
      </mytable>
        <div class="page">
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
import Page from "./Page.vue";
import { getDatainfo } from "@/api/forestFire";
export default {
  components: { mytable,Page },
  data() {
    return {
      responseList: [
        { title: "一级响应(1)", color: "#5E1A33" },
        { title: "二级响应(11)", color: "#8A6C41" },
        { title: "三级响应(75)", color: "#8A9829" },
        { title: "四级响应(80)", color: "#0A98A7" },
      ],
      columns: [
        { title: "地市", index: 0, textIndex: "areaName", width: "15%" },
        { title: "类型", index: 1, textIndex: "typeName", width: "15%" },
        { title: "级别", index: 2, textIndex: "level", width: "15%" },
        { title: "时间", index: 3, textIndex: "responseTime", width: "20%" },
        { title: "最高", index: 4, textIndex: "highestLevel", width: "15%" },
        { title: "启动", index: 5, textIndex: "startTime", width: "20%" },
      ],
      detectionarea: [
        { title: "广州市" },
        { title: "珠海区" },
        { title: "天河区" },
        { title: "番禺区" },
        { title: "荔湾区" },
        { title: "白云区" },
        { title: "黄浦区" },
        { title: "花都区" },
        { title: "南沙区" },
        { title: "从化区" },
        { title: "增城区" },
        { title: "越秀区" },
      ],
      listData: [],
      areaShow: true,
      total:1,
      currentPage:1,
    };
  },
  computed: {},
  watch: {},
  methods: {
      getResponseList() {
      let data = {
        body: {},
        page: this.currentPage,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      };
      getDatainfo('vWe4mxlb',data).then((res) => {
        if (res.success) {
          this.listData = res.body.data;
          this.total =Number(res.total)
        }
      });
    },
         changePages(val){
      this.currentPage =val.pages
      this.getResponseList()
    },
  },
  created() {},
  mounted() {
    this.getResponseList()
  },
};
</script>
<style  lang='less'   scoped>
@import "../common.less";
.response {
  .responseul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    color: #fff;
    li {
      width: 130px;
      height: 40px;
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .table {
    margin-top: 25px;
  }
}
.page{
  padding: 5px 5px;
  text-align: right;
}
</style>