<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-08-16 10:23:37
-->
<template>
  <div class="city-danger-left">
    <div class="model-title">实时预警信息</div>
    <div class="left-top">
      <div class="left-top-top">
        <p v-for="(item, index) in realTimeChoseList" :key="index" :class="[realActive == index ? 'btn-active' : '']" @click="realTimeClick(item, index, $event)">
          {{ item.name }}
        </p>
        <div class="left-show-statics">
          <p>5月13日预警数<label for="">↑</label><label for="">12</label></p>
          <p>
            与去年同比<label for="" class="green">↑</label><label for="" class="green">12</label>
          </p>
        </div>
      </div>
      <div class="left-top-content">
        <ul>
          <li v-for="(i, k) in realTimeStaticsList" :key="k" :class="backgroundList[i.rownum - 1]" style='cursor: pointer;' @click='onSupervise(i)'>
            <div>
              <p>
                <label for="">{{ i.num }}</label>个
              </p>
              <p>{{ i.qylxmc }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="left-bottom">
      <div class="model-little-title" @click="btClickTest($event)">
        本日动态监测
      </div>
      <div class="left-bottom-content">
        <clist :columns="tableHeaderList" :listData="tabelListData" @tableTdClick="tableTdClick">
          <template slot="yjjbmc" slot-scope="{ record, text }">
            <!-- <p class="leve-btn" :class="[leveBtnTypeObj[text]]" @click="btClickTest($event)">
              {{ leveList[text] }}
            </p> -->
            <span>{{text}}</span>
          </template>

          <template slot="fbsj" slot-scope="{ record, text }">
            {{ text }}
          </template>
        </clist>
      </div>
    </div>
    <pop-up-layer title="测试标题" :show="templateShow" ref="textRef" :sendEvent="templateEvent" opsition="pageRight" @doClose="doClose" v-show="templateShow">
      <template slot="content">
        <div style="min-height: 200px; width: 500px">
          <clist :columns="tableHeaderList" :listData="tabelListData" @tableTdClick="tableTdClick">
            <template slot="yjjbmc" slot-scope="{ record, text }">
              <p class="leve-btn" :class="[leveBtnTypeObj[text]]" @click="btClickTest($event)">
                {{ leveList[text] }}
              </p>
            </template>
          </clist>
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer :title="superviseTitle" :show="superviseShow" ref="textRef" opsition="pageRight" :setStyles="{'left':'13%','top':'50%'}" @doClose="superviseClose" v-show="superviseShow" class="supervisePop">
      <template slot="content">
        <div class="center-search">
          <input class="c-input" placeholder="输入关键字" type="text" v-model='searchFrom' />
          <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click='onSearch' />
        </div>
        <div class="supervise">
          <clist :columns="tableHeaderList" :listData="superviseListData">

          </clist>
        </div>
        <div class="list-change-page">
          <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pagesChange" />
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import moment from "moment";
import Clist from "@/components/APicture/c-table";
import {
  getDayStatisticsApi,
  getMonthStatisticsApi,
  getTodayMonitorApi,
  commonApi
} from "@/api/theCitysDanger";
// import popUpLayer from '@/components/APicture/popUpLayer'
import ChangePage from "@/components/APicture/changePage";

export default {
  components: { Clist, ChangePage },
  data() {
    return {
      realActive: 0,
      realTimeChoseList: [
        { name: "本日", key: 1 },
        { name: "本月", key: 2 },
      ],
      backgroundList: ["blue", "cyan", "purple", "yellow", "green"],

      // 实时预警信息
      realTimeStaticsList: [],

      // 本日动态监测
      tableHeaderList: [
        { title: "监测时间", index: 0, textIndex: "fbsj", width: "15%" },
        { title: "监测内容", index: 1, textIndex: "xxbt", width: "40%" },
        { title: "级别", index: 2, textIndex: "yjjbmc", width: "15%" },
        { title: "来源", index: 3, textIndex: "sjlydw", width: "30%" },
      ],
      leveList: {
        红色: "红色预警",
        黄色: "黄色预警",
        蓝色: "蓝色预警",
        橙色: "橙色预警",
      },
      leveBtnTypeObj: {
        红色: "leve-btn-red",
        黄色: "leve-btn-yellow",
        蓝色: "leve-btn-blue",
        橙色: "leve-btn-orange",
      },
      tabelListData: [
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 1,
        //   resource: "****企业",
        //   index: 0,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[黄色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 2,
        //   resource: "****企业",
        //   index: 1,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 2,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 3,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 1,
        //   resource: "****企业",
        //   index: 4,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 2,
        //   resource: "****企业",
        //   index: 5,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 6,
        // },
        // {
        //   time: "2021-05-13",
        //   content: "[红色预警]监测到xoooxxoow企业器温度达到55c",
        //   level: 3,
        //   resource: "****企业",
        //   index: 7,
        // },
      ],
      templateShow: false,
      templateEvent: null,
      superviseShow: false,
      superviseHeaderList: [],
      superviseListData: [],
      defaultData: {
        body: {
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      },
      pagination: {
        total: undefined,
        current: 1
      },
      searchFrom: '',
      superviseTitle: ''
    };
  },
  created() { },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  computed: {},
  methods: {
    moment,
    init() {
      this.getDayStatisticsData();
      this.getTodayMonitorData();
    },
    initChart() { },
    realTimeClick(i, k, $event) {
      console.log($event);
      this.realActive = k;
      if (this.realActive == 0) {
        this.getDayStatisticsData();
      } else if (this.realActive == 1) {
        this.getMonthStatisticsData();
      }
      i.checked = !i.checked;
      // this.resourceList = JSON.parse(JSON.stringify(this.resourceList));
    },
    onSupervise(item) {
      this.superviseShow = true
      this.pagination.current = 1
      this.searchFrom = ''
      if (this.realActive == 0) {
        this.superviseTitle = '本日预警信息'
        let time = moment().format('YYYY-MM-DD')
        this.defaultData.body.qylxdm = item.qylxdm
        this.defaultData.body.day = time
        this.defaultData.body.month = ''
        this.defaultData.page = 1
        this.getTable(this.defaultData);
      } else if (this.realActive == 1) {
        this.superviseTitle = '本月预警信息'
        let time = moment().format('YYYY-MM')
        this.defaultData.body.qylxdm = item.qylxdm
        this.defaultData.body.month = time
        this.defaultData.body.day = ''
        this.defaultData.page = 1
        this.getTable(this.defaultData);
      }
    },
    superviseClose() {
      this.superviseShow = false
    },

    // 本日动态监测行点击
    tableTdClick(obj) {
      console.log(obj);
    },
    btClickTest($event, i) {
      console.log(i, $event);
      console.log(this.templateShow);
      this.templateShow = false;
      this.templateEvent = $event;
    },
    doClose() {
      this.templateShow = false;
    },

    // 全市重大危险源一张图-实时预警信息-本日统计
    getDayStatisticsData() {
      let time = moment().format('YYYY-MM-DD')
      getDayStatisticsApi({ body: { codes: "N5CoBmCE", fbsj: time } }).then((res) => {
        console.log("全市重大危险源一张图-实时预警信息-本日统计", res);
        if (res.body.data && res.success) {
          this.realTimeStaticsList = res.body.data;
        }
      });
    },

    // 全市重大危险源一张图-实时预警信息-本月统计
    getMonthStatisticsData() {
      let time = moment().format('YYYY-MM')

      getMonthStatisticsApi({ body: { codes: "fO7vUcvQ", fbsj: time } }).then((res) => {
        console.log("全市重大危险源一张图-实时预警信息-本月统计", res);
        if (res.body.data && res.success) {
          this.realTimeStaticsList = res.body.data;

        }
      });
    },

    //  全市重大危险源一张图-实时预警信息-本日监测动态
    getTodayMonitorData() {
      getTodayMonitorApi({ body: { yjtype: 2 } }).then((res) => {
        console.log("全市重大危险源一张图-实时预警信息-本日监测动态", res);
        if (res.body.data && res.success) {
          this.tabelListData = res.body.data;
        }
      });
    },
    getTable(params) {
      let code = 'btEr9Po7'
      commonApi(params, code).then(res => {
        if (res.success) {
          this.superviseListData = res.body.data
          this.pagination.total = +res.total
        }
      })
    },
    onSearch() {
      this.pagination.current = 1
      this.defaultData.body.sjlydw = this.searchFrom
      this.getTable(this.defaultData);

    },
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages
      this.defaultData.page = this.pagination.current
      this.getTable(this.defaultData);

    }
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
